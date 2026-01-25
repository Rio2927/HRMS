# Contributing to HRMS

Thank you for your interest in contributing to the HRMS project! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on the code, not the person
- Respect differing opinions

## Getting Started

1. **Fork the Repository**: Click the fork button on GitHub
2. **Clone Your Fork**: `git clone https://github.com/YOUR_USERNAME/HRMS.git`
3. **Add Upstream**: `git remote add upstream https://github.com/ORIGINAL_OWNER/HRMS.git`
4. **Create a Branch**: `git checkout -b feature/your-feature-name`

## Development Setup

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
```

### Frontend

```bash
cd frontend
npm install
```

## Making Changes

### Code Style

#### Python
- Follow PEP 8 guidelines
- Use type hints where applicable
- Write docstrings for functions and classes
- Maximum line length: 100 characters

#### JavaScript/React
- Use ES6+ features
- Follow Airbnb style guide
- Use meaningful variable names
- Add comments for complex logic

### Commits

- Write clear, descriptive commit messages
- Use present tense ("Add feature" not "Added feature")
- Reference issues when applicable: `Fixes #123`
- Keep commits focused on single changes

Example:
```
feat: Add JWT token validation for protected routes

- Implement token_required decorator
- Add error handling for expired tokens
- Update login endpoint to return JWT token

Fixes #45
```

## Testing

### Backend Tests

```bash
cd backend
pytest tests/ -v --cov=.
```

### Frontend Tests

```bash
cd frontend
npm run lint
```

## Pull Request Process

1. **Sync with Upstream**: 
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Push to Your Fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

3. **Create Pull Request**:
   - Provide a clear title and description
   - Reference related issues
   - Include screenshots/recordings for UI changes
   - Ensure all tests pass

4. **Code Review**:
   - Address reviewer comments
   - Make requested changes
   - Push updates to the same branch

## Branch Naming

- `feature/description` - New features
- `bugfix/description` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring
- `test/description` - Test improvements

## Security

- Never commit credentials or secrets
- Use environment variables for sensitive data
- Follow OWASP security guidelines
- Report security issues privately

## Documentation

- Update README.md for new features
- Add docstrings to new functions
- Include code examples where helpful
- Keep documentation up to date

## Large Changes

For significant changes:

1. Create an issue first to discuss the approach
2. Get approval before starting work
3. Break into smaller PRs if possible
4. Update related documentation

## Questions?

- Open an issue for questions
- Check existing issues and discussions
- Contact maintainers directly if needed

## License

By contributing, you agree your code will be licensed under the MIT License.

Thank you for contributing to HRMS!
