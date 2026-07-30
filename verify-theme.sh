#!/usr/bin/env bash

# ITALOIL Theme Verification Script
# Validates theme structure before using Shopify CLI

echo "🫒 ITALOIL Theme Verification"
echo "=============================="
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Counters
PASSED=0
FAILED=0
WARNINGS=0

# Function to print success
success() {
    echo -e "${GREEN}✓${NC} $1"
    ((PASSED++))
}

# Function to print error
error() {
    echo -e "${RED}✗${NC} $1"
    ((FAILED++))
}

# Function to print warning
warning() {
    echo -e "${YELLOW}⚠${NC} $1"
    ((WARNINGS++))
}

echo "Checking theme structure..."
echo ""

# Check required directories
echo "1. Checking required directories..."
REQUIRED_DIRS=("assets" "config" "layout" "locales" "sections" "snippets" "templates")
for dir in "${REQUIRED_DIRS[@]}"; do
    if [ -d "$dir" ]; then
        success "Directory exists: $dir"
    else
        error "Missing directory: $dir"
    fi
done
echo ""

# Check required files
echo "2. Checking required files..."
REQUIRED_FILES=(
    "layout/theme.liquid"
    "config/settings_schema.json"
    "locales/en.default.json"
)
for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$file" ]; then
        success "Required file exists: $file"
    else
        error "Missing required file: $file"
    fi
done
echo ""

# Check JSON validity
echo "3. Validating JSON files..."
JSON_VALID=true
shopt -s nullglob
for file in config/*.json templates/*.json locales/*.json; do
    if [ -f "$file" ]; then
        if python3 -m json.tool "$file" > /dev/null 2>&1; then
            success "Valid JSON: $file"
        else
            error "Invalid JSON: $file"
            JSON_VALID=false
        fi
    fi
done
shopt -u nullglob
echo ""

# Check for theme.liquid content
echo "4. Checking layout/theme.liquid..."
if [ -f "layout/theme.liquid" ]; then
    if grep -q "{{ content_for_header }}" layout/theme.liquid; then
        success "layout/theme.liquid contains {{ content_for_header }}"
    else
        error "layout/theme.liquid missing {{ content_for_header }}"
    fi
    
    if grep -q "{{ content_for_layout }}" layout/theme.liquid; then
        success "layout/theme.liquid contains {{ content_for_layout }}"
    else
        error "layout/theme.liquid missing {{ content_for_layout }}"
    fi
fi
echo ""

# Check for assets
echo "5. Checking assets..."
if [ -d "assets" ]; then
    shopt -s nullglob
    CSS_FILES=(assets/*.css)
    JS_FILES=(assets/*.js)
    CSS_COUNT=${#CSS_FILES[@]}
    JS_COUNT=${#JS_FILES[@]}
    shopt -u nullglob
    
    if [ "$CSS_COUNT" -gt 0 ]; then
        success "Found $CSS_COUNT CSS file(s)"
    else
        warning "No CSS files found in assets/"
    fi
    
    if [ "$JS_COUNT" -gt 0 ]; then
        success "Found $JS_COUNT JavaScript file(s)"
    else
        warning "No JavaScript files found in assets/"
    fi
fi
echo ""

# Check for sections
echo "6. Checking sections..."
if [ -d "sections" ]; then
    shopt -s nullglob
    SECTION_FILES=(sections/*.liquid)
    SECTION_COUNT=${#SECTION_FILES[@]}
    shopt -u nullglob
    if [ "$SECTION_COUNT" -gt 0 ]; then
        success "Found $SECTION_COUNT section file(s)"
    else
        warning "No section files found"
    fi
fi
echo ""

# Check for templates
echo "7. Checking templates..."
if [ -d "templates" ]; then
    shopt -s nullglob
    TEMPLATE_FILES=(templates/*.json templates/*.liquid)
    TEMPLATE_COUNT=${#TEMPLATE_FILES[@]}
    shopt -u nullglob
    if [ "$TEMPLATE_COUNT" -gt 0 ]; then
        success "Found $TEMPLATE_COUNT template file(s)"
        
        # Check for required templates
        if [ -f "templates/index.json" ] || [ -f "templates/index.liquid" ]; then
            success "Homepage template exists"
        else
            error "Missing homepage template (index.json or index.liquid)"
        fi
        
        if [ -f "templates/product.json" ] || [ -f "templates/product.liquid" ]; then
            success "Product template exists"
        else
            warning "No product template found"
        fi
    else
        error "No template files found"
    fi
fi
echo ""

# Check for .shopifyignore
echo "8. Checking optional files..."
if [ -f ".shopifyignore" ]; then
    success ".shopifyignore file exists"
else
    warning ".shopifyignore file not found (optional but recommended)"
fi

if [ -f "package.json" ]; then
    success "package.json exists"
else
    warning "package.json not found (optional)"
fi

if [ -f ".theme-check.yml" ]; then
    success ".theme-check.yml exists"
else
    warning ".theme-check.yml not found (optional)"
fi
echo ""

# Summary
echo "=============================="
echo "Verification Summary"
echo "=============================="
echo -e "${GREEN}Passed:${NC}   $PASSED"
if [ "$WARNINGS" -gt 0 ]; then
    echo -e "${YELLOW}Warnings:${NC} $WARNINGS"
fi
if [ "$FAILED" -gt 0 ]; then
    echo -e "${RED}Failed:${NC}   $FAILED"
fi
echo ""

if [ "$FAILED" -eq 0 ]; then
    echo -e "${GREEN}✓ Theme structure is valid!${NC}"
    echo ""
    echo "Your theme is ready for Shopify CLI."
    echo ""
    echo "Next steps:"
    echo "  1. Install Shopify CLI: npm install -g @shopify/cli @shopify/theme"
    echo "  2. Start development: shopify theme dev"
    echo "  3. Or deploy: shopify theme push"
    echo ""
    exit 0
else
    echo -e "${RED}✗ Theme validation failed${NC}"
    echo ""
    echo "Please fix the errors above before using Shopify CLI."
    echo ""
    exit 1
fi
