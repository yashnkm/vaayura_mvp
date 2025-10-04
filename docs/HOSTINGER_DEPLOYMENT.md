# Hostinger Deployment Guide for Vaayura Frontend

This guide will walk you through deploying the Vaayura React frontend application to Hostinger hosting.

## Prerequisites

- Hostinger hosting account with Node.js support
- Local development environment with Node.js installed
- Access to your domain/subdomain on Hostinger
- Git repository access (if using version control)

## Step 1: Prepare Your Local Project

### 1.1 Ensure All Dependencies Are Installed
```bash
cd vaayura_mvp
npm install
```

### 1.2 Update Environment Variables
Create or update your production environment file:
```bash
# Create .env.production file
touch .env.production
```

Add your production environment variables:
```env
VITE_API_URL=https://your-backend-domain.com/api
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

### 1.3 Build the Production Version
```bash
npm run build
```

This creates a `dist` folder with your production-ready files.

### 1.4 Test the Build Locally (Optional)
```bash
npm run preview
```

## Step 2: Access Hostinger Control Panel

### 2.1 Login to Hostinger
1. Go to [hostinger.com](https://hostinger.com)
2. Login to your account
3. Navigate to the **Hosting** section
4. Click on **Manage** for your hosting plan

### 2.2 Access File Manager
1. In the hosting control panel, find **File Manager**
2. Click to open the file manager interface

## Step 3: Upload Files to Hostinger

### 3.1 Navigate to Public HTML
1. In File Manager, navigate to `public_html` folder
2. This is where your website files will be hosted

### 3.2 Clean the Directory (If Needed)
1. If there are existing files, backup or delete them
2. Ensure `public_html` is clean for your new deployment

### 3.3 Upload Your Build Files
**Option A: Using File Manager Upload**
1. Select all files from your local `dist` folder
2. Drag and drop them into the `public_html` folder
3. Or use the Upload button in File Manager

**Option B: Using FTP (Recommended for large projects)**
1. Get FTP credentials from Hostinger control panel
2. Use an FTP client like FileZilla
3. Upload all contents of `dist` folder to `public_html`

### 3.4 Verify File Structure
Your `public_html` should now contain:
```
public_html/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── [other asset files]
└── [other static files]
```

## Step 4: Configure Hostinger for React SPA

### 4.1 Create .htaccess File
React Router requires URL rewriting. Create `.htaccess` in `public_html`:

```apache
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QR,L]

# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Set cache headers
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>

# Security headers
Header always set X-Content-Type-Options nosniff
Header always set X-Frame-Options DENY
Header always set X-XSS-Protection "1; mode=block"
Header always set Referrer-Policy "strict-origin-when-cross-origin"
Header always set Permissions-Policy "camera=(), microphone=(), geolocation=()"
```

### 4.2 Upload .htaccess File
1. Create the `.htaccess` file in File Manager
2. Or upload it via FTP to the `public_html` directory

## Step 5: Configure Domain and SSL

### 5.1 Point Domain to Hostinger
1. In Hostinger control panel, go to **Domains**
2. Make sure your domain points to your hosting
3. Update DNS settings if needed

### 5.2 Enable SSL Certificate
1. In hosting control panel, find **SSL/TLS**
2. Enable **Free SSL Certificate**
3. Wait for SSL activation (can take up to 24 hours)

## Step 6: Test Your Deployment

### 6.1 Basic Functionality Test
1. Visit your domain (e.g., `https://yourdomain.com`)
2. Check if the homepage loads correctly
3. Test navigation between pages
4. Verify React Router is working (no 404 errors on refresh)

### 6.2 Test Key Features
- [ ] Homepage loads with all sections
- [ ] Product pages accessible
- [ ] Contact forms work (if backend is connected)
- [ ] Images load properly
- [ ] Mobile responsiveness
- [ ] Hero video/animations work

### 6.3 Performance Check
1. Use Google PageSpeed Insights
2. Check loading times
3. Verify assets are compressed

## Step 7: Environment-Specific Configurations

### 7.1 Production API Endpoints
Ensure your `.env.production` variables are correct:
- Backend API URLs
- Third-party service keys
- Database connections

### 7.2 Update CORS Settings
If you have a backend, update CORS to allow your new domain:
```javascript
// Backend CORS config
cors({
  origin: ['https://yourdomain.com', 'https://www.yourdomain.com'],
  credentials: true
})
```

## Step 8: Set Up Automated Deployment (Optional)

### 8.1 Using GitHub Actions
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Hostinger

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v2

    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'

    - name: Install dependencies
      run: npm ci

    - name: Build project
      run: npm run build

    - name: Deploy to Hostinger
      uses: SamKirkland/FTP-Deploy-Action@4.3.3
      with:
        server: ${{ secrets.FTP_SERVER }}
        username: ${{ secrets.FTP_USERNAME }}
        password: ${{ secrets.FTP_PASSWORD }}
        local-dir: ./dist/
        server-dir: ./public_html/
```

### 8.2 Set GitHub Secrets
Add these secrets to your GitHub repository:
- `FTP_SERVER`: Hostinger FTP server
- `FTP_USERNAME`: Your FTP username
- `FTP_PASSWORD`: Your FTP password

## Troubleshooting

### Common Issues and Solutions

#### 1. Blank White Page
**Cause**: Incorrect base path or missing files
**Solution**:
- Check if all files uploaded correctly
- Verify `index.html` exists in `public_html`
- Check browser console for errors

#### 2. 404 Errors on Page Refresh
**Cause**: Missing or incorrect `.htaccess` configuration
**Solution**:
- Ensure `.htaccess` file exists and has correct rewrite rules
- Check if mod_rewrite is enabled on server

#### 3. Assets Not Loading (404 for CSS/JS)
**Cause**: Incorrect asset paths
**Solution**:
- Check if Vite base configuration is correct
- Verify asset files are uploaded to correct directory

#### 4. API Calls Failing
**Cause**: CORS issues or incorrect API URLs
**Solution**:
- Update API URLs in production environment
- Configure CORS on backend for new domain

#### 5. Images Not Displaying
**Cause**: Missing image files or incorrect paths
**Solution**:
- Verify all images are uploaded
- Check if Cloudinary URLs are accessible
- Ensure image optimization settings are correct

## Performance Optimization

### 1. Enable Gzip Compression
Already included in `.htaccess` above

### 2. Optimize Images
- Use WebP format where possible
- Implement lazy loading
- Use appropriate image sizes

### 3. Enable Caching
- Browser caching (via `.htaccess`)
- CDN setup if available

### 4. Minimize Bundle Size
```bash
# Analyze bundle
npm run build -- --analyze

# Remove unused dependencies
npm audit
```

## Security Considerations

### 1. Environment Variables
- Never commit sensitive keys
- Use environment-specific configurations
- Rotate API keys regularly

### 2. Headers
Security headers are included in the `.htaccess` file above

### 3. HTTPS
- Always use SSL certificates
- Redirect HTTP to HTTPS

## Maintenance

### Regular Updates
1. Keep dependencies updated
2. Monitor performance metrics
3. Regular security updates
4. Backup your files regularly

### Monitoring
1. Set up uptime monitoring
2. Monitor error logs
3. Track performance metrics

## Support Resources

- **Hostinger Documentation**: https://support.hostinger.com
- **Hostinger Live Chat**: Available 24/7
- **Community Forums**: For additional help

---

## Quick Deployment Checklist

- [ ] Build project locally (`npm run build`)
- [ ] Upload `dist` contents to `public_html`
- [ ] Create `.htaccess` file with rewrite rules
- [ ] Enable SSL certificate
- [ ] Test website functionality
- [ ] Update environment variables
- [ ] Configure CORS if needed
- [ ] Set up monitoring

Your Vaayura frontend should now be successfully deployed on Hostinger! 🚀