import React, { useEffect, useState, FormEvent } from "react";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import RoomI from "../utils/Room";
import { addRoom } from "../services/Rooms";
import PlacesCreate from "../components/createroom";
import Header from "../layouts/Header";


const AddRoom: React.FC = () => {
    const navigate = useNavigate();
    const [error, setError] = useState<string>("");
    let places: number[][] = [[0]];

    const add = async (e: FormEvent) => {
        e.preventDefault();
        const data: RoomI = {
            Number: e.target.Number.value, ScreenSize: e.target.ScreenSize.value,
            Is3D: e.target.Is3D.checked, IsIMAX: e.target.IsIMAX.checked,
            Is4D: e.target.Is4D.checked, IsScreenX: e.target.IsScreenX.checked,
            Places: places
        };
        const res = await addRoom(data);
        if (res == "out") {
            navigate("/login");
        } else if (res == "ok") {
            navigate("/rooms");
        } else {
            setError(res);
        }
    }

    const set = (data:number[][]) => {
        places = data;
    }


    return (
        <div>
            <Header Main={false} Movie={false} Room={true} Show={false} Ticket={false} Users={false} />
            <button onClick={() => navigate(-1)}>Powrót</button>
            <form onSubmit={async (e) => { await add(e); }}>
                <div>
                    <label>Numer: <input type="number" name="Number" required min={0} /></label><br/>
                    <label>Rozmiar ekranu: <input type="number" name="ScreenSize" required min={30} /> cal</label><br />
                </div>
                <table style={{ width: "50%", margin: "auto", tableLayout: "fixed" }}>
                    <tbody>
                        <tr>
                            <td>3D</td>
                            <td>4D</td>
                            <td>IMAX</td>
                            <td>ScreenX</td>
                        </tr>
                        <tr>
                            <td><input type="checkbox" name="Is3D"></input></td>
                            <td><input type="checkbox" name="Is4D"></input></td>
                            <td><input type="checkbox" name="IsIMAX"></input></td>
                            <td><input type="checkbox" name="IsScreenX"></input></td>
                        </tr>
                    </tbody>
                </table>
                <PlacesCreate current={places} set={set}></PlacesCreate><br/>
                <input type="submit" value="Dodaj"/>
            </form>
            <p>{error}</p>
        </div>
    );
};

export default AddRoom;