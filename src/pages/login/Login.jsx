import { Container, Button, Form } from "react-bootstrap"
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";



import "./login.css"

function Login() {
    const navigate = useNavigate();
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useContext(AuthContext);
    const location = useLocation();


    const handleLogin = (e) => {
        e.preventDefault();
        if (user === 'admin' && password === '1234dima') {
            login(user);
            const from = location.state?.from?.pathname || '/dashboard';
            navigate(from, { replace: true });
        } else {
            console.log('Wrong login or password');
        }
    };

    return (

        <Container fluid className="main-container">
            <div className="form-container">
                <h2 className="form-title">Login</h2>
                <Form onSubmit={handleLogin}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="form-label required">Username</Form.Label>
                        <Form.Control className="form-field" type="text" placeholder="Enter username" onChange={(e) => setUser(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label className="form-label required">Password</Form.Label>
                        <Form.Control className="form-field" type="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                    <Button className="form-btn form-btn-dark" type="submit">
                        Login
                    </Button>
                </Form>
            </div>
        </Container>
    )
}

export default Login