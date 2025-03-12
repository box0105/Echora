import { useState, useEffect } from 'react';

export function useRent() {
  const [query, setQuery] = useState('');   // 🔍 搜索關鍵字
  const [results, setResults] = useState([]); // 📦 存儲API結果
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // **1. 獲取數據的函數**
  const fetchData = async (searchQuery) => {
    setIsLoading(true);
    setError(null);
    // console.log('发送 API 请求，查询参数：', searchQuery);  // 检查传递的查询
    try {
      const url = searchQuery 
        ? `http://localhost:3005/api/rent/search?query=${encodeURIComponent(searchQuery)}`
        : `http://localhost:3005/api/rent`;

      const response = await fetch(url);
      const data = await response.json();
      console.log('useRent API 响应:', data)
      setResults(data.data); // 🟢 設定 API 返回的數據
    } catch (err) {
      console.error('API 請求錯誤:', err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  // **2. 頁面載入時請求數據**
  useEffect(() => {
    console.log('query 更新:', query);  // 打印 query 变化
    fetchData(query);
  }, [query]); // 🔄 當 `query` 變化時，重新請求 API
  // console.log({ query, results, isLoading, error });
  return { query, setQuery, results, isLoading, error };
}
