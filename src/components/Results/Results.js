import './Results.scss';
import { API_KEY } from '../../utils/endpoints';

import { Navigate } from "react-router-dom";
import List from '../List/List';


export default function Results (props) {
    let token = sessionStorage.getItem('token');

    let query = new URLSearchParams(window.location.search);
    let keyword = query.get('search');

    const endPointFull = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${keyword}&page=1&include_adult=false`;

    return (
        <>
            {!token && <Navigate replace to="/login" />}
            <section className="Results">
                <div className="container section-header">
                    <h2>You searched: <span>{keyword}</span></h2>
                </div>
                <div className="container">
                    <div className="row">
                    <List 
                        endPointFull={endPointFull} 
                        cant_movies={20}
                        />
                    </div>
                </div>
            </section>
        </>
    )
}