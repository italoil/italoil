# Quick Fix: "Not Authorized" Error

## Your Error:

```
You are not authorized to use the CLI to develop in the provided store:
itloil.store.myshopify.com
```

## The Problem:

**Store name has a typo!**

You entered: `itloil.store` ❌  
Should be: `italoil.store` ✅ (notice the missing "a")

## The Fix:

Use the correct store name with `.myshopify.com`:

```bash
shopify theme dev --store italoil.myshopify.com
```

## Why This Happens:

The error means Shopify CLI can't find or access the store for one of these reasons:

1. **Typo in store name** ← Most common! (your case)
2. **Using custom domain instead of .myshopify.com**
3. **Not logged into Shopify admin first**
4. **Insufficient permissions** (not owner/staff)

## Complete Fix Steps:

```bash
# 1. Logout current session
shopify auth logout

# 2. Login again
shopify auth login

# 3. When prompted, enter CORRECT store name:
#    italoil.myshopify.com
#    (NOT itloil.myshopify.com)

# 4. Start development
shopify theme dev --store italoil.myshopify.com
```

## Common Store Name Mistakes:

```bash
# WRONG - typos
itloil.myshopify.com        ❌ (missing 'a')
italioil.myshopify.com      ❌ (extra 'i')

# WRONG - custom domain
italoil.store               ❌ (use .myshopify.com)
www.italoil.store           ❌ (use .myshopify.com)

# CORRECT
italoil.myshopify.com       ✅
```

## Need More Help?

See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md#authorization-errors) for:
- Complete authorization error solutions
- Permission issues
- Development store setup
- All other CLI errors

---

**Quick Answer:** Check your spelling! Use `italoil.myshopify.com` (not `itloil`)

🫒 **ITALOIL**
