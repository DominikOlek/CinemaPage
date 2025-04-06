import React from "react";
import { Link } from "react-router-dom";
import RoomI from '../utils/Room';
import Seat from "./place";

interface MovieProps extends RoomI {
    removeF: (id:number) => void;
}
const Movie: React.FC<MovieProps> = ({ Number, Places, Is3D, Is4D, IsIMAX, IsScreenX, ScreenSize, removeF }) => {

    if (!Places) return <p>Nie znaleziono.</p>;
    function reservation(x: number, y: number, isAdd: boolean) {
        return;
    }

    return (
        <>
            <Link to={`/rooms/${Number}`}>
                <div className={'S:' + Number} >
                    <div>
                        <h1>Numer: {Number}</h1>
                        <h5>Rozmiar ekranu: {ScreenSize} cal</h5>
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
                                <td>{Is3D ? '\u2714' : '\u2716'}</td>
                                <td>{Is4D ? '\u2714' : '\u2716'}</td>
                                <td>{IsIMAX ? '\u2714' : '\u2716'}</td>
                                <td>{IsScreenX ? '\u2714' : '\u2716'}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div>{Places.map((v: Number[], rowIndex: number) => (
                        <div key={rowIndex}>
                            {(v.map((el: Number, colIndex: number) => (<Seat isRoom={false} key={colIndex} Status={el} col={colIndex} row={rowIndex} Set={reservation}></Seat>)))}
                            <br />
                        </div>
                    ))}
                    </div>
                </div>
            </Link>
            <button onClick={async () => { await removeF(Number); }}>Usuń salę</button>
        </>
    );
};

export default Movie;