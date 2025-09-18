import React, { useState, useEffect } from 'react';

// Define the structure for matches from the API
interface APIMatch {
  id: number;
  teams: string[];
  date: string;
  odds: { [key: string]: number };
  result: string | null;
}

interface APIMatchCategory {
  category: string;
  matches: APIMatch[];
}

// Define the structure for matches used in the frontend
interface Match {
  id: number;
  teamA: string;
  teamB: string;
  date: string;
  odds: { [key: string]: number };
  result: string | null;
  category: string;
  status: 'upcoming' | 'live' | 'finished';
  liveScore?: { teamA: number; teamB: number };
  popularity?: number;
}

const MatchesFetcher: React.FC<{
  onMatchesFetched: (matches: Match[]) => void;
}> = ({ onMatchesFetched }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true);
        console.log('Fetching matches from /api/matches');
        const response = await fetch('/api/matches');
        console.log('Response status:', response.status);
        if (!response.ok) {
          throw new Error(`Failed to fetch matches: ${response.status} ${response.statusText}`);
        }
        const apiMatches: APIMatchCategory[] = await response.json();
        console.log('Received matches:', apiMatches);
        
        // Transform API data to match frontend interface
        const transformedMatches: Match[] = apiMatches.flatMap(categoryObj => 
          categoryObj.matches.map(apiMatch => {
            const matchStatus = new Date(apiMatch.date) > new Date() ? 'upcoming' : 
                   new Date(apiMatch.date) < new Date() && new Date(apiMatch.date) > new Date(Date.now() - 3600000) ? 'live' : 'finished';
            
            console.log('Match status for', apiMatch.id, ':', matchStatus);
            
            return {
              id: apiMatch.id,
              teamA: apiMatch.teams[0],
              teamB: apiMatch.teams[1],
              date: apiMatch.date,
              odds: apiMatch.odds,
              result: apiMatch.result,
              category: categoryObj.category,
              status: matchStatus,
            };
          })
        );
        
        console.log('Transformed matches:', transformedMatches);
        onMatchesFetched(transformedMatches);
        setError(null);
      } catch (err) {
        console.error('Error fetching matches:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [onMatchesFetched]);

  if (loading) {
    return <div className="text-center p-4">Loading matches...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">Error: {error}</div>;
  }

  return null;
};

export default MatchesFetcher;