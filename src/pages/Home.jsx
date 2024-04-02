import React, { useEffect, useState } from "react";
import Cards from "../components/Cards";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "../redux/features/usersSlice";
import Pagination from "../components/Pagination";
import Filter from "../components/Filter";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [total, setTotal] = useState();

  const dispatch = useDispatch();
  const query = useSelector((state) => state.query.value);
  const refetch = useSelector((state) => state.users.refetch);

  let url = `${import.meta.env.VITE_BACKEND_URL}/api/users?page=${
    query.page
  }&perPage=${query.perPage}&search=${query.search}&domain=${
    query.domain
  }&gender=${query.gender}${
    query.available ? `&available=${query.available}` : ``
  }`;

  let users = useSelector((state) => state.users.value);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(response.status);
        }
        const rawData = await response.json();
        console.log("refetched", refetch);
        dispatch(setUsers(rawData.data));
        setTotal(rawData.total);
        setError("");
      } catch (err) {
        setError(err + "");
        dispatch(setUsers([]));
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [dispatch, query, refetch]);

  const totalPages = Math.ceil(total / query.perPage);

  if (loading) {
    return <h1 className="text-center text-xl">Wait...</h1>;
  }
  return (
    <>
      <Filter />
      <div className="mb-2">Search Results: {total}</div>
      <Cards />
      {error && <h1 className="text-center text-xl text-red-500">{error}</h1>}
      {total && <Pagination totalPages={totalPages} />}
    </>
  );
};

export default Home;
