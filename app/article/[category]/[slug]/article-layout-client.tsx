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
  
  // Simple date formatting that avoids hydration mismatches
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };
  
  const articleDate = frontmatter.date ? formatDate(frontmatter.date) : "N/A";
  const articleCategory = frontmatter.category || 'software';

  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({});

  useEffect(() => {
    try {
      const savedState = localStorage.getItem(`expandedSections_${articleSlug}`);
      if (savedState) {
        setExpandedSections(JSON.parse(savedState));
      } else {
        // Default all sections to expanded for better UX
        const initialState = {
          'intro': true, 'utility': true, 'language': true, 'decisions': true,
          'examples': true, 'roadMeeting': true, 'gini': true, 
          'highLevelPatterns': true, 'chatbots': true, 'conclusion': true
        };
        setExpandedSections(initialState);
        localStorage.setItem(`expandedSections_${articleSlug}`, JSON.stringify(initialState));
      }
    } catch (error) {
      console.error("Error loading section states:", error);
      const initialState = { 
          'intro': true, 'utility': true, 'language': true, 'decisions': true,
          'examples': true, 'roadMeeting': true, 'gini': true, 
          'highLevelPatterns': true, 'chatbots': true, 'conclusion': true
      };
      setExpandedSections(initialState);
    }
  }, [articleSlug]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => {
      const currentState = prev[sectionId] !== undefined ? prev[sectionId] : true;
      const newState = { ...prev, [sectionId]: !currentState };
      localStorage.setItem(`expandedSections_${articleSlug}`, JSON.stringify(newState));
      return newState;
    });
  };

  const CollapsibleHeader = ({ id, title }: { id: string, title: string }) => {
    const isExpanded = expandedSections[id] !== undefined ? expandedSections[id] : true;
    return (
      <div className="relative -mx-6 my-6">
        <div className="absolute inset-x-0 top-0 border-t border-[hsl(var(--primary))]"></div>
        <div className="absolute inset-x-0 bottom-0 border-b border-[hsl(var(--primary))]"></div>
        <h2 
          className="text-sm font-bold text-[hsl(var(--primary))] py-4 px-6 cursor-pointer flex justify-between items-center font-press-start-2p scale-90 transform origin-left bg-card"
          style={{ fontSize: '12px' }}
          onClick={() => toggleSection(id)}
        >
          {title}
          <span className="text-xs" style={{ fontSize: '10px' }}>
            {isExpanded ? '▼' : '►'}
          </span>
        </h2>
      </div>
    );
  };

  // Simple component to wrap content that should be collapsible
  const CollapsibleContent = ({ sectionId, children }: { sectionId: string, children: React.ReactNode }) => {
    const isExpanded = expandedSections[sectionId] !== undefined ? expandedSections[sectionId] : true;
    return (
      <div className={`transition-all duration-300 overflow-hidden ${isExpanded ? 'max-h-none opacity-100' : 'max-h-0 opacity-0'}`}>
        {children}
      </div>
    );
  };

  // For the chatbot article, we need to track which section content should be shown
  const ChatbotAwareWrapper = ({ children }: { children: React.ReactNode }) => {
    return <>{children}</>;
  };

  const CollapsibleSection = ({ id, title, children }: { id: string, title: string, children: React.ReactNode }) => {
    const isExpanded = expandedSections[id] !== undefined ? expandedSections[id] : true;
    return (
      <div className="my-6">
        <div className="relative -mx-6">
          <div className="absolute inset-x-0 top-0 border-t border-[hsl(var(--primary))]"></div>
          <div className="absolute inset-x-0 bottom-0 border-b border-[hsl(var(--primary))]"></div>
          <h2 
            className="text-sm font-bold text-[hsl(var(--primary))] py-4 px-6 cursor-pointer flex justify-between items-center font-press-start-2p scale-90 transform origin-left bg-card"
            style={{ fontSize: '12px' }}
            onClick={() => toggleSection(id)}
          >
            {title}
            <span className="text-xs" style={{ fontSize: '10px' }}>
              {isExpanded ? '▼' : '►'}
            </span>
          </h2>
        </div>
        {isExpanded && (
          <div className="mt-4">
            {children}
          </div>
        )}
      </div>
    );
  };

  const MDXContent = useMemo(() => getMDXComponent(code), [code]);

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
        
        <div className="bg-card p-6 rounded-md border border-[hsl(var(--primary))] text-lg text-[hsl(var(--platform))] space-y-6 prose prose-headings:text-[hsl(var(--primary))] prose-headings:font-press-start-2p prose-h1:text-sm prose-h2:text-xs prose-h3:text-xs prose-h4:text-xs prose-h5:text-xs prose-h6:text-xs prose-p:text-[hsl(var(--platform))] prose-p:font-sans prose-strong:text-[hsl(var(--primary))] prose-strong:font-sans prose-a:text-[hsl(var(--accent))] prose-a:font-sans hover:prose-a:text-[hsl(var(--accent-hover))] prose-blockquote:border-[hsl(var(--primary))] prose-blockquote:font-sans prose-code:text-[hsl(var(--secondary))] prose-pre:bg-muted prose-pre:text-[hsl(var(--secondary-foreground))] prose-ul:text-[hsl(var(--platform))] prose-ul:font-sans prose-ol:text-[hsl(var(--platform))] prose-ol:font-sans prose-li:text-[hsl(var(--platform))] prose-li:font-sans">
          <ChatbotAwareWrapper>
            <MDXContent components={{ Image, YouTubeEmbed, CollapsibleHeader, CollapsibleSection, CollapsibleContent }} />
          </ChatbotAwareWrapper>
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