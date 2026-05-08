'use client';

import { useEffect, useState } from 'react';
import { Octokit } from '@octokit/rest';

interface Commit {
  sha: string;
  commit: {
    author: {
      date?: string;
    } | null;
  };
}

export default function CommitTracker() {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCommits = async () => {
      try {
        const octokit = new Octokit();
        const response = await octokit.repos.listCommits({
          owner: 'nickhilster',
          repo: 'teambotics-website',
          per_page: 2,
        });
        setCommits(response.data);
      } catch (error) {
        console.error('Failed to fetch commits:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCommits();
  }, []);

  if (loading) {
    return (
      <div className="fixed bottom-4 left-4 bg-black/80 text-white text-xs px-2 py-1 rounded z-50">
        Loading...
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 bg-black/80 text-white text-xs px-2 py-1 rounded z-50 max-w-xs">
      <div className="font-semibold mb-1">Last Commits:</div>
      {commits.map((commit, index) => (
        <div key={commit.sha} className="truncate">
          {index + 1}. {commit.commit.author?.date ? new Date(commit.commit.author.date).toLocaleString() : 'Unknown'}
        </div>
      ))}
    </div>
  );
}