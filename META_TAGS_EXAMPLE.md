# Dynamic Meta Tags Example

This example demonstrates how to use the `useMeta` hook to add dynamic meta tags to your routes.

## Basic Usage

```tsx
import { createFileRoute } from "@tanstack/react-router";
import { useMeta } from "../shared/hooks/useMeta";

export const Route = createFileRoute("/my-route")({
  component: MyComponent,
});

function MyComponent() {
  useMeta({
    title: "My Page Title",
    description: "This is my page description",
  });

  return <div>My content</div>;
}
```

## Full Example with All Options

```tsx
import { createFileRoute } from "@tanstack/react-router";
import { useMeta } from "../shared/hooks/useMeta";

export const Route = createFileRoute("/products")({
  component: Products,
});

function Products() {
  useMeta({
    // Standard meta tags
    title: "Products - TanStack ERP",
    description: "Browse our product catalog",
    keywords: "products, catalog, ERP",
    author: "TanStack ERP Team",
    
    // Open Graph tags (Facebook, LinkedIn, Discord)
    ogTitle: "Product Catalog",
    ogDescription: "Browse our extensive product catalog",
    ogImage: "https://example.com/products-og.jpg",
    ogUrl: window.location.href,
    ogType: "website",
    ogSiteName: "TanStack ERP",
    
    // Twitter Card tags
    twitterCard: "summary_large_image",
    twitterTitle: "Product Catalog",
    twitterDescription: "Browse our extensive product catalog",
    twitterImage: "https://example.com/products-twitter.jpg",
    twitterSite: "@tanstackerp",
    twitterCreator: "@tanstackerp",
  });

  return (
    <div>
      <h1>Products</h1>
      {/* Your product list */}
    </div>
  );
}
```

## Using with Internationalization

```tsx
import { createFileRoute } from "@tanstack/react-router";
import { useIntl } from "react-intl";
import { useMeta } from "../shared/hooks/useMeta";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const intl = useIntl();

  useMeta({
    title: intl.formatMessage({ id: "dashboard.title" }),
    description: intl.formatMessage({ id: "dashboard.description" }),
    ogTitle: intl.formatMessage({ id: "dashboard.og.title" }),
    ogDescription: intl.formatMessage({ id: "dashboard.og.description" }),
  });

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}
```

## Tips

1. **Always set a title**: This improves SEO and user experience
2. **Use descriptive descriptions**: 150-160 characters is optimal for SEO
3. **Provide high-quality images**: Use 1200x630px for Open Graph images
4. **Use absolute URLs**: For images and URLs in meta tags
5. **Test your meta tags**: Use Facebook's Sharing Debugger and Twitter Card Validator

## Tools for Testing

- **Facebook Sharing Debugger**: https://developers.facebook.com/tools/debug/
- **Twitter Card Validator**: https://cards-dev.twitter.com/validator
- **LinkedIn Post Inspector**: https://www.linkedin.com/post-inspector/
