import "./Results.scss";
import { API_KEY } from "../../utils/endpoints";

import { Navigate, useParams } from "react-router-dom";
import List from "../List/List";
import { useEffect } from "react";

export default function Results(props) {
  let token = sessionStorage.getItem("token");

  let { search } = useParams();

  const endPointFull = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${search}&page=1&include_adult=false`;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* {!token && <Navigate replace to="/login" />} */}
      <section className="Results">
        <div className="container section-header">
          <h2>
            You searched: <span>{search}</span>
          </h2>
        </div>
        <div className="container">
          <div className="row">
            <List endPointFull={endPointFull} cant_movies={20} />
          </div>
        </div>
      </section>
    </>
  );
}
