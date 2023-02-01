import { useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import './Login.scss';
import logo from '../../assets/img/logo-primary.png';


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
                title: 'The fields cannot be empty!'
            });
            return;
        }

        if (email !== '' && !reg.test(email)) {
            MySwal.fire({
                icon: 'error',
                title: 'You must enter a valid email address.'
            });
            return;
        }

        if (email !== 'challenge@alkemy.org' || password !== 'react') {
            MySwal.fire({
                icon: 'error',
                title: 'Invalid credentials'
            });
            return;
        }

        
        axios
            .post('http://challenge-react.alkemy.org', {email, password})
            .then(res => {
                MySwal.fire({
                    icon: 'success',
                    title: 'Perfect, you entered correctly.'
                });
                const tokenRecibido = res.data.token;
                sessionStorage.setItem('token', tokenRecibido);
                navigate('/');
            })
    }

    let token = sessionStorage.getItem('token');

    return (
        <>
        {token && <Navigate replace to="/" />}
        <div className="container">
            <div className="row">
                <section className="Login">
                    <img src={logo}></img>
                    <h2>Login form</h2>
                    <form onSubmit={submitHandler}>
                        <label>
                            <span>Enter yout email</span><br />
                            <input type="text" name="email"/>
                        </label>
                        <br />
                        <label>
                            <span>Enter your password</span><br />
                            <input type="password" name="password" />
                        </label>
                        <br />
                        <button className='mt-3' type="submit">Login</button>
                    </form>
                </section>
            </div>
        </div>
        </>
    );
}

export default Login