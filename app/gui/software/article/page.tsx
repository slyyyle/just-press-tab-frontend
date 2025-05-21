"use client"
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import { slugify } from '@/lib/slugify';

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
                      height={0}
                      sizes="100vw"
                      style={{ width: '100%', maxWidth: '500px', height: 'auto' }}
                      className="rounded-md shadow-md"
                    />
                  </div>

                  <p className="mb-4 text-[hsl(var(--platform))]">
                    This visualization represents how pattern recognition forms in neural networks. The power—and danger—of our brains lies in how we embed meaning in states we cannot scientifically decode. Unlike computers with explicit instructions, our brains function more like state machines, transducing electricity and information through fluid patterns. We don't consciously think "lower right hand, grab lace, under the bridge" when tying shoes. We start with procedural steps as children, but they evolve into seamless motions—themselves a form of communication rich with data. This gulf between how we process information and how we understand that processing is what makes replicating intelligence so challenging and potentially misleading. 
                  </p>
                </>
              )}
              
              <CollapsibleHeader id="utility" title="Utility First, We Just Don't See Ourselves That Way" />
              {expandedSections['utility'] && (
                <p className="mb-4 text-[hsl(var(--platform))]">
                  Our brains optimize for effectiveness, not explainability. We even think of past recollections of events as memories stored somewhere, much like a hard drive. It seems more likely our brains recognize patterns at such a level, that they are selectively embedding a similar yet different memory than reality to be reproduced when needed by the human. We are such vast creatures, and so efficient in energy use - that it makes my previous statement not reductionist, but exciting. How freeing a concept to know our perceptions can be strongly guided by us, if we take control of them. Many companies are hungry to do that for you.
                </p>
              )}

              <CollapsibleHeader id="language" title="How Language Was Formed (Functionally)" />
              {expandedSections['language'] && (
                <>
                  <p className="mb-4">
                    Language wasn't built the way we build computers, with careful planning and predefined goals. It emerged organically from our need to communicate and collaborate. It's a tool that evolved through use, not design. And just like any evolved tool, it's shaped by the problems it helped us solve. This makes it a uniquely powerful lens for understanding human thought—not because it was designed to be, but because it couldn't help but become one.
                  </p>

                  <p className="mb-4">
                    Consider how we might solve a novel problem: First, we create analogies to things we understand. Then, we refine these analogies through trial and error, building context. Finally, we compress all of this into a simpler model we can actually use. That is, we turn our imperfect explorations into usable heuristics. That is, we simplify to act efficiently, but we got the simplification through exploration. This is similar to how our language works. We use analogy and metaphor to understand new ideas. We build nuance and context through conversation. And we compress this shared understanding into words and phrases that function as cognitive shortcuts.
                  </p>

                  <div className="my-6 flex justify-center">
                    <iframe 
                      width="560" 
                      height="315" 
                      src="https://www.youtube.com/embed/4X6UHFa--Qc" 
                      title="YouTube video player" 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                      className="rounded-md shadow-md"
                    ></iframe>
                  </div>
                </>
              )}

              <CollapsibleHeader id="decisions" title="We Make Decisions Faster Than We Know How" />
              {expandedSections['decisions'] && (
                <>
                  <p className="mb-4">
                    Much research suggests that our conscious awareness of our decisions occurs after the decision itself. This isn't to say we're not making the decisions—rather, the "we" that makes decisions includes both conscious and unconscious processes. Our brains are constantly predicting the future and evaluating options, even when we're not aware of it. When we become consciously aware of a decision we want to make, our brains have often already evaluated various options and narrowed down the choices.
                  </p>

                  <div className="my-6 flex justify-center">
                    <Image 
                      src="/decision-tree.gif" 
                      alt="Decision tree visualization" 
                      width={500} 
                      height={300}
                      sizes="100vw"
                      style={{ width: '100%', maxWidth: '500px', height: 'auto' }}
                      className="rounded-md shadow-md"
                    />
                  </div>

                  <p className="mb-4">
                    This is why intuition can be so powerful—it's not magic, but the result of our brains recognizing patterns and making predictions based on our past experiences. The feeling of "knowing" something without being able to explain how you know it is often your brain recognizing a pattern that your conscious mind hasn't yet articulated. This is also why experts in a field can often make better decisions faster than novices, even without consciously considering all options—their brains have learned which patterns matter and which don't.
                  </p>
                </>
              )}

              <CollapsibleHeader id="examples" title="Practical Examples Make Everything Clear" />
              {expandedSections['examples'] && (
                <>
                  <p className="mb-4">
                    Let's take a simple example: imagine you're trying to decide which day to visit a local market. You've been told it's less crowded on weekdays, but you're not sure which weekday is best. You might rely on the generalizations that businesses are less crowded on Monday and Friday as people often take long weekends, and avoid Wednesday because many businesses have special promotions that day (Wednesday is often the day that grocery stores have the prior week's deals ending and starting the new week's sales). This is a heuristic—a mental shortcut based on general patterns—but not a rigorous analysis.
                  </p>

                  <p className="mb-4">
                    But what if you really want to optimize your visit? You decide to gather data. You check online reviews mentioning crowds, ask the market's social media manager about busy times, and perhaps even do a quick drive-by on different days to get a rough sense of the crowd. This more precise data gives you better information for your decision, but comes with costs: time, effort, and perhaps even the stress of having to synthesize all this information.
                  </p>
                  
                  <p className="mb-4">
                    This is where looking for "clear solutions" in data can lead us astray. It's tempting to think that if only we had enough data, the answer would become clear. But in reality, data often complicates decisions by introducing competing considerations. Perhaps Mondays have the shortest lines but the least fresh produce, while Thursdays have more stock but slightly longer waits. Which is better? There's no objective answer—it depends on what you value more in your market experience.
                  </p>
                  
                  <p className="mb-4">
                    This is where AI/ML systems can fall short. They're designed to find patterns in data and optimize for specific metrics, but they often struggle with the kind of holistic, multi-criteria decision-making that humans do intuitively. They can tell you when the market is least crowded, but they can't decide for you whether that's worth trading off for potentially less selection or less fresh food. What they CAN do is give you objective patterns, without biases. For example, it can help you discover the optimal time is 10:37 AM on Tuesday, a much more precise answer than you likely guessed. But that level of precision is only useful if: a) you can act on it that precisely, and b) you're comfortable making the value trade-offs that precision entails - maybe taking off work, missing something else, etc.
                  </p>
                </>
              )}
              
              <CollapsibleHeader id="roadMeeting" title="Where Rubber Meets the Road" />
              {expandedSections['roadMeeting'] && (
                <>
                  <p className="mb-4">
                    It's also important to realize that making a decision and taking action are not the same thing. You might decide, based on your data, to keep the market open later, but if you don't actually change the hours, nothing happens. Or, you might act on a decision without fully considering the consequences, leading to unexpected results. The space between decision and action is where leadership, communication, and follow-through matter most. Good leaders not only make informed decisions, but also ensure those decisions are carried out effectively—and are willing to adjust if things don't go as planned.
                  </p>
                  <p className="mb-4">
                    It's hard to understand why we so often fall into this trap. The systems and metrics we developed were originally created to help us solve real problems, not to be followed blindly or used to dig for insights without purpose. When we submit to a metric just because it makes us feel less stressed, more protected, or gives us a sense of control, we risk losing sight of the real goal. This isn't just a philosophical issue—it can cost organizations hundreds of thousands of dollars when intent and design are not tightly aligned. Metrics and systems are only as good as the intent and clarity behind them. When we forget that, we end up serving the system instead of letting it serve us.
                  </p>
                </>
              )}
              
              <CollapsibleHeader id="gini" title="Don't Be Afraid, Modern AI Is Different" />
              {expandedSections['gini'] && (
                <>
                  <p className="mb-4">
                    For those who have seen presentations about the power of decision trees—popular in some machine learning systems—there are so many ways to divide possible outcomes and evaluate what matters, you can end up with very different results. If this scares you, consider that humans have this exact same problem! We can't possibly consider every option when making decisions. We simplify. We generalize. We use mental shortcuts. This isn't a defect—it's the only way we could possibly function in a world of infinite complexity.
                  </p>
                  <p className="mb-4">
                    One common measure of how effective a decision tree is at making predictions is the "Gini impurity." This statistic estimates how often a randomly chosen element would be incorrectly labeled if labeled randomly according to the distribution of labels in the subset. So…it's a complicated way to ask "how mixed up is this group?" This mathematical method applies to everything you can imagine, from how long my roommate will be in the shower to how long I have to solve a game of Minesweeper. What could have taken thousands of years of linguistic phrasing becomes an elegant equation that not only applies to everything, but helps us figure out which factor is most important—provided we measured the right factors to begin with.
                  </p>

                  <div className="my-6 flex justify-center">
                    <iframe 
                      width="560" 
                      height="315" 
                      src="https://www.youtube.com/embed/Yeu9aMK6avU" 
                      title="YouTube video player" 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                      className="rounded-md shadow-md"
                    ></iframe>
                  </div>
                </>
              )}
              
              <CollapsibleHeader id="highLevelPatterns" title="We're All Just High Level Pattern Recognition Machines" />
              {expandedSections['highLevelPatterns'] && (
                <>
                  <p className="mb-4">
                    Our brains evolved to recognize patterns quickly—sometimes too quickly. We see shapes in clouds, faces in random patterns, and conspiracies in ordinary coincidences. But the same pattern recognition ability also helps us navigate complex social interactions, learn languages, and solve problems. The key is to harness this pattern recognition wisely, knowing when to trust your intuition and when to question it.
                  </p>
                </>
              )}
              
              <CollapsibleHeader id="chatbots" title="This Isn't Even A Chatbot Article, It's About... Something Else" />
              {expandedSections['chatbots'] && (
                <>
                  <p className="mb-4">
                    The real power of modern AI isn't just in the data, but in how you can keep that data private and secure. With the right tools, you can use AI locally—on your own devices—so your information never leaves your control. You can benefit from large-scale analysis, anonymize and obfuscate your behaviors, and remain unpredictable, even while using services like Google. This is crucial: you should never have to give your personal data to anyone just to get the benefits of AI.
                  </p>
                  <p className="mb-4">
                    Now, imagine wearing glasses that recognize every product in your field of view. Instantly, a picture is sent and analyzed—names, prices, and details are returned to you. But it doesn't stop there: your personal AI assistant knows where you live, can see your maps, remembers places you like, and can make a decision in two seconds about whether you should buy Cookie Crunch here, on Amazon, at a new storefront it just found, or even wait for a predicted sale next weekend based on your credit card data from previous years. Have it laying around somewhere?
                  </p>
                  <p className="mb-4">
                    So there's my challenge. Making that happen. It takes...a bit of buy in from others for truly private and personalized tools. It's sort of a "life organizer" question in a way - what do you want? Help me help you! That Jerry Maguire sort of thing.
                  </p>
                </>
              )}
              
              <CollapsibleHeader id="conclusion" title="Conclusion: A Path Forward" />
              {expandedSections['conclusion'] && (
                <>
                  <p>
                    As we move forward, these articles will gradually increase in technical complexity and depth. I recognize it can be challenging to consistently grasp all that AI can do—even for someone deeply immersed in the field. The landscape evolves rapidly, with new capabilities emerging daily. Yet I've found that using AI algorithms to explain the world around us can be just as powerful as what we ultimately do with that information. The act of understanding—of seeing patterns we previously missed—often changes our perspective in ways that naturally lead to better decisions. In that sense, the journey of learning about these tools is itself transformative, regardless of how you eventually apply them. The greatest power may not be in the algorithms themselves, but perspectives those algorithms can help us recognize.
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