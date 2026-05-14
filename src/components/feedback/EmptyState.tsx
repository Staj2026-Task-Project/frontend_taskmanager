interface EmptyStateProps {
  message?: string;
}

export function EmptyState({
  message = "Kayıt bulunamadı.",
}: EmptyStateProps) {
  return <p>{message}</p>;
}
