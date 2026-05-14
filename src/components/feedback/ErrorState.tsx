interface ErrorStateProps {
  message?: string;
}

export function ErrorState({
  message = "Bir hata oluştu.",
}: ErrorStateProps) {
  return <p>{message}</p>;
}
