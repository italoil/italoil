# Development Workflow with Shopify CLI

Quick reference for developers working on the ITALOIL theme.

## First Time Setup

```bash
# 1. Clone repository
git clone https://github.com/italoil/italoil.git
cd italoil

# 2. Install Shopify CLI (if not already installed)
npm install -g @shopify/cli @shopify/theme

# 3. Authenticate with Shopify
shopify auth login

# 4. Start development
shopify theme dev
```

## Daily Development

```bash
# Start your work session
shopify theme dev

# Your browser will open to preview URL
# Files sync automatically when you save
# Press Ctrl+C to stop when done
```

## Using npm Scripts (Optional)

If you install dependencies with `npm install`:

```bash
# Development
npm run dev              # Start dev server
npm run dev:open         # Start and open browser

# Deploy
npm run push             # Interactive deploy
npm run push:dev         # Deploy to dev theme
npm run push:unpublished # Create new theme
npm run push:live        # Deploy to live (careful!)

# Management
npm run check            # Validate theme
npm run list             # List all themes
npm run share            # Get preview link

# Auth
npm run login            # Login to Shopify
npm run logout           # Logout
```

## Common Tasks

### Working on a Feature

```bash
# Create feature branch
git checkout -b feature/new-wholesale-section

# Start development
shopify theme dev

# Make changes, test in browser
# Commit when ready
git add .
git commit -m "Add new wholesale section"
git push origin feature/new-wholesale-section
```

### Testing Changes

```bash
# Deploy to test theme
shopify theme push --unpublished

# Note the theme ID from output
# Test on actual store

# When satisfied, merge to main
```

### Deploying to Production

```bash
# ALWAYS test first!
shopify theme push --unpublished

# Review on store
# If good, deploy to live
shopify theme push --live
```

## File Structure

```
italoil/
├── assets/           # Edit CSS, JS here
├── sections/         # Add/edit sections
├── templates/        # Modify page templates
├── snippets/         # Reusable code blocks
├── config/           # Theme settings
├── layout/           # Main layouts
└── locales/          # Translations
```

## Tips

- **Auto-sync**: Files sync automatically in dev mode
- **Hot reload**: Browser refreshes on changes
- **Test safely**: Use `--unpublished` or `--development` flags
- **Check first**: Run `shopify theme check` before deploying
- **Branch strategy**: Always work in feature branches

## Troubleshooting

**Authorization errors?**
- See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md#authorization-errors)
- Check for store name typos (itloil vs italoil)
- Use `.myshopify.com` domain format

**Dev server not syncing?**
```bash
# Stop (Ctrl+C) and restart
shopify theme dev
```

**Need to re-authenticate?**
```bash
shopify auth logout
shopify auth login
```

**Rate limited?**
```bash
# Wait 1 minute and try again
```

**For detailed troubleshooting**, see [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

## Full Documentation

- [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) - Common errors and solutions
- [SHOPIFY_CLI_GUIDE.md](./SHOPIFY_CLI_GUIDE.md) - Complete CLI docs
- [README_THEME.md](./README_THEME.md) - Theme architecture
- [INSTALLATION.md](./INSTALLATION.md) - Setup guide

---

🫒 **ITALOIL** - Happy coding!
