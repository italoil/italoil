# Shopify CLI Development Guide

This guide explains how to use Shopify CLI for developing and deploying the ITALOIL theme.

## Why Use Shopify CLI?

Shopify CLI provides a modern development workflow with:
- **Live Preview**: See changes in real-time on a development store
- **Hot Reload**: Automatic browser refresh when you edit files
- **Version Control**: Deploy directly from Git without creating ZIP files
- **Collaboration**: Multiple developers can work on the same theme
- **Faster Workflow**: No more manual uploading and downloading

## Prerequisites

- Node.js 18+ or Ruby 3.0+
- A Shopify Partner account (free) or store admin access
- Git installed on your computer

## Installation

### Option 1: Install via npm (Recommended)

```bash
npm install -g @shopify/cli @shopify/theme
```

### Option 2: Install via Homebrew (macOS/Linux)

```bash
brew tap shopify/shopify
brew install shopify-cli
```

### Option 3: Install via RubyGems

```bash
gem install shopify-cli
```

### Verify Installation

```bash
shopify version
```

You should see version information displayed.

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/italoil/italoil.git
cd italoil
```

### 2. Connect to Your Shopify Store

Initialize Shopify CLI in your theme directory:

```bash
shopify theme init
```

This will create a `.shopify` directory (already gitignored) to store your connection settings.

### 3. Authenticate

Log in to your Shopify store:

```bash
shopify auth login
```

This will open your browser to authenticate. Follow the prompts to:
1. Select your Shopify Partner organization (or use your store)
2. Choose the store you want to work with

## Development Workflow

### Preview Theme Locally

Start a local development server with live reload:

```bash
shopify theme dev
```

This command:
- Uploads your theme to a development theme on your store
- Opens a preview URL in your browser
- Watches for file changes and automatically syncs them
- Hot reloads the browser when files change

**Preview URL**: The command will display a URL like `https://your-store.myshopify.com?preview_theme_id=123456789`

**Press Ctrl+C** to stop the development server.

### Development with Specific Store

If you work with multiple stores:

```bash
shopify theme dev --store your-store.myshopify.com
```

### Development on Specific Port

```bash
shopify theme dev --port 9292
```

## Deploying Your Theme

### Deploy to Development Theme

Push changes to a development theme (safe for testing):

```bash
shopify theme push --development
```

### Deploy to Live Theme

⚠️ **Warning**: This will replace your live theme. Always test first!

```bash
shopify theme push --live
```

You'll be prompted to confirm before deploying to production.

### Deploy to Unpublished Theme

Create a new unpublished theme:

```bash
shopify theme push --unpublished
```

### Deploy Specific Theme by ID

```bash
shopify theme push --theme-id 123456789
```

## Useful Commands

### List All Themes

View all themes on your store:

```bash
shopify theme list
```

### Pull Theme from Store

Download the current theme from Shopify:

```bash
shopify theme pull
```

⚠️ **Warning**: This will overwrite local files. Commit your changes first!

### Pull Specific Theme

```bash
shopify theme pull --theme-id 123456789
```

### Check Theme for Issues

Run theme check to find potential problems:

```bash
shopify theme check
```

This validates:
- Liquid syntax
- Asset optimization
- Performance issues
- Best practices

### Share Preview Link

Generate a shareable preview link:

```bash
shopify theme share
```

### Package Theme

Create a ZIP file for manual upload:

```bash
shopify theme package
```

The ZIP will be created in your current directory.

## Project Structure

The theme follows Shopify's standard structure:

```
italoil/
├── assets/           # CSS, JavaScript, images
├── config/           # Theme settings
├── layout/           # Layout templates
├── locales/          # Translation files
├── sections/         # Reusable sections
├── snippets/         # Reusable code snippets
├── templates/        # Page templates
├── .shopifyignore    # Files to exclude from upload
└── .shopify/         # CLI config (gitignored)
```

## Common Workflows

### Starting a New Feature

```bash
# Create a new branch
git checkout -b feature/new-section

# Start development server
shopify theme dev

# Make your changes...
# Files auto-sync to Shopify

# Test in the preview URL
# Commit when ready
git add .
git commit -m "Add new section"
git push origin feature/new-section
```

### Testing Before Deploy

```bash
# Deploy to unpublished theme for testing
shopify theme push --unpublished

# Get the theme ID from output
# Test on your store

# If good, deploy to live
shopify theme push --live
```

### Collaborating with Team

```bash
# Pull latest changes
git pull origin main

# Start development
shopify theme dev

# Each developer gets their own preview URL
# No conflicts!
```

## Environment-Specific Settings

### Development Store

For development, use a Shopify Partner development store:

1. Sign up at [partners.shopify.com](https://partners.shopify.com)
2. Create a development store (free)
3. Use `shopify theme dev` on this store
4. When ready, deploy to production store

### Production Store

For production deployment:

```bash
# Always test first!
shopify theme push --unpublished

# Then deploy to live
shopify theme push --live --store your-production-store.myshopify.com
```

## Troubleshooting

For detailed troubleshooting of common errors, see **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)**.

### Common Quick Fixes

**Authorization errors** (including "not authorized to use CLI"):
- Check for typos in store name (e.g., "itloil" vs "italoil")
- Use permanent domain: `store.myshopify.com` (not custom domain)
- See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md#authorization-errors) for complete guide

**"Not authenticated" error:**
```bash
shopify auth logout
shopify auth login
```

**"Theme not found" error:**
```bash
shopify theme list
```

**Files not syncing during dev:**
1. Stop the dev server (Ctrl+C)
2. Clear the `.shopify` directory
3. Restart: `shopify theme dev`

**"Too many requests" error:**
- Shopify has rate limits. Wait 60 seconds and try again.

**Theme check errors:**
```bash
shopify theme check
```

For comprehensive troubleshooting including authorization errors, connection issues, and file sync problems, see **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)**.

## Advanced Usage

### Watch Specific Patterns

```bash
shopify theme dev --only templates/,sections/
```

### Ignore Specific Patterns

```bash
shopify theme dev --ignore config/
```

### Upload Without Opening Browser

```bash
shopify theme dev --no-open
```

### Live Theme Development (Dangerous!)

⚠️ **Not recommended**: Develop directly on live theme

```bash
shopify theme dev --theme-id YOUR_LIVE_THEME_ID
```

Better: Use development theme and deploy when ready.

## CI/CD Integration

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Shopify

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install Shopify CLI
        run: npm install -g @shopify/cli @shopify/theme
      
      - name: Deploy Theme
        env:
          SHOPIFY_CLI_THEME_TOKEN: ${{ secrets.SHOPIFY_CLI_THEME_TOKEN }}
        run: |
          shopify theme push --live --store ${{ secrets.SHOPIFY_STORE }}
```

### Setting up Theme Access Token

1. Go to your Shopify admin
2. Settings → Apps and sales channels → Develop apps
3. Create app with Theme Admin API access
4. Generate Admin API access token
5. Add as GitHub secret: `SHOPIFY_CLI_THEME_TOKEN`

## Best Practices

### ✅ Do's

- **Use branches** for new features
- **Test on development themes** before deploying to live
- **Commit often** to track changes
- **Run `shopify theme check`** before deploying
- **Use `.shopifyignore`** to exclude unnecessary files
- **Document changes** in commit messages

### ❌ Don'ts

- **Don't develop on live theme** - use development themes
- **Don't commit `.shopify` directory** - it's gitignored
- **Don't skip testing** - always test before live deploy
- **Don't ignore theme check warnings** - they indicate real issues
- **Don't upload large files** - optimize images and assets

## Quick Reference

### Most Used Commands

```bash
# Development
shopify theme dev                    # Start dev server
shopify theme dev --store mystore    # Dev with specific store

# Deploy
shopify theme push                   # Interactive deploy
shopify theme push --development     # Push to dev theme
shopify theme push --live            # Push to live (careful!)
shopify theme push --unpublished     # Create new theme

# Management
shopify theme list                   # List all themes
shopify theme pull                   # Download theme
shopify theme check                  # Validate theme
shopify theme share                  # Get preview link

# Authentication
shopify auth login                   # Log in
shopify auth logout                  # Log out

# Help
shopify theme --help                 # Show all commands
shopify theme dev --help             # Help for specific command
```

## Resources

### Official Documentation

- [Shopify CLI Documentation](https://shopify.dev/docs/themes/tools/cli)
- [Theme Development](https://shopify.dev/docs/themes)
- [Liquid Reference](https://shopify.dev/docs/api/liquid)

### ITALOIL Theme Docs

- [README.md](./README.md) - Project overview
- [README_THEME.md](./README_THEME.md) - Theme technical docs
- [INSTALLATION.md](./INSTALLATION.md) - Manual installation guide
- [QUICKSTART.md](./QUICKSTART.md) - Quick setup guide

### Community

- [Shopify Community](https://community.shopify.com)
- [Shopify Partners Slack](https://shopifypartners.slack.com)
- [GitHub Issues](https://github.com/italoil/italoil/issues)

## Getting Help

### Theme Issues
- Email: italoil.store@gmail.com
- GitHub Issues: [italoil/italoil/issues](https://github.com/italoil/italoil/issues)

### Shopify CLI Issues
- [Shopify CLI GitHub](https://github.com/Shopify/cli)
- [Shopify Partners Help](https://partners.shopify.com/help)

---

## Summary

**For Daily Development:**
```bash
shopify theme dev
```

**To Deploy Changes:**
```bash
shopify theme push --unpublished  # Test first
shopify theme push --live         # When ready
```

**That's it!** You're now ready to develop ITALOIL theme with Shopify CLI.

🫒 **ITALOIL** - From our family groves to your table
