import { useCallback, useEffect, useState } from "react";

/* To my interviewers: This code WAS written with AI.  I'm keeping it because,
I believe it's a useful pattern that I would like to adopt into my toolbet.
Feel free to ask me quesitons about it
*/

// Keep load stable (a module-level function or useCallback).
export function useApiQuery<T>(load: () => Promise<T>, errorMessage: string) {
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState<{
    load: typeof load;
    attempt: number;
    data?: T;
    error?: string;
    isLoading: boolean;
  }>({ load, attempt, isLoading: true });
  const retry = useCallback(() => setAttempt((value) => value + 1), []);

  useEffect(() => {
    let active = true;
    async function run() {
      try {
        const data = await load();
        if (active) setState({ load, attempt, data, isLoading: false });
      } catch {
        if (active)
          setState({ load, attempt, error: errorMessage, isLoading: false });
      }
    }
    void run();
    return () => {
      active = false;
    };
  }, [load, attempt, errorMessage]);

  // Hide data from a previous route/filter immediately, before the effect runs.
  const current = state.load === load && state.attempt === attempt;
  return {
    data: current ? state.data : undefined,
    error: current ? state.error : undefined,
    isLoading: !current || state.isLoading,
    retry,
  };
}
