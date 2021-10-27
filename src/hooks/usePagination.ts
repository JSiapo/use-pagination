import { useState, useEffect } from 'react';

export const usePagination = ({
  itemsPerPage = 5,
  limitName = 'limit',
  offsetName = 'offset',
  dataLength = 0,
  isLoading = false,
  size = 4,
  isOffsetZero = false,
}: {
  itemsPerPage?: number;
  limitName?: string;
  offsetName?: string;
  dataLength: number;
  isLoading?: boolean;
  isOffsetZero?: boolean;
  size: number;
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState('');
  const [pageRange, setPageRange] = useState<number[]>([]);
  const [maxPage, setMaxPage] = useState(0);

  useEffect(() => {
    setCurrentPage(1);
    rangeRebuild();
  }, [itemsPerPage]);

  useEffect(() => {
    // rangeRebuild();
    if (pageRange.length === 0) {
      setCurrentPage(1);
    }
    if (pageRange[pageRange.length - 1] > rangeRebuild().pageLength) {
      setCurrentPage(isOffsetZero ? maxPage - 1 : maxPage);
    }
  }, [dataLength, isOffsetZero]);

  useEffect(() => {
    setMaxPage(Math.ceil(dataLength / itemsPerPage));
    rangeRebuild();
  }, [itemsPerPage, currentPage, dataLength]);

  useEffect(() => {
    if (isLoading) return;
    const queryURL = new URLSearchParams();
    queryURL.append(limitName, `${itemsPerPage}`);
    queryURL.append(
      offsetName,
      `${isOffsetZero ? currentPage - 1 : currentPage}`
    );
    setQuery(queryURL.toString());
    setMaxPage(Math.ceil(dataLength / itemsPerPage));
    rangeRebuild();
  }, [itemsPerPage, currentPage, isOffsetZero]);

  const nextPage = () => {
    if (isLoading) return;
    setCurrentPage(currentPage >= maxPage ? maxPage : currentPage + 1);
  };
  const previusPage = () => {
    if (isLoading) return;
    setCurrentPage(currentPage <= 1 ? 1 : currentPage - 1);
  };

  const jumpToFirstPage = () => {
    if (isLoading) return;
    setCurrentPage(1);
  };
  const jumpToLastPage = () => {
    if (isLoading) return;
    setCurrentPage(maxPage);
  };

  const jumpToPage = (newPage: number) => {
    if (isLoading) return;
    setCurrentPage(newPage);
  };

  const rangeRebuild = () => {
    const numberOfPages = Math.ceil(dataLength / itemsPerPage);
    const pageLength = numberOfPages < size ? numberOfPages : size;

    if (pageRange.length == 0 || currentPage < size) {
      setPageRange(Array.from(Array(pageLength), (_, i) => i + 1));
    }

    setPageRange(
      Array.from(
        Array(pageLength),
        (_, i) => i + (currentPage - size >= 1 ? currentPage - size + 1 : 1)
      )
    );
    return { pageLength };
  };

  return {
    page: currentPage,
    query,
    nextPage,
    previusPage,
    pageRange,
    jumpToPage,
    jumpToFirstPage,
    jumpToLastPage,
    lastPage: maxPage,
  };
};
