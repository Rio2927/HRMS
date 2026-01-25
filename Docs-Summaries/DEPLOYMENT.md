# HRMS Deployment Guide

This guide covers deploying HRMS to a production server.

## Prerequisites

- Ubuntu 20.04 LTS or higher
- Python 3.8+
- Node.js 16+
- PostgreSQL 12+
- Nginx or Apache
- SSL certificate (Let's Encrypt recommended)

## Server Setup

### 1. System Updates

```bash
sudo apt update
sudo apt upgrade -y
sudo apt install -y build-essential libssl-dev libffi-dev python3-dev curl git
```

### 2. Install PostgreSQL

```bash
sudo apt install -y postgresql postgresql-contrib

# Create database and user
sudo -u postgres psql << EOF
CREATE DATABASE hrms;
CREATE USER hrms_user WITH ENCRYPTED PASSWORD 'secure_password_here';
ALTER ROLE hrms_user SET client_encoding TO 'utf8';
ALTER ROLE hrms_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE hrms_user SET default_transaction_deferrable TO on;
ALTER ROLE hrms_user SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE hrms TO hrms_user;
\q
EOF
```

### 3. Install Python and Node.js

```bash
# Python
sudo apt install -y python3 python3-pip python3-venv

# Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
```

## Backend Deployment

### 1. Clone Repository

```bash
cd /home/ubuntu
git clone https://github.com/YOUR_REPO/HRMS.git
cd HRMS/backend
```

### 2. Create Virtual Environment

```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
pip install gunicorn
```

### 3. Configure Environment

```bash
cp .env.example .env
nano .env
```

Update with production values:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=hrms
DB_USER=hrms_user
DB_PASSWORD=secure_password_here
SECRET_KEY=generate_secure_key_here
FLASK_ENV=production
DEBUG=False
LOG_LEVEL=INFO
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

### 4. Create Systemd Service

```bash
sudo nano /etc/systemd/system/hrms-backend.service
```

```ini
[Unit]
Description=HRMS Flask Backend
After=network.target

[Service]
User=ubuntu
Group=ubuntu
WorkingDirectory=/home/ubuntu/HRMS/backend
Environment="PATH=/home/ubuntu/HRMS/backend/venv/bin"
ExecStart=/home/ubuntu/HRMS/backend/venv/bin/gunicorn \
    --workers 4 \
    --worker-class sync \
    --bind unix:/tmp/hrms_backend.sock \
    --timeout 120 \
    app:app
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable hrms-backend
sudo systemctl start hrms-backend
sudo systemctl status hrms-backend
```

## Frontend Deployment

### 1. Clone Repository

```bash
cd /home/ubuntu/HRMS/frontend
npm ci
npm run build
```

### 2. Configure Nginx

```bash
sudo nano /etc/nginx/sites-available/hrms
```

```nginx
upstream hrms_backend {
    server unix:/tmp/hrms_backend.sock fail_timeout=0;
}

server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    
    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;
    
    # SSL certificates
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    
    # Security headers
    add_header Strict-Transport-Security "max-age=31536000" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    
    # Frontend
    root /home/ubuntu/HRMS/frontend/dist;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # API proxy
    location /api/ {
        proxy_pass http://hrms_backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # File uploads
    location /uploads/ {
        alias /home/ubuntu/HRMS/backend/uploads/;
    }
    
    # Compression
    gzip on;
    gzip_types text/plain text/css text/javascript application/json application/javascript;
    gzip_min_length 1024;
}
```

### 3. Enable Site

```bash
sudo ln -s /etc/nginx/sites-available/hrms /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## SSL Certificate Setup

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get certificate
sudo certbot certonly --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal
sudo certbot renew --dry-run
```

## Database Initialization

```bash
cd /home/ubuntu/HRMS/backend
source venv/bin/activate

# Run migrations/create tables
psql -U hrms_user -d hrms -f initial_schema.sql
```

## Monitoring

### Logs

```bash
# Backend logs
sudo journalctl -u hrms-backend -f

# Nginx logs
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log

# Application logs
tail -f /home/ubuntu/HRMS/backend/logs/app_*.log
```

### Health Checks

```bash
# Test backend
curl https://yourdomain.com/ping

# Test frontend
curl https://yourdomain.com/
```

## Backup Strategy

### Database Backup

```bash
# Create backup script
sudo nano /home/ubuntu/backup.sh
```

```bash
#!/bin/bash
BACKUP_DIR="/home/ubuntu/backups"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

# Database backup
pg_dump -U hrms_user -d hrms | gzip > $BACKUP_DIR/hrms_db_$DATE.sql.gz

# Keep only last 7 days
find $BACKUP_DIR -name "hrms_db_*.sql.gz" -mtime +7 -delete
```

```bash
chmod +x /home/ubuntu/backup.sh
# Add to crontab for daily backups
sudo crontab -e
# Add: 0 2 * * * /home/ubuntu/backup.sh
```

## Maintenance

### Update Dependencies

```bash
cd /home/ubuntu/HRMS/backend
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt --upgrade
```

### Clear Cache/Logs

```bash
# Clear old logs
find /home/ubuntu/HRMS/backend/logs -name "*.log" -mtime +30 -delete

# Clear uploads (if needed)
find /home/ubuntu/HRMS/backend/uploads -type f -mtime +90 -delete
```

## Troubleshooting

### Backend Connection Issues

```bash
# Check service status
sudo systemctl status hrms-backend

# Check if socket exists
ls -la /tmp/hrms_backend.sock

# Restart service
sudo systemctl restart hrms-backend
```

### Database Connection Failed

```bash
# Test connection
psql -U hrms_user -d hrms -h localhost

# Check credentials in .env
cat /home/ubuntu/HRMS/backend/.env | grep DB_
```

### Frontend Not Loading

```bash
# Check Nginx configuration
sudo nginx -t

# Check file permissions
ls -la /home/ubuntu/HRMS/frontend/dist

# Check Nginx logs
sudo tail -f /var/log/nginx/error.log
```

## Security Hardening

1. **Firewall**
   ```bash
   sudo ufw enable
   sudo ufw allow 22/tcp
   sudo ufw allow 80/tcp
   sudo ufw allow 443/tcp
   ```

2. **Fail2ban**
   ```bash
   sudo apt install fail2ban
   sudo systemctl enable fail2ban
   ```

3. **Regular Updates**
   ```bash
   sudo apt install unattended-upgrades
   ```

4. **Secret Management**
   - Use environment variables
   - Never commit secrets to repository
   - Rotate keys regularly

## Performance Optimization

1. Enable database query optimization
2. Configure Nginx caching headers
3. Use CDN for static assets
4. Monitor server resources
5. Scale horizontally if needed

## Rollback Procedure

```bash
# Revert to previous version
cd /home/ubuntu/HRMS
git log --oneline | head -10
git revert <commit-hash>

# Rebuild frontend
cd frontend
npm run build

# Restart backend
sudo systemctl restart hrms-backend
```

For detailed support, refer to the main README.md.
