import React from 'react';

export type Freelancer = {
  id: string;
  full_name: string;
  email: string;
  location: string;
  timezone: string;
  hourly_rate: number;
  average_rating: number;
  response_time: number;
  availability: boolean;
  portfolio_url?: string | null;
  skills: { id: string; name: string }[];
};

type Props = {
  freelancers: Freelancer[];
  loading: boolean;
  error?: string;
};

export default function FreelancerResultsGrid({ freelancers, loading, error }: Props) {
  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;
  if (!freelancers.length) return <div className="p-4">No results found.</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {freelancers.map((f) => (
        <div key={f.id} className="border rounded p-4 bg-white shadow">
          <div className="font-bold text-lg mb-1">{f.full_name}</div>
          <div className="text-sm text-gray-600 mb-2">{f.location} ({f.timezone})</div>
          <div className="mb-2">
            <span className="font-semibold">Rate:</span> ${f.hourly_rate}/hr
            <span className="ml-4 font-semibold">Rating:</span> {f.average_rating} ⭐
          </div>
          <div className="mb-2">
            <span className="font-semibold">Response:</span> {f.response_time} min
            <span className="ml-4 font-semibold">{f.availability ? 'Available' : 'Unavailable'}</span>
          </div>
          <div className="mb-2">
            <span className="font-semibold">Skills:</span> {f.skills.map((s) => s.name).join(', ')}
          </div>
          {f.portfolio_url && (
            <a
              href={f.portfolio_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Portfolio
            </a>
          )}
        </div>
      ))}
    </div>
  );
}
