// leetcode.ts
//
// Implements the actual fetching from leetcode's graphql API.

import axios from "axios";

interface Submission {
  timestamp: number;
  statusDisplay: string;
  title: string;
  titleSlug: string;
}

const SECONDS_IN_HR = 3600;
const SECONDS_IN_DAY = 86400;

// Returns a list of the user's most recent submissions.
export async function getRecentSubmissions(username: string): Promise<Submission[]> {
  const query = `
    {
      recentSubmissionList(username: "${username}", limit: 10) {
        timestamp
        statusDisplay
        title
        titleSlug
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

// Returns `true` if the user has solved a Leetcode problem in the last hour or not.
export function solvedInLastHour(submissions: Submission[]): boolean {
  const oneHourAgo = Math.floor(Date.now() / 1000) - SECONDS_IN_HR;

  return submissions.some(submission =>
    submission.timestamp >= oneHourAgo 
    && submission.statusDisplay === "Accepted"
  );
}

function getUniqueSubmissions(submissions: Submission[]): Submission[] {
  const uniqueSubmissions: { [title: string]: Submission } = {};

    for (const submission of submissions) {
        // If the title is not in the object, add it. Otherwise, choose the latest one based on timestamp.
        if (!uniqueSubmissions[submission.title] || submission.timestamp > uniqueSubmissions[submission.title].timestamp) {
            uniqueSubmissions[submission.title] = submission;
        }
    }

    // Convert the object values to an array and return the unique submissions
    return Object.values(uniqueSubmissions);
}


export async function solvedToday(username: string): Promise<string[]> {
  const twentyFourHoursAgo = Math.floor(Date.now() / 1000) - SECONDS_IN_DAY;
  let submissions: Submission[] = await getRecentSubmissions(username);

  console.log(`Checking ${username}'s submissions for daily update..`);
  console.log(submissions);

  try {
    return getUniqueSubmissions(submissions.filter(submission =>
      submission.timestamp >= twentyFourHoursAgo 
      && submission.statusDisplay === "Accepted"
    )).map(submission => `[${submission.title}](https://leetcode.com/problems/${submission.titleSlug})`);
  } catch (error) {
    console.error("Error fetching LeetCode data:", error);
    return [];
  }
}