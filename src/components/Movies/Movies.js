import List from "../List/List";
import { Link } from "react-router-dom";

export default function Movies(props) {
    const { title, endPoint, cant_movies, addOrRemoveFromFavs } = props;
    return(
        <section>
            <div className="container section-header">
                <h2>{title}</h2>
                {/* <Link to={'/movies'} className="btn btn_primary">
                    View more
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                    </svg>
                </Link> */}
            </div>
            <List
                endPoint={endPoint} 
                cant_movies={cant_movies}
                addOrRemoveFromFavs={addOrRemoveFromFavs} />
        </section>
    )
}


            