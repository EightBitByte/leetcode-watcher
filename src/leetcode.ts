// leetcode.ts
//
// Implements the actual fetching from leetcode's graphql API.

import axios from "axios";

interface Submission {
  timestamp: number;
  statusDisplay: string;
  title: string;
}


export async function getRecentSubmissions(username: string): Promise<Submission[]> {
  const query = `
    {
      recentSubmissionList(username: "${username}") {
        timestamp
        statusDisplay
        title
      }
    }
  `;

  try {
    const response = await axios.post("https://leetcode.com/graphql", { query }, {
      headers: { "Content-Type": "application/json" }
    });

    return response.data.data.recentSubmissionList;
  } catch (error) {
    console.error("Error fetching LeetCode data:", error);
    return [];
  }
}

export function solvedInLastHour(submissions: Submission[]): boolean {
  const oneHourAgo = Math.floor(Date.now() / 1000) - 3600;

  return submissions.some(submission =>
    submission.timestamp >= oneHourAgo && submission.statusDisplay === "Accepted"
  );
}
