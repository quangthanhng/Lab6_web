// Mock data for blog posts
export const blogPosts = [
  {
    slug: 'hello-world',
    title: 'Hello World - Getting Started with Next.js',
    excerpt: 'Learn the basics of Next.js and how to create your first application with this powerful React framework.',
    content: `
# Hello World - Getting Started with Next.js

Next.js is a powerful React framework that enables you to build production-ready applications with features like server-side rendering, static site generation, and more.

## Why Next.js?

1. **Zero Configuration** - Next.js handles all the webpack, babel, and other configurations for you.
2. **Hybrid Rendering** - Choose between SSR, SSG, CSR, or ISR for each page.
3. **File-Based Routing** - Create routes by simply adding files to the pages or app directory.
4. **API Routes** - Build your API alongside your frontend in the same project.

## Getting Started

\`\`\`bash
npx create-next-app@latest my-app
cd my-app
npm run dev
\`\`\`

That's it! You now have a Next.js application running on http://localhost:3000.
    `,
    date: '2024-01-15',
    author: 'Lab 6 Team',
    readTime: '5 min read',
    category: 'Tutorial',
  },
  {
    slug: 'understanding-ssr',
    title: 'Understanding Server-Side Rendering',
    excerpt: 'Deep dive into how SSR works in Next.js and when you should use it for your applications.',
    content: `
# Understanding Server-Side Rendering

Server-Side Rendering (SSR) is a technique where the HTML content is generated on the server for each request.

## How SSR Works in Next.js

In Next.js Pages Router, you use \`getServerSideProps\` to enable SSR:

\`\`\`javascript
export async function getServerSideProps(context) {
  const data = await fetchDataFromAPI();
  return { props: { data } };
}
\`\`\`

In the App Router, components are Server Components by default, which render on the server.

## Benefits of SSR

- **SEO Friendly**: Search engines can crawl your content easily.
- **Fresh Data**: Content is always up-to-date on each request.
- **Personalization**: You can personalize content based on cookies or headers.

## Trade-offs

- Increased TTFB (Time to First Byte)
- Higher server load
- More complex caching strategies
    `,
    date: '2024-01-20',
    author: 'Lab 6 Team',
    readTime: '8 min read',
    category: 'Concepts',
  },
  {
    slug: 'static-generation-guide',
    title: 'Complete Guide to Static Site Generation',
    excerpt: 'Master SSG in Next.js to build lightning-fast websites that can be deployed to any CDN.',
    content: `
# Complete Guide to Static Site Generation

Static Site Generation (SSG) pre-renders pages at build time, resulting in the fastest possible performance.

## Using getStaticProps

\`\`\`javascript
export async function getStaticProps() {
  const posts = await getAllPosts();
  return {
    props: { posts },
    // Enable ISR with revalidation
    revalidate: 60
  };
}
\`\`\`

## Dynamic Routes with getStaticPaths

For dynamic routes, you need to specify which paths to pre-render:

\`\`\`javascript
export async function getStaticPaths() {
  const posts = await getAllPosts();
  const paths = posts.map(post => ({
    params: { slug: post.slug }
  }));
  return { paths, fallback: 'blocking' };
}
\`\`\`

## Fallback Strategies

- **false**: Only pre-rendered paths are valid
- **true**: Show loading state while generating
- **'blocking'**: Wait for generation on first request
    `,
    date: '2024-02-05',
    author: 'Lab 6 Team',
    readTime: '10 min read',
    category: 'Tutorial',
  },
  {
    slug: 'isr-explained',
    title: 'Incremental Static Regeneration Explained',
    excerpt: 'Learn how ISR combines the best of static generation with the ability to update content without rebuilding.',
    content: `
# Incremental Static Regeneration Explained

ISR allows you to update static pages after you've built your site, without needing to rebuild the entire site.

## How ISR Works

1. Initial build generates static pages
2. Pages are served from cache
3. After revalidate period, Next.js regenerates in background
4. New version replaces old cached version

## Configuration

\`\`\`javascript
export async function getStaticProps() {
  const products = await getProducts();
  return {
    props: { products },
    revalidate: 60 // Regenerate every 60 seconds
  };
}
\`\`\`

## On-Demand Revalidation

You can also trigger revalidation programmatically:

\`\`\`javascript
// pages/api/revalidate.js
export default async function handler(req, res) {
  await res.revalidate('/products');
  return res.json({ revalidated: true });
}
\`\`\`

This is perfect for CMS webhooks!
    `,
    date: '2024-02-10',
    author: 'Lab 6 Team',
    readTime: '7 min read',
    category: 'Advanced',
  },
];

// Mock data for products
export const products = [
  { id: '1', name: 'Next.js Masterclass', price: 99.99, description: 'Complete course on Next.js', image: 'NX', category: 'Course', rating: 4.9 },
  { id: '2', name: 'React Server Components', price: 79.99, description: 'Deep dive into RSC', image: 'RS', category: 'Course', rating: 4.8 },
  { id: '3', name: 'Full-Stack Template', price: 49.99, description: 'Production-ready starter', image: 'FS', category: 'Template', rating: 4.7 },
  { id: '4', name: 'E-commerce Starter', price: 149.99, description: 'Complete e-commerce solution', image: 'EC', category: 'Template', rating: 4.9 },
  { id: '5', name: 'Dashboard Pro', price: 89.99, description: 'Admin dashboard template', image: 'DP', category: 'Template', rating: 4.6 },
  { id: '6', name: 'API Design Patterns', price: 59.99, description: 'Best practices for APIs', image: 'AP', category: 'Course', rating: 4.8 },
];

// Mock documentation structure
export const docsSections = {
  'introduction': {
    title: 'Introduction',
    content: 'Welcome to the Next.js Lab 6 documentation. This guide will walk you through all the concepts covered in Module 6.',
  },
  'getting-started': {
    title: 'Getting Started',
    content: 'Learn how to set up your Next.js project and understand the project structure.',
    subsections: {
      'installation': {
        title: 'Installation',
        content: 'Run npx create-next-app@latest to create a new Next.js project.',
      },
      'project-structure': {
        title: 'Project Structure',
        content: 'Next.js uses a file-based routing system. The app/ directory contains your routes.',
      },
    },
  },
  'rendering': {
    title: 'Rendering Strategies',
    content: 'Next.js supports multiple rendering strategies: CSR, SSR, SSG, and ISR.',
    subsections: {
      'csr': { title: 'Client-Side Rendering', content: 'CSR renders content in the browser using JavaScript.' },
      'ssr': { title: 'Server-Side Rendering', content: 'SSR generates HTML on each request.' },
      'ssg': { title: 'Static Site Generation', content: 'SSG pre-renders pages at build time.' },
      'isr': { title: 'Incremental Static Regeneration', content: 'ISR updates static pages after deployment.' },
    },
  },
};

// Helper functions
export function getBlogPost(slug) {
  return blogPosts.find(post => post.slug === slug);
}

export function getAllBlogPosts() {
  return blogPosts;
}

export function getProduct(id) {
  return products.find(product => product.id === id);
}

export function getAllProducts() {
  return products;
}
