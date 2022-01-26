import useFetch from "../Hooks/useFetch";
import useGetResults from "../Hooks/useGetResults";
import { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

const tabs = [
  { name: "Today", href: "#", current: true },
  { name: "Week", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL_TODAY = `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`;
const API_URL_WEEK = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`;

export default function Trending() {
  const {
    data: todayData,
    loading: loadingToday,
    errorT,
  } = useFetch(API_URL_TODAY);
  const {
    data: weekData,
    loading: loadingWeek,
    errorW,
  } = useFetch(API_URL_WEEK);

  const todayList = useGetResults(todayData, loadingToday);
  const weekList = useGetResults(weekData, loadingWeek);
  const [openTab, setOpenTab] = useState(0);

  console.log(openTab);
  return (
    <div className="max-w-7xl mx-auto my-16 pl-4 sm:px-4 lg:px-8">
      <div className="border-b border-gray-200 mb-8">
        <div className="sm:flex sm:items-baseline">
          <h2 className="text-3xl leading-6 font-semibold text-gray-900">
            Trending
          </h2>
          <div className="mt-4 sm:mt-0 sm:ml-10">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab, i) => (
                <a
                  key={i}
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

      <ul className="flex flex-nowrap flex-row scroll-smooth overflow-x-auto gap-x-4 gap-y-8 sm:gap-x-6">
        {openTab === 0 && todayList}
        {openTab === 1 && weekList}
      </ul>
    </div>
  );
}
