import React, { useState } from 'react';
import Loading from './Loading';
import { usePagination } from '../hooks/usePagination';

const TestComponent = () => {
  const [limit, setLimit] = useState(6);
  const [data, setData] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const {
    page,
    query,
    nextPage,
    previusPage,
    pageRange,
    jumpToPage,
    jumpToFirstPage,
    jumpToLastPage,
  } = usePagination({
    itemsPerPage: limit,
    dataLength: data.length,
    size: 4,
    isLoading,
  });

  return (
    <div className="mockup-window bg-base-300 m-5 sm:m-0">
      <div className="justify-center px-16 py-16 mx-auto bg-base-200">
        <button type="button" className="btn-link" id="query">
          https://my.api.com/posts/?{query}
        </button>
        <div className="divider"></div>
        <div className="container flex space-x-4">
          <button
            type="button"
            className="btn btn-primary mx-2"
            id="btn-decrease-size"
            onClick={() => setLimit(limit <= 1 ? 1 : limit - 1)}
          >
            -
          </button>
          <p
            className="rounded-md font-extrabold text-center px-6 py-4"
            id="limit"
          >
            {limit}
          </p>
          <button
            type="button"
            className="btn btn-primary mx-2"
            id="btn-increase-size"
            onClick={() => setLimit(limit + 1)}
          >
            +
          </button>
          <p className="rounded-md font-extrabold text-center px-6 py-4">
            Items per page
          </p>
        </div>
        <div className="container flex space-x-4">
          <button
            type="button"
            className="btn btn-primary mx-2"
            id="btn-add-data"
            onClick={() => {
              data.splice(-1);
              setData([...data]);
            }}
          >
            Remove data
          </button>
          <button
            type="button"
            className="btn btn-primary mx-2"
            id="btn-remove-data"
            onClick={() => setData([...data, data.length])}
          >
            Add data
          </button>
        </div>
        <button
          type="button"
          className="btn btn-primary mx-2 m-2"
          id="btn-toggleLoading"
          onClick={() => setIsLoading(!isLoading)}
        >
          <p className="mx-3">Loading</p> {isLoading && <Loading />}
        </button>
        <p className="my-4" id="data-length">
          Hay <span className="font-extrabold">{data.length}</span> elementos
        </p>

        <div className="btn-group">
          <button
            type="button"
            className={`btn ${isLoading ? 'btn-disabled' : ''}`}
            id="btn-jumpToFirst"
            onClick={jumpToFirstPage}
          >
            {'«'}
          </button>
          <button
            type="button"
            className={`btn ${isLoading ? 'btn-disabled' : ''}`}
            onClick={previusPage}
            id="btn-jumpToPrev"
          >
            {'PREV'}
          </button>
          {pageRange.map(pageFromArray => (
            <button
              key={pageFromArray}
              type="button"
              value={pageFromArray}
              id="btn-page"
              className={`btn ${pageFromArray === page ? 'btn-active' : ''} ${
                isLoading ? 'btn-disabled' : ''
              }`}
              onClick={() => jumpToPage(pageFromArray)}
            >
              {pageFromArray}
            </button>
          ))}
          <button
            type="button"
            className={`btn ${isLoading ? 'btn-disabled' : ''}`}
            onClick={nextPage}
            id="btn-jumpToNext"
          >
            {'NEXT'}
          </button>
          <button
            type="button"
            className={`btn ${isLoading ? 'btn-disabled' : ''}`}
            onClick={jumpToLastPage}
            id="btn-jumpToLast"
          >
            {'»'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestComponent;
