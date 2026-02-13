# Using Shopify CLI with ITALOIL Theme - Quick Answer

## The Answer to "How do I take this code and place it into Shopify CLI?"

It's now ready! Here's exactly what to do:

## 🚀 3 Simple Steps

### 1. Install Shopify CLI

```bash
npm install -g @shopify/cli @shopify/theme
```

### 2. Navigate to Theme Directory

```bash
cd /path/to/italoil
```

### 3. Start Development Server

```bash
shopify theme dev
```

**That's it!** The dev server will:
- Upload your theme to a development theme
- Open a preview URL in your browser
- Auto-sync changes as you edit files
- Hot-reload the browser when you save

## 📖 Full Documentation Available

All the documentation you need has been added to this repository:

### For Quick Start
- **DEVELOPMENT.md** - Daily workflow reference (read this first!)
- **shopify-setup.sh** - Interactive helper script

### For Complete Reference
- **SHOPIFY_CLI_GUIDE.md** - Everything about Shopify CLI (10,000+ words)
  - Installation options
  - All commands explained
  - Deployment strategies
  - Troubleshooting
  - Best practices
  - CI/CD examples

### Supporting Files
- **.shopifyignore** - Excludes docs from uploads
- **package.json** - npm scripts for convenience
- **README.md** - Updated with CLI info
- **INSTALLATION.md** - Manual + CLI options
- **QUICKSTART.md** - CLI as primary option

## 🎯 Common Commands

```bash
# Development
shopify theme dev                # Start dev server
shopify theme dev --store mystore  # Specify store

# Deploy
shopify theme push               # Interactive deploy
shopify theme push --development # Safe dev deploy
shopify theme push --unpublished # New theme
shopify theme push --live        # Production (careful!)

# Utilities
shopify theme list               # List all themes
shopify theme check              # Validate theme
shopify theme pull               # Download theme
shopify auth login               # Authenticate
```

## 📦 Optional: Using npm Scripts

If you want to use npm scripts:

```bash
# Install dependencies
npm install

# Use scripts
npm run dev              # shopify theme dev
npm run push:dev         # shopify theme push --development
npm run push:unpublished # shopify theme push --unpublished
npm run check            # shopify theme check
```

## 🛠️ Using the Interactive Helper

Run the setup script for a guided experience:

```bash
./shopify-setup.sh
```

This will:
1. Check if Shopify CLI is installed
2. Offer to install it if needed
3. Present a menu of common actions
4. Guide you through the process

## ✅ What Changed in the Repository

To enable Shopify CLI, I added:

1. **.shopifyignore** - Tells Shopify what not to upload
2. **SHOPIFY_CLI_GUIDE.md** - Complete documentation
3. **DEVELOPMENT.md** - Quick developer reference
4. **package.json** - Optional npm scripts
5. **shopify-setup.sh** - Interactive helper
6. Updated existing docs to reference CLI

## 🎓 Learning Path

1. **Start here**: Run `./shopify-setup.sh` or `shopify theme dev`
2. **Quick reference**: Read DEVELOPMENT.md
3. **Deep dive**: Read SHOPIFY_CLI_GUIDE.md when needed
4. **Deploy**: Use `shopify theme push --unpublished` to test

## 💡 Key Benefits Over Manual Upload

✅ **Instant feedback** - See changes in 0-2 seconds, not 2-5 minutes  
✅ **No ZIP files** - Work directly with your code  
✅ **Live reload** - Browser refreshes automatically  
✅ **Safe testing** - Development themes don't affect live site  
✅ **Team friendly** - Each developer gets their own preview  
✅ **Git friendly** - Works seamlessly with version control  

## 🆘 Need Help?

- **Quick questions**: Check DEVELOPMENT.md
- **CLI issues**: See SHOPIFY_CLI_GUIDE.md troubleshooting section
- **Theme questions**: Read README_THEME.md
- **Support**: Email italoil.store@gmail.com

---

## Summary

**Your theme is now ready for Shopify CLI development!**

Just run:
```bash
shopify theme dev
```

Everything else has been set up for you. Happy coding! 🫒
