'use client';

import { useState, useMemo } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { DataTablePagination, DataTableToolbar } from '@/components/ui/data-table-pagination';

export interface EnquiryItem {
  id: string;
  received: string;
  source: string;
  name: string;
  phone: string;
  email?: string;
  topic: string;
  message: string;
  resolved: boolean;
  inProgress: boolean;
}

interface EnquiriesTableProps {
  entries: EnquiryItem[];
  onAction: (id: string, inProgress: boolean) => Promise<void>;
}

export function EnquiriesTable({ entries, onAction }: EnquiriesTableProps) {
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryItem | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const handleAction = async (id: string, inProgress: boolean) => {
    setLoadingId(id);
    try {
      await onAction(id, inProgress);
      if (selectedEnquiry && selectedEnquiry.id === id) {
        setSelectedEnquiry((prev) =>
          prev
            ? {
                ...prev,
                resolved: !inProgress,
                inProgress: inProgress,
              }
            : null,
        );
      }
    } finally {
      setLoadingId(null);
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleString('en-NP', {
        timeZone: 'Asia/Kathmandu',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateStr;
    }
  };

  // Search filter
  const filteredEntries = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return entries;
    return entries.filter(
      (entry) =>
        entry.name.toLowerCase().includes(q) ||
        entry.phone.toLowerCase().includes(q) ||
        (entry.email && entry.email.toLowerCase().includes(q)) ||
        entry.topic.toLowerCase().includes(q) ||
        entry.message.toLowerCase().includes(q) ||
        entry.source.toLowerCase().includes(q),
    );
  }, [entries, search]);

  const totalPages = Math.max(1, Math.ceil(filteredEntries.length / pageSize));
  const currentPage = Math.min(page, totalPages);

  const paginatedEntries = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredEntries.slice(start, start + pageSize);
  }, [filteredEntries, currentPage, pageSize]);

  return (
    <div className="space-y-3">
      {/* Table Toolbar: Page Size Selector on Left, Search Box on Right */}
      <DataTableToolbar
        pageSize={pageSize}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setPage(1);
        }}
        searchValue={search}
        onSearchChange={(val) => {
          setSearch(val);
          setPage(1);
        }}
        searchPlaceholder="Search patient, phone, concern..."
      />

      {/* Main Table */}
      <div className="overflow-hidden rounded-lg border border-line bg-canvas shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-line bg-panel/75 text-[11px] font-medium text-muted">
                <th scope="col" className="px-4 py-3">
                  Patient & Contact
                </th>
                <th scope="col" className="px-3 py-3">
                  Topic / Concern
                </th>
                <th scope="col" className="px-3 py-3">
                  Message / Details
                </th>
                <th scope="col" className="px-3 py-3">
                  Received Time
                </th>
                <th scope="col" className="px-3 py-3">
                  Status
                </th>
                <th scope="col" className="px-4 py-3 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {paginatedEntries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-xs text-muted">
                    {search ? `No enquiries match "${search}".` : 'No enquiries found.'}
                  </td>
                </tr>
              ) : (
                paginatedEntries.map((entry) => {
                  const isLoading = loadingId === entry.id;
                  return (
                    <tr
                      key={entry.id}
                      className="transition-colors hover:bg-panel/30"
                    >
                      {/* Patient & Contact */}
                      <td className="px-4 py-3.5">
                        <div className="min-w-[160px]">
                          <p className="font-semibold text-ink text-[13px]">
                            {entry.name}
                          </p>
                          <div className="mt-1 flex flex-wrap items-center gap-2">
                            <a
                              href={`tel:${entry.phone}`}
                              className="inline-flex items-center gap-1 font-mono text-[11px] text-action hover:underline"
                              title="Call patient"
                            >
                              <svg
                                className="size-3"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                                />
                              </svg>
                              <span>{entry.phone}</span>
                            </a>
                            {entry.email && (
                              <a
                                href={`mailto:${entry.email}`}
                                className="inline-flex items-center gap-1 text-[11px] text-muted hover:text-action truncate max-w-[120px]"
                                title={entry.email}
                              >
                                <span>{entry.email}</span>
                              </a>
                            )}
                          </div>
                          <span className="mt-1 inline-block text-[10px] text-muted font-medium">
                            Source: {entry.source}
                          </span>
                        </div>
                      </td>

                      {/* Topic / Concern */}
                      <td className="px-3 py-3.5">
                        <span className="inline-block rounded-md border border-line bg-panel px-2.5 py-1 text-xs font-semibold text-ink whitespace-nowrap">
                          {entry.topic || 'General enquiry'}
                        </span>
                      </td>

                      {/* Message Preview */}
                      <td className="px-3 py-3.5 max-w-[260px]">
                        <p className="line-clamp-2 text-xs text-muted leading-relaxed">
                          {entry.message || 'No additional note.'}
                        </p>
                      </td>

                      {/* Received Time */}
                      <td className="px-3 py-3.5 whitespace-nowrap text-muted text-[11px]">
                        {formatDate(entry.received)}
                      </td>

                      {/* Status */}
                      <td className="px-3 py-3.5 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold border ${
                            entry.resolved
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                              : entry.inProgress
                                ? 'bg-blue-50 text-blue-800 border-blue-200'
                                : 'bg-amber-50 text-amber-800 border-amber-200'
                          }`}
                        >
                          <span
                            className={`size-1.5 rounded-full ${
                              entry.resolved
                                ? 'bg-emerald-600'
                                : entry.inProgress
                                  ? 'bg-blue-600'
                                  : 'bg-amber-500'
                            }`}
                          />
                          {entry.resolved
                            ? 'Resolved'
                            : entry.inProgress
                              ? 'In progress'
                              : 'New Enquiry'}
                        </span>
                      </td>

                      {/* Action Buttons */}
                      <td className="px-4 py-3.5 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* View Button */}
                          <button
                            type="button"
                            onClick={() => setSelectedEnquiry(entry)}
                            className="inline-flex items-center gap-1 rounded-md border border-line bg-panel px-2.5 py-1.5 text-xs font-medium text-ink transition-colors hover:border-action/40 hover:bg-soft hover:text-action cursor-pointer"
                          >
                            <svg
                              className="size-3.5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={1.8}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                            <span>View</span>
                          </button>

                          {/* Status Change Buttons */}
                          {!entry.resolved && !entry.inProgress && (
                            <button
                              type="button"
                              disabled={isLoading}
                              onClick={() => handleAction(entry.id, true)}
                              className="inline-flex items-center rounded-md border border-blue-200 bg-blue-50 px-2.5 py-1.5 text-xs font-medium text-blue-800 transition-colors hover:bg-blue-100 disabled:opacity-50 cursor-pointer"
                            >
                              Follow-up
                            </button>
                          )}

                          {!entry.resolved && (
                            <button
                              type="button"
                              disabled={isLoading}
                              onClick={() => handleAction(entry.id, false)}
                              className="inline-flex items-center rounded-md border border-emerald-300 bg-emerald-600 px-2.5 py-1.5 text-xs font-medium text-white transition-colors hover:bg-emerald-700 disabled:opacity-50 cursor-pointer"
                            >
                              Resolve
                            </button>
                          )}

                          {entry.resolved && (
                            <button
                              type="button"
                              disabled={isLoading}
                              onClick={() => handleAction(entry.id, true)}
                              className="inline-flex items-center rounded-md border border-line bg-panel px-2.5 py-1.5 text-xs font-medium text-muted transition-colors hover:text-ink cursor-pointer"
                              title="Re-open enquiry"
                            >
                              Reopen
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* DataTable Pagination Bar (Showing X to Y on left, Page Changer on right) */}
      <DataTablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredEntries.length}
        pageSize={pageSize}
        onPageChange={setPage}
      />

      {/* View Detail Modal Dialog */}
      <Dialog
        open={Boolean(selectedEnquiry)}
        onOpenChange={(open) => !open && setSelectedEnquiry(null)}
      >
        {selectedEnquiry && (
          <DialogContent
            title={`Enquiry: ${selectedEnquiry.name}`}
            description={`Received on ${formatDate(selectedEnquiry.received)}`}
            className="w-[min(calc(100%-2rem),40rem)]"
          >
            <div className="space-y-4 pt-2">
              {/* Header Info Banner */}
              <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-line bg-panel/60 p-3.5">
                <div>
                  <span className="text-[11px] font-semibold text-muted uppercase tracking-wider block">
                    Source
                  </span>
                  <span className="text-xs font-semibold text-ink">
                    {selectedEnquiry.source}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-muted uppercase tracking-wider block">
                    Concern / Topic
                  </span>
                  <span className="text-xs font-semibold text-action">
                    {selectedEnquiry.topic || 'General enquiry'}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-muted uppercase tracking-wider block">
                    Status
                  </span>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      selectedEnquiry.resolved
                        ? 'bg-emerald-100 text-emerald-800'
                        : selectedEnquiry.inProgress
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {selectedEnquiry.resolved
                      ? '✓ Resolved'
                      : selectedEnquiry.inProgress
                        ? '⏳ In progress'
                        : '● New Enquiry'}
                  </span>
                </div>
              </div>

              {/* Patient Contact Info */}
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-line bg-canvas p-3">
                  <span className="text-[11px] font-semibold text-muted uppercase tracking-wider block">
                    Patient Phone
                  </span>
                  <a
                    href={`tel:${selectedEnquiry.phone}`}
                    className="mt-1 inline-flex items-center gap-1.5 font-mono text-sm font-bold text-action hover:underline"
                  >
                    <svg className="size-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                    <span>{selectedEnquiry.phone}</span>
                  </a>
                </div>

                <div className="rounded-lg border border-line bg-canvas p-3">
                  <span className="text-[11px] font-semibold text-muted uppercase tracking-wider block">
                    Email Address
                  </span>
                  {selectedEnquiry.email ? (
                    <a
                      href={`mailto:${selectedEnquiry.email}`}
                      className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-action hover:underline truncate"
                    >
                      <svg className="size-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                      <span>{selectedEnquiry.email}</span>
                    </a>
                  ) : (
                    <span className="mt-1 text-xs text-muted block italic">
                      No email provided
                    </span>
                  )}
                </div>
              </div>

              {/* Message / Details Card */}
              <div>
                <span className="text-[11px] font-semibold text-muted uppercase tracking-wider mb-1.5 block">
                  Message / Preference Details
                </span>
                <div className="rounded-lg border border-line bg-panel/40 p-4 text-xs leading-relaxed text-ink whitespace-pre-wrap break-words">
                  {selectedEnquiry.message || 'No additional note provided by the patient.'}
                </div>
              </div>

              {/* Modal Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line pt-4">
                <a
                  href={`tel:${selectedEnquiry.phone}`}
                  className="inline-flex items-center gap-1.5 rounded-md bg-action px-3 py-1.5 text-xs font-semibold text-white shadow-2xs hover:bg-action/90"
                >
                  <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  <span>Call {selectedEnquiry.name.split(' ')[0]}</span>
                </a>

                <div className="flex items-center gap-2">
                  {!selectedEnquiry.resolved && !selectedEnquiry.inProgress && (
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => handleAction(selectedEnquiry.id, true)}
                    >
                      Start follow-up
                    </Button>
                  )}

                  {!selectedEnquiry.resolved && (
                    <Button
                      type="button"
                      size="sm"
                      className="bg-emerald-600 text-white hover:bg-emerald-700"
                      onClick={() => handleAction(selectedEnquiry.id, false)}
                    >
                      Mark as resolved
                    </Button>
                  )}

                  {selectedEnquiry.resolved && (
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => handleAction(selectedEnquiry.id, true)}
                    >
                      Re-open enquiry
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
