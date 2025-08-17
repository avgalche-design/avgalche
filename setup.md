# Setup Guide for AV GaLche

## Environment Variables Setup

### Local Development

1. Create a `.env.local` file in the root directory
2. Add the following variables:

```bash
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-storefront-access-token
```

### Getting Shopify Credentials

1. Go to your Shopify admin panel
2. Navigate to Settings > Apps and sales channels > Develop apps
3. Create a new app or use an existing one
4. Configure the Storefront API with the following permissions:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_read_product_inventory`
   - `unauthenticated_read_product_tags`
   - `unauthenticated_read_selling_plans`
   - `unauthenticated_read_product_pickup_locations`
   - `unauthenticated_read_shipping`
   - `unauthenticated_read_cart`
   - `unauthenticated_write_cart`
5. Install the app in your store
6. Copy the store domain and access token

### Vercel Deployment

1. Go to your Vercel project dashboard
2. Navigate to Settings > Environment Variables
3. Add the following variables:
   - `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` = your-store.myshopify.com
   - `SHOPIFY_STOREFRONT_ACCESS_TOKEN` = your-storefront-access-token
4. Redeploy your application

### Troubleshooting

#### "Shopify fetch failed: Unauthorized" Error
- Check that your `SHOPIFY_STOREFRONT_ACCESS_TOKEN` is correct
- Ensure the app has the necessary Storefront API permissions
- Verify the token hasn't expired

#### "Shopify fetch failed: Not Found" Error
- Check that your `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` is correct
- Ensure the domain format is: `your-store.myshopify.com` (not `https://your-store.myshopify.com`)

#### Build Errors on Vercel
- Make sure all environment variables are set in Vercel
- Check that the Shopify app is properly installed and configured
- Verify the API permissions are correct

## Features Fixed

1. **Search Functionality**: Now properly uses SearchContext instead of local state
2. **Error Handling**: Improved error messages for Shopify API issues
3. **Environment Validation**: Better validation of required environment variables
