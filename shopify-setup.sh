#!/bin/bash

# ITALOIL Theme - Quick Start Script
# This script helps you get started with Shopify CLI development

set -e

echo "╔══════════════════════════════════════════════════════════════════════════╗"
echo "║                    🫒 ITALOIL Theme Setup 🫒                             ║"
echo "╚══════════════════════════════════════════════════════════════════════════╝"
echo ""

# Check if Shopify CLI is installed
if ! command -v shopify &> /dev/null; then
    echo "❌ Shopify CLI is not installed."
    echo ""
    echo "Would you like to install it now? (y/n)"
    read -r response
    
    if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
        echo ""
        echo "Installing Shopify CLI via npm..."
        npm install -g @shopify/cli @shopify/theme
        echo "✅ Shopify CLI installed successfully!"
    else
        echo ""
        echo "Please install Shopify CLI manually:"
        echo "  npm install -g @shopify/cli @shopify/theme"
        echo ""
        echo "Or see SHOPIFY_CLI_GUIDE.md for other installation methods."
        exit 1
    fi
fi

echo ""
echo "✅ Shopify CLI is installed"
echo ""

# Show Shopify CLI version
shopify version

echo ""
echo "═══════════════════════════════════════════════════════════════════════════"
echo ""
echo "What would you like to do?"
echo ""
echo "  1) Start development server (shopify theme dev)"
echo "  2) Deploy to development theme (shopify theme push --development)"
echo "  3) Deploy to unpublished theme (shopify theme push --unpublished)"
echo "  4) List all themes (shopify theme list)"
echo "  5) Check theme for issues (shopify theme check)"
echo "  6) Login to Shopify (shopify auth login)"
echo "  7) View full CLI guide"
echo "  8) Exit"
echo ""
read -p "Enter your choice (1-8): " choice

case $choice in
    1)
        echo ""
        echo "🚀 Starting development server..."
        echo "This will:"
        echo "  • Upload theme to development theme on your store"
        echo "  • Open preview URL in browser"
        echo "  • Watch for changes and auto-sync"
        echo ""
        shopify theme dev
        ;;
    2)
        echo ""
        echo "📦 Deploying to development theme..."
        shopify theme push --development
        ;;
    3)
        echo ""
        echo "📦 Creating new unpublished theme..."
        shopify theme push --unpublished
        ;;
    4)
        echo ""
        echo "📋 Listing all themes..."
        shopify theme list
        ;;
    5)
        echo ""
        echo "🔍 Checking theme for issues..."
        shopify theme check
        ;;
    6)
        echo ""
        echo "🔐 Logging in to Shopify..."
        shopify auth login
        ;;
    7)
        echo ""
        if command -v less &> /dev/null; then
            less SHOPIFY_CLI_GUIDE.md
        elif command -v more &> /dev/null; then
            more SHOPIFY_CLI_GUIDE.md
        else
            cat SHOPIFY_CLI_GUIDE.md
        fi
        ;;
    8)
        echo ""
        echo "👋 Goodbye!"
        exit 0
        ;;
    *)
        echo ""
        echo "❌ Invalid choice. Please run the script again."
        exit 1
        ;;
esac

echo ""
echo "═══════════════════════════════════════════════════════════════════════════"
echo ""
echo "✅ Done!"
echo ""
echo "For more information, see:"
echo "  • SHOPIFY_CLI_GUIDE.md - Complete CLI documentation"
echo "  • README.md - Project overview"
echo "  • INSTALLATION.md - Manual installation guide"
echo ""
echo "🫒 ITALOIL - From our family groves to your table"
echo ""
