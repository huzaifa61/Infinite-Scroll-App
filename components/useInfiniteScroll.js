import { useState, useCallback, useEffect } from 'react';
import { fetchPosts } from '../services/PostService';
import {  LOADING_STATES, ERROR_MESSAGES } from '../enums';

const InfiniteScroll = ({ limit = 10, children }) => { 
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loadingState, setLoadingState] = useState(LOADING_STATES.IDLE);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = useCallback(async () => {
    if (!hasMore || loadingState === LOADING_STATES.LOADING) return;

    setLoadingState(LOADING_STATES.LOADING);
    setError(null);

    try {
      const { data, totalCount } = await fetchPosts(page, limit); 
      setItems(prev => [...prev, ...data]);
      setHasMore(page * limit < totalCount); 
      setPage(prev => prev + 1);
      setLoadingState(LOADING_STATES.SUCCESS);
    } catch (err) {
      setError(ERROR_MESSAGES.FETCH_FAILED);
      setLoadingState(LOADING_STATES.ERROR);
    }
  }, [page, hasMore, loadingState, limit]);

  useEffect(() => {
    loadMore();
  }, []);

  return children({
    items,
    loading: loadingState === LOADING_STATES.LOADING,
    error,
    hasMore,
    loadMore,
  });
};

export default InfiniteScroll;