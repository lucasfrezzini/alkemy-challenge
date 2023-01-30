import '../css/Home.css';
import SearchForm from './SearchForm/SearchForm';

export default function Home() {
    return (
        <>
            <div className="hero">
                <div className="container">
                    <h1>Unlimited movies, <br/>
                    TV shows and more.
                    </h1>
                    <SearchForm />
                </div>
            </div>
        </>
    )
}