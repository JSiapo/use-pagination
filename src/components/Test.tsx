import React from 'react';
import { MouseEventHandler, ReactNode, useState, useEffect } from 'react';
import { usePagination } from '../hooks/usePagination';

const Test = () => {
  const [limit, setLimit] = useState(6);
  const [data, setData] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [startWithZero, setStartWithZero] = useState(false);
  const {
    page,
    query,
    pageRange,
    nextPage,
    previusPage,
    jumpToPage,
    jumpToFirstPage,
    jumpToLastPage,
    lastPage,
  } = usePagination({
    itemsPerPage: limit,
    dataLength: data.length,
    size: 4,
    isLoading,
    isOffsetZero: startWithZero,
  });

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
  }, []);

  const handleData = ({ type }: { type: string }) => {
    if (type === 'decrease') {
      data.splice(-1);
      setData([...data]);
      return;
    }
    setData([...data, data.length]);
  };

  const handleLoading = () => setIsLoading(!isLoading);
  const handleSetStartOffsetWithZero = () => setStartWithZero(!startWithZero);

  return (
    <MockUp isDark={isDark}>
      <QueryLink query={query} api="https://my.api.com/posts" />

      <Divider />
      {/* Pages Group */}
      <ButtonGroup>
        <Button action={() => setLimit(limit <= 1 ? 1 : limit - 1)}>-</Button>
        <p className="rounded-md font-extrabold text-center px-6 py-4">
          {limit}
        </p>
        <Button action={() => setLimit(limit + 1)}>+</Button>
        <p className="rounded-md font-extrabold text-center px-6 py-4">
          Items per page
        </p>
      </ButtonGroup>

      {/* Data Group */}
      <ButtonGroup>
        <Button
          action={() => {
            handleData({ type: 'decrease' });
          }}
        >
          Remove data
        </Button>
        <Button action={() => handleData({ type: 'increase' })}>
          Add data
        </Button>
      </ButtonGroup>

      {/* Details Group */}
      <>
        <Button action={handleLoading}>
          <p className="mx-3">Loading</p> {isLoading && <Loading />}
        </Button>
        <Button action={handleSetStartOffsetWithZero}>Start with zero</Button>
        <Details data={data} lastPage={lastPage} page={page} />
      </>

      <PaginationGroup>
        <PaginationItem isLoading={isLoading} action={jumpToFirstPage}>
          «
        </PaginationItem>
        <PaginationItem isLoading={isLoading} action={previusPage}>
          PREV
        </PaginationItem>
        {pageRange.map(pageFromArray => (
          <PaginationItem
            key={pageFromArray}
            isLoading={isLoading}
            value={pageFromArray}
            active={`btn ${pageFromArray === page ? 'btn-active' : ''} ${
              isLoading ? 'btn-disabled' : ''
            }`}
            action={() => jumpToPage(pageFromArray)}
          >
            {pageFromArray}
          </PaginationItem>
        ))}
        <PaginationItem isLoading={isLoading} action={nextPage}>
          NEXT
        </PaginationItem>
        <PaginationItem isLoading={isLoading} action={jumpToLastPage}>
          »
        </PaginationItem>
      </PaginationGroup>

      <Divider />
      <Footer />
    </MockUp>
  );
};

const ButtonGroup = ({ children }: { children: ReactNode }) => (
  <div className="container flex space-x-4 my-2">{children}</div>
);

const PaginationGroup = ({ children }: { children: ReactNode }) => (
  <div className="btn-group">{children}</div>
);

// ***

const QueryLink = ({ api, query }: { api: string; query: string }) => (
  <button type="button" className="btn-link">
    {api}/?{query}
  </button>
);

const Button = ({
  children,
  action,
}: {
  children: ReactNode;
  action: MouseEventHandler<HTMLButtonElement> | undefined;
}) => (
  <button type="button" className="btn btn-primary mx-2" onClick={action}>
    {children}
  </button>
);

const PaginationItem = ({
  isLoading,
  children,
  action,
  active,
  value,
  ...props
}: {
  isLoading: boolean;
  children: ReactNode;
  action: MouseEventHandler<HTMLButtonElement> | undefined;
  value?: number;
  active?: string;
}) => (
  <button
    type="button"
    className={active ?? `btn ${isLoading ? 'btn-disabled' : ''}`}
    onClick={action}
    value={value}
    {...props}
  >
    {children}
  </button>
);

const Loading = () => (
  <svg
    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx={12}
      cy={12}
      r={10}
      stroke="currentColor"
      strokeWidth={4}
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

const Footer = () => (
  <a href="/">
    <p className="flex justify-center mx-auto cursor-pointer">
      Go to homepage 👉
    </p>
  </a>
);

const MockUp = ({
  isDark,
  children,
}: {
  isDark: boolean;
  children: ReactNode;
}) => (
  <div
    className="mockup-window bg-base-300 m-5 sm:m-0"
    data-theme={`${isDark ? 'halloween' : 'light'}`}
  >
    <div className="justify-center px-16 py-16 mx-auto bg-base-200">
      {children}
    </div>
  </div>
);

const Divider = () => <div className="divider"></div>;

const Details = ({
  data,
  lastPage,
  page,
}: {
  data: number[];
  lastPage: number;
  page: number;
}) => (
  <div className="my-2">
    <p>
      There are <span className="font-extrabold">{lastPage}</span> pages{' '}
      <span>{lastPage === page && <span>and this is Last Page</span>}</span>
    </p>
    <p className="my-4">
      There are <span className="font-extrabold">{data.length}</span> elements
    </p>
  </div>
);

export default Test;
