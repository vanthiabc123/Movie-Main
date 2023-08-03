import { fetcher } from "../apiConfig/config";
import useSWR from "swr";
import MovieCard from "../components/movie/MovieCard";
import { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";
import ReactPaginate from "react-paginate";
const itemPerPage = 20;
const Movies = () => {
  const [filter, setFilter] = useState("");
  const filterDebounce = useDebounce(filter, 500);
  const [itemOffset, setItemOffset] = useState(0);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [url, setUrl] = useState(
    `https://api.themoviedb.org/3/movie/popular?api_key=0d77d4a00d41dc0294ce678b39584abe&page=${page}`
  );
  const { data, error } = useSWR(url, fetcher);
  const loading = !data && !error;
  useEffect(() => {
    if (filterDebounce) {
      setUrl(
        `https://api.themoviedb.org/3/search/movie?query=${filterDebounce}&api_key=0d77d4a00d41dc0294ce678b39584abe&page=${page}`
      );
    }
  }, [filterDebounce, page]);

  useEffect(() => {
    if (!data || !data.total_results) return;
    setPageCount(Math.ceil(data.total_results / itemPerPage));
  }, [data, itemOffset]);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemPerPage) % data.total_results;
    setItemOffset(newOffset);
    setPage(event.selected + 1);
  };

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };
  const movies = data?.results || [];

  return (
    <div className="page-container">
      <div className="flex mb-10">
        <div className="flex-1">
          <input
            onChange={handleFilter}
            type="text"
            className="w-full p-4 text-white outline-none bg-slate-800"
            placeholder="Search for a movie"
          />
        </div>
        <button className="p-4 text-white bg-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </div>
      {loading && (
        <div className="w-10 h-10 mx-auto border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
      )}

      <div className="grid grid-cols-4 gap-10">
        {!loading &&
          movies.length > 0 &&
          movies.map((item) => (
            <MovieCard key={item.id} item={item}></MovieCard>
          ))}
      </div>
      <div className="mt-10">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          className="pagination"
        />
      </div>
    </div>
  );
};

export default Movies;
