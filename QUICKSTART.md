# Quick Start Guide - ITALOIL Shopify Theme

Get your ITALOIL e-commerce site up and running in 30 minutes.

## 📦 What's Included

This theme provides everything you need:
- ✅ Complete Shopify 2.0 theme
- ✅ Mobile-responsive Italian premium design
- ✅ Product pages with variant support
- ✅ Wholesale ordering page
- ✅ Harvest Club subscription page
- ✅ Visit Italy agritourism page
- ✅ Email capture integration
- ✅ SEO optimized

## 🚀 Setup Options

### Option A: Shopify CLI (Fastest - Recommended for Developers)

```bash
# Install Shopify CLI
npm install -g @shopify/cli @shopify/theme

# Clone repository
git clone https://github.com/italoil/italoil.git
cd italoil

# Start development server
shopify theme dev
```

**That's it!** Preview URL opens automatically. Changes sync live.

📚 **See [SHOPIFY_CLI_GUIDE.md](./SHOPIFY_CLI_GUIDE.md)** for complete CLI documentation.

### Option B: Manual Upload (Traditional - 30 minutes)

#### 1. Package the Theme (1 min)

```bash
# From your terminal in the theme directory
zip -r italoil-theme.zip . -x "*.git*" -x "*.DS_Store"
```

Or manually:
- Select all folders: `assets`, `config`, `layout`, `locales`, `sections`, `snippets`, `templates`
- Create a ZIP file named `italoil-theme.zip`

#### 2. Upload to Shopify (2 min)

1. Log in to your Shopify admin
2. Go to: **Online Store → Themes**
3. Click: **Add theme → Upload zip file**
4. Select your `italoil-theme.zip`
5. Wait for upload (usually 30-60 seconds)
6. Click **Publish** or **Customize**

#### 3. Basic Configuration (2 min)

Click **Customize** button:

1. **Theme Settings** (left sidebar)
   - Upload logo (if you have one)
   - Verify colors are correct
   - Add social media links

2. **Homepage**
   - Click Hero section → Update text
   - Click Brand Story → Add your story
   - Click Featured Products → Select collection

3. Click **Save**

## 📄 Create Essential Pages (10 min)

In Shopify admin, go to **Pages**:

### 1. Wholesale Page
```
Title: Wholesale
Template: page.wholesale
Content: Leave blank (template handles it)
✓ Save
```

### 2. Harvest Club Page
```
Title: Harvest Club
Template: page.harvest-club
Content: Leave blank
✓ Save
```

### 3. Visit Italy Page
```
Title: Visit Italy
Template: page.visit-italy
Content: Leave blank
✓ Save
```

### 4. About Page
```
Title: About ITALOIL
Template: page (default)
Content: Add your company story
✓ Save
```

## 🍾 Add Your First Product (10 min)

Go to **Products → Add product**:

```
Title: 
ITALOIL Premium Extra Virgin Olive Oil

Description:
Premium Italian extra virgin olive oil from our family groves 
in Lake Bolsena. DOP certified, organic, early harvest 2025. 
Handpicked and cold-pressed the same day for maximum freshness.

Price: €28.00

Variants:
✓ Click "Add variant"
  - Option name: Size
  - Values: 500ml, 250ml, 100ml
  
Set prices:
  - 500ml: €28.00
  - 250ml: €16.00  
  - 100ml: €9.00

Images:
✓ Upload product photos (at least 1)

Tags:
dop, organic, early-harvest

Collections:
✓ Add to "All products"
```

Click **Save**

## 🎨 Customize Your Site (5 min)

Back to **Themes → Customize**:

### Update Hero Section
- Title: "ITALOIL"
- Subtitle: "Premium Italian Extra Virgin Olive Oil from Lake Bolsena"
- Button 1: "Shop Now" → `/collections/all`
- Button 2: "Our Story" → `/pages/about`

### Update Brand Story
- Add 2-3 paragraphs about your family history
- Upload a photo of olive groves or family
- Button: "Learn More" → `/pages/about`

### Configure Newsletter
- Title: "Stay Connected"
- Description: "Subscribe for harvest updates and recipes"

Click **Save**

## 🔗 Set Up Navigation (2 min)

Go to **Navigation**:

### Main Menu
Create links:
1. Home → `/`
2. Shop → `/collections/all`
3. Wholesale → `/pages/wholesale`
4. Harvest Club → `/pages/harvest-club`
5. Visit Italy → `/pages/visit-italy`
6. About → `/pages/about`

### Footer Menu
Create links:
1. About Us
2. Contact → `/pages/contact`
3. Shipping Policy → `/policies/shipping-policy`
4. Privacy Policy → `/policies/privacy-policy`

## ✅ Final Checklist

Before going live:

- [ ] Logo uploaded
- [ ] Brand colors verified
- [ ] At least 3 products added
- [ ] All pages created
- [ ] Navigation menus set up
- [ ] Social media links added
- [ ] Test order placed
- [ ] Mobile view checked
- [ ] Contact email updated
- [ ] Theme published

## 🎯 Next Steps

### Immediate (First Week)
1. Add more products
2. Configure shipping rates
3. Set up payment methods
4. Write legal pages (privacy, terms, refund)
5. Set up email notifications
6. Create Instagram/Facebook pages

### Soon (First Month)
1. Set up Klaviyo for email marketing
2. Add Google Analytics
3. Create first blog post
4. Plan social media content
5. Set up Facebook/Instagram shopping
6. Create email templates

### Ongoing
1. Add new harvest information
2. Update seasonal content
3. Share recipes and cooking tips
4. Feature customer testimonials
5. Run promotions for Harvest Club
6. Blog about Italian food culture

## 📧 Email Integration (Optional)

### Klaviyo Setup
1. Create Klaviyo account (klaviyo.com)
2. Create a new list
3. Copy List ID
4. In Shopify: Themes → Customize → Theme Settings → Email
5. Paste Klaviyo List ID
6. Save

### Newsletter Form
- Newsletter section automatically uses Klaviyo if configured
- Falls back to Shopify customer form if not

## 🎨 Customization Tips

### Change Colors
Theme Settings → Colors:
- Primary: Deep green for headings/buttons
- Secondary: Cream for backgrounds
- Accent: Gold for highlights

### Change Fonts
Theme Settings → Typography:
- Headings: Serif font (elegant)
- Body: Sans-serif font (readable)

### Homepage Layout
In theme editor:
- Add sections with "+" button
- Reorder by dragging
- Remove with trash icon
- Each section has its own settings

## 🆘 Common Issues

**Products not showing?**
- Check product is published
- Verify assigned to collection
- Check product availability

**Page looks different on mobile?**
- This is normal - responsive design
- Test on real phone, not just browser resize

**Form not working?**
- Check email in Settings → Notifications
- Test with different email
- Check spam folder

**Images look blurry?**
- Upload high-res images (at least 1200px)
- Shopify will optimize automatically

## 📞 Get Help

**Theme Questions:**
italoil.store@gmail.com

**Shopify Support:**
help.shopify.com

**Documentation:**
- INSTALLATION.md (detailed guide)
- README_THEME.md (technical docs)

## 🎉 You're Ready!

Your ITALOIL e-commerce site is now live. Start selling premium Italian olive oil online!

Remember to:
- Update content regularly
- Respond to customer inquiries promptly
- Share your story on social media
- Celebrate each sale! 🫒

---

**ITALOIL** - From our family groves to your table

*Made with ❤️ for authentic Italian extra virgin olive oil*
