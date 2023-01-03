import { useState, useEffect } from "react";

const useDataFetching = (dataSource) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch(dataSource);
        const result = await data.json();
        if (result) {
          setData(result);
          setLoading(false);
        }
      } catch (e) {
        setLoading(false);
        setError(e.message);
      }
    };
    fetchData();
  }, [dataSource]);

  return [loading, data, error];
};

export default useDataFetching;