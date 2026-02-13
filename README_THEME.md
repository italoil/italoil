# ITALOIL Shopify 2.0 Theme

Premium Italian extra virgin olive oil e-commerce theme for ITALOIL, a family-owned brand from Lake Bolsena.

## Features

### Core Features
- **Shopify 2.0 Architecture**: Modern section-based theme with JSON templates
- **Mobile-First Design**: Responsive layouts optimized for all devices
- **Italian Premium Aesthetic**: Deep green (#2C5530) and cream (#F5F1E8) color palette
- **SEO Optimized**: Meta tags, schema markup, and semantic HTML
- **Performance Focused**: Optimized images, minimal JavaScript, CSS best practices

### Pages & Templates

#### Homepage (`templates/index.json`)
- Hero section with brand messaging
- Brand story section highlighting Lake Bolsena heritage
- Featured products showcase
- Newsletter signup with Klaviyo integration

#### Product Pages (`templates/product.json`)
- Product variants (500ml, 250ml, 100ml sizes)
- Image gallery with thumbnails
- Add to cart functionality
- Product recommendations
- DOP certification display

#### Wholesale Page (`templates/page.wholesale.json`)
- Case pricing table for bulk orders
- Volume discounts
- Wholesale benefits showcase
- Contact form for wholesale inquiries

#### Harvest Club Page (`templates/page.harvest-club.json`)
- Subscription membership tiers (Starter, Premium, Elite)
- Benefits breakdown
- Member signup form
- Early harvest access information

#### Visit Italy Page (`templates/page.visit-italy.json`)
- Agritourism experience details
- Grove tours and oil tasting information
- Location and travel information
- Visit booking form

### Sections
- `header.liquid` - Sticky navigation with cart
- `footer.liquid` - Multi-column footer with social links
- `hero.liquid` - Full-width hero banner
- `brand-story.liquid` - Two-column brand narrative
- `featured-products.liquid` - Product grid
- `newsletter.liquid` - Email capture with Klaviyo support
- Plus specialized sections for wholesale, harvest club, and visit Italy pages

### Design System

#### Colors
- Primary (Deep Green): `#2C5530`
- Secondary (Cream): `#F5F1E8`
- Accent (Gold): `#C8A882`
- Text: `#333333`
- Background: `#FFFFFF`

#### Typography
- Headings: Playfair Display (serif)
- Body: Lato (sans-serif)
- Fluid typography with clamp() for responsive sizing

#### Components
- Buttons with hover effects
- Product cards with image zoom
- Form inputs with focus states
- Grid system (2-col, 3-col responsive)
- Price tables for wholesale

### Integrations

#### Klaviyo Email Marketing
- Newsletter subscription forms
- List ID configuration in theme settings
- Customer tagging support

#### SEO & Analytics
- Open Graph meta tags
- Twitter Card support
- Schema.org structured data
- Sitemap ready

## Installation

1. Create a new Shopify store or use existing
2. Upload theme files via Shopify admin:
   - Go to Online Store > Themes
   - Click "Add theme" > "Upload zip file"
   - Upload the theme package
3. Customize theme settings:
   - Set brand colors
   - Upload logo
   - Configure Klaviyo list ID
   - Add social media links
4. Create pages:
   - Create "Wholesale" page with template `page.wholesale`
   - Create "Harvest Club" page with template `page.harvest-club`
   - Create "Visit Italy" page with template `page.visit-italy`
5. Add products with appropriate tags (dop, new, organic)
6. Configure navigation menus

## Product Setup

### Required Product Information
- Title (e.g., "ITALOIL Premium 500ml")
- Description highlighting DOP, organic, early harvest
- Price in EUR (€)
- Variants for different sizes (500ml, 250ml, 100ml)
- High-quality product images
- Tags: `dop`, `organic`, `new` (for new harvest)

### Recommended Collections
- "All Products"
- "Olive Oils" (main collection)
- "Gift Sets"
- "New Harvest"

## Company Information

**ITALOIL** is a family-owned Italian extra virgin olive oil producer based around Lake Bolsena in the Lazio region of Italy. Key facts:

- **Location**: Lake Bolsena, Italy (100km NW of Rome)
- **Heritage**: Generations of family olive cultivation
- **Process**: Handpicked olives, same-day cold-pressing
- **Certifications**: DOP (Protected Designation of Origin), Organic
- **Philosophy**: No intermediaries, 100% control from grove to bottle
- **Sustainability**: Never treated with pesticides or chemicals
- **Contact**: italoil.store@gmail.com

## Customization

### Theme Settings
Access theme settings in Shopify admin under "Online Store > Themes > Customize"

Available settings:
- Brand colors
- Typography (font selection)
- Logo upload
- Product display options
- Klaviyo list ID
- Social media links

### Adding New Sections
Sections are modular and can be added/removed from JSON templates through the theme editor.

### Custom Code
- CSS: Edit `assets/base.css` and `assets/theme.css`
- JavaScript: Edit `assets/theme.js`
- Layouts: Modify `layout/theme.liquid`

## Support & Development

For questions or support:
- Email: italoil.store@gmail.com

## Credits

Developed for ITALOIL - Premium Italian Extra Virgin Olive Oil from Lake Bolsena

## License

Proprietary - © 2025 ITALOIL. All rights reserved.
