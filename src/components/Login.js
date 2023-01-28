import { useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);



function Login () {

    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault();
        const email = e. target.email.value;
        const password = e. target.password.value;

        const reg =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        if (email=== '' || password === '' ) {
            MySwal.fire({
                icon: 'error',
                title: 'Los campos no pueden estar vacios!'
            });
            return;
        }

        if (email !== '' && !reg.test(email)) {
            MySwal.fire({
                icon: 'error',
                title: 'Debes escribir una dirección de correo electronico válida'
            });
            return;
        }

        if (email !== 'challenge@alkemy.org' || password !== 'react') {
            MySwal.fire({
                icon: 'error',
                title: 'Credenciales inválidas'
            });
            return;
        }

        
        axios
            .post('http://challenge-react.alkemy.org', {email, password})
            .then(res => {
                MySwal.fire({
                    icon: 'success',
                    title: 'Perfecto, ingresaste correctamente.'
                });
                const tokenRecibido = res.data.token;
                sessionStorage.setItem('token', tokenRecibido);
                navigate('/listado');
            })
    }

    let token = sessionStorage.getItem('token');

    return (
        <>
        {token && <Navigate replace to="/listado" />}

        <h2>Fromulario de Login</h2>
        <form onSubmit={submitHandler}>
            <label>
                <span>Ingrese su correo</span><br />
                <input type="text" name="email"/>
            </label>
            <br />
            <label>
                <span>Ingrese su contraseña</span><br />
                <input type="password" name="password" />
            </label>
            <br />
            <button className='mt-3' type="submit">Ingresar</button>
        </form>
        </>
    );
}

export default Login