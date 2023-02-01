import { useNavigate, Navigate } from 'react-router-dom';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import './SearchForm.scss';

const MySwal = withReactContent(Swal);

export default function SearchForm (props) {
    const navigate = useNavigate()

    const submitHandler = e => {
        e.preventDefault();
        const keyword = e.currentTarget.keyword.value.trim();

        if (keyword.length === 0) {
            MySwal.fire({
                icon: 'error',
                title: 'Write something...'
            })
        } else if (keyword.length < 4) {
            MySwal.fire({
                icon: 'error',
                title: 'At least 4 characters...'
            })
        } else {
            e.currentTarget.keyword.value = "";
            navigate(`/results?search=${keyword}`);
        }

    }
    
    return(
        <form className={`SearchForm d-flex ${props.header ? "form-header" : ""}`} role="search" onSubmit={submitHandler}>
            <input className="" type="search" name="keyword" placeholder="Search your movie..." aria-label="Search" />
            <button className="" type="submit">
                {props.header ?
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>
                :
                'Search'
                }
            </button>
        </form>
    )
}