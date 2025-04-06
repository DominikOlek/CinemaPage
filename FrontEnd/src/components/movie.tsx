import React from "react";
import { Link } from "react-router-dom";
import MovieI from '../utils/MovieI';

const Movie: React.FC<MovieI> = ({ ID, Name, Director, Describe,
    AgeCategory, Length, ImageSrc, Is3D, IsIMAX, Is4D, IsScreenX, LanguageName, SubtitlesName, Category, InstID }) => {

    if (!ID) return <p>Nie znaleziono.</p>;

    return (
        <Link to={`/movie/${ID}`}>
            <div className={'MovieElement'} >
                <div>
                    <h1>{Name}</h1>
                    <img src={"../public/posters/" + ImageSrc} width="150px" />
                </div>
                <h5>Reżyser: {Director}</h5>
                <h5>Gatunek: {Category}</h5>
                <h5>Kategoria wiekowa: {AgeCategory}</h5>
                <h5>Długość: {Length}</h5>
                <p>Opis: {Describe}</p>
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
                <h3>Wersje językowe</h3>
                <table style={{ width: "50%", margin: "auto", tableLayout: "fixed" }}>
                    <tbody>
                        <tr>
                            <td>Lp.</td>
                            <td>Język</td>
                            <td>Napisy</td>
                        </tr>
                        {LanguageName.map((el:string,ind:number) => (
                            <tr key={ind}>
                                <td>{InstID[ind]}</td>
                                <td>{el}</td>
                                <td>{SubtitlesName[ind]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Link>
    );
};

export default Movie;