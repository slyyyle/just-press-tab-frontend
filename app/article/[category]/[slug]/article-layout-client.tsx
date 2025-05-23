"use client"

import { useRouter } from 'next/navigation';
import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { getMDXComponent } from 'mdx-bundler/client';

// Dynamic import for YouTubeEmbed
const YouTubeEmbed = dynamic(() => import('@/components/YouTubeEmbed'), {
  loading: () => <div className="w-full h-[315px] bg-muted animate-pulse rounded-md"></div>,
  ssr: false
});

interface ArticleContentProps {
  category: string;
  slug: string;
  frontmatter: { [key: string]: any };
  code: string;
}

export function ArticleContent({ category, slug, frontmatter, code }: ArticleContentProps) {
  const router = useRouter();
  const articleSlug = slug;

  const displayTitle = frontmatter.title || articleSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  const articleAuthor = frontmatter.author || "Kyle Hammitt";
  const articleDate = frontmatter.date ? new Date(frontmatter.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : "N/A";
  const articleCategory = frontmatter.category || 'software';

  const isChatbotArticle = articleSlug === "wait-what-that-s-not-how-you-spell-chatbot";
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({});

  useEffect(() => {
    if (isChatbotArticle) {
      try {
        const savedState = localStorage.getItem('expandedSections_chatbot');
        if (savedState) {
          setExpandedSections(JSON.parse(savedState));
        } else {
          const initialState = {
            'intro': false, 'utility': false, 'language': false, 'decisions': false,
            'examples': false, 'roadMeeting': false, 'gini': false, 
            'highLevelPatterns': false, 'chatbots': false, 'conclusion': false
          };
          setExpandedSections(initialState);
          localStorage.setItem('expandedSections_chatbot', JSON.stringify(initialState));
        }
      } catch (error) {
        console.error("Error loading section states:", error);
        const initialState = { 
            'intro': false, 'utility': false, 'language': false, 'decisions': false,
            'examples': false, 'roadMeeting': false, 'gini': false, 
            'highLevelPatterns': false, 'chatbots': false, 'conclusion': false
        };
        setExpandedSections(initialState);
      }
    }
  }, [isChatbotArticle]);

  const toggleSection = (sectionId: string) => {
    if (isChatbotArticle) {
        setExpandedSections(prev => {
        const newState = { ...prev, [sectionId]: !prev[sectionId] };
        localStorage.setItem('expandedSections_chatbot', JSON.stringify(newState));
        return newState;
        });
    }
  };

  const CollapsibleHeader = ({ id, title }: { id: string, title: string }) => (
    <h2 
      className="text-2xl font-bold text-[hsl(var(--primary))] mb-2 mt-6 pt-4 pb-3 border-t border-b border-[hsl(var(--primary))] cursor-pointer flex justify-between items-center"
      onClick={() => toggleSection(id)}
    >
      {title}
      {isChatbotArticle && (
        <span className="text-xl">
          {expandedSections[id] ? '▼' : '►'}
        </span>
      )}
    </h2>
  );

  const MDXContent = useMemo(() => getMDXComponent(code), [code]);

  if (isChatbotArticle) {
    return (
      <main className="min-h-screen bg-background py-16 px-4 software-theme">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => router.back()}
            className="mb-6 px-4 py-2 bg-muted text-[hsl(var(--primary))] rounded font-vt323 hover:bg-primary/10 transition"
          >
            ← Back
          </button>
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
          
          <div className="bg-card p-6 rounded-md border border-[hsl(var(--primary))] font-vt323 text-lg text-[hsl(var(--platform))] space-y-6 prose prose-headings:text-[hsl(var(--primary))] prose-headings:font-press-start-2p prose-p:text-[hsl(var(--platform))] prose-p:font-sans prose-strong:text-[hsl(var(--primary))] prose-a:text-[hsl(var(--accent))] hover:prose-a:text-[hsl(var(--accent-hover))] prose-blockquote:border-[hsl(var(--primary))] prose-code:text-[hsl(var(--secondary))] prose-pre:bg-muted prose-pre:text-[hsl(var(--secondary-foreground))] prose-ul:text-[hsl(var(--platform))] prose-ul:font-sans prose-ol:text-[hsl(var(--platform))] prose-ol:font-sans prose-li:text-[hsl(var(--platform))] prose-li:font-sans">
            <MDXContent components={{ Image, YouTubeEmbed, CollapsibleHeader }} />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background py-16 px-4 software-theme">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => router.back()}
          className="mb-6 px-4 py-2 bg-muted text-[hsl(var(--primary))] rounded font-vt323 hover:bg-primary/10 transition"
        >
          ← Back
        </button>
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
        
        <div className="bg-card p-6 rounded-md border border-[hsl(var(--primary))] font-vt323 text-lg text-[hsl(var(--platform))] space-y-6 prose prose-headings:text-[hsl(var(--primary))] prose-headings:font-press-start-2p prose-p:text-[hsl(var(--platform))] prose-p:font-sans prose-strong:text-[hsl(var(--primary))] prose-a:text-[hsl(var(--accent))] hover:prose-a:text-[hsl(var(--accent-hover))] prose-blockquote:border-[hsl(var(--primary))] prose-code:text-[hsl(var(--secondary))] prose-pre:bg-muted prose-pre:text-[hsl(var(--secondary-foreground))] prose-ul:text-[hsl(var(--platform))] prose-ul:font-sans prose-ol:text-[hsl(var(--platform))] prose-ol:font-sans prose-li:text-[hsl(var(--platform))] prose-li:font-sans">
          <MDXContent components={{ Image, YouTubeEmbed, CollapsibleHeader }} />
        </div>
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