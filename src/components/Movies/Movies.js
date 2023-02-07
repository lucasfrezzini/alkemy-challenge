import { useEffect } from "react";
import List from "../List/List";

export default function Movies(props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { title, endPoint, cant_movies, addOrRemoveFromFavs } = props;
  return (
    <section>
      <div className="container section-header">
        <h2>{title}</h2>
      </div>
      <List
        endPoint={endPoint}
        cant_movies={cant_movies}
        addOrRemoveFromFavs={addOrRemoveFromFavs}
      />
    </section>
  );
}
