"use client";
"use client";
import React, { useState } from 'react';

const skillsList = [
  'NestJS',
  'React',
  'TypeScript',
  'PostgreSQL',
  'Node.js',
  'GraphQL',
  'Docker',
  'AWS',
];

export type SearchFilters = {
  skills?: string[];
  minRate?: number;
  maxRate?: number;
  minRating?: number;
  availability?: boolean;
  timezone?: string;
  location?: string;
  maxResponseTime?: number;
  hasPortfolio?: boolean;
};

type Props = {
  onSearch: (filters: SearchFilters) => void;
  loading: boolean;
};

export default function FreelancerSearchForm({ onSearch, loading }: Props) {
  const [filters, setFilters] = useState<SearchFilters>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const { name, value, type } = target;
    let newValue: string | boolean = value;
    if (type === 'checkbox') {
      newValue = (target as HTMLInputElement).checked;
    }
    setFilters((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(e.target.selectedOptions).map((o) => o.value);
    setFilters((prev) => ({ ...prev, skills: selected }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Convert numeric fields
    const parsed = { ...filters };
    if (parsed.minRate) parsed.minRate = Number(parsed.minRate);
    if (parsed.maxRate) parsed.maxRate = Number(parsed.maxRate);
    if (parsed.minRating) parsed.minRating = Number(parsed.minRating);
    if (parsed.maxResponseTime) parsed.maxResponseTime = Number(parsed.maxResponseTime);
    onSearch(parsed);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded bg-white">
      <div>
        <label className="block font-medium">Skills</label>
        <select
          name="skills"
          multiple
          value={filters.skills || []}
          onChange={handleSkillsChange}
          className="w-full border rounded p-2"
        >
          {skillsList.map((skill) => (
            <option key={skill} value={skill}>{skill}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block font-medium">Hourly Rate</label>
        <div className="flex gap-2">
          <input
            type="number"
            name="minRate"
            placeholder="Min"
            value={filters.minRate || ''}
            onChange={handleChange}
            className="border rounded p-2 w-1/2"
          />
          <input
            type="number"
            name="maxRate"
            placeholder="Max"
            value={filters.maxRate || ''}
            onChange={handleChange}
            className="border rounded p-2 w-1/2"
          />
        </div>
      </div>
      <div>
        <label className="block font-medium">Minimum Rating</label>
        <select
          name="minRating"
          value={filters.minRating || ''}
          onChange={handleChange}
          className="w-full border rounded p-2"
        >
          <option value="">Any</option>
          {[5, 4.5, 4, 3.5, 3].map((r) => (
            <option key={r} value={r}>{r}+</option>
          ))}
        </select>
      </div>
      <div className="flex gap-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="availability"
            checked={!!filters.availability}
            onChange={handleChange}
          />
          Available
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="hasPortfolio"
            checked={!!filters.hasPortfolio}
            onChange={handleChange}
          />
          Has Portfolio
        </label>
      </div>
      <div>
        <label className="block font-medium">Location</label>
        <input
          type="text"
          name="location"
          value={filters.location || ''}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </div>
      <div>
        <label className="block font-medium">Timezone</label>
        <input
          type="text"
          name="timezone"
          value={filters.timezone || ''}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </div>
      <div>
        <label className="block font-medium">Max Response Time (min)</label>
        <input
          type="number"
          name="maxResponseTime"
          value={filters.maxResponseTime || ''}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
}
