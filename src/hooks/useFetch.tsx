import { useState, useEffect } from "react";
import axios from "axios";

// Modify the hook to accept a generic type parameter T
const useFetch = <T,>(url: string) => {
  const [data, setData] = useState<T | null>(null); // Use the generic type parameter T
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean | Error>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get<T>(url); // Fetch data with the expected type
        setData(res.data);
      } catch (err: any) {
        setError(err);
      }
      setLoading(false);
    };
    fetchData();
  }, [url]);

  const reFetch = async () => {
    setLoading(true);
    try {
      const res = await axios.get<T>(url); // Fetch data with the expected type
      setData(res.data);
    } catch (err: any) {
      setError(err);
    }
    setLoading(false);
  };

  return { data, loading, error, reFetch };
};

export default useFetch;
