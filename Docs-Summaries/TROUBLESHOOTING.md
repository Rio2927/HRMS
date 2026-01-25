# HRMS Troubleshooting Guide

Common issues and solutions for the HRMS project.

## Backend Issues

### 1. Database Connection Failed

**Error**
```
psycopg2.OperationalError: could not connect to server: Connection refused
```

**Solutions**

a) **Check PostgreSQL is running**
```bash
sudo systemctl status postgresql
sudo systemctl start postgresql
```

b) **Verify database exists**
```bash
psql -U postgres -l | grep hrms
```

c) **Verify credentials in .env**
```bash
cat backend/.env | grep DB_
```

d) **Test connection manually**
```bash
psql -h localhost -U postgres -d hrms
```

e) **Check connection string**
- Host should be `127.0.0.1` or `localhost`
- Port should be `5432` (default)
- Verify username and password are correct

---

### 2. Module Import Errors

**Error**
```
ModuleNotFoundError: No module named 'flask'
```

**Solutions**

a) **Activate virtual environment**
```bash
cd backend
source venv/bin/activate  # Linux/Mac
# or
venv\Scripts\activate  # Windows
```

b) **Verify packages are installed**
```bash
pip list | grep Flask
pip install -r requirements.txt
```

c) **Check Python version**
```bash
python --version  # Should be 3.8+
```

d) **Reinstall packages**
```bash
pip install --force-reinstall -r requirements.txt
```

---

### 3. Port Already in Use

**Error**
```
OSError: [Errno 48] Address already in use
```

**Solutions**

a) **Find process using port 5000**
```bash
lsof -i :5000
kill -9 <PID>
```

b) **Change Flask port in app.py**
```python
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
```

c) **Use different port**
```bash
python app.py --port 5001
```

---

### 4. JWT Token Errors

**Error**
```
Invalid Authorization header format
```

**Solutions**

a) **Correct token format**
```
Authorization: Bearer <token>
# Not: Authorization: <token>
# Not: Authorization: Token <token>
```

b) **Token has expired**
- User needs to login again to get new token
- Token expires after 24 hours (configurable)

c) **Invalid secret key**
- Verify `SECRET_KEY` in `.env` matches
- Regenerate if changed

d) **Check token is valid JWT**
```python
import jwt
try:
    jwt.decode(token, secret_key, algorithms=['HS256'])
except jwt.InvalidTokenError as e:
    print(f"Invalid token: {e}")
```

---

### 5. CORS Errors

**Error**
```
Access to XMLHttpRequest blocked by CORS policy
```

**Solutions**

a) **Add frontend URL to ALLOWED_ORIGINS in .env**
```env
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000,https://yourdomain.com
```

b) **Restart backend after changing .env**
```bash
# Kill existing process
pkill -f "python.*app.py"

# Restart
python app.py
```

c) **Check request headers**
```bash
curl -i -X OPTIONS http://localhost:5000/employees
# Should show Access-Control-Allow-Origin header
```

d) **Browser console shows exact issue**
- Check Network tab in DevTools
- Look for CORS-related headers
- Verify origin is in ALLOWED_ORIGINS

---

### 6. File Upload Fails

**Error**
```
File too large. Maximum size: 10MB
```

**Solutions**

a) **Check file size**
```bash
ls -lh filename.jpg
```

b) **Increase MAX_FILE_SIZE_MB in .env**
```env
MAX_FILE_SIZE_MB=20
```

c) **Allowed file types issue**
```env
ALLOWED_FILE_EXTENSIONS=jpg,jpeg,png,pdf,docx
```

d) **Missing file in request**
```bash
curl -X POST http://localhost:5000/create \
  -F "first_name=John" \
  -F "email=john@example.com" \
  -F "password=pass123" \
  -F "file=@profile.jpg"
```

---

### 7. Database Migration Issues

**Error**
```
relation "employees" does not exist
```

**Solutions**

a) **Check tables exist**
```sql
\dt  # In psql
```

b) **Create tables**
```bash
cd backend
psql -U postgres -d hrms -f initial_schema.sql
# Or run migration script
```

c) **Verify schema**
```sql
\d employees  # Describe table
```

---

### 8. Password Hash Errors

**Error**
```
The password provided is not a valid hash
```

**Solutions**

a) **Database contains old passwords**
- Re-hash all passwords
- Clear database if in development

b) **Hash library mismatch**
- Ensure Werkzeug version is correct
- Check hash format before verifying

---

## Frontend Issues

### 1. npm install Fails

**Error**
```
npm ERR! 404 Not Found - GET
```

**Solutions**

a) **Clear npm cache**
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

b) **Check internet connection**
```bash
ping npm.com
```

c) **Use different registry**
```bash
npm config set registry https://registry.npmmirror.com
npm install
```

d) **Update npm**
```bash
npm install -g npm@latest
```

---

### 2. Port 5173 Already in Use

**Error**
```
Port 5173 is already in use
```

**Solutions**

a) **Kill process using port**
```bash
lsof -i :5173
kill -9 <PID>
```

b) **Use different port**
```bash
npm run dev -- --port 5174
```

c) **Check vite.config.js**
```javascript
server: {
  port: 5174,
  strictPort: false  // Auto-increment if busy
}
```

---

### 3. React Component Not Rendering

**Error**
```
Component returns null or nothing renders
```

**Solutions**

a) **Check console for errors**
- Open DevTools (F12)
- Check Console tab for errors
- Check Network tab for failed requests

b) **Verify Auth Context**
- Check if AuthProvider wraps App component
- Verify AuthContext is exported correctly

c) **Check props and state**
```javascript
console.log('Props:', props);
console.log('State:', state);
```

d) **Verify route exists**
- Check App.jsx routes
- Check route path matches URL

---

### 4. API Calls Return 401

**Error**
```
"error": "Token is missing"
```

**Solutions**

a) **Verify token is stored**
```javascript
console.log('Token:', localStorage.getItem('token'));
```

b) **Check token format**
```javascript
// Correct
headers: { 'Authorization': `Bearer ${token}` }

// Wrong
headers: { 'Authorization': token }
```

c) **Login again if expired**
```javascript
if (error.response?.status === 401) {
  // Redirect to login
  navigate('/login');
}
```

d) **Check ALLOWED_ORIGINS**
- Verify frontend URL is in backend .env

---

### 5. Axios Request Fails

**Error**
```
Network Error: Cannot read property 'data'
```

**Solutions**

a) **Check API URL**
```javascript
// Verify API_BASE_URL
console.log('API URL:', API_BASE_URL);

// Should match backend server
```

b) **Check request format**
```javascript
// Ensure Content-Type header
axios.post(url, data, {
  headers: { 'Content-Type': 'application/json' }
})
```

c) **Check response handling**
```javascript
try {
  const response = await axios.get(url);
  console.log(response.data);
} catch (error) {
  console.error('Error:', error.response?.data || error.message);
}
```

d) **Test with curl**
```bash
curl -H "Authorization: Bearer <token>" http://localhost:5000/employees
```

---

### 6. Authentication Context Not Working

**Error**
```
Cannot read property 'user' of undefined
```

**Solutions**

a) **Verify AuthProvider wraps app**
```javascript
<Router>
  <AuthProvider>
    <App />
  </AuthProvider>
</Router>
```

b) **Use useAuth hook correctly**
```javascript
import { useAuth } from './context/AuthContext';

function Component() {
  const { user, token } = useAuth();
  // Now user and token are available
}
```

c) **Check context initialization**
```javascript
const AuthContext = createContext(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
}
```

---

### 7. Build Fails

**Error**
```
npm run build fails
```

**Solutions**

a) **Check syntax errors**
```bash
npm run lint
```

b) **Clear Vite cache**
```bash
rm -rf dist node_modules/.vite
npm run build
```

c) **Check for warnings as errors**
- Review build output
- Fix any TypeScript or ESLint errors

d) **Test locally first**
```bash
npm run dev
# Verify app works before building
npm run build
```

---

## Common Issues

### 1. Empty Responses

**Problem**: API returns 200 but data is empty

**Solutions**:
- Check database has records
- Verify query is correct
- Check user has permission
- Test with database client (psql)

---

### 2. Slow Performance

**Problem**: App feels slow, API calls take long

**Solutions**:
- Check database indexes
- Monitor server resources (top, htop)
- Enable query logging
- Check for N+1 queries
- Consider caching

---

### 3. Intermittent Failures

**Problem**: Sometimes works, sometimes fails

**Solutions**:
- Check database connections
- Look for race conditions
- Review logs for patterns
- Test with more load
- Consider connection pooling

---

### 4. Data Inconsistencies

**Problem**: Database has conflicting or duplicate data

**Solutions**:
- Run data integrity checks
- Verify constraints are applied
- Check for missing transactions
- Review audit logs
- Clean up duplicates

---

## Getting Help

1. **Check logs**
   ```bash
   # Backend logs
   tail -f backend/logs/app_*.log
   
   # Nginx logs
   sudo tail -f /var/log/nginx/error.log
   
   # Systemd logs
   sudo journalctl -u hrms-backend -f
   ```

2. **Check documentation**
   - [README.md](README.md)
   - [API_DOCUMENTATION.md](API_DOCUMENTATION.md)
   - [DEPLOYMENT.md](DEPLOYMENT.md)

3. **Test components**
   ```bash
   # Backend
   cd backend && pytest tests/ -v
   
   # Frontend
   cd frontend && npm run lint
   ```

4. **Enable debug mode**
   ```env
   DEBUG=True
   LOG_LEVEL=DEBUG
   FLASK_ENV=development
   ```

5. **Seek help**
   - Create GitHub issue with details
   - Include error messages and logs
   - Describe steps to reproduce
   - Share configuration (sanitized)

---

For more help, see the documentation or create an issue on GitHub.
