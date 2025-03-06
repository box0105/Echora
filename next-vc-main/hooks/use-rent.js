import { useState, useEffect } from 'react';

export const useRent = (initialQuery = '') => {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('useEffect triggered for query:', query);  // 檢查 query 是否變更
    const fetchData = async () => {
      if (!query) {
        console.log('查詢字串為空，停止 API 請求');
        setIsLoading(false);
        return;  // 如果沒有查詢字串，則不進行 API 請求
      }
  
      setIsLoading(true);
      setError(null);
      try {
        const encodedQuery = encodeURIComponent(query);
        const res = await fetch(`http://localhost:3005/api/rent/search?q=${encodedQuery}`);
        if (!res.ok) throw new Error('API 請求失敗');
  
        const data = await res.json();
        console.log('API 回傳資料:', data);
        if (data.status === 'success' && data.data) {
          setResults(data.data);
        } else {
          setResults([]);
        }
      } catch (err) {
        setError(err);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, [query]);  
  return {
    query,
    setQuery,  // 返回 setQuery 而不是 updateQuery
    results, // 返回搜索結果
    isLoading,
    error,
  };
};
