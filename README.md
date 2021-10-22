# Use Pagination 📖

Hook for using **asynchronous calls with custom API 🚧 paging**, which has querys for **paging**

Inspired to use it with [swr](https://swr.vercel.app/es-ES) or [react-query](https://react-query.tanstack.com/), and the api returns the number of total elements

⚠️ **View demo [here](https://jsiapo.dev/npm/use-pagination)**

## Install

```sh
npm install --save @jsiapo/use-pagination
```

## Usage

Example **API Response**

```json
{
  "result": [{}, {}, {}, {}],
  "count": 135,
  ...
}
```

Where **result** is the list of elements **to display (limited by offset and limit)** and **count** is the **total of elements** of all databases (like **`select count(*) from table`)**.

> ⚠️ If you want to see the **complete example**, you can see it **[here](https://github.com/JSiapo/use-pagination/blob/master/src/components/Test.tsx)**

```jsx
const Test = () => {
  const [limit, setLimit] = useState(4);
  const [data, setData] = useState<number[]>([]); //Managed by API
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
    dataLength: count, // total from API
    size: 4,
    isLoading,
    isOffsetZero: startWithZero,
  });

  // In this case it is only for the example, but the data is handled by the API
  const handleData = ({ type }: { type: string }) => {
    if (type === 'decrease') {
      ...
      return;
    }
    ...
  };

  // While fetching the data
  const handleLoading = () => setIsLoading(!isLoading);

  // If your API starts with page 0 or 1
  const handleSetStartOffsetWithZero = () => setStartWithZero(!startWithZero);

...

return (
  <QueryLink query={query} api='https://my.api.com/posts' />

  ...

  {/* Pages Group */}
  <ButtonGroup>
    <Button action={() => setLimit(limit <= 1 ? 1 : limit - 1)}>-</Button>
    <p className='...'>
      {limit}
    </p>
    <Button action={() => setLimit(limit + 1)}>+</Button>
    <p className='...'>
      Items per page
    </p>
  </ButtonGroup>

  {/* Details Group */}
  <>
    <Button action={handleLoading}>
      <p>Loading</p> {isLoading && <Loading />}
    </Button>
    <Button action={handleSetStartOffsetWithZero}>Start with zero</Button>
    <Details
      lastPage={lastPage}
      data={data}
      page={page}
    />
  </>

  ...

  <PaginationGroup>
    <PaginationItem isLoading={isLoading} action={jumpToFirstPage}>
      «
    </PaginationItem>
    <PaginationItem isLoading={isLoading} action={previusPage}>
      PREV
    </PaginationItem>
    {pageRange.map((pageFromArray) => (
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

  ...
)

```
