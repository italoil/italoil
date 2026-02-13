# Shopify CLI Troubleshooting Guide for ITALOIL Theme

This guide helps you resolve common errors when using Shopify CLI with the ITALOIL theme.

## Table of Contents

- [Authorization Errors](#authorization-errors)
- [Authentication Errors](#authentication-errors)
- [Connection Errors](#connection-errors)
- [File Sync Errors](#file-sync-errors)
- [Theme Errors](#theme-errors)
- [Rate Limit Errors](#rate-limit-errors)
- [Getting Additional Help](#getting-additional-help)

---

## Authorization Errors

### ❌ "You are not authorized to use the CLI to develop in the provided store"

**Error Message:**
```
╭─ error ──────────────────────────────────────────────────────────────────╮
│  You are not authorized to use the CLI to develop in the provided store: │
│  your-store.myshopify.com                                                │
│                                                                          │
│  Next steps                                                              │
│    • Ensure you have logged in to the store using the Shopify admin     │
│      at least once.                                                      │
│    • Ensure you are the store owner, or have a staff account if you     │
│      are attempting to log in to a dev store.                           │
│    • Ensure you are using the permanent store domain, not a vanity      │
│      domain.                                                             │
╰──────────────────────────────────────────────────────────────────────────╯
```

#### What This Means

This error occurs when Shopify CLI cannot verify your permissions to develop on the store. There are several common causes:

#### Solution 1: Check Store Name for Typos

**Problem:** You may have a typo in your store name.

**Example:** The error shows "itloil.store.myshopify.com" but the correct name is "**ital**oil.store.myshopify.com"

**Fix:**
```bash
# Check what store you're trying to connect to
# Look for typos in the store name

# Use the correct store name:
shopify theme dev --store italoil.myshopify.com
# NOT: itloil.myshopify.com (missing 'a')
```

**Common typos to watch for:**
- itloil ❌ → italoil ✅
- italioil ❌ → italoil ✅
- italoil.store ❌ → italoil.myshopify.com ✅

#### Solution 2: Use Permanent Store Domain

**Problem:** You're using a custom/vanity domain instead of the permanent .myshopify.com domain.

**Fix:**
```bash
# WRONG - using custom domain:
shopify theme dev --store italoil.store

# CORRECT - using permanent .myshopify.com domain:
shopify theme dev --store italoil.myshopify.com
```

**How to find your permanent domain:**
1. Log in to your Shopify admin
2. Go to **Settings → Domains**
3. Look for "Primary domain" or ".myshopify.com" domain
4. Use the full `.myshopify.com` domain with Shopify CLI

**Example:**
- Custom domain: `italoil.store` ❌
- Permanent domain: `italoil.myshopify.com` ✅

#### Solution 3: Log In to Shopify Admin First

**Problem:** You haven't logged in to the store's Shopify admin at least once.

**Fix:**
1. Open your browser
2. Go to `https://italoil.myshopify.com/admin` (replace with your store)
3. Log in with your credentials
4. Browse around the admin (even just viewing the dashboard is enough)
5. Now try the CLI command again

**Why this matters:** Shopify needs to establish your session before CLI can authenticate.

#### Solution 4: Verify Your Permissions

**Problem:** You don't have sufficient permissions on the store.

**Required permissions:**
- **Store Owner** - Full access ✅
- **Staff Account** (for development stores) - Collaborator access ✅
- **Limited staff** - May not have CLI access ❌
- **No account** - Cannot access ❌

**Check your permissions:**
1. Log in to Shopify admin
2. Go to **Settings → Users and permissions**
3. Find your account
4. Verify you're listed as:
   - "Store owner" (best), OR
   - "Staff" with appropriate permissions

**If you don't have access:**
- Ask the store owner to add you as staff
- Request "Themes" permission at minimum
- For dev stores, you must be the store owner or have a staff account

#### Solution 5: Re-authenticate

**Problem:** Your authentication token is expired or invalid.

**Fix:**
```bash
# 1. Logout completely
shopify auth logout

# 2. Clear any cached credentials
rm -rf ~/.shopify

# 3. Login again
shopify auth login

# 4. Select the correct store when prompted
# 5. Try your command again
shopify theme dev
```

#### Solution 6: Development Store Specific

**Problem:** For Shopify Partner development stores, you need specific access.

**Requirements for dev stores:**
- Must be created through Shopify Partners
- You must be the creator/owner OR
- You must be added as a staff member

**Fix:**
1. Go to [partners.shopify.com](https://partners.shopify.com)
2. Check your development stores
3. Verify you have access to the store
4. If not, ask the partner account owner to add you

**Create your own dev store (recommended for testing):**
1. Sign up at [partners.shopify.com](https://partners.shopify.com) (free)
2. Click **Stores → Add store → Create development store**
3. Fill in details
4. Use this store for CLI development

#### Complete Authorization Fix Workflow

Try these steps in order:

```bash
# Step 1: Verify store name (check for typos!)
echo "My store name is: italoil.myshopify.com"
# Common typo: itloil (missing 'a')

# Step 2: Logout and clear credentials
shopify auth logout
rm -rf ~/.shopify

# Step 3: Login to Shopify admin first
# Open browser: https://italoil.myshopify.com/admin
# Login and browse around

# Step 4: Authenticate CLI
shopify auth login
# Follow browser prompts
# Select correct store when asked

# Step 5: Try development command with correct store name
shopify theme dev --store italoil.myshopify.com

# Step 6: If still failing, verify permissions
# Check Settings → Users in Shopify admin
```

---

## Authentication Errors

### ❌ "Not authenticated" error

**Error Message:**
```
Error: Not authenticated
```

**Solution:**
```bash
# Logout and login again
shopify auth logout
shopify auth login

# Follow browser prompts
# Select your store
# Try command again
```

**If browser doesn't open:**
```bash
# Get the authentication URL manually
shopify auth login --web

# Copy URL and paste in browser
# Complete authentication
```

---

## Connection Errors

### ❌ "Failed to connect to store"

**Possible causes:**
1. Internet connection issues
2. Store doesn't exist
3. Firewall blocking Shopify

**Solutions:**

**Check internet connection:**
```bash
# Test connection to Shopify
ping shopify.com

# Try accessing store in browser
open https://italoil.myshopify.com/admin
```

**Verify store exists:**
```bash
# List all accessible stores
shopify store list
```

**Check firewall:**
- Disable VPN temporarily
- Check corporate firewall settings
- Ensure ports 80 and 443 are open

---

## File Sync Errors

### ❌ Files not syncing during `shopify theme dev`

**Symptoms:**
- You edit a file
- Changes don't appear in browser
- No sync messages in terminal

**Solutions:**

**Solution 1: Restart dev server**
```bash
# Stop server (Ctrl+C)
# Start again
shopify theme dev
```

**Solution 2: Clear local config**
```bash
# Stop server
Ctrl+C

# Remove CLI cache
rm -rf .shopify/

# Restart
shopify theme dev
```

**Solution 3: Check file is not ignored**
```bash
# Check .shopifyignore
cat .shopifyignore

# Ensure your file isn't listed there
# Example: .md files ARE ignored (documentation)
# Example: .liquid files are NOT ignored
```

**Solution 4: Watch specific files**
```bash
# Only watch certain directories
shopify theme dev --only templates/,sections/

# Or exclude certain patterns
shopify theme dev --ignore config/
```

### ❌ "File upload failed"

**Solutions:**
1. Check file size (large images?)
2. Verify file format is supported
3. Check file path for special characters
4. Ensure file isn't locked by another program

---

## Theme Errors

### ❌ "Theme not found"

**Error:** Can't find theme with specified ID

**Solution:**
```bash
# List all themes on your store
shopify theme list

# Output shows:
# #123456789 [live] Dawn
# #987654321 [unpublished] Development

# Use correct theme ID
shopify theme pull --theme-id 123456789
```

### ❌ "Invalid theme structure"

**Error:** Theme doesn't follow Shopify structure

**Check required directories:**
```bash
# Verify structure
ls -la

# Must have:
# assets/
# config/
# layout/
# locales/
# sections/
# snippets/
# templates/
```

**Fix:**
```bash
# If directory missing, create it
mkdir -p assets config layout locales sections snippets templates
```

### ❌ Theme check errors

**Run theme checker:**
```bash
shopify theme check
```

**Common issues and fixes:**

**1. Missing alt text:**
```liquid
<!-- WRONG -->
<img src="{{ image.src }}">

<!-- CORRECT -->
<img src="{{ image.src }}" alt="{{ image.alt | escape }}">
```

**2. Large file sizes:**
```bash
# Compress images before uploading
# Keep assets under 5MB
```

**3. Deprecated Liquid:**
```bash
# Check Shopify's Liquid documentation
# Update to current syntax
```

---

## Rate Limit Errors

### ❌ "Too many requests" / Rate limited

**Error Message:**
```
Error: Too many requests. Please wait and try again.
```

**What this means:**
- Shopify has request limits
- You've made too many API calls too quickly
- Need to wait before retrying

**Solutions:**

**Wait and retry:**
```bash
# Wait 60 seconds
sleep 60

# Try again
shopify theme dev
```

**Reduce frequency:**
- Don't restart dev server constantly
- Avoid rapid file changes
- Let auto-sync handle updates

**Best practices:**
- Keep dev server running
- Make changes normally
- Let Shopify sync automatically
- Don't force-push repeatedly

---

## Common Error Quick Reference

| Error | Quick Fix |
|-------|-----------|
| Not authorized | Check store name for typos, use .myshopify.com domain |
| Not authenticated | `shopify auth logout && shopify auth login` |
| Theme not found | `shopify theme list` to see available themes |
| Files not syncing | Restart: Ctrl+C, then `shopify theme dev` |
| Rate limited | Wait 60 seconds, then try again |
| Connection failed | Check internet, verify store exists |

---

## Store Name Format Examples

**✅ CORRECT formats:**
```bash
shopify theme dev --store italoil.myshopify.com
shopify theme dev --store my-dev-store.myshopify.com
shopify theme dev --store store123.myshopify.com
```

**❌ WRONG formats:**
```bash
shopify theme dev --store italoil.store           # Custom domain won't work
shopify theme dev --store www.italoil.com         # Website URL won't work
shopify theme dev --store itloil.myshopify.com    # Typo: itloil vs italoil
shopify theme dev --store http://italoil.myshopify.com  # No http:// needed
```

---

## Debug Mode

**Enable verbose logging:**
```bash
# See detailed error messages
shopify theme dev --verbose

# Or set environment variable
DEBUG=* shopify theme dev
```

**Check configuration:**
```bash
# See current CLI configuration
shopify config get

# Check which store you're connected to
cat .shopify/config.yml 2>/dev/null || echo "No config found"
```

---

## Still Having Issues?

### Check Shopify Status

1. Visit [status.shopify.com](https://status.shopify.com)
2. Check if Shopify is experiencing issues
3. Look for API or theme-related incidents

### Get Help

**ITALOIL Theme Support:**
- Email: italoil.store@gmail.com
- Check: [GitHub Issues](https://github.com/italoil/italoil/issues)

**Shopify CLI Support:**
- Docs: [shopify.dev/docs/themes/tools/cli](https://shopify.dev/docs/themes/tools/cli)
- GitHub: [github.com/Shopify/cli](https://github.com/Shopify/cli)
- Community: [community.shopify.com](https://community.shopify.com)

**Before asking for help, gather:**
1. Exact error message (copy/paste)
2. Command you ran
3. Shopify CLI version: `shopify version`
4. Operating system
5. What you've already tried

---

## Prevention Tips

**✅ Best Practices to Avoid Errors:**

1. **Always use permanent domain**
   - Use `store.myshopify.com` format
   - Don't use custom domains with CLI

2. **Login to admin first**
   - Access Shopify admin in browser
   - Then use CLI commands

3. **Check permissions**
   - Verify you're store owner or staff
   - Ensure you have theme access

4. **Keep CLI updated**
   ```bash
   npm update -g @shopify/cli @shopify/theme
   ```

5. **One dev server at a time**
   - Don't run multiple `shopify theme dev`
   - Stop with Ctrl+C before starting new one

6. **Use development stores for testing**
   - Create free dev store via Shopify Partners
   - Test there before touching production

---

## Quick Troubleshooting Checklist

When you encounter an error, run through this checklist:

- [ ] Is the store name spelled correctly? (e.g., italoil not itloil)
- [ ] Am I using the `.myshopify.com` domain?
- [ ] Have I logged into the Shopify admin at least once?
- [ ] Am I the store owner or a staff member?
- [ ] Is my internet connection working?
- [ ] Have I tried logging out and back in?
- [ ] Is Shopify CLI up to date?
- [ ] Have I checked [status.shopify.com](https://status.shopify.com)?

---

**Last Updated:** February 2026

🫒 **ITALOIL** - Happy troubleshooting!
