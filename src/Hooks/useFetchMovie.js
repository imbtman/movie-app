//useFetch.js
import { useState, useEffect } from "react";
import axios from "axios";

export default function useFetchMovie(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setData([]);
    setError(null);
    setLoading(true);
    axios
      .get(url)
      .then((res) => {
        //checking for multiple responses for more flexibility
        //with the url we send in.
        res.data && setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError("An error occurred. Awkward..");
      });
    return () => {};
  }, [url]);

  return { data, loading, error };
}
