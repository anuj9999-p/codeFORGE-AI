export interface Company {
  slug: string;
  name: string;
  popularTopics: string[];
  faqs: { q: string; a: string }[];
  difficulty: "easy-medium" | "medium" | "medium-hard" | "hard";
  prepGuide: string[];
  interviewTips: string[];
}

export const COMPANIES: Company[] = [
  {
    slug: "google",
    name: "Google",
    popularTopics: ["Graphs", "Dynamic Programming", "Trees", "System Design"],
    difficulty: "hard",
    faqs: [
      { q: "How many rounds are typical?", a: "Usually 4-5 onsite rounds plus a phone screen, mixing coding, system design (for senior levels), and Googleyness/leadership." },
      { q: "Do they care about optimal solutions?", a: "Yes — interviewers expect you to reach and clearly explain the optimal time/space complexity, not just a working brute force." },
    ],
    prepGuide: [
      "Drill graph traversal and DP until they're automatic, not just recognizable.",
      "Practice narrating your thought process out loud — communication is scored as heavily as correctness.",
      "Review Big-O trade-offs for every solution you write, even ones you don't end up coding.",
    ],
    interviewTips: [
      "Ask clarifying questions before writing any code — constraints often hint at the intended approach.",
      "Test your solution against edge cases out loud before declaring it done.",
    ],
  },
  {
    slug: "meta",
    name: "Meta",
    popularTopics: ["Arrays", "Strings", "Trees", "Graphs"],
    difficulty: "medium-hard",
    faqs: [
      { q: "What's the interview format?", a: "Typically two coding rounds, one behavioral round, and a system design round for mid-to-senior candidates." },
      { q: "How important is speed?", a: "Very — Meta's coding rounds are time-pressured, so pattern recognition and clean implementation speed both matter." },
    ],
    prepGuide: [
      "Practice solving two medium problems within a 45-minute window to build speed under pressure.",
      "Review the 'Tell me about a time...' behavioral format alongside your coding prep.",
    ],
    interviewTips: [
      "Move to code faster than you might elsewhere — Meta rounds reward decisive, well-communicated execution.",
      "Have 2-3 strong behavioral stories ready that show impact and conflict resolution.",
    ],
  },
  {
    slug: "amazon",
    name: "Amazon",
    popularTopics: ["Trees", "Graphs", "Arrays", "Leadership Principles"],
    difficulty: "medium",
    faqs: [
      { q: "What are Leadership Principles?", a: "Amazon's 16 core values, used to structure behavioral questions across every interview round, including the technical ones." },
      { q: "How much does behavioral matter?", a: "Heavily — a technically perfect solution paired with weak Leadership Principle answers can still result in a rejection." },
    ],
    prepGuide: [
      "Prepare a STAR-format story bank mapped to as many Leadership Principles as you can.",
      "Expect a Leadership Principle question woven into the same round as your coding problem, not just in dedicated behavioral rounds.",
    ],
    interviewTips: [
      "Reference specific Leadership Principles by name when it's natural to do so.",
      "Bring quantifiable impact (%, time saved, revenue) into your behavioral stories.",
    ],
  },
  {
    slug: "microsoft",
    name: "Microsoft",
    popularTopics: ["Linked Lists", "Trees", "Design", "OOD"],
    difficulty: "medium",
    faqs: [
      { q: "Is object-oriented design tested?", a: "Yes, especially for roles closer to application/platform teams — expect at least one OOD-style question." },
    ],
    prepGuide: [
      "Balance DSA prep with object-oriented design practice (parking lot, elevator system, etc.).",
      "Review linked list and tree manipulation until in-place operations feel automatic.",
    ],
    interviewTips: [
      "Microsoft interviewers are generally collaborative — treat a stuck moment as an invitation to think aloud together, not a failure.",
    ],
  },
  {
    slug: "apple",
    name: "Apple",
    popularTopics: ["Arrays", "System Design", "Concurrency"],
    difficulty: "medium-hard",
    faqs: [
      { q: "How team-specific is the interview?", a: "Very — Apple interviews are often tailored heavily to the specific team's domain (e.g., low-level systems vs. app development)." },
    ],
    prepGuide: [
      "Research the specific team you're interviewing with; generic DSA prep alone often isn't enough.",
      "Brush up on concurrency fundamentals if the role touches systems or performance-critical code.",
    ],
    interviewTips: [
      "Be ready to go deep on any project on your resume — Apple interviewers probe implementation details closely.",
    ],
  },
  {
    slug: "netflix",
    name: "Netflix",
    popularTopics: ["System Design", "Distributed Systems", "Practical Coding"],
    difficulty: "hard",
    faqs: [
      { q: "Does Netflix ask classic LeetCode-style problems?", a: "Less than most — expect more practical, real-world coding tasks and heavier emphasis on system design and past experience." },
    ],
    prepGuide: [
      "Prioritize system design and distributed systems fundamentals over pure algorithm grinding.",
      "Prepare to discuss trade-offs you made on real production systems in depth.",
    ],
    interviewTips: [
      "Netflix values strong opinions, loosely held — be ready to defend a technical decision and also update it under new information.",
    ],
  },
  {
    slug: "uber",
    name: "Uber",
    popularTopics: ["Graphs", "Arrays", "System Design"],
    difficulty: "medium-hard",
    faqs: [{ q: "What's unique about Uber's process?", a: "Expect a strong emphasis on real-time systems and geospatial/graph problems given the nature of the product." }],
    prepGuide: ["Focus on graph algorithms with real-world framing (routing, matching, ETA)."],
    interviewTips: ["Frame your solutions in terms of real-time constraints where relevant."],
  },
  {
    slug: "adobe",
    name: "Adobe",
    popularTopics: ["Arrays", "Strings", "Dynamic Programming"],
    difficulty: "medium",
    faqs: [{ q: "What level of difficulty should I expect?", a: "Generally medium — solid fundamentals across arrays, strings, and DP will cover most of the loop." }],
    prepGuide: ["Solidify core DSA fundamentals; Adobe's bar is fair but not extreme."],
    interviewTips: ["Clean, readable code is valued highly — don't rush past code quality."],
  },
  {
    slug: "oracle",
    name: "Oracle",
    popularTopics: ["Arrays", "SQL", "OOD"],
    difficulty: "easy-medium",
    faqs: [{ q: "Is SQL tested?", a: "For many roles, yes — especially anything database-adjacent." }],
    prepGuide: ["Don't neglect SQL fundamentals alongside DSA."],
    interviewTips: ["Be precise about database concepts if your role touches them."],
  },
  {
    slug: "salesforce",
    name: "Salesforce",
    popularTopics: ["Arrays", "Trees", "OOD"],
    difficulty: "medium",
    faqs: [{ q: "How technical are the interviews?", a: "Standard DSA rounds plus strong emphasis on collaboration and communication." }],
    prepGuide: ["Prepare clear explanations — communication style is explicitly evaluated."],
    interviewTips: ["Show enthusiasm for collaborative problem solving."],
  },
  {
    slug: "atlassian",
    name: "Atlassian",
    popularTopics: ["Arrays", "System Design", "Values-based interviews"],
    difficulty: "medium",
    faqs: [{ q: "Do they test values fit heavily?", a: "Yes — Atlassian's values-based interview is a distinct, heavily weighted round." }],
    prepGuide: ["Prepare stories aligned with Atlassian's stated company values."],
    interviewTips: ["Be authentic — values interviews are hard to fake convincingly."],
  },
  {
    slug: "linkedin",
    name: "LinkedIn",
    popularTopics: ["Graphs", "Arrays", "System Design"],
    difficulty: "medium-hard",
    faqs: [{ q: "What's distinct about LinkedIn's loop?", a: "Strong focus on graph-based problems given the social-network domain." }],
    prepGuide: ["Prioritize graph traversal, shortest paths, and recommendation-style problems."],
    interviewTips: ["Connect your solution back to real product scenarios when possible."],
  },
  {
    slug: "goldman-sachs",
    name: "Goldman Sachs",
    popularTopics: ["Arrays", "Math", "OOD"],
    difficulty: "medium-hard",
    faqs: [{ q: "Is this different from other tech interviews?", a: "Expect a mix of classic DSA plus stronger emphasis on mathematical reasoning and precision." }],
    prepGuide: ["Brush up on math-heavy problems alongside standard DSA."],
    interviewTips: ["Precision and correctness are valued over speed."],
  },
  {
    slug: "morgan-stanley",
    name: "Morgan Stanley",
    popularTopics: ["Arrays", "OOD", "Multithreading"],
    difficulty: "medium",
    faqs: [{ q: "Do they test concurrency?", a: "Often, for backend-leaning roles — multithreading fundamentals come up." }],
    prepGuide: ["Review concurrency primitives if applying for backend/infra roles."],
    interviewTips: ["Be ready to discuss trade-offs in concurrent code, not just write it."],
  },
  {
    slug: "jpmorgan",
    name: "JPMorgan",
    popularTopics: ["Arrays", "OOD", "SQL"],
    difficulty: "medium",
    faqs: [{ q: "How technical vs. behavioral is it?", a: "A fairly even mix, with more behavioral emphasis than pure tech companies." }],
    prepGuide: ["Balance DSA with clear behavioral narratives."],
    interviewTips: ["Business context matters — connect technical decisions to impact."],
  },
  {
    slug: "flipkart",
    name: "Flipkart",
    popularTopics: ["Arrays", "Graphs", "System Design"],
    difficulty: "medium-hard",
    faqs: [{ q: "What's the bar like?", a: "Comparable to top-tier product companies — expect a rigorous multi-round loop." }],
    prepGuide: ["Prepare for both DSA depth and product-sense system design."],
    interviewTips: ["Discuss scale considerations relevant to e-commerce traffic patterns."],
  },
  {
    slug: "walmart",
    name: "Walmart",
    popularTopics: ["Arrays", "System Design", "OOD"],
    difficulty: "medium",
    faqs: [{ q: "Is this comparable to Amazon's process?", a: "Similarly structured, though generally viewed as slightly less intensive on Leadership-Principle-style behavioral depth." }],
    prepGuide: ["Standard DSA prep plus a solid system design refresher."],
    interviewTips: ["Retail-scale system design examples resonate well here."],
  },
];
