import { API_ENDPOINTS } from '../enums';

export const fetchPosts = async (page, limit) => {
  const response = await fetch(
    `${API_ENDPOINTS.POSTS}?_page=${page}&_limit=${limit}`
  );
  if (!response.ok) throw new Error('Failed to fetch posts');

  const data = await response.json();
  const totalCount = parseInt(response.headers.get('x-total-count'), 10);
  return { data, totalCount };
};