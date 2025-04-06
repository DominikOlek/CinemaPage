import React, { useState, useEffect, useMemo, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../layouts/Header";
import SelectMovie from "../components/selectMovie";
import SelectRoom from "../components/selectRoom";
import ShowI from "../utils/ShowI";
import { addShow } from "../services/Shows";

const pageSize = 10;
const AddShow: React.FC = () => {
    const navigate = useNavigate();
    const [roomID, setRoomID] = useState<number>(-1);
    const [movieID, setMovieID] = useState<number>(-1);
    const [startDateTime, setStartDateTime] = useState<string>("");
    const [endDateTime, setEndDateTime] = useState<string>("");
    const [error, setError] = useState<string>("");


    const add = async (e: FormEvent) => {
        e.preventDefault();
        setError("");
        const Start: Date = new Date(e.target.StartTime.value);
        if (Start >= new Date(e.target.EndTime.value) || Start.getTime() < Date.now()) {
            setError("Błędnie wskazane godziny");
            return;
        }
        if (e.target.NormalPrice.value > e.target.VIPPrice.value) {
            setError("Błędnie podane ceny");
            return;
        }
        const data: ShowI = {
            MovieID: movieID, RoomID: roomID, NormalPrice: Number(e.target.NormalPrice.value), VIPPrice: Number(e.target.VIPPrice.value),
            StartTime: e.target.StartTime.value + ":00+00:00", EndTime: e.target.EndTime.value + ":00+00:00",
            Is3D: e.target.Is3D.checked, IsIMAX: e.target.IsIMAX.checked,
            Is4D: e.target.Is4D.checked, IsScreenX: e.target.IsScreenX.checked
        };
        const res = await addShow(data);
        if (res == "out") {
            navigate("/login");
        } else if (res == "ok") {
            navigate("/main");
        } else {
            setError(res);
        }
    }


    return (
        <>
            <Header Main={false} Movie={false} Room={false} Show={true} Ticket={false} Users={false} />
            <button onClick={() => navigate(-1)}>Powrót</button>
            <div style={{ width:"90vw",display: "flex", justifyContent: "center", WebkitJustifyContent:"space-around" } }>
                <SelectMovie set={setMovieID} PageSize={pageSize} />
                <SelectRoom set={setRoomID} PageSize={pageSize} />
                </div>
            <form onSubmit={async (e) => { await add(e); }}>
                <div>
                    <label>Cena Normalna: <input type="number" name="NormalPrice" required min={0} /></label><br />
                    <label>Cena VIP: <input type="number" name="VIPPrice" required min={0} /> cal</label><br />
                    <label>Czas rozpoczęcia: <input type="datetime-local" name="StartTime" value={ startDateTime} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setStartDateTime(e.target.value); setEndDateTime(e.target.value) }} required /></label><br />
                    <label>Czas zakończenia: <input type="datetime-local" name="EndTime" value={endDateTime} onChange={(e) => setEndDateTime(e.target.value)}  required /></label><br />
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
                <input type="submit" value="Dodaj"/>
            </form>
            <p>{error}</p>
        </>
    );
}
export default AddShow;