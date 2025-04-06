import React, { useState, FormEvent, useEffect } from "react";
import Reg from "../services/Register";
import RegisterI from "../utils/RegisterI";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
    const [errors, setErrors] = useState<string>("");
    const [pass1, setPass1] = useState("");
    const [pass2, setPass2] = useState("");
    const [can, setCan] = useState(false);

    const navigate = useNavigate();
    async function reg(e: FormEvent) {
        e.preventDefault();
        const data: RegisterI = { Email: e.target.email.value, Password: e.target.password.value, LastName: e.target.lastName.value, Name: e.target.name.value };
        const res: string = await Reg(data);
        setErrors(res);
        if (res == "OK") {
            navigate("/login");
            alert("Poczekaj na aktywację konta");
        }
    }

    useEffect(() => {
        if (pass1.length == 0 && pass2.length == 0) {
            setCan(false);
            setErrors("Proszę wprowadzić hasło");
        } else if (pass1 != pass2) {
            setCan(false);
            setErrors("Hasła nie są zgodne");
        } else {
            setCan(true);
            setErrors("");
        }
    }, [pass1, pass2]);


    return (
        <>
            <form onSubmit={async (e) => { await reg(e) }}>
                <label>Imię: <input type="text" placeholder="Wpisz imię" name="name" required minLength={3}></input></label>
                <br />
                <label>Nazwisko: <input type="text" placeholder="Wpisz nazwisko" name="lastName" required minLength={3}></input></label>
                <br />
                <label>Email: <input type="email" placeholder="Wpisz email" name="email" required></input></label>
                <br />
                <label>Hasło: <input type="password" placeholder="Wpisz hasło" name="password" required
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{5,}" title="Musi zawierać dużą i małą literę, cyfrę, i mięc min 5 znaków"
                    onChange={(e) => setPass1(e.target.value)}></input></label>
                <br />
                <label>Powtórz Hasło: <input type="password" placeholder="Wpisz hasło" name="Spassword" required onChange={(e) => setPass2(e.target.value)}></input></label>
                <br />
                <p className="errors">{errors}</p>
                <input type="submit" value="Zarejestruj" disabled={!can}></input>
            </form>
            <button onClick={() => { navigate("/login"); }}>Masz już konto. Zaloguj się</button>
        </>
    )
}

export default Register;