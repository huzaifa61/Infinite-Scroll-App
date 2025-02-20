import { useState, useCallback } from 'react';
import { fetchPosts } from '../services/PostService';

const useInfiniteScroll = (limit = 10) => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = useCallback(async () => {
    if (!hasMore || loading) return;

    setLoading(true);
    setError(null);

    try {
      const { data, totalCount } = await fetchPosts(page, limit);
      setItems(prev => [...prev, ...data]);
      setHasMore(page * limit < totalCount);
      setPage(prev => prev + 1);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [page, hasMore, loading, limit]);

  return { items, loading, error, hasMore, loadMore };
};

export default useInfiniteScroll;