import React, { ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";
import UserI from '../utils/User';
import { setRole, setStatus } from "../services/Users";
import {useNavigate} from "react-router-dom"

const User: React.FC<UserI> = ({ Name, ID, LastName, Email, Role, Confirm }) => {
    const navigate = useNavigate();
    if (!ID) return <p>Nie znaleziono.</p>;

    const setRoleF = async (e: ChangeEvent<HTMLSelectElement>) => {
        const data = { ID: ID, Role: e.currentTarget.value };
        const res:string = await setRole(data);
        if (res == "out") {
            navigate("/login");
        } else if (res == "ok") {
            navigate("/");
            navigate("/users");
        } else {
            alert(res);
        }
    }

    const setStatusF = async () => {
        const data:UserI = { ID: ID, Confirm: !Confirm };
        const res: string = await setStatus(data);
        if (res == "out") {
            navigate("/login");
        } else if (res == "ok") {
            navigate("/");
            navigate("/users");
        } else {
            alert(res);
        }
    }

    return (
        <div>
            <h2>{Name} {LastName}</h2>
            <p>{Email}</p>
            <select name="Role" disabled={!Confirm} onChange={async (e) => await setRoleF(e)} defaultValue={Role}>
                <option value="Employee" >Pracownik</option>
                <option value="Manager">Kierownik</option>
            </select>
            <button type="button" onClick={async () => { await setStatusF() }}>{Confirm ?"Deaktywuj":"Aktywuj"}</button>
        </div>
    );
};

export default User;