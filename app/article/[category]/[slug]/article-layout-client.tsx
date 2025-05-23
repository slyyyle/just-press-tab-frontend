"use client"

import React, { useMemo } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { getMDXComponent } from 'mdx-bundler/client';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible'

// Error boundary component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error('Error loading MDX content:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-card p-6 rounded-md border border-red-500 text-red-500">
          Error loading content. Please refresh the page.
        </div>
      );
    }

    return this.props.children;
  }
}

// Dynamic import for YouTubeEmbed
const YouTubeEmbed = dynamic(() => import('@/components/YouTubeEmbed'), {
  loading: () => <div className="w-full h-[315px] bg-muted animate-pulse rounded-md"></div>,
  ssr: false
});

// Dynamic MDX content wrapper
const MDXContentWrapper = dynamic(() => Promise.resolve(({ code }: { code: string }) => {
  const MDXContent = useMemo(() => getMDXComponent(code), [code]);
  return (
    <div className="bg-card p-6 rounded-md border border-[hsl(var(--primary))] text-lg text-[hsl(var(--platform))] space-y-6 prose prose-headings:text-red-500 prose-headings:font-press-start-2p prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-h4:text-base prose-h5:text-sm prose-h6:text-xs prose-p:text-[hsl(var(--platform))] prose-p:font-sans prose-strong:text-[hsl(var(--primary))] prose-strong:font-sans prose-a:text-[hsl(var(--accent))] prose-a:font-sans prose-a:hover:text-[hsl(var(--accent-hover))] prose-blockquote:border-[hsl(var(--primary))] prose-blockquote:font-sans prose-code:text-[hsl(var(--secondary))] prose-pre:bg-muted prose-pre:text-[hsl(var(--secondary-foreground))] prose-ul:text-[hsl(var(--platform))] prose-ul:font-sans prose-ol:text-[hsl(var(--platform))] prose-ol:font-sans prose-li:text-[hsl(var(--platform))] prose-li:font-sans max-w-none">
      <MDXContent components={{ Image, YouTubeEmbed, Accordion, AccordionItem, AccordionTrigger, AccordionContent, Collapsible, CollapsibleTrigger, CollapsibleContent }} />
    </div>
  );
}), {
  loading: () => <ArticleLoading />,
  ssr: false
});

interface ArticleContentProps {
  category: string;
  slug: string;
  frontmatter: { [key: string]: any };
  code: string;
}

export function ArticleContent({ category, slug, frontmatter, code }: ArticleContentProps) {
  const articleSlug = slug;

  const displayTitle = frontmatter.title || articleSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  const articleAuthor = frontmatter.author || "Kyle Hammitt";
  
  // Simple date formatting that avoids hydration mismatches
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };
  
  const articleDate = frontmatter.date ? formatDate(frontmatter.date) : "N/A";
  const articleCategory = frontmatter.category || 'software';

  return (
    <main className="min-h-screen bg-background py-16 px-4 software-theme">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-press-start-2p text-3xl mb-3 text-[hsl(var(--primary))]">
          {displayTitle}
        </h1>
        <div className="flex flex-row justify-between mb-6">
          <h2 className="font-vt323 text-xl text-[hsl(var(--platform))]">
            Author: {articleAuthor}
          </h2>
          <h2 className="font-vt323 text-xl text-[hsl(var(--platform))]">
            Date: {articleDate}
          </h2>
          <h2 className="font-vt323 text-xl text-[hsl(var(--platform))]">
            Category: {articleCategory}
          </h2>
        </div>
        
        <ErrorBoundary>
          <MDXContentWrapper code={code} />
        </ErrorBoundary>
      </div>
    </main>
  );
}

export function ArticleLoading() {
  return (
    <main className="min-h-screen bg-background py-16 px-4 software-theme">
      <div className="max-w-3xl mx-auto">
        <div className="h-10 w-24 bg-muted rounded animate-pulse mb-6"></div>
        <div className="h-12 bg-muted rounded animate-pulse mb-3 w-3/4"></div>
        <div className="flex flex-row justify-between mb-6">
          <div className="h-8 w-1/4 bg-muted rounded animate-pulse"></div>
          <div className="h-8 w-1/4 bg-muted rounded animate-pulse"></div>
          <div className="h-8 w-1/4 bg-muted rounded animate-pulse"></div>
        </div>
        <div className="bg-card p-6 rounded-md border border-[hsl(var(--primary))] space-y-6">
          <div className="h-8 bg-muted rounded animate-pulse w-1/2"></div>
          <div className="h-20 bg-muted rounded animate-pulse"></div>
          <div className="h-8 bg-muted rounded animate-pulse w-1/2"></div>
          <div className="h-20 bg-muted rounded animate-pulse"></div>
        </div>
      </div>
    </main>
  );
} 