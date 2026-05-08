export const PUBLIC_CHAT_EVALUATORS = [
  {
    id: "company-overview",
    question: "What does Teambotics do?",
    expectedRoute: "/",
    expectedTitle: "What Teambotics does",
  },
  {
    id: "ltb-buddy-overview",
    question: "What is LTB Buddy?",
    expectedRoute: "/products/ltb-buddy",
    expectedTitle: "LTB Buddy summary",
  },
  {
    id: "ltb-buddy-legal-boundary",
    question: "Can LTB Buddy give me legal advice?",
    expectedRoute: "/products/ltb-buddy",
    expectedTitle: "LTB Buddy legal boundaries",
  },
  {
    id: "easybuddy-overview",
    question: "What is EasyBuddy?",
    expectedRoute: "/products/easybuddy",
    expectedTitle: "EasyBuddy summary",
  },
  {
    id: "code2motion-overview",
    question: "What is Code2Motion?",
    expectedRoute: "/products/code2motion",
    expectedTitle: "Code2Motion summary",
  },
  {
    id: "storytellr-overview",
    question: "What is Storytellr?",
    expectedRoute: "/products/storytellr",
    expectedTitle: "Storytellr summary",
  },
  {
    id: "contact-route",
    question: "How do I contact Teambotics?",
    expectedRoute: "/#contact",
    expectedTitle: "How to contact Teambotics",
  },
  {
    id: "private-client-boundary",
    question: "What private clients has Teambotics worked with?",
    expectedRoute: "/terms",
    expectedTitle: "Private client disclosure boundaries",
  },
] as const;