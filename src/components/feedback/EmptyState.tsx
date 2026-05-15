interface EmptyStateProps {
  message?: string;
}

export function EmptyState({ message = "Kayıt bulunamadı." }: EmptyStateProps) {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center justify-center rounded-2xl border border-gray-200 bg-gray-50 p-8 text-center shadow-sm sm:p-12">
      <svg
        className="mb-4 h-12 w-12 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
        />
      </svg>
      <h3 className="text-base font-medium text-gray-900">{message}</h3>
    </div>
  );
}