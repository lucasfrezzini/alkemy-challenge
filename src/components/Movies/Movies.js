import List from "../List/List";
import { Link } from "react-router-dom";

export default function Movies(props) {
    const { title, endPoint, cant_movies, addOrRemoveFromFavs } = props;
    return(
        <section>
            <div className="container section-header">
                <h2>{title}</h2>
            </div>
            <List
                endPoint={endPoint} 
                cant_movies={cant_movies}
                addOrRemoveFromFavs={addOrRemoveFromFavs} />
        </section>
    )
}


            