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
  slug: string;
}

interface ArticlePageProps {
  params: Promise<ArticlePageParams>;
}

const articlesDirectory = path.join(process.cwd(), 'content/software-articles');

async function getArticleData(slug: string) {
  const fullPath = path.join(articlesDirectory, `${slug}.mdx`);
  let fileContents;
  try {
    fileContents = fs.readFileSync(fullPath, 'utf8');
  } catch (err) {
    // If file not found, trigger a 404
    console.error(`Article not found for slug: ${slug}`, err);
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
    console.error(`Error bundling MDX for slug ${slug}:`, error);
    // Depending on the error, you might want to throw it or return null/trigger notFound()
    return null; // Or throw error to be caught by Next.js error boundary
  }
}

// This is the Page Server Component
export default async function ArticlePage({ params }: ArticlePageProps) {
  const resolvedParams = await params;
  const articleData = await getArticleData(resolvedParams.slug);

  if (!articleData || !articleData.code) {
    notFound(); // Trigger 404 if article data or code is missing
  }

  return (
    <Suspense fallback={<ArticleLoading />}>
      <ArticleContentWrapper 
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
    const files = fs.readdirSync(articlesDirectory);
    return files
      .filter(file => file.endsWith('.mdx'))
      .map(file => ({
        slug: file.replace(/\.mdx$/, ''),
      }));
  } catch (error) {
    console.error("Error reading articles directory for generateStaticParams:", error);
    return []; // Return empty array on error
  }
}

// Optional: Add revalidate a la https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#on-demand-revalidation
export const revalidate = 3600; // Revalidate every hour, or choose your own value 