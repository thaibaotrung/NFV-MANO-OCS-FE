import { useState } from 'react';

export const usePagination = <F>(defaultLimit?: number) => {
  const DEFAULT_LIMIT = 10;
  const [limit, setLimit] = useState(defaultLimit || DEFAULT_LIMIT);
  const [page, setPage] = useState(1);

  const [total, setTotal] = useState(0);

  return {
    limit,
    page,
    setPage,
    setLimit,
    setTotal,
    total
  };
};
