"use client";


import FreelancerSearchForm, { SearchFilters } from "./components/FreelancerSearchForm";
import FreelancerResultsGrid, { Freelancer } from "./components/FreelancerResultsGrid";
import Pagination from "./components/Pagination";
import { useState } from "react";

export default function Home() {
  const [freelancers, setFreelancers] = useState<Freelancer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [count, setCount] = useState<number>(0);
  const [filters, setFilters] = useState<SearchFilters>({});
  const [page, setPage] = useState(1);
  const pageSize = 12;

  const fetchResults = async (filters: SearchFilters, pageNum: number) => {
    setLoading(true);
    setError(undefined);
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value === undefined || value === "") return;
        if (Array.isArray(value)) {
          value.forEach((v) => params.append(key, v));
        } else {
          params.append(key, String(value));
        }
      });
      params.append("limit", String(pageSize));
      params.append("offset", String((pageNum - 1) * pageSize));
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL
          ? `${process.env.NEXT_PUBLIC_API_URL}/freelancers/search?${params}`
          : `http://localhost:4001/freelancers/search?${params}`
      );
      if (!res.ok) throw new Error("API error");
      const [data, total] = await res.json();
      setFreelancers(data);
      setCount(total);
    } catch (e: unknown) {
      let message = "Unknown error";
      if (e instanceof Error) message = e.message;
      setError(message);
      setFreelancers([]);
      setCount(0);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (newFilters: SearchFilters) => {
    setFilters(newFilters);
    setPage(1);
    fetchResults(newFilters, 1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    fetchResults(filters, newPage);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white/90 rounded-2xl shadow-xl p-8 mt-8 mb-8 border border-gray-200">
        <h1 className="text-3xl font-extrabold text-center text-blue-700 mb-8 tracking-tight drop-shadow">Freelancer Search</h1>
        <FreelancerSearchForm onSearch={handleSearch} loading={loading} />
        <div className="mt-10">
          <div className="mb-4 text-lg text-gray-700 font-medium text-center">{count} freelancers found</div>
          <FreelancerResultsGrid freelancers={freelancers} loading={loading} error={error} />
          <Pagination page={page} pageSize={pageSize} total={count} onPageChange={handlePageChange} />
        </div>
      </div>
      <footer className="text-gray-400 text-xs mt-auto mb-2">&copy; {new Date().getFullYear()} Freelancer Marketplace</footer>
    </div>
  );
}
