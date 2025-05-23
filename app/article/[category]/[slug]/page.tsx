import fs from 'fs';
import path from 'path';
import { bundleMDX } from 'mdx-bundler';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import { ArticleContentWrapper } from './article-content-wrapper';
import { ArticleLoading } from './article-layout-client';

// Interface for page props (params comes from Next.js)
interface ArticlePageParams {
  category: string;
  slug: string;
}

interface ArticlePageProps {
  params: Promise<ArticlePageParams>;
}

const articlesDirectory = path.join(process.cwd(), 'content/software-articles');

async function getArticleData(category: string, slug: string) {
  const fullPath = path.join(articlesDirectory, category, `${slug}.mdx`);
  let fileContents;
  try {
    fileContents = fs.readFileSync(fullPath, 'utf8');
  } catch (err) {
    // If file not found, trigger a 404
    console.error(`Article not found for category: ${category}, slug: ${slug}`, err);
    return null; 
  }

  try {
    const { code, frontmatter } = await bundleMDX({
      source: fileContents,
      // Optional: if you have components in a specific directory for MDX
      // cwd: path.join(process.cwd(), 'components'), 
      mdxOptions(options, fm) {
        return options;
      },
      esbuildOptions: (options) => {
        options.loader = {
          ...options.loader,
          '.js': 'jsx',
          '.ts': 'tsx',
        };
        return options;
      },
    });
    return { slug, frontmatter, code };
  } catch (error) {
    console.error(`Error bundling MDX for category ${category}, slug ${slug}:`, error);
    // Depending on the error, you might want to throw it or return null/trigger notFound()
    return null; // Or throw error to be caught by Next.js error boundary
  }
}

// This is the Page Server Component
export default async function ArticlePage({ params }: ArticlePageProps) {
  const resolvedParams = await params;
  const articleData = await getArticleData(resolvedParams.category, resolvedParams.slug);

  if (!articleData || !articleData.code) {
    notFound(); // Trigger 404 if article data or code is missing
  }

  return (
    <Suspense fallback={<ArticleLoading />}>
      <ArticleContentWrapper 
        category={resolvedParams.category}
        slug={resolvedParams.slug} 
        frontmatter={articleData.frontmatter} 
        code={articleData.code} 
      />
    </Suspense>
  );
}

// Optional: Function to generate static paths if you want to pre-render articles at build time
export async function generateStaticParams() {
  try {
    const categories = fs.readdirSync(articlesDirectory);
    const params: { category: string; slug: string; }[] = [];
    
    for (const category of categories) {
      const categoryPath = path.join(articlesDirectory, category);
      const stat = fs.statSync(categoryPath);
      
      if (stat.isDirectory()) {
        const files = fs.readdirSync(categoryPath);
        const slugs = files
          .filter(file => file.endsWith('.mdx'))
          .map(file => file.replace(/\.mdx$/, ''));
        
        for (const slug of slugs) {
          params.push({ category, slug });
        }
      }
    }
    
    return params;
  } catch (error) {
    console.error("Error reading articles directory for generateStaticParams:", error);
    return []; // Return empty array on error
  }
}

// Optional: Add revalidate a la https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#on-demand-revalidation
export const revalidate = 3600; // Revalidate every hour, or choose your own value 