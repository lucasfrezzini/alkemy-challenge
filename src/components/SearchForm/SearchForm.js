import { useNavigate, Navigate } from 'react-router-dom';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import './SearchForm.scss';

const MySwal = withReactContent(Swal);

export default function SearchForm () {
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
        <form className="d-flex" role="search" onSubmit={submitHandler}>
            <input className="form-control me-2" type="search" name="keyword" placeholder="Search your movie or serie" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
    )
}