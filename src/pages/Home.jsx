import React, { useEffect, useState } from "react";
import Cards from "../components/Cards";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "../redux/features/usersSlice";
import Pagination from "../components/Pagination";
import Filter from "../components/Filter";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [totalPages, setTotalPages] = useState();

  const dispatch = useDispatch();
  const query = useSelector((state) => state.query.value);

  let url = `http://localhost:3001/api/users?page=${query.page}&perPage=${
    query.perPage
  }&search=${query.search}&domain=${query.domain}&gender=${query.gender}${
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

        dispatch(setUsers(rawData.data));
        setTotalPages(rawData.totalPages);
        console.log("--", rawData.totalPages);
        setError("");
      } catch (err) {
        setError(err + "");
        dispatch(setUsers([]));
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [dispatch, query]);
  if (loading) {
    return <h1 className="text-center text-xl">Wait...</h1>;
  }
  return (
    <>
      <Filter />
      <Cards />
      {error && <h1 className="text-center text-xl text-red-500">{error}</h1>}
      {totalPages && <Pagination totalPages={totalPages} />}
    </>
  );
};

export default Home;
