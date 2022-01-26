import useFetchMovie from "../Hooks/useFetchMovie";
import useFetch from "../Hooks/useFetch";
import profilePlaceHolder from "../img/nopic.png";

const API_KEY = process.env.REACT_APP_API_KEY;

export default function Cast({ id }) {
  const API_URL_CREDITS = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`;
  const API_URL_MOVIE = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`;
  const API_URL_TRAILER = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`;

  const { data: movieDetails, loading, errorM } = useFetchMovie(API_URL_MOVIE);
  const {
    data: credits,
    loading: loadingCredits,
    errorC,
  } = useFetchMovie(API_URL_CREDITS);

  const {
    data: trailerDetails,
    loading: loadingTrailer,
    errorT,
  } = useFetch(API_URL_TRAILER);

  console.log(trailerDetails);

  const trailerId = !loadingTrailer
    ? trailerDetails !== [] &&
      trailerDetails.find((el) => el.type === "Trailer").key
    : "";

  const teaserId = !loadingTrailer
    ? trailerDetails.find(
        (el) => el.type === "Clip" || "Teaser" || "Featurette"
      ).key
    : "";

  const stats = [
    { name: "Release Date", stat: `${!loading && movieDetails.release_date}` },
    {
      name: "Original Language",
      stat: `${!loading && movieDetails.spoken_languages[0].name}`,
    },
    {
      name: "Budget",
      stat: `$${
        !loading && new Intl.NumberFormat("en-US").format(movieDetails.budget)
      }`,
    },
    {
      name: "Revenue",
      stat: `$${
        !loading && new Intl.NumberFormat("en-US").format(movieDetails.revenue)
      }`,
    },
  ];

  const castList = !loadingCredits ? credits.cast.slice(0, 20) : "";

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-4 lg:px-8 ">
      <div className="mb-16">
        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.name}
              className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6"
            >
              <dt className="text-sm font-medium text-gray-500 truncate">
                {item.name}
              </dt>
              <dd className="mt-1 text-xl font-semibold text-gray-900">
                {item.stat}
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <h2 className="text-3xl leading-6 font-semibold text-gray-900 mb-8">
        Media
      </h2>
      <div className="lg:flex hidden flex-nowrap flex-row mb-16 scroll-smooth overflow-x-auto gap-x-4 gap-y-8 sm:gap-x-6 ">
        <div className="aspect-w-16 aspect-h-9 lg:aspect-none">
          <iframe
            className="w-[620px] h-[348px]"
            src={`https://www.youtube.com/embed/${trailerId}?controls=0`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
          />
        </div>
        <div className="aspect-w-16 aspect-h-9 lg:aspect-none">
          <iframe
            className="w-[620px] h-[348px]"
            src={`https://www.youtube.com/embed/${teaserId}?controls=0`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
          />
        </div>
      </div>
      <div className="lg:hidden mb:hidden mb-16">
        <div>
          <iframe
            src={`https://www.youtube.com/embed/${trailerId}?controls=0`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
            className="w-full h-48"
          ></iframe>
        </div>
      </div>
      {/* Cast list */}
      <h2 className="text-3xl leading-6 font-semibold text-gray-900 mb-8">
        Top billed cast
      </h2>
      <ul className=" grid grid-cols-2 lg:flex flex-wrap justify-between  gap-x-4 gap-y-8 sm:gap-x-6">
        {!loadingCredits
          ? castList.map((file) => (
              <li key={file.id} className="relative ">
                <div className="shadow-md bg-white   mb-3 group scroll-smooth  rounded-lg  focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
                  <img
                    src={
                      file.profile_path === null
                        ? profilePlaceHolder
                        : `https://www.themoviedb.org/t/p/w138_and_h175_face${file.profile_path}`
                    }
                    alt=""
                    className="w-52   object-cover cursor-pointer group-hover:opacity-75"
                  />
                  <div className="px-4 py-4 ">
                    <h4 className="text-lg font-medium mb-1">{file.name}</h4>
                    <p className="text-neutral-700 text-sm">
                      {file.character.substring(0, 15)}
                    </p>
                  </div>
                </div>
              </li>
            ))
          : null}
      </ul>
    </div>
  );
}
