import React, { useEffect, useState, FormEvent } from "react";
import { useParams, Link } from "react-router-dom";
import MovieI from "../utils/MovieI";
import EditMovieI from "../utils/EditMovieI";
import { useNavigate } from 'react-router-dom';
import CategoryI from "../utils/CategoryI";
import { editMovie, removeInst,addInst } from "../services/Movies";
import Header from "../layouts/Header";



const MoviePage: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [movie, setMovie] = useState<MovieI | null>(null);
    let categories: CategoryI[] | null;
    let lang: CategoryI[] | null;
    if (sessionStorage.getItem("categories")) {
        categories = JSON.parse(sessionStorage.getItem("categories"));
    } else {
        categories = null;
    }
    if (sessionStorage.getItem("lang")) {
        lang = JSON.parse(sessionStorage.getItem("lang"));
    } else {
        lang = null;
    }

    function refresh() {
        const stored = sessionStorage.getItem("movies");
        if (stored) {
            const seansEl: MovieI[] = JSON.parse(stored);
            const found = seansEl.find((a) => a.ID == Number(id));
            setMovie(found || null);
        }
    }

    useEffect(() => {
        refresh();
    }, [id]);

    async function edit(e:FormEvent) {
        e.preventDefault();
        const data: EditMovieI = {
            Name: e.target.Name.value, Describe: e.target.Describe.value, AgeCategory: e.target.AgeCategory.value,
            IsIMAX: e.target.IsIMAX.checked, CategoryID: e.target.Category.value, Director: e.target.Director.value,
            ImageSrc: movie.ImageSrc, Is3D: e.target.Is3D.checked, Is4D: e.target.Is4D.checked, IsScreenX: e.target.IsScreenX.checked,
            Length: e.target.Length.value
        };
        const res = await editMovie(movie?.ID,data);
        if (!res) {
            navigate("/login");
        }
    }
    async function delIns(id:number) {
        const res = await removeInst(id);
        if (!res) {
            navigate("/login");
        } else {
            refresh();
        }
    }

    async function addIns(e: FormEvent) {
        e.preventDefault();
        const res = await addInst(movie.ID,e.target.Language.value,e.target.Subtitles.value);
        if (!res) {
            navigate("/login");
        } else {
            refresh();
        }
    }


    if (!movie) return <p>Nie znaleziono :( .</p>;

    return (
        <div className={'S:' + movie.ID} >
            <Header Main={false} Movie={true} Room={false} Show={false} Ticket={false} Users={false} />
            <button onClick={() => navigate(-1)}>Powrót</button>

            <form onSubmit={async (e) => {await edit(e);}}>
                <div>
                    <img src={"../public/posters/" + movie.ImageSrc} width="150px" /><br/>
                    <label>Tytuł: <input type="text" defaultValue={movie.Name} name="Name" required/></label>
                </div>
                <label>Reżyser: <input type="text" defaultValue={movie.Director} name="Director" required /></label><br />
                <label>Gatunek: <select name="Category" required>
                    {categories?.map((el) => (
                        <option selected={el.ID==movie.CategoryID} value={el.ID} key={el.ID}>{el.Name}</option>
                    ))}
                </select></label><br/>
                <label>Kategoria wiekowa:
                    <select name="AgeCategory" required>
                        <option value="Child" selected={movie.AgeCategory == "Child"}>Child</option>
                        <option value="Teen" selected={movie.AgeCategory == "Teen"}>Teen</option>
                        <option value="Adult" selected={movie.AgeCategory == "Adult"}>Adult</option>
                        <option value="All" selected={movie.AgeCategory == "All"}>All</option>
                    </select>
                </label><br />
                <label>Długość: <input type="number" defaultValue={movie.Length} name="Length" required min={1} max={400} /> min</label><br />
                <label>Opis: <textarea defaultValue={movie.Describe} name="Describe" required /></label><br />
                <table style={{ width: "50%", margin: "auto", tableLayout: "fixed" }}>
                    <tbody>
                        <tr>
                            <td>3D</td>
                            <td>4D</td>
                            <td>IMAX</td>
                            <td>ScreenX</td>
                        </tr>
                        <tr>
                            <td><input type="checkbox" defaultChecked={movie.Is3D} name="Is3D"></input></td>
                            <td><input type="checkbox" defaultChecked={movie.Is4D} name="Is4D"></input></td>
                            <td><input type="checkbox" defaultChecked={movie.IsIMAX} name="IsIMAX"></input></td>
                            <td><input type="checkbox" defaultChecked={movie.IsScreenX} name="IsScreenX"></input></td>
                        </tr>
                    </tbody>
                </table>
                <input type="submit" value="Zaktualizuj"></input>
            </form>
            <h3>Wersje językowe</h3>
            <table style={{ width: "50%", margin: "auto", tableLayout: "fixed" }}>
                <tbody>
                    <tr>
                        <td>Lp.</td>
                        <td>Język</td>
                        <td>Napisy</td>
                    </tr>
                    {movie.LanguageName.map((el: string, ind: number) => (
                        <tr key={ind}>
                            <td>{movie.InstID[ind]}</td>
                            <td>{el}</td>
                            <td>{movie.SubtitlesName[ind]}</td>
                            <button onClick={() => { delIns(movie.InstID[ind]); } }>Usuń</button>
                        </tr>
                    ))}
                    <tr>
                        <td>Dodaj:</td>
                        <td colSpan={3}>
                            <form onSubmit={async (e) => { await addIns(e); } }>
                                <select name="Language" required>
                                    {lang?.map((el) => (
                                        <option value={el.ID} key={el.ID}>{el.Name}</option>
                                    ))}
                                </select>
                                <select name="Subtitles" required>
                                    {lang?.map((el) => (
                                        <option value={el.ID} key={el.ID}>{el.Name}</option>
                                    ))}
                                </select>
                                <input type="submit" value="Dodaj"></input>
                            </form>
                        </td>
                    </tr>
                </tbody>
                </table>
        </div>
    );
};

export default MoviePage;