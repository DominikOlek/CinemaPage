import React from "react";
import { Link } from "react-router-dom";
import { MovieI } from '../utils/SeansI';

const Seans: React.FC<MovieI> = ({Name,Describe,StartTime,EndTime,ImageSrc,ID,Is3D,Is4D,IsIMAX,IsScreenX}) => {

    if (!ID) return <p>Nie znaleziono artykułu.</p>;
    const date = StartTime.toUTCString().split(" ");

    return (
        <Link to={`/seans/${ID}`}>
            <div className={"ShowElement"} >
                <h1>{Name}</h1>
                <div className="left">
                    <img src={"../public/posters/"+ImageSrc}/>
                </div>
                <div className="right">
                    <h5><i>Emisja:</i> {date[1] + " " + date[2] + " " + date[3]}</h5>
                    <h5><i>Godzina:</i> {date[4]}</h5>
                    <h5><i>Długość:</i> {(EndTime.getTime() - StartTime.getTime()) / (1000 * 60)} min</h5>
                    <h5><i>Technologie:</i> {Is3D ? "3D ," : ""} {Is4D ? "4D ," : ""} {IsIMAX ? "IMAX ," : ""} {IsScreenX ? "ScreenX ," : ""} {(IsScreenX || IsIMAX || Is4D || Is3D)? "" : "2D"}</h5>
                </div>
                <p><i>Opis:</i> {Describe}</p>
            </div>
        </Link>
    );
};

export default Seans;