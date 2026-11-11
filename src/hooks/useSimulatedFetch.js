import { useState, useEffect } from 'react'

/**
 * Simulates fetching data from an API.
 * Later (task 5) this will be replaced with a real fetch() call.
 */
export function useSimulatedFetch({ delay = 700, shouldFail = false } = {}) {
  const [status, setStatus] = useState('loading'); // 'loading' | 'success' | 'error'
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Fail only on the first try, so "Retry" works
      setStatus(shouldFail && attempt === 0 ? 'error' : 'success');
    }, delay);

    return () => clearTimeout(timer);
  }, [attempt, delay, shouldFail]);

  const retry = () => {
    setStatus('loading');
    setAttempt(attempt + 1);
  };

  return {
    isLoading: status === 'loading',
    isError: status === 'error',
    retry,
  };
}