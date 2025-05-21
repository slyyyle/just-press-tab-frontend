"use client"
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { slugify } from '@/lib/slugify';

export default function ArticlePage({ params }: { params: Promise<{ parent: string; article: string }> }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { parent, article } = React.use(params);
  
  // Get the original title with proper capitalization and punctuation from query params
  // or provide a default by transforming the slug
  const originalTitle = searchParams.get('title') 
    ? decodeURIComponent(searchParams.get('title')!)
    : article.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  // Define known articles with their proper titles
  const knownArticles: Record<string, string> = {
    "wait-what-that-s-not-how-you-spell-chatbot": "Wait what? That's not how you spell chatbot!",
    "rag-and-cot-the-dynamic-duo": "RAG & CoT: The Dynamic Duo",
    "modeling-chains-of-thought-after-how-i-solve-problems": "Modeling Chains of Thought After How I Solve Problems"
  };

  // Use known article title if available, otherwise use the query param or transformed slug
  const displayTitle = knownArticles[article] || originalTitle;
  
  // Check if this is our chatbot article by comparing slug directly
  const isChatbotArticle = article === "wait-what-that-s-not-how-you-spell-chatbot";

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
                  <p>
                    Language, at its core, is a tool for separating and labeling the world. Early humans needed to communicate about food, danger, and opportunity. Over time, language evolved to be a highly efficient system for encoding and transmitting information—using patterns, context, and shared understanding to reduce uncertainty and increase clarity. In a sense, language is the original "pattern recognition" system.
                  </p>

                  <div className="my-6 relative w-full" style={{ paddingBottom: '56.25%' }}>
                    <iframe 
                      className="absolute top-0 left-0 w-full h-full" 
                      src="https://www.youtube.com/embed/WfXT7fqlCJ8?si=JsDnWaf2V9AXteBw" 
                      title="YouTube video player" 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                      referrerPolicy="strict-origin-when-cross-origin" 
                      allowFullScreen
                    ></iframe>
                  </div>
                </>
              )}

              <CollapsibleHeader id="decisions" title="Words, Numbers, Metrics, Decisions, and Actions" />
              {expandedSections['decisions'] && (
                <>
                  <p>
                    Why does this matter? Before we had math, statistics, or even formal logic, people solved problems by gathering what they knew, sharing stories, and refining their perspective through trial and error. Decision making has always been about using the information at hand, doing your best, and then learning and adapting for the next time. In modern times, we've created metrics and formulas to help us, but sometimes we hide behind these numbers or misuse them, forgetting that the core of problem solving is still about perspective, learning, and iteration. Metrics are just tools—what matters is how we use them to improve our understanding and actions. It is easy to chase familiar metrics to our doom - and along the way it will feel like this:
                  </p>

                  <div className="my-6 relative w-full" style={{ paddingBottom: '56.25%' }}>
                    <iframe 
                      className="absolute top-0 left-0 w-full h-full" 
                      src="https://www.youtube.com/embed/_Yse7lNw2Lw?si=7WFn4UVE8DAW4ajJ" 
                      title="YouTube video player" 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                      referrerPolicy="strict-origin-when-cross-origin" 
                      allowFullScreen
                    ></iframe>
                  </div>
                </>
              )}

              <div className="mb-4">
                <CollapsibleHeader id="examples" title="Examples Are The Best Perspective" />
                {expandedSections['examples'] && (
                  <>
                    <p className="mb-4">
                      Imagine a small village market long ago. The leader wants to decide whether to keep the market open later in the evening. Back then, people would talk to each other—"It seems like more people come by after sunset," or "I noticed we sold out of bread last night." These are words, stories, and observations.
                    </p>
                    <p className="mb-4">
                      As time went on, someone might start counting: "We sold 20 loaves after sunset yesterday, but only 10 the day before." Now, numbers and simple metrics are helping the decision. Maybe they start keeping a tally every night, and soon they have a table of sales by hour.
                    </p>
                    <p className="mb-4">
                      But what if someone picks the wrong metric? Suppose they only count bread, but not fruit, and fruit sales actually drop in the evening. Or maybe they gather data only on festival days, when sales are always high, and assume every night will be the same. Or perhaps they assume that more sales always means more profit, but don't notice that evening sales require paying extra for lighting and security, which eats up the profit.
                    </p>
                    <p className="mb-4">
                      This is where things can go wrong: the metric chosen doesn't match the real goal, or the data is gathered in a way that misses important context. It's easy to be misled by numbers if you don't ask the right questions or check your assumptions.
                    </p>
                    <p className="mb-4">
                      For example, if you only count bread sales and ignore fruit, you might decide to stay open later thinking business is booming, but actually lose money as fruit sales drop. Let's break this down further: if bread sales increase by 30% in the evening but fruit sales drop by 60%, and fruit has a higher profit margin (50% vs 20% for bread), you could be making a decision that actively harms your business. The bread data alone tells a story of growth, while the complete picture reveals decline. What's worse, because you're only tracking what confirms your initial hypothesis, you might double down on the wrong strategy by further extending hours or adding more bread varieties, all while your overall profitability continues to fall.
                    </p>
                    
                    <div className="my-6 flex justify-center">
                      <Image 
                        src="/whypastor.webp" 
                        alt="Why Pastor Illustration" 
                        width={500} 
                        height={0}
                        sizes="100vw"
                        style={{ width: '100%', maxWidth: '500px', height: 'auto' }}
                        className="rounded-md shadow-md"
                      />
                    </div>
                    
                    <p className="mb-4">
                      This is where modern AI systems can actually help prevent these mistakes. A chatbot with proper chain-of-thought reasoning can process vast amounts of information overnight, exploring hundreds of potential scenarios, edge cases, and hidden variables that humans might miss. It can systematically identify blind spots in your data collection, suggest alternative metrics that better align with your goals, and even simulate the potential outcomes of different decisions. Unlike humans who tend to anchor on familiar patterns, an AI doesn't have emotional attachment to particular metrics or preconceived notions about what "should" work. By examining the collected wisdom embedded in human language—which contains warnings about these exact pitfalls across countless domains—the AI can help you avoid the common traps that businesses have fallen into throughout history. The key is using these tools to enhance your decision-making process, not replace your judgment entirely.
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
                    <p className="mb-4">
                      In the end, the best leaders are the ones who can take all the information—stories, numbers, patterns, and their own experience—and make a decision. Then, most importantly, they act on it, learn from the outcome, and adjust as needed. The process is simple at its core: gather, decide, act, learn, repeat. We often make it harder than it needs to be by overcomplicating things or hiding behind numbers, but the essence of good decision making hasn't changed.
                    </p>
                  </>
                )}
              </div>

              <CollapsibleHeader id="gini" title="Gini Impurity, Separability, and Problem Solving" />
              {expandedSections['gini'] && (
                <>
                  <p className="mb-4">
                    In other more mathematical prediction models that use data in columns and tables, we have an idea called Gini Impurity.   Gini Impurity is a measure from decision tree learning that helps us understand how mixed a set of data values is. The lower the impurity, the more "separable" the data. In both human reasoning and machine learning, the goal is often to find splits or boundaries that make things as clear as possible—reducing ambiguity and making decisions easier. This is the same principle that underlies much of our problem-solving: we try to break down big, messy problems into smaller, more manageable pieces.  Once we solve problems, we generalize what we learned, to avoid or solve future problems and understand why they occur and how to benefit from them as an opportunity.
                  </p>
                  
                  <div className="my-6 flex justify-center">
                    <Image 
                      src="/decision-tree.webp" 
                      alt="Decision Tree Visualization" 
                      width={500} 
                      height={0}
                      sizes="100vw"
                      style={{ width: '100%', maxWidth: '500px', height: 'auto' }}
                      className="rounded-md shadow-md"
                    />
                  </div>
                  
                  <p className="mb-4">
                    We can teach models to create trees at good "branch points", and these lead to something called a decision tree - they help us sort our data and make sense of it. In the above example, the model decided due to the gini impurity being the BEST when the decision amount is petal length being greater than 2.45 cm, not inclusive, or less than 2.45 cm, inclusive. This is simple, and easy to understand, it's just allowing something to set rules for itself based on what it sees, using math as its guide to "get to the solution". This led to random forests of decision trees, where we generate thousands of these, and use them in concert to remove points of weakness in the tree. Then, this led very nicely into deep learning training methods - it's the same idea.
                  </p>
                  
                  <div className="my-6 flex justify-center">
                    <Image 
                      src="/ML-gradient.webp" 
                      alt="Machine Learning Gradient Visualization" 
                      width={500} 
                      height={0}
                      sizes="100vw"
                      style={{ width: '100%', maxWidth: '500px', height: 'auto' }}
                      className="rounded-md shadow-md"
                    />
                  </div>
                  
                  <p className="mb-4">
                    However, with larger models, all those tiny decisions start to look like the above, which is a "gradient" or decision map of a model (as best we can understand it given our human limitations) given the last data point it saw. It will use that to make tiny adjustments to billions of its neurons at once. In essence - it mimics learning. The end model is not learned. It just spits out really complex contexts we trained it to, to make it do things.
                  </p>
                </>
              )}

              <CollapsibleHeader id="highLevelPatterns" title="Machine Learning, AI, and High-Level Patterns" />
              {expandedSections['highLevelPatterns'] && (
                <p>
                  Modern AI and machine learning systems operate at scales and speeds that are impossible for humans, but the underlying principles are surprisingly familiar. Techniques like <strong>Attention</strong> in neural networks allow models to focus on the most relevant parts of the data, much like how we pay attention to important details in a conversation or a problem. These systems use high-level patterns—learned from vast amounts of data—to make predictions, generate language, and solve problems in ways that echo our own cognitive processes.
                </p>
              )}

              <CollapsibleHeader id="chatbots" title="Dude, You Promised Us Chatbots" />
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
                  
                  <div className="my-6 flex justify-center">
                    <Image 
                      src="/tom-cruise-help.gif" 
                      alt="Tom Cruise Help Me Help You" 
                      width={500} 
                      height={0}
                      sizes="100vw"
                      style={{ width: '100%', maxWidth: '500px', height: 'auto' }}
                      className="rounded-md shadow-md"
                    />
                  </div>
                </>
              )}
              
              <CollapsibleHeader id="conclusion" title="Conclusion" />
              {expandedSections['conclusion'] && (
                <>
                  <p className="mb-4">
                    Whether it's a decision tree splitting data, a human learning a new word, or a transformer model attending to the right context, the core idea is the same: find the patterns, reduce the uncertainty, and make sense of the world. That's why these methods work—and why, in the end, even the most advanced AI is still following principles that are deeply human.
                  </p>
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