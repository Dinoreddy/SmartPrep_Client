import type { Question } from "@/models/question";

// ── Mock questions ────────────────────────────────────────────────────────────
// Replace with API fetch when backend is ready.
// Data is keyed by lowercase skill name so the route param drives the data.

export const SESSION_LENGTH = 10;

export const SKILL_QUESTIONS: Record<string, Question[]> = {
  react: [
    {
      _id: "6995985a74bc9e09e37ba49a",
      text: "What is the difference between a controlled component and an uncontrolled component in React?",
      options: [
        "A controlled component is one that is not managed by React, while an uncontrolled component is one that is managed by React",
        "A controlled component is one that is managed by React, while an uncontrolled component is one that is not managed by React",
        "A controlled component is one that is used for forms, while an uncontrolled component is one that is used for non-form elements",
        "A controlled component is one that is used for non-form elements, while an uncontrolled component is one that is used for forms",
      ],
      correctOptionIndex: 1,
      explanation:
        "A controlled component in React is one that is managed by React, meaning that React handles the component's state and updates it as needed. An uncontrolled component, on the other hand, is one that is not managed by React, and its state is handled by the DOM.",
      difficulty: "Easy",
      eloRating: 852,
      topics: ["React"],
    },
    {
      _id: "6995985e74bc9e09e37ba49c",
      text: "What is the primary purpose of the 'key' prop in React?",
      options: [
        "To uniquely identify a component",
        "To specify the component's CSS class",
        "To define the component's event handler",
        "To determine the component's render order",
      ],
      correctOptionIndex: 0,
      explanation:
        "The 'key' prop is used to uniquely identify a component in an array of components, which helps React keep track of the components and their state.",
      difficulty: "Medium",
      eloRating: 1020,
      topics: ["React"],
    },
    {
      _id: "6995985e74bc9e09e37ba4a1",
      text: "What is the difference between a 'function component' and a 'class component' in React?",
      options: [
        "Function components are used for stateless components, while class components are used for stateful components",
        "Function components are used for server-side rendering, while class components are used for client-side rendering",
        "Function components are used for controlled components, while class components are used for uncontrolled components",
        "Function components are used for hooks, while class components are used for lifecycle methods",
      ],
      correctOptionIndex: 0,
      explanation:
        "Function components are used for stateless components, while class components are used for stateful components. However, with the introduction of hooks, function components can now also be used for stateful components.",
      difficulty: "Medium",
      eloRating: 1020,
      topics: ["React"],
    },
    {
      _id: "6995985e74bc9e09e37ba4a2",
      text: "How do you handle errors in a React application?",
      options: [
        "By using the 'try-catch' block",
        "By using the 'ErrorBoundary' component",
        "By using the 'useError' hook",
        "By using the 'console.error' method",
      ],
      correctOptionIndex: 1,
      explanation:
        "The 'ErrorBoundary' component is a built-in React component that can be used to catch and handle errors in a React application.",
      difficulty: "Medium",
      eloRating: 1033,
      topics: ["React"],
    },
    {
      _id: "6995985a74bc9e09e37ba499",
      text: "What is the purpose of the `useState` hook in React?",
      options: [
        "To manage side effects",
        "To manage state changes",
        "To handle events",
        "To make API requests",
      ],
      correctOptionIndex: 1,
      explanation:
        "The `useState` hook in React is used to manage state changes in functional components, allowing you to add state to your components and update it as needed.",
      difficulty: "Easy",
      eloRating: 839,
      topics: ["React"],
    },
  ],
} satisfies Record<string, Question[]>;

/** Fall back to React questions if skill has no mock data yet. */
export function getQuestionsForSkill(skillName: string): Question[] {
  return SKILL_QUESTIONS[skillName.toLowerCase()] ?? SKILL_QUESTIONS.react;
}
