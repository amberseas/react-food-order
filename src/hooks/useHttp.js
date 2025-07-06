import { useState, useEffect, useCallback } from 'react';

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

  const clearData = () => {
    setFetchedData(initialValue);
  };

  const sendRequest = useCallback(
    async function sendRequest(data) {
      setIsFetching(true);
      try {
        const resData = await sendHttpRequest(url, { ...config, body: data });
        setFetchedData(resData);
      } catch (error) {
        setError(
          error.message || 'Failed to fetch meals, please try again later.'
        );
      }
      setIsFetching(false);
    },
    [url, config]
  );

  useEffect(() => {
    if ((config && (config.method === 'GET' || !config.method)) || !config) {
      sendRequest();
    }
  }, [sendRequest, config]);

  return {
    isFetching,
    fetchedData,
    error,
    sendRequest,
    clearData,
  };
}
