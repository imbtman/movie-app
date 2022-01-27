import Navbar from "./Navbar";
import Footer from "./Footer"
import useFetch from "../Hooks/useFetch";
import { useSearchParams } from "react-router-dom";
import useGetResults from "../Hooks/useGetResults";

const API_KEY = process.env.REACT_APP_API_KEY;

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q");

  const API_URL_SEARCH = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${q}&page=1&include_adult=false`;
  const {
    data: movies,
    loading: loadingMovies,
    errorMovie,
  } = useFetch(API_URL_SEARCH);

  const movieList = useGetResults(movies, loadingMovies, "movie")

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto  my-8  lg:my-14  px-4 sm:px-4 lg:px-8">
        <h2 className="text-2xl  lg:text-3xl leading-6 font-semibold text-gray-900 text-center mb-12">
          Search results for "{q}"
        </h2>
        <ul className="grid grid-cols-2 lg:flex flex-wrap scroll-smooth justify-center  gap-x-6 gap-y-8 sm:gap-x-8">
          {movieList}
        </ul>
      </div>
      <Footer />
    </>
  );
}
