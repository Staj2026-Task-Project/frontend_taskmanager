interface ErrorStateProps {
  message?: string;
}

export function ErrorState({ message = "Bir hata oluştu." }: ErrorStateProps) {
  return (
    <div className="flex w-full items-start rounded-lg border-l-4 border-red-500 bg-red-50 p-4 shadow-sm sm:items-center">
      <svg
        className="mr-3 h-5 w-5 shrink-0 text-red-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
      <p className="text-sm font-medium text-red-800">{message}</p>
    </div>
  );
}