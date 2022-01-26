import bg from "../img/bg_placeholder.webp";
import useFetch from "../Hooks/useFetch";
import { genres } from "../genre";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Link } from "react-router-dom";

const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

export default function Hero() {
  const { data: movies, loading, error } = useFetch(API_URL);

  if (loading === true) {
    return (
      <div className="max-h-full h-max bg-cover  bg-dark bg-blend-lighten ">
        <div
          style={{
            background: `#000`,
          }}
        >
          <div className="h-[36rem] max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 grid lg:grid-cols-2 items-end pb-14">
            <div>
              <h1 className="text-4xl font-bold mb-6 text-slate-100">
                Loading...
              </h1>
              <p className="text-slate-300 mb-4">
                The Eternals are a team of ancient aliens who have been living
                on Earth in secret for thousands of years. When an unexpected
                tragedy forces them out of the shadows, they are forced to
                reunite against mankind’s most ancient enemy, the Deviants.
              </p>
              <p className="text-slate-300">Action </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading === false) {
    return (
      <div
        className="max-h-full h-max bg-cover  bg-dark bg-blend-lighten transition ease-in-out duration-2000 "
        style={{
          backgroundImage: !loading
            ? `url(https://image.tmdb.org/t/p/original/${movies[0].backdrop_path})`
            : `url(${bg})`,
        }}
      >
        <div
          style={{
            background: `linear-gradient(180deg, hsla(0, 0%, 100%, 0.1) 16%, hsla(213, 43%, 8%, 0.9) 70%)`,
          }}
        >
          <div className="h-[36rem] max-w-7xl mx-auto px-4 sm:px-4 lg:px-8 grid lg:grid-cols-2 items-end pb-14">
            <div>
              <Link to={`/movie/${movies[0].id}`}>
                <h1 className="text-4xl font-bold mb-6 text-slate-100">
                  {movies[0].title}
                </h1>
                <p className="text-slate-300 mb-4">{movies[0].overview}</p>
                <div className="flex items-center gap-x-4">
                  <p className="text-slate-300">
                    {
                      genres.find((genre) => {
                        return genre.id === movies[0].genre_ids[0];
                      }).name
                    }
                  </p>
                  <div className=" w-12 h-12 bg-black rounded-full border-4 border-black font-bold ">
                    <CircularProgressbar
                      value={movies[0].vote_average}
                      minValue={1}
                      maxValue={10}
                      text={movies[0].vote_average}
                      strokeWidth={8}
                      styles={buildStyles({
                        textColor: "white",
                        pathColor:
                          movies[0].vote_average > 7 ? "#20c997" : "#ffd43b",
                        trailColor: "#868e96",
                      })}
                    />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
