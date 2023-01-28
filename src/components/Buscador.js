import { useNavigate, Navigate } from 'react-router-dom';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export default function Buscador () {
    const navigate = useNavigate()

    const submitHandler = e => {
        e.preventDefault();
        const keyword = e.currentTarget.keyword.value.trim();

        if (keyword.length === 0) {
            MySwal.fire({
                icon: 'error',
                title: 'Tienes que introducir una palabra clave...'
            })
        } else if (keyword.length < 4) {
            MySwal.fire({
                icon: 'error',
                title: 'Tienes que introducir más de 4 letras'
            })
        } else {
            e.currentTarget.keyword.value = "";
            navigate(`/resultados?search=${keyword}`);
        }

    }
    
    return(
        <form className="d-flex" role="search" onSubmit={submitHandler}>
            <input className="form-control me-2" type="search" name="keyword" placeholder="Buscá tu pelicula..." aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Buscar</button>
        </form>
    )
}