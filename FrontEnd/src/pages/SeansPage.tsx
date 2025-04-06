import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MovieI } from "../utils/SeansI";
import Seat from '../components/place';
import { useNavigate } from 'react-router-dom';


const SeansPage: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [seans, setSeans] = useState<MovieI | null>(null);
    const [reserv, setReserv] = useState<Number[][]>([]);
    const [price, setPrice] = useState<number>(0);

    function reservation(x: number, y: number, isAdd: boolean) {
        if(seans && seans.VIPPrice && seans.NormalPrice)
        if (isAdd) {
            let VIP = confirm("Dodać rezerwacje VIP ?");
            reserv.push([x, y, VIP ? 1 : 0]);
            setPrice(VIP ? price + seans.VIPPrice : price + seans.NormalPrice);
        } else {
            let find = reserv.findIndex((val) => val[0] == x && val[1] == y)
            setPrice(reserv[find][2]==1 ? price - seans.VIPPrice : price - seans.NormalPrice);
            setReserv([...reserv.slice(0, find), ...reserv.slice(find + 1)]);
        }
    }

    useEffect(() => {
        const stored = sessionStorage.getItem("seanses");
        if (stored) {
            const seansEl: MovieI[] = JSON.parse(stored);
            const found = seansEl.find((a) => a.ID == Number(id));
            setSeans(found || null);
            setSeans(prevSeans => ({
                ...prevSeans, StartTime:new Date(prevSeans?.StartTime), EndTime:new Date(prevSeans?.EndTime)
            }));
        }
    }, [id]);

    if (!seans) return <p>Nie znaleziono :( .</p>;

    return (
        <div className="ShowPage" >
            <button onClick={() => navigate(-1)}>Powrót</button>
            <div>
                <h1>{seans.Name}</h1>
                <img src={"../public/posters/" + seans.ImageSrc} width="150px" />
            </div>
            <h5>Emisja: {seans.StartTime.toUTCString()}</h5>
            <p>Długość: {(seans.EndTime.getTime() - seans.StartTime.getTime()) / (1000 * 60)} min</p>
            <div>{seans.Places.map((v: Number[], rowIndex: number) => (
                <div key={rowIndex}>
                    {(v.map((el: Number, colIndex: number) => (<Seat isRoom={false} key={colIndex} Status={el} col={colIndex} row={rowIndex} Set={reservation}></Seat>)))}
                    <br/>
                </div>
                ))}
            </div>
            <p>{price}</p>
            <button style={{ display: reserv.length > 0 ? "inline-block" : "none" }}><Link to="/reservationForm" state={{showID: seans.ID, places: reserv,cost:price, Name:seans.Name, StartDate: seans.StartTime.toUTCString()}}>
                    Zamów
                </Link> </button>
            <p>Opis: {seans.Describe}. Reżyser: {seans.Director} </p>
            <table style={{ width: "50%", margin: "auto", tableLayout: "fixed" }}>
                <tbody>
                    <tr>
                        <td>Słowa</td>
                        <td>{seans.LanguageName}</td>
                    </tr>
                    <tr>
                        <td>Napisy</td>
                        <td>{seans.SubtitlesName}</td>
                    </tr>
                    <tr>
                        <td>Kategoria wiekowa</td>
                        <td>{seans.AgeCategory}</td>
                    </tr>
                    <tr>
                        <td>Rodzaj filmu</td>
                        <td>{seans.Category}</td>
                    </tr>
                    <tr>
                        <td>Rozmiar ekranu</td>
                        <td>{seans.ScreenSize}</td>
                    </tr>
                    <tr>
                        <td>Cena normalna</td>
                        <td>{seans.NormalPrice}</td>
                    </tr>
                    <tr>
                        <td>Cena VIP</td>
                        <td>{seans.VIPPrice}</td>
                    </tr>
                </tbody>
            </table>

            <table style={{ width: "50%", margin: "auto", tableLayout: "fixed" }}>
                <tbody>
                    <tr>
                        <td>3D</td>
                        <td>4D</td>
                        <td>IMAX</td>
                        <td>ScreenX</td>
                    </tr>
                    <tr>
                        <td>{seans.Is3D ? '\u2714' : '\u2716'}</td>
                        <td>{seans.Is4D ? '\u2714' : '\u2716'}</td>
                        <td>{seans.IsIMAX ? '\u2714' : '\u2716'}</td>
                        <td>{seans.IsScreenX ? '\u2714' : '\u2716'}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default SeansPage;