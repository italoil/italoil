# ITALOIL Shopify CLI Integration - Complete Guide

## ✅ Your Theme is Ready!

This repository contains a **complete, validated Shopify theme** that's ready to use with Shopify CLI.

All theme files have been verified and pass validation:
- ✓ All required directories present
- ✓ Valid JSON configuration files
- ✓ Proper Liquid template structure
- ✓ Assets, sections, and snippets ready
- ✓ Shopify CLI configuration files in place

## 🚀 Quick Start (3 Steps)

### Step 1: Install Shopify CLI

Choose one method:

**Option A: npm (Recommended)**
```bash
npm install -g @shopify/cli @shopify/theme
```

**Option B: Homebrew (macOS/Linux)**
```bash
brew tap shopify/shopify
brew install shopify-cli
```

**Option C: RubyGems**
```bash
gem install shopify-cli
```

Verify installation:
```bash
shopify version
```

### Step 2: Navigate to Theme Directory

```bash
cd /path/to/italoil
```

### Step 3: Start Development

```bash
shopify theme dev
```

This will:
1. Prompt you to log in to Shopify (if not already logged in)
2. Upload the theme to a development theme on your store
3. Open a preview URL in your browser
4. Watch for file changes and auto-sync them
5. Hot-reload your browser when files change

**That's it!** You're now developing with Shopify CLI! 🎉

## 📖 What You Can Do Now

### Development Mode

Start local development with live preview:
```bash
shopify theme dev
```

Access your development store at the URL displayed (typically `https://yourstore.myshopify.com/?preview_theme_id=XXXXX`)

### Deploy Changes

**To Development Theme (Safe Testing):**
```bash
shopify theme push --development
```

**To Unpublished Theme (Pre-Production):**
```bash
shopify theme push --unpublished
```

**To Live Theme (Production - Use Carefully!):**
```bash
shopify theme push --live
```

### Other Useful Commands

**List all themes:**
```bash
shopify theme list
```

**Validate theme:**
```bash
shopify theme check
```

**Share preview link:**
```bash
shopify theme share
```

**Package theme as ZIP:**
```bash
shopify theme package
```

## 🔍 Verify Theme Before Starting

Run the verification script to ensure everything is set up correctly:

```bash
# Make script executable (if needed)
chmod +x verify-theme.sh

# Run verification
./verify-theme.sh
```

This checks:
- Required directories and files
- JSON file validity
- Liquid template structure
- Asset files
- Configuration files

## 📦 Optional: Using npm Scripts

This theme includes convenient npm scripts:

```bash
# Install dependencies (optional)
npm install

# Start development
npm run dev

# Deploy to development theme
npm run push:dev

# Deploy to unpublished theme
npm run push:unpublished

# Validate theme
npm run check

# List themes
npm run list
```

## 🏗️ Theme Structure

The theme follows Shopify's standard structure:

```
italoil/
├── assets/              # CSS, JavaScript, images
│   ├── base.css
│   ├── theme.css
│   └── theme.js
├── config/              # Theme settings
│   ├── settings_data.json
│   └── settings_schema.json
├── layout/              # Layout templates
│   ├── theme.liquid
│   └── password.liquid
├── locales/             # Translation files
│   └── en.default.json
├── sections/            # Reusable sections (27 files)
│   ├── header.liquid
│   ├── footer.liquid
│   ├── hero.liquid
│   └── ...
├── snippets/            # Reusable code snippets
├── templates/           # Page templates (10 files)
│   ├── index.json       # Homepage
│   ├── product.json     # Product pages
│   ├── collection.json  # Collection pages
│   └── ...
├── .shopifyignore       # Files excluded from upload
├── .theme-check.yml     # Theme validation config
├── package.json         # npm scripts
└── verify-theme.sh      # Validation script
```

## 🎨 Theme Features

This theme includes:

**Pages & Templates:**
- Homepage with hero section
- Product pages (500ml, 250ml, 100ml bottles)
- Collection pages
- Wholesale pricing page
- Harvest Club subscription page
- Visit Italy agritourism page
- Cart and checkout

**Sections:**
- Header with navigation
- Footer with company info
- Brand story
- Featured products
- Product grids
- Custom page sections

**Styling:**
- Mobile-first responsive design
- Italian premium aesthetic (deep green #2C5530 & cream #F5F1E8)
- Custom typography
- Optimized for performance

**SEO & Marketing:**
- Schema markup
- Meta tags
- Klaviyo email integration ready
- Social media links

## 🔧 Customization

### Changing Theme Settings

1. Start development mode: `shopify theme dev`
2. Open the preview URL
3. Click "Customize" in the Shopify admin
4. Adjust colors, fonts, and layout options
5. Changes sync automatically

### Editing Code

1. Edit any file in the theme directories
2. Save the file
3. Changes automatically sync to Shopify
4. Browser refreshes automatically
5. See changes instantly

### Adding New Features

1. Create new section files in `sections/`
2. Add new templates in `templates/`
3. Add styles in `assets/theme.css`
4. Add scripts in `assets/theme.js`
5. Test in development mode
6. Deploy when ready

## 🐛 Troubleshooting

### Authentication Issues

**"Not authenticated" error:**
```bash
shopify auth logout
shopify auth login
```

**"Not authorized to use CLI" error:**
- Verify store name is correct (use permanent `.myshopify.com` domain)
- Check for typos in store name
- See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for detailed solutions

### Connection Issues

**Files not syncing:**
1. Stop dev server (Ctrl+C)
2. Remove `.shopify` directory: `rm -rf .shopify`
3. Restart: `shopify theme dev`

**"Too many requests" error:**
- Shopify has rate limits
- Wait 60 seconds and try again

### Validation Issues

**Theme check errors:**
```bash
shopify theme check
```

This will show any issues with:
- Liquid syntax
- Template structure
- Performance
- Best practices

## 📚 Documentation

Complete documentation is available:

- **[SHOPIFY_CLI_GUIDE.md](./SHOPIFY_CLI_GUIDE.md)** - Complete CLI reference
- **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)** - Common errors and solutions
- **[README_THEME.md](./README_THEME.md)** - Theme technical documentation
- **[DEVELOPMENT.md](./DEVELOPMENT.md)** - Development workflow
- **[INSTALLATION.md](./INSTALLATION.md)** - Installation options
- **[QUICKSTART.md](./QUICKSTART.md)** - Quick setup guide

## 🎯 Best Practices

### ✅ Do's

- **Use branches** for new features
- **Test on development themes** before deploying to live
- **Commit often** to track changes
- **Run `shopify theme check`** before deploying
- **Validate with `./verify-theme.sh`** periodically
- **Document changes** in commit messages

### ❌ Don'ts

- **Don't develop on live theme** - use development themes
- **Don't commit `.shopify` directory** - it's gitignored
- **Don't skip testing** - always test before live deploy
- **Don't ignore theme check warnings** - they indicate real issues
- **Don't upload large files** - optimize images and assets

## 🔐 Security & Quality

This theme has been validated for:
- ✓ Valid JSON syntax
- ✓ Proper Liquid structure
- ✓ Required Shopify files
- ✓ Standard directory structure
- ✓ No syntax errors

Before deploying to production, always:
1. Run `./verify-theme.sh`
2. Run `shopify theme check`
3. Test on development theme
4. Review changes carefully

## 💡 Pro Tips

**Speed up development:**
```bash
# Only sync specific directories
shopify theme dev --only templates/,sections/
```

**Work with multiple stores:**
```bash
shopify theme dev --store your-dev-store.myshopify.com
shopify theme push --live --store your-production-store.myshopify.com
```

**Generate shareable preview links:**
```bash
shopify theme share
```

**Pull latest from Shopify:**
```bash
shopify theme pull
```
⚠️ Warning: This overwrites local files. Commit your changes first!

## 🌟 What Makes This Theme Special

**Ready for Shopify CLI:**
- ✓ All configuration files present
- ✓ Proper `.shopifyignore` setup
- ✓ Theme Check configuration
- ✓ Validation script included

**Production Ready:**
- ✓ Mobile-first responsive design
- ✓ SEO optimized
- ✓ Performance optimized
- ✓ Accessible markup

**Developer Friendly:**
- ✓ Clean, well-organized code
- ✓ Comprehensive documentation
- ✓ npm scripts for convenience
- ✓ Easy to customize

## 🆘 Getting Help

### Theme-Specific Issues
- Email: italoil.store@gmail.com
- GitHub Issues: [github.com/italoil/italoil/issues](https://github.com/italoil/italoil/issues)

### Shopify CLI Issues
- [Shopify CLI Documentation](https://shopify.dev/docs/themes/tools/cli)
- [Shopify CLI GitHub](https://github.com/Shopify/cli)
- [Shopify Partners Help](https://partners.shopify.com/help)

### Community Resources
- [Shopify Community](https://community.shopify.com)
- [Shopify Partners Slack](https://shopifypartners.slack.com)

## 📝 Next Steps

1. **Install Shopify CLI** (if not already installed)
2. **Run verification**: `./verify-theme.sh`
3. **Start development**: `shopify theme dev`
4. **Customize the theme** to match your brand
5. **Test thoroughly** on development theme
6. **Deploy to production**: `shopify theme push --live`

## Summary

Your ITALOIL theme is **100% ready for Shopify CLI**. Just run:

```bash
shopify theme dev
```

And start building! 🫒

---

🫒 **ITALOIL** - From our family groves to your table
