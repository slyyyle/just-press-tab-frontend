"use client";
import dynamic from "next/dynamic";

const ArticleContent = dynamic(
  () => import("./article-layout-client").then(mod => mod.ArticleContent),
  { ssr: false }
);

export function ArticleContentWrapper(props: any) {
  return <ArticleContent {...props} />;
} 