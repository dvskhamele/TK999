import React, { useState, useEffect } from 'react';
import { apiCall } from '../utils/api';

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
        const apiMatches: APIMatchCategory[] = await apiCall('/api/matches');
        console.log('Received matches:', apiMatches);
        
        // Transform API data to match frontend interface
        const transformedMatches: Match[] = apiMatches.flatMap(categoryObj => 
          categoryObj.matches.map(apiMatch => {
            const matchStatus = new Date(apiMatch.date) > new Date() ? 
                   'upcoming' : 
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
        // Display a more user-friendly error message
        if (err instanceof Error && err.message.includes('API base URL is not configured')) {
          setError('API configuration error. Please contact the administrator.');
        } else {
          setError(err instanceof Error ? err.message : 'Failed to load matches. Please try again later.');
        }
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
    return (
      <div className="text-center p-4">
        <div className="text-red-500 mb-2">Error: {error}</div>
        <div className="text-gray-500 text-sm">
          {error.includes('API configuration') 
            ? 'The application is not properly configured.' 
            : 'Unable to load betting matches at this time.'}
        </div>
      </div>
    );
  }

  return null;
};

export default MatchesFetcher;