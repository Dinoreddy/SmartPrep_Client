/** Shared types for questions and practice sessions. */

export type Difficulty = "Easy" | "Medium" | "Hard";

export interface Question {
  _id: string;
  text: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  difficulty: Difficulty;
  eloRating: number;
  topics: string[];
}
