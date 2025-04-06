import React, { useEffect, useState, FormEvent } from "react";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import RoomI from "../utils/Room";
import { editRoom } from "../services/Rooms";
import PlacesCreate from "../components/createroom";
import Header from "../layouts/Header";


const EditRoom: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [room, setRoom] = useState<RoomI | null>(null);
    const [error, setError] = useState<string>("");
    let places: number[][] = [[0]];

    function refresh() {
        const stored = sessionStorage.getItem("rooms");
        if (stored) {
            const seansEl: RoomI[] = JSON.parse(stored);
            const found = seansEl.find((a) => a.Number == Number(id));
            setRoom(found || null);
            places = found.Places;
        }
    }

    useEffect(() => {
        refresh();
    }, [id]);
    if (!room) return <p>Nie znaleziono :( .</p>;

    const edit = async (e: FormEvent) => {
        e.preventDefault();
        const data: RoomI = {
            Number: e.target.Number.value, ScreenSize: e.target.ScreenSize.value,
            Is3D: e.target.Is3D.checked, IsIMAX: e.target.IsIMAX.checked,
            Is4D: e.target.Is4D.checked, IsScreenX: e.target.IsScreenX.checked,
            Places: places
        };
        const res = await editRoom(room.Number,data);
        if (res == "out") {
            navigate("/login");
        } else if (res == "ok") {
            navigate("/rooms");
        } else {
            setError(res);
        }
    }

    const set = (data: number[][]) => {
        places = data;
    }

    return (
        <div >
            <Header Main={false} Movie={false} Room={true} Show={false} Ticket={false} Users={false} />
            <button onClick={() => navigate(-1)}>Powrót</button>
            <form onSubmit={async (e) => { await edit(e); }}>
                <div>
                    <label>Numer: <input type="number" name="Number" required min={0} defaultValue={room.Number } /></label><br />
                    <label>Rozmiar ekranu: <input type="number" name="ScreenSize" required min={30} defaultValue={room.ScreenSize } /> cal</label><br />
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
                            <td><input type="checkbox" defaultChecked={room.Is3D} name="Is3D"></input></td>
                            <td><input type="checkbox" defaultChecked={room.Is4D} name="Is4D"></input></td>
                            <td><input type="checkbox" defaultChecked={room.IsIMAX} name="IsIMAX"></input></td>
                            <td><input type="checkbox" defaultChecked={room.IsScreenX} name="IsScreenX"></input></td>
                        </tr>
                    </tbody>
                </table>
                {(room != null)? <PlacesCreate current={room.Places} set={set}></PlacesCreate>:<></> }
                <input type="submit" value="Edytuj" />
            </form>
            <p>{error}</p>
        </div>
    );
};

export default EditRoom;