# ITALOIL Shopify Theme - Installation Guide

Complete step-by-step guide to installing and configuring the ITALOIL Shopify 2.0 theme.

## Prerequisites

- Active Shopify store
- Admin access to your Shopify store
- Basic familiarity with Shopify admin interface

## Step 1: Theme Installation

### Option A: Upload via Shopify Admin (Recommended)

1. **Package the theme**
   - Download all theme files from this repository
   - Create a ZIP file of the entire theme directory (not including .git folder)
   - Ensure the ZIP contains: `assets/`, `config/`, `layout/`, `locales/`, `sections/`, `snippets/`, `templates/`

2. **Upload to Shopify**
   - Log in to your Shopify admin
   - Navigate to **Online Store > Themes**
   - Click **Add theme** button
   - Select **Upload zip file**
   - Upload your theme ZIP file
   - Wait for upload to complete

3. **Activate the theme**
   - Once uploaded, click **Publish** to make it your live theme
   - OR click **Customize** to edit before publishing

### Option B: Using Shopify CLI (Recommended for Development)

For a better development experience with live reload and hot reloading:

```bash
# Install Shopify CLI
npm install -g @shopify/cli @shopify/theme

# Navigate to theme directory
cd path/to/italoil-theme

# Start development server (recommended)
shopify theme dev

# Or deploy to development theme
shopify theme push --development

# Or deploy to unpublished theme
shopify theme push --unpublished
```

**See [SHOPIFY_CLI_GUIDE.md](./SHOPIFY_CLI_GUIDE.md) for complete Shopify CLI documentation**, including:
- Installation options
- Development workflow
- Deployment commands
- Troubleshooting
- Best practices

## Step 2: Theme Configuration

### Basic Settings

1. **Navigate to Theme Editor**
   - Go to **Online Store > Themes**
   - Click **Customize** on the ITALOIL theme

2. **Configure Colors**
   - In the theme editor sidebar, click **Theme settings**
   - Go to **Colors** section
   - Verify brand colors are set:
     - Primary (Deep Green): `#2C5530`
     - Secondary (Cream): `#F5F1E8`
     - Accent (Gold): `#C8A882`

3. **Upload Logo**
   - In Theme settings > **Logo**
   - Upload your ITALOIL logo image
   - Recommended size: 200-300px wide, transparent PNG

4. **Configure Typography**
   - In Theme settings > **Typography**
   - Heading Font: Playfair Display (or similar serif)
   - Body Font: Lato (or similar sans-serif)

### Email Integration (Klaviyo)

1. **Get Klaviyo List ID**
   - Log in to your Klaviyo account
   - Create a new list for newsletter subscribers
   - Copy the List ID

2. **Add to Theme Settings**
   - In Theme settings > **Email & Newsletter**
   - Paste your Klaviyo List ID
   - Enable newsletter signup

### Social Media Links

1. **In Theme Settings > Social Media**
   - Add your Facebook page URL
   - Add your Instagram profile URL
   - Add your Pinterest profile URL (optional)

### Navigation Menus

1. **Create Main Menu**
   - Go to **Navigation** in Shopify admin
   - Create/edit "Main menu" with links:
     - Home
     - Shop (link to /collections/all)
     - Wholesale (link to /pages/wholesale)
     - Harvest Club (link to /pages/harvest-club)
     - Visit Italy (link to /pages/visit-italy)
     - About (link to /pages/about)

2. **Create Footer Menu**
   - Create "Footer" menu with links:
     - About Us
     - Contact
     - Shipping Policy
     - Refund Policy
     - Privacy Policy
     - Terms of Service

## Step 3: Create Pages

### About Page
1. Go to **Pages > Add page**
2. Title: "About ITALOIL"
3. Content: Add your company story
4. Template: page (default)
5. Save

### Wholesale Page
1. **Pages > Add page**
2. Title: "Wholesale"
3. Template: Select **page.wholesale** from dropdown
4. Content: Can be left blank (template handles layout)
5. Save

### Harvest Club Page
1. **Pages > Add page**
2. Title: "Harvest Club"
3. Template: Select **page.harvest-club**
4. Content: Can be left blank
5. Save

### Visit Italy Page
1. **Pages > Add page**
2. Title: "Visit Italy"
3. Template: Select **page.visit-italy**
4. Content: Can be left blank
5. Save

## Step 4: Add Products

### Product Information Structure

For each product, include:

**Basic Info:**
- Title: e.g., "ITALOIL Premium Extra Virgin Olive Oil - 500ml"
- Description: Highlight DOP, organic, early harvest, Lake Bolsena origin
- Price: Set in EUR (€)

**Variants:**
Create variants for different sizes:
- 500ml - €28.00
- 250ml - €16.00
- 100ml - €9.00

**Images:**
- Add high-quality product photos
- Minimum 1200x1200px
- Show bottle, label, packaging

**Tags:**
Add relevant tags:
- `dop` - For DOP certified products
- `organic` - For organic certification
- `new` - For new harvest
- `early-harvest` - For early harvest oils

**Collections:**
Assign to appropriate collections:
- All Products
- Olive Oils
- New Harvest (seasonal)

### Example Product Setup

```
Title: ITALOIL Premium Extra Virgin Olive Oil - 500ml
Description: 
"Premium Italian extra virgin olive oil from our family groves in Lake Bolsena. 
DOP certified, organic, early harvest 2025. Handpicked and cold-pressed the same 
day for maximum freshness and flavor. Perfect for drizzling, cooking, or gifting."

Price: €28.00
Compare at price: (leave blank unless on sale)

Variants:
- Size: 500ml | Price: €28.00 | SKU: ITALOIL-500
- Size: 250ml | Price: €16.00 | SKU: ITALOIL-250
- Size: 100ml | Price: €9.00 | SKU: ITALOIL-100

Tags: dop, organic, early-harvest, lake-bolsena
```

## Step 5: Homepage Configuration

1. **Navigate to Theme Editor**
   - Online Store > Themes > Customize

2. **Homepage Sections**
   The homepage template includes:
   - **Hero Section**: Update title, subtitle, button links
   - **Brand Story**: Add your family history and images
   - **Featured Products**: Select your main collection
   - **Newsletter**: Customize messaging

3. **Customize Each Section**
   - Click on each section in the editor
   - Update text, images, links
   - Rearrange sections by dragging
   - Add/remove sections as needed

## Step 6: Configure Wholesale Settings

The wholesale page template is pre-configured but can be customized:

1. **Update Pricing**
   - In theme editor, go to Wholesale page
   - Click on "Wholesale Pricing Table" section
   - Update prices per bottle and case prices
   - Adjust volume discount tiers

2. **Update Contact Email**
   - Ensure italoil.store@gmail.com is correct
   - Or update in the section settings

## Step 7: Configure Harvest Club

1. **Update Membership Tiers**
   - Go to Harvest Club page in theme editor
   - Click "Harvest Club Options" section
   - Adjust pricing for Starter/Premium/Elite tiers
   - Update benefits as needed

2. **Test Signup Form**
   - Forms submit to Shopify contact form
   - Check **Settings > Notifications** for email notifications

## Step 8: Final Checks

### Test All Features

- [ ] Navigation works on desktop and mobile
- [ ] Products display correctly with all variants
- [ ] Add to cart functionality works
- [ ] Cart page displays and updates correctly
- [ ] Checkout process works
- [ ] All custom pages load properly
- [ ] Forms submit successfully
- [ ] Search functionality works
- [ ] Newsletter signup works
- [ ] Mobile responsiveness across devices

### SEO Optimization

1. **Edit Meta Descriptions**
   - Homepage: Online Store > Preferences
   - Products: Edit each product > Search engine listing
   - Pages: Edit each page > Search engine listing

2. **Add Alt Text to Images**
   - Go through all product images
   - Add descriptive alt text

3. **Set Up Blog (Optional)**
   - Create blog for content marketing
   - Write about olive oil, recipes, Italian culture

### Performance

1. **Optimize Images**
   - Compress all images before uploading
   - Use modern formats (WebP when possible)
   - Shopify automatically optimizes on delivery

2. **Test Page Speed**
   - Use Google PageSpeed Insights
   - Test on mobile and desktop

## Step 9: Launch Checklist

Before going live:

- [ ] All products added with complete information
- [ ] All pages created and content added
- [ ] Navigation menus configured
- [ ] Theme settings completed (colors, logo, fonts)
- [ ] Klaviyo integration tested
- [ ] Social media links added
- [ ] Legal pages created (Privacy, Terms, Refund Policy)
- [ ] Contact page or form working
- [ ] Shipping rates configured
- [ ] Payment methods enabled
- [ ] Test order placed successfully
- [ ] Mobile experience tested
- [ ] Email notifications configured
- [ ] Google Analytics connected (optional)

## Ongoing Maintenance

### Regular Updates

- Update seasonal content (harvest information)
- Add new products as they become available
- Refresh homepage hero image periodically
- Update blog with recipes and stories
- Monitor and respond to customer inquiries

### Backup

- Shopify automatically backs up your store
- Consider downloading theme files periodically
- Keep repository updated with any custom changes

## Support

For theme-related questions:
- Email: italoil.store@gmail.com
- Documentation: See README_THEME.md

For Shopify support:
- Shopify Help Center: help.shopify.com
- Shopify Community: community.shopify.com

## Troubleshooting

### Theme Not Showing Correctly
- Clear browser cache
- Check if theme is published
- Verify all files uploaded correctly

### Products Not Displaying
- Check product visibility settings
- Ensure products assigned to correct collection
- Verify product availability

### Forms Not Working
- Check spam folder for notifications
- Verify email settings in Shopify admin
- Test with different email addresses

### Mobile Issues
- Test on actual devices, not just browser resize
- Check viewport meta tag in theme.liquid
- Verify responsive CSS is loading

---

## Quick Reference

### Key File Locations

```
/assets/          - CSS, JS, images
/config/          - Theme settings
/layout/          - Main layout files
/sections/        - Reusable sections
/templates/       - Page templates
/snippets/        - Small reusable code blocks
```

### Important URLs

```
Homepage:         /
Products:         /collections/all
Wholesale:        /pages/wholesale
Harvest Club:     /pages/harvest-club
Visit Italy:      /pages/visit-italy
Cart:             /cart
Search:           /search
```

### Contact

**ITALOIL**
Email: italoil.store@gmail.com
Website: italoil.store

---

*Last updated: February 2026*
