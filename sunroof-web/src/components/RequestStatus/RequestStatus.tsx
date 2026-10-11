interface RequestStatusProps {
  isLoading: boolean;
  error?: string;
  retry: () => void;
}

export function RequestStatus({ isLoading, error, retry }: RequestStatusProps) {
  if (isLoading) return <p role="status">Loading...</p>;
  if (!error) return null;
  return (
    <div role="alert">
      <p>{error}</p>
      <button
        type="button"
        className="button button--secondary"
        onClick={retry}
      >
        Try again
      </button>
    </div>
  );
}
