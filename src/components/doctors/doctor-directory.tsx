'use client';

import { useId, useState, useMemo } from 'react';
import type { Doctor } from '@/config/doctors';
import { Container } from '@/components/ui/container';
import { Input, Select } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/empty-state';
import { DoctorCard } from './doctor-card';
import { DataTablePagination } from '@/components/ui/data-table-pagination';

export function DoctorDirectory({ doctors }: { doctors: readonly Doctor[] }) {
  const [query, setQuery] = useState('');
  const [specialty, setSpecialty] = useState('all');
  const [page, setPage] = useState(1);
  const pageSize = 6;

  const searchId = useId();
  const specialtyId = useId();
  const specialties = [...new Set(doctors.map((doctor) => doctor.specialty))];
  const normalizedQuery = query.trim().toLocaleLowerCase();

  const results = useMemo(() => {
    return doctors.filter(
      (doctor) =>
        (specialty === 'all' || doctor.specialty === specialty) &&
        [doctor.name, doctor.specialty, ...doctor.interests].some((value) =>
          value.toLocaleLowerCase().includes(normalizedQuery),
        ),
    );
  }, [doctors, specialty, normalizedQuery]);

  const totalPages = Math.max(1, Math.ceil(results.length / pageSize));
  const currentPage = Math.min(page, totalPages);

  const paginatedResults = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return results.slice(start, start + pageSize);
  }, [results, currentPage, pageSize]);

  function reset() {
    setQuery('');
    setSpecialty('all');
    setPage(1);
  }

  return (
    <section
      aria-label="Doctor directory"
      className="bg-panel py-8 sm:py-10 lg:py-12"
    >
      <Container>
        <div className="mb-6 grid items-end gap-4 rounded-lg border border-line bg-canvas p-4 sm:p-5 md:grid-cols-[minmax(0,1fr)_minmax(15rem,0.65fr)_auto]">
          <div>
            <label
              htmlFor={searchId}
              className="mb-2 block text-xs font-semibold"
            >
              Search doctor
            </label>
            <div className="relative">
              <Input
                id={searchId}
                type="search"
                placeholder="Search by name or care area"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setPage(1);
                }}
                className="pr-11 text-sm"
              />
              <svg
                className="pointer-events-none absolute top-3.5 right-3.5 text-action"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <circle cx="10.5" cy="10.5" r="6.5" />
                <path d="m16 16 5 5" />
              </svg>
            </div>
          </div>
          <div>
            <label
              htmlFor={specialtyId}
              className="mb-2 block text-xs font-semibold"
            >
              Consultation area
            </label>
            <Select
              id={specialtyId}
              value={specialty}
              onChange={(event) => {
                setSpecialty(event.target.value);
                setPage(1);
              }}
              className="text-sm"
            >
              <option value="all">All consultation areas</option>
              {specialties.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </Select>
          </div>
          <Button
            variant="ghost"
            onClick={reset}
            disabled={!query && specialty === 'all'}
          >
            Reset filters
          </Button>
        </div>
        <p role="status" aria-live="polite" className="sr-only">
          <span className="font-semibold text-ink">{results.length}</span>{' '}
          {results.length === 1 ? 'profile' : 'profiles'}
          {query || specialty !== 'all' ? ' found' : ' to explore'}
        </p>
        {results.length ? (
          <div className="space-y-6">
            <ul className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {paginatedResults.map((doctor) => (
                <li key={doctor.id} className="flex min-w-0">
                  <DoctorCard doctor={doctor} />
                </li>
              ))}
            </ul>

            {/* Right-Aligned Pagination */}
            <DataTablePagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={results.length}
              pageSize={pageSize}
              onPageChange={setPage}
              className="pt-4 border-t border-line/60"
            />
          </div>
        ) : (
          <EmptyState
            title="No matching profiles"
            description="Try another name or consultation area, or clear the filters to see all profiles."
            action={
              <Button variant="outline" onClick={reset}>
                Clear filters
              </Button>
            }
          />
        )}
      </Container>
    </section>
  );
}
