import tmdbLogo from "../img/TMDBlogo.svg"

export default function Footer() {
  return (
    <div className="bg-gray-900 h-20 ">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 g:px-8 text-slate-400 h-20 flex items-center justify-between ">
        <p>
          Created by{" "}
          <a
            href="https://twitter.com/koushikmarka"
            className="underline underline-offset-1"
          >
            @koushikmarka{" "}
          </a>
        </p>
        <img className="block h-4 w-auto" src={tmdbLogo} alt="Workflow" />
      </div>
    </div>
  );
}
