import { Disclosure } from "@headlessui/react";
import { SearchIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../img/logo.svg";
import tmdbLogo from "../img/TMDBlogo.svg";

export default function Navbar() {
  let navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = ({ target }) => {
    setSearchTerm(() => target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setSearchTerm(() => e.target.value);
      navigate(`/search?q=${e.target.value}`);
    }
  };

  return (
    <Disclosure as="header" className="bg-gray-900">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:divide-y lg:divide-gray-700 lg:px-8">
            <div className="relative h-20 flex justify-between">
              <div className="relative z-10 px-2 flex lg:px-0">
                <div className="flex-shrink-0 flex items-center">
                  <Link to="/">
                    <img
                      className="block h-9  w-auto"
                      src={logo}
                      alt="Workflow"
                    />
                  </Link>
                </div>
              </div>

              <div className="relative z-0 flex-1 px-2 flex items-center sm:inset-0">
                <div className="w-full sm:max-w-lg">
                  <label htmlFor="search" className="sr-only">
                    Search
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                      <SearchIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      id="search"
                      name="search"
                      className="block w-full bg-gray-700 border border-transparent rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-400 focus:outline-none focus:bg-white focus:border-white focus:ring-white focus:text-gray-900 focus:placeholder-gray-500 sm:text-sm"
                      placeholder="Search your favourite movie"
                      type="search"
                      value={searchTerm}
                      onChange={(e) => handleChange(e)}
                      onKeyPress={(e) => handleKeyPress(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="hidden relative z-10 px-2 lg:flex lg:px-0">
                <div className="flex-shrink-0 flex items-center">
                  <img
                    className="block h-3 w-auto"
                    src={tmdbLogo}
                    alt="Workflow"
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}
