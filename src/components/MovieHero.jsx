import bg from "../img/bg_placeholder.webp";
import useFetchMovie from "../Hooks/useFetchMovie";
import { useState } from "react";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import useFetch from "../Hooks/useFetch";

const API_KEY = process.env.REACT_APP_API_KEY;

export default function MovieHero({ id }) {
  const API_URL_MOVIE = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`;
  const API_URL_CREDITS = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`;
  const { data: movieDetails, loading, errorM } = useFetchMovie(API_URL_MOVIE);
  const {
    data: credits,
    loading: loadingCredits,
    errorC,
  } = useFetchMovie(API_URL_CREDITS);

  const movie = !loading ? movieDetails : [];
  const director = !loadingCredits
    ? credits.crew.find((member) => member.job === "Director").name
    : "";

  return (
    <div
      className="max-h-full h-max bg-cover bg-black bg-dark bg-blend-lighten "
      style={{
        backgroundImage: !loading
          ? `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`
          : `url(${bg})`,
      }}
    >
      <div
        style={{
          background: `linear-gradient(270deg, hsla(0, 0%, 100%, 0.2) 0%, hsla(213, 43%, 8%, 0.9) 55%)`,
        }}
      >
        <div className="lg:h-[36rem] max-w-7xl mx-auto px-4 py-8 sm:px-4 lg:px-8 grid lg:grid-cols-3 items-center">
          <div className="lg:col-span-2">
            <div className="lg:grid grid-cols-3 gap-x-10 items-center">
              <div className=" group w-40 my-0 mx-auto  lg:w-auto scroll-smooth mb-6 lg:mb-0 relative rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
                <img
                  src={
                    !loading
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : ""
                  }
                  alt=""
                  className=" object-cover cursor-pointer group-hover:opacity-75"
                />
              </div>
              <div className="lg:col-span-2">
                <h1 className="text-4xl font-bold mb-3 text-slate-100">
                  {movie.title}
                </h1>
                <div className=" mb-10 gap-4">
                  <p className="text-slate-100 ml-2 font-semibold">
                    {movie.runtime} mins &bull;{" "}
                    {!loading ? movie.genres[0].name : ""}
                  </p>
                </div>
                <p className="text-slate-300 mb-8">{movie.overview}</p>
                <div className="flex gap-x-20">
                  <div>
                    <p className="text-white font-bold ">{director}</p>
                    <p className="text-slate-300 ">Director</p>
                  </div>
                  <div className="flex items-center gap-x-2">
                    <p className="text-white font-medium">User score:</p>
                    <div className="w-12 h-12 top-3 right-3 bg-black rounded-full border-4 border-black font-bold ">
                      <CircularProgressbar
                        value={movie.vote_average}
                        minValue={1}
                        maxValue={10}
                        text={movie.vote_average}
                        strokeWidth={8}
                        styles={buildStyles({
                          textColor: "white",
                          pathColor:
                            movie.vote_average > 7 ? "#20c997" : "#ffd43b",
                          trailColor: "#868e96",
                        })}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
