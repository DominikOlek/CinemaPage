import React from "react";
import { Link } from "react-router-dom";
import { MovieI } from '../utils/SeansI';

const Show: React.FC<MovieI> = ({ Name, Describe, StartTime, EndTime, ImageSrc, ID }) => {

    if (!ID) return <p>Nie znaleziono artykułu.</p>;
    const date = StartTime.toUTCString().split(" ");

    return (
        <Link to={`/shows/${ID}`}>
            <div className={'S:' + ID} >
                <div>
                    <h1>{Name}</h1>
                    <img src={"../public/posters/" + ImageSrc} width="150px" />
                </div>
                <h5>Dzień: {date[1] + " " + date[2] + " " + date[3]}</h5>
                <h5>Godzina: {date[4]}</h5>
                <h5>Długość: {(EndTime.getTime() - StartTime.getTime()) / (1000 * 60)} min</h5>
                <p>Opis: {Describe}</p>
            </div>
        </Link>
    );
};

export default Show;