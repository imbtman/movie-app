import useFetch from "../Hooks/useFetch";
import useGetResults from "../Hooks/useGetResults";
import { useState } from "react";

const tabs = [{ name: "Movies", href: "#", current: true }];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL_MOVIE = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
// const API_URL_TV = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=1`;

export default function Popular() {
  const {
    data: movies,
    loading: loadingMovies,
    errorMovie,
  } = useFetch(API_URL_MOVIE);
  // const { data: tv, loading: loadingTv, errorTv } = useFetch(API_URL_TV);

  const movieList = useGetResults(movies, loadingMovies, "movie");
  // const tvList = useGetResults(tv, loadingTv, "tv");

  const [openTab, setOpenTab] = useState(0);

  return (
    <div className="max-w-7xl mx-auto my-16 pl-4  sm:px-4 lg:px-8">
      <div className="border-b border-gray-200 mb-8">
        <div className="sm:flex sm:items-baseline">
          <h2 className="text-3xl leading-6 font-semibold text-gray-900">
            What's Popular
          </h2>
          <div className="mt-4 sm:mt-0 sm:ml-10">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab, i) => (
                <a
                  key={tab.name}
                  href={tab.href}
                  className={classNames(
                    openTab === i
                      ? "border-indigo-500 text-indigo-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                    "whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm"
                  )}
                  aria-current={tab.current ? "page" : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(i);
                  }}
                >
                  {tab.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
      {/* Movies List */}
      <ul className="flex flex-nowrap flex-row scroll-smooth overflow-x-auto gap-x-4 gap-y-8 sm:gap-x-6">
        {openTab === 0 && movieList}
        {/* {openTab === 1 && tvList} */}
      </ul>
    </div>
  );
}
