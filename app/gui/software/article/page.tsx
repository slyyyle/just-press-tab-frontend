"use client"
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import { slugify } from '@/lib/slugify';
import dynamic from 'next/dynamic';

// Create dynamic components for heavy media
const YouTubeEmbed = dynamic(() => import('@/components/YouTubeEmbed'), {
  loading: () => <div className="w-full h-[315px] bg-muted animate-pulse rounded-md"></div>,
  ssr: false
});

// Create a client component that uses useSearchParams
function ArticleContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get query parameters
  const parent = searchParams.get('parent') || '';
  
  // Get the clean title from URL (used for identification)
  const urlTitle = searchParams.get('title') || '';
  
  // Define known articles with their proper titles
  const knownArticles: Record<string, string> = {
    "wait-what-that-s-not-how-you-spell-chatbot": "Wait what? That's not how you spell chatbot!",
    "rag-and-cot-the-dynamic-duo": "RAG & CoT: The Dynamic Duo",
    "modeling-chains-of-thought-after-how-i-solve-problems": "Modeling Chains of Thought After How I Solve Problems"
  };

  // Get the display title from the mapping or fallback to URL title
  const displayTitle = knownArticles[urlTitle] || urlTitle.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  
  // Generate slug from title for internal use if needed
  const slugifiedTitle = urlTitle ? slugify(urlTitle) : '';
  
  // Determine if this is the chatbot article
  const isChatbotArticle = urlTitle === "wait-what-that-s-not-how-you-spell-chatbot";

  // State to track which sections are expanded
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({});

  // Initialize all sections as collapsed on first render
  useEffect(() => {
    if (isChatbotArticle) {
      // Get saved state from localStorage or default to all collapsed
      try {
        const savedState = localStorage.getItem('expandedSections');
        if (savedState) {
          setExpandedSections(JSON.parse(savedState));
        } else {
          const initialState = {
            'intro': false,
            'utility': false,
            'language': false,
            'decisions': false,
            'examples': false,
            'roadMeeting': false,
            'gini': false,
            'highLevelPatterns': false,
            'chatbots': false,
            'conclusion': false
          };
          setExpandedSections(initialState);
          localStorage.setItem('expandedSections', JSON.stringify(initialState));
        }
      } catch (error) {
        console.error("Error loading section states:", error);
        // Fall back to all collapsed
        const initialState = {
          'intro': false,
          'utility': false,
          'language': false,
          'decisions': false,
          'examples': false,
          'roadMeeting': false,
          'gini': false,
          'highLevelPatterns': false,
          'chatbots': false,
          'conclusion': false
        };
        setExpandedSections(initialState);
      }
    }
  }, [isChatbotArticle]);

  // Toggle section expanded/collapsed state
  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => {
      const newState = { ...prev, [sectionId]: !prev[sectionId] };
      // Save to localStorage
      localStorage.setItem('expandedSections', JSON.stringify(newState));
      return newState;
    });
  };

  // Header component with toggle functionality
  const CollapsibleHeader = ({ id, title }: { id: string, title: string }) => (
    <h2 
      className="text-2xl font-bold text-[hsl(var(--primary))] mb-2 mt-6 pt-4 pb-3 border-t border-b border-[hsl(var(--primary))] cursor-pointer flex justify-between items-center"
      onClick={() => toggleSection(id)}
    >
      {title}
      <span className="text-xl">
        {expandedSections[id] ? '▼' : '►'}
      </span>
    </h2>
  );

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
            Author: Kyle Hammitt
          </h2>
          <h2 className="font-vt323 text-xl text-[hsl(var(--platform))]">
            Date: 5/21/2025
          </h2>
          <h2 className="font-vt323 text-xl text-[hsl(var(--platform))]">
            Category: {parent}
          </h2>
        </div>
        <div className="bg-card p-6 rounded-md border border-[hsl(var(--primary))] font-vt323 text-lg text-[hsl(var(--platform))] space-y-6">
          {isChatbotArticle ? (
            <>
              <CollapsibleHeader id="intro" title="We'll Get There, I Promise" />
              {expandedSections['intro'] && (
                <>
                  <p>
                    At the heart of many successful AI and machine learning techniques is the idea of finding simple, elegant rules that separate complex data into meaningful groups. This is not so different from how we, as humans, solve problems: we look for patterns, draw boundaries, and try to make sense of the world by reducing uncertainty.
                  </p>

                  <div className="my-6 flex justify-center">
                    <Image 
                      src="/patternreco1.gif" 
                      alt="Pattern Recognition Visualization" 
                      width={500} 
                      height={300}
                      priority={true}
                      sizes="(max-width: 768px) 100vw, 500px"
                      style={{ 
                        width: '100%', 
                        maxWidth: '500px', 
                        height: 'auto',
                        objectFit: 'contain'
                      }}
                      className="rounded-md shadow-md"
                    />
                  </div>

                  <p className="mb-4 text-[hsl(var(--platform))]">
                    This visualization shows pattern recognition forming in neural networks. Our brains embed meaning in states we can't scientifically decode, which is both powerful and dangerous. Unlike computers with explicit instructions, our brains work more like state machines, moving electricity and information through fluid patterns. When tying shoes, we don't consciously think "lower right hand, grab lace, under the bridge." We start with procedural steps as children, but these evolve into seamless motions rich with embedded data. This gap between how we process information and how we understand that processing makes replicating intelligence so challenging and often misleading.
                  </p>
                </>
              )}
              
              <CollapsibleHeader id="utility" title="Utility First, We Just Don't See Ourselves That Way" />
              {expandedSections['utility'] && (
                <p className="mb-4 text-[hsl(var(--platform))]">
                  Our brains prioritize effectiveness over explainability. We imagine past memories as being stored somewhere like a hard drive, but it's more likely our brains recognize patterns so efficiently that they selectively create similar-but-different memories to be recalled when needed. We're incredibly efficient with energy use, which makes this reality exciting rather than reductionist. What freedom to know our perceptions can be guided by us when we take control. Of course, many companies are eager to take that control from you.
                </p>
              )}

              <CollapsibleHeader id="language" title="How Language Was Formed (Functionally)" />
              {expandedSections['language'] && (
                <>
                  <p className="mb-4">
                    Language wasn't designed like computers with careful planning and predefined goals. It emerged organically from our need to communicate and work together. It evolved through use rather than design, shaped by the problems it helped us solve. This makes language a powerful lens for understanding human thought, not because it was designed that way, but because it couldn't help becoming one.
                  </p>

                  <p className="mb-4">
                    Think about how we solve new problems: We create analogies to familiar concepts. We refine these through trial and error, building context. Finally, we compress everything into a simpler, usable model. We transform messy explorations into usable shortcuts, simplifying so we can act efficiently. Language works similarly. We use metaphors to grasp new ideas, build nuance through conversation, and compress this shared understanding into words that function as cognitive shortcuts.
                  </p>

                  <div className="my-6 flex justify-center">
                    <YouTubeEmbed 
                      videoId="4X6UHFa--Qc"
                      title="YouTube video player"
                      className="rounded-md shadow-md"
                    />
                  </div>
                </>
              )}

              <CollapsibleHeader id="decisions" title="We Make Decisions Faster Than We Know How" />
              {expandedSections['decisions'] && (
                <>
                  <p className="mb-4">
                    Research suggests we become consciously aware of our decisions only after making them. This doesn't mean we aren't making the decisions ourselves—rather, the "we" making decisions includes both conscious and unconscious processes. Our brains constantly predict the future and evaluate options beneath our awareness. By the time we consciously decide, our brains have already evaluated choices and narrowed them down.
                  </p>

                  <div className="my-6 flex justify-center">
                    <Image 
                      src="/decision-tree.gif" 
                      alt="Decision tree visualization" 
                      width={500} 
                      height={300}
                      priority={true}
                      sizes="(max-width: 768px) 100vw, 500px"
                      style={{ 
                        width: '100%', 
                        maxWidth: '500px', 
                        height: 'auto',
                        objectFit: 'contain'
                      }}
                      className="rounded-md shadow-md"
                    />
                  </div>

                  <p className="mb-4">
                    This explains why intuition can be so powerful. It's not magic but your brain recognizing patterns and making predictions based on experience. That feeling of knowing something without being able to explain it happens when your brain recognizes patterns your conscious mind hasn't articulated yet. It's why experts make better decisions faster than novices without consciously considering all options—their brains know which patterns matter and which don't.
                  </p>
                </>
              )}

              <CollapsibleHeader id="examples" title="Practical Examples Make Everything Clear" />
              {expandedSections['examples'] && (
                <>
                  <p className="mb-4">
                    Let's consider deciding which day to visit a local market. You've heard weekdays are less crowded, but you're not sure which one is best. You might assume Mondays and Fridays are better since people often take long weekends, and Wednesdays might be busier because stores often run promotions when the previous week's deals end and new sales begin. This mental shortcut based on general patterns works, though it's not a thorough analysis.
                  </p>

                  <p className="mb-4">
                    But what if you want to truly optimize your visit? You gather data: checking online reviews about crowds, asking the market's social media manager about busy times, maybe even driving by on different days to gauge the crowd. This more precise information helps, but costs you time, effort, and the mental load of processing it all.
                  </p>
                  
                  <p className="mb-4">
                    We often believe more data will make answers clear. The reality is that data frequently complicates decisions by introducing competing factors. Maybe Mondays have the shortest lines but the least fresh produce. Maybe Thursdays have better stock but slightly longer waits. Which is better? There's no objective answer—it depends entirely on what you value in your market experience.
                  </p>
                  
                  <p className="mb-4">
                    AI systems struggle with this kind of nuanced decision-making. They excel at finding patterns and optimizing specific metrics but can't match the holistic, multi-criteria judgments that come naturally to humans. They might tell you when the market is least crowded but can't decide if that's worth trading for potentially less selection or freshness. What they do offer is objectivity without bias. They might determine the optimal time is 10:37 AM on Tuesday, far more precise than you'd guess. But this precision only matters if you can act on it and accept the tradeoffs involved, like perhaps missing work or other commitments.
                  </p>
                </>
              )}
              
              <CollapsibleHeader id="roadMeeting" title="Where Rubber Meets the Road" />
              {expandedSections['roadMeeting'] && (
                <>
                  <p className="mb-4">
                    Let's remember that making a decision and taking action are distinct. You might decide, based on data, to extend the market's hours, but nothing changes until you actually implement new hours. Or you might act without fully considering consequences, leading to unexpected outcomes. The gap between decision and action is where leadership, communication, and follow-through matter most. Good leaders make informed decisions, ensure effective implementation, and adjust when things don't go as expected.
                  </p>
                  <p className="mb-4">
                    It's puzzling how often we fall into serving systems rather than making systems serve us. We created metrics and frameworks to solve real problems, not to follow blindly or mine for insights without purpose. When we submit to metrics just because they reduce stress, provide security, or give a sense of control, we lose sight of our real goals. This goes beyond philosophy—organizations waste hundreds of thousands of dollars when intent and design aren't aligned. Metrics work only when backed by clear intention. Without that clarity, we end up serving our tools instead of being served by them.
                  </p>
                </>
              )}
              
              <CollapsibleHeader id="gini" title="Don't Be Afraid, Modern AI Is Different" />
              {expandedSections['gini'] && (
                <>
                  <p className="mb-4">
                    If you've seen presentations about decision trees in machine learning, you know there are countless ways to divide outcomes and evaluate importance, leading to vastly different results. Sounds scary? Humans face the same challenge. We can't consider every option when deciding. We simplify, generalize, and use shortcuts not because we're flawed, but because it's the only way to function amid infinite complexity.
                  </p>
                  <p className="mb-4">
                    Decision trees often use "Gini impurity" to measure effectiveness. This statistic estimates how often a randomly chosen element would be incorrectly labeled based on the distribution in a subset. In plain terms, it measures how mixed up a group is. This elegant equation applies to everything from guessing how long my roommate's shower will take to solving Minesweeper. What might have required thousands of years to express linguistically becomes a formula that applies universally and reveals which factors matter most—assuming we measured the right things to begin with.
                  </p>

                  <div className="my-6 flex justify-center">
                    <YouTubeEmbed 
                      videoId="Yeu9aMK6avU"
                      title="YouTube video player" 
                      className="rounded-md shadow-md"
                    />
                  </div>
                </>
              )}
              
              <CollapsibleHeader id="highLevelPatterns" title="We're All Just High Level Pattern Recognition Machines" />
              {expandedSections['highLevelPatterns'] && (
                <>
                  <p className="mb-4">
                    Our brains evolved to spot patterns quickly—sometimes too quickly. We see faces in clouds, shapes in random patterns, and conspiracies in coincidences. Yet this same pattern recognition helps us navigate complex social situations, learn languages, and solve problems. The art is knowing when to trust your intuition and when to question it.
                  </p>
                </>
              )}
              
              <CollapsibleHeader id="chatbots" title="This Isn't Even A Chatbot Article, It's About... Something Else" />
              {expandedSections['chatbots'] && (
                <>
                  <p className="mb-4">
                    The true power of modern AI lies not just in data but in keeping that data private and secure. With the right tools, you can use AI locally on your own devices, keeping your information under your control. You can benefit from sophisticated analysis, anonymize your behaviors, and remain unpredictable even while using services like Google. This matters deeply: you should never need to surrender your personal data to access AI benefits.
                  </p>
                  <p className="mb-4">
                    Imagine glasses that recognize every product you see. A photo is instantly analyzed, returning names, prices, and details. But it goes further: your personal AI assistant knows where you live, accesses your maps, remembers your preferences, and decides in seconds whether you should buy Cookie Crunch here, on Amazon, from a newly-discovered store, or wait for next weekend's predicted sale based on your credit card history. Sound useful?
                  </p>
                  <p className="mb-4">
                    That's my challenge. Making this reality requires buy-in from others for truly private, personalized tools. It's fundamentally about life organization—what do you actually want? Help me help you, as Jerry Maguire would say.
                  </p>
                </>
              )}
              
              <CollapsibleHeader id="conclusion" title="Conclusion: A Path Forward" />
              {expandedSections['conclusion'] && (
                <>
                  <p>
                    As these articles develop, they'll grow in technical complexity and depth. I know it can be hard to grasp AI's full potential, even for those deeply immersed in the field. The landscape changes daily with new capabilities. I've found that using AI concepts to explain our world can be as valuable as the applications themselves. Understanding—seeing patterns we previously missed—shifts our perspective in ways that naturally lead to better decisions. The journey of learning these tools transforms us, regardless of how we apply them. Perhaps the greatest power isn't in the algorithms but in the new perspectives they help us discover.
                  </p>
                </>
              )}
            </>
          ) : (
            <span>[Article content coming soon!]</span>
          )}
        </div>
      </div>
    </main>
  );
}

// Loading fallback component
function ArticleLoading() {
  return (
    <main className="min-h-screen bg-background py-16 px-4 software-theme">
      <div className="max-w-3xl mx-auto">
        <div className="h-10 w-24 bg-muted rounded animate-pulse mb-6"></div>
        <div className="h-12 bg-muted rounded animate-pulse mb-3"></div>
        <div className="flex flex-row justify-between mb-6">
          <div className="h-8 w-40 bg-muted rounded animate-pulse"></div>
          <div className="h-8 w-40 bg-muted rounded animate-pulse"></div>
          <div className="h-8 w-40 bg-muted rounded animate-pulse"></div>
        </div>
        <div className="bg-card p-6 rounded-md border border-[hsl(var(--primary))] space-y-6">
          <div className="h-8 bg-muted rounded animate-pulse"></div>
          <div className="h-20 bg-muted rounded animate-pulse"></div>
          <div className="h-8 bg-muted rounded animate-pulse"></div>
          <div className="h-20 bg-muted rounded animate-pulse"></div>
        </div>
      </div>
    </main>
  );
}

// Main page component with Suspense boundary
export default function ArticlePage() {
  return (
    <Suspense fallback={<ArticleLoading />}>
      <ArticleContent />
    </Suspense>
  );
} 