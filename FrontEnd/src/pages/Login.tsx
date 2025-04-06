import React, { useState, FormEvent } from "react";
import LogIn from "../services/LogIn";
import LoginIn from "../utils/LoginI";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
    const [errors, setErrors] = useState<string>("");
    const navigate = useNavigate();
    async function log(e:FormEvent) {
        e.preventDefault();
        const data: LoginIn = { Email: e.target.email.value, Password: e.target.password.value };
        const res: string = await LogIn(data);
        setErrors(res);
        if (res == "Zalogowano") {
            navigate("/main");
        }
    }

    return (
        <>
            <form onSubmit={async (e) => { await log(e) }}>
                <label>Email: <input type="email" placeholder="Wpisz email" name="email" required></input></label>
                <br/>
                <label>Hasło: <input type="password" placeholder="Wpisz hasło" name="password" required></input></label>
                <br />
                <p className="errors">{errors}</p>
                <input type="submit" value="Zaloguj"></input>
            </form>
            <button onClick={() => { navigate("/register"); }}>Nie masz konta. Załóż je</button>
        </>
    )
}

export default Login;