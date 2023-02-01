
import List from '../List/List';
import SearchForm from '../SearchForm/SearchForm';
import { Link } from 'react-router-dom';

import './Home.scss';

export default function Home(props) {
    return (
        <>
            <section className="Home">
                <div className="overlay"></div>
                <div className="hero">  
                    <div className="container">
                        <h1>Unlimited movies, <br/>
                        TV shows and more.
                        </h1>
                        <SearchForm />
                    </div>
                </div>
                <section>
                    <div className="container section-header">
                        <h2>New Releases</h2>
                        <Link to={'/movies'} className="btn btn_primary">
                            View more
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                            </svg>
                        </Link>
                    </div>
                    <List
                        endPoint={'popular'} 
                        cant_movies={4}
                        addOrRemoveFromFavs={props.addOrRemoveFromFavs} />
                </section>
                <section>
                    <div className="container section-header">
                        <h2>Top rated</h2>
                        <Link to={'/movies'} className="btn btn_primary">
                            View more
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                            </svg>
                        </Link>
                    </div>
                    <List 
                        endPoint={'top_rated'}
                        cant_movies={4} 
                        addOrRemoveFromFavs={props.addOrRemoveFromFavs} />
                </section>
                <section>
                    <div className="container section-header">
                        <h2>Upcoming movies</h2>
                        <Link to={'/movies'} className="btn btn_primary">
                            View more
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                            </svg>
                        </Link>
                    </div>
                    <List 
                        endPoint={'upcoming'}
                        cant_movies={4}
                        addOrRemoveFromFavs={props.addOrRemoveFromFavs} />
                </section>
            </section>
        </>
    )
}