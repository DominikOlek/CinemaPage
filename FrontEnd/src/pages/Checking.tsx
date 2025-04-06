import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import checkOrder from "../services/CheckOrder"
import Header from "../layouts/Header";

const Checking: React.FC = () => {
    const [errors, setErrors] = useState<string>("");
    const navigate = useNavigate();
    async function check(e: FormEvent) {
        e.preventDefault();
        const res: string = await checkOrder(e.target.email.value, Number(e.target.id.value));
        if (res == "out") {
            navigate("/login");
        }
        alert(res);
        setErrors(res);
    }

    return (
        <>
            <Header Main={false} Movie={false} Room={false} Show={false} Ticket={true} Users={false} />
            <form onSubmit={async (e) => { await check(e) }}>
                <label>Email: <input type="email" placeholder="Wpisz email" name="email" required></input></label>
                <br />
                <label>Numer: <input type="number" placeholder="Wpisz numer" name="id" required></input></label>
                <br />
                <p className="errors" style={{ whiteSpace: "pre-line"}} >{errors}</p>
                <input type="submit" value="SprawdŸ"></input>
            </form>
        </>
    )
}

export default Checking;