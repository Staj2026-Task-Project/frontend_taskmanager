interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = "Yükleniyor..." }: LoadingStateProps) {
  return <p>{message}</p>;
}
