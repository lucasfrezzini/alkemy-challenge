import SearchForm from '../SearchForm/SearchForm';
import List from '../List/List';

import './Home.scss';

export default function Home() {
    return (
        <>
            <section className="Home">
                <div className="overlay"></div>
                <div className="hero">  
                    <div className="container">
                        <h1>Unlimited movies, <br/>
                        TV shows and more.
                        </h1>
                        <form className="d-flex" role="search">
                            <input className="" type="search" name="keyword" placeholder="Search your movie or serie" aria-label="Search" />
                            <button className="" type="submit">Search</button>
                        </form>
                    </div>
                </div>
                <List />
                
            </section>
        </>
    )
}