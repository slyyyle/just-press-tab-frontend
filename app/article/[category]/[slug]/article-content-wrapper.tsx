"use client";
import dynamic from "next/dynamic";
import { ArticleContent } from './article-layout-client';

interface ArticleContentWrapperProps {
  category: string;
  slug: string;
  frontmatter: { [key: string]: any };
  code: string;
}

export function ArticleContentWrapper({ category, slug, frontmatter, code }: ArticleContentWrapperProps) {
  return (
    <ArticleContent 
      category={category}
      slug={slug} 
      frontmatter={frontmatter} 
      code={code} 
    />
  );
} 