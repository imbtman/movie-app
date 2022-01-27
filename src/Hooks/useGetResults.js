import { Link } from "react-router-dom";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const genres = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 99, name: "Documentary" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 10759, name: "Action & Adventure" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 10762, name: "Kids" },
  { id: 9648, name: "Mystery" },
  { id: 10763, name: "News" },
  { id: 10764, name: "Reality" },
  { id: 10765, name: "Sci-Fi & Fantasy" },
  { id: 10766, name: "Soap" },
  { id: 10767, name: "Talk" },
  { id: 10768, name: "War & Politics" },
  { id: 37, name: "Western" },
];

const findGenre = (id) => {
  const matchingGenre = genres.filter((genre) => genre.id === id);
  return matchingGenre[0].name;
};

export default function useGetResults(data, loading, type) {
  const results = loading
    ? null
    : data.map((file) => (
        <li key={file.id} className="relative ">
          <Link to={`/movie/${file.id}`}>
            <div className="relative mb-3 group scroll-smooth w-44 lg:w-60 aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
              <div className="absolute w-12 h-12 top-3 right-3 bg-black rounded-full border-4 border-black font-bold ">
                <CircularProgressbar
                  value={file.vote_average}
                  minValue={1}
                  maxValue={10}
                  text={file.vote_average}
                  strokeWidth={8}
                  styles={buildStyles({
                    textColor: "white",
                    pathColor: file.vote_average > 7 ? "#20c997" : "#ffd43b",
                    trailColor: "#868e96",
                  })}
                />
              </div>
              <img
                src={`https://image.tmdb.org/t/p/w500${file.poster_path}`}
                alt=""
                className="object-cover cursor-pointer group-hover:opacity-75"
              />
            </div>
            <div className="lg:w-60">
              <h4 className="text-md font-semibold  mb-1 ">
                {type === "tv" ? file.name : file.title}
              </h4>
              <p className="text-slate-600  text-sm">
                {file.genre_ids.length > 0
                  ? findGenre(file.genre_ids[0])
                  : null}
              </p>
            </div>
          </Link>
        </li>
      ));

  return results;
}
