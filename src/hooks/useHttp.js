import { useState, useEffect } from 'react';

async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error(
      resData.message || 'Failed to fetch data, please try again later.'
    );
  }

  return resData;
}

export function useHttp(url, config, initialValue) {
  const [isFetching, setIsFetching] = useState();
  const [error, setError] = useState();
  const [fetchedData, setFetchedData] = useState(initialValue);

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      try {
        const resData = await sendHttpRequest(url, config);
        setFetchedData(resData);
      } catch (error) {
        setError(
          error.message || 'Failed to fetch meals, please try again later.'
        );
      }
      setIsFetching(false);
    }
    if ((config && (config.method === 'GET' || !config.method)) || !config) {
      fetchData();
    }
  }, [url, config]);

  return {
    isFetching,
    fetchedData,
    setFetchedData,
    error,
    setError,
    fetchedData,
  };
}
