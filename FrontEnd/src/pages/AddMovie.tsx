import React, { useEffect, useState, FormEvent } from "react";
import { useParams, Link } from "react-router-dom";
import AddMovieI from "../utils/AddMovieI";
import { useNavigate } from 'react-router-dom';
import CategoryI from "../utils/CategoryI";
import { addMovie } from "../services/Movies";
import Header from "../layouts/Header";


const AddMovie: React.FC = () => {
    const navigate = useNavigate();
    const [langu, setLangu] = useState<CategoryI[]>([]);
    const [sub, setSub] = useState<CategoryI[]>([]);
    const [error, setError] = useState<string>("");

    let categories: CategoryI[] | null;
    let lang: CategoryI[] | null;
    const [image, setImage] = useState<FormData | null>(null);
    const handle = async ():Promise<boolean> => {
        try {
            const response = await fetch("http://127.0.0.1:5173/api/movie/uploadImage", {
                method: "POST",
                body: image
            });
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            return true;

        } catch (error) {
            console.error(error.message);
            return false;
        }
    }
    const handleFileInput = (e: FormEvent) => {
        const data = new FormData();
        data.append("file", e.target.files[0], e.target.files[0].name)
        setImage(data);
    }

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

    const delIns = (id: number) => {
        const l = langu.filter((_, k) => k !== id );
        setLangu(l);
        setSub(sub.filter((_,k)=> k !==id));
    }

    const addIns = () => {
        const langInput: HTMLSelectElement | null = document.getElementById("langInput");
        const subInput: HTMLSelectElement | null = document.getElementById("subInput");
        setLangu([...langu, { ID: Number(langInput?.value.split(":")[0]), Name: langInput?.value.split(":")[1] }]);
        setSub([...sub, { ID: Number(subInput?.value.split(":")[0]), Name: subInput?.value.split(":")[1] }]);
    }

    const add = async (e:FormEvent) => {
        e.preventDefault();
        if (image == null) {
            alert("Musisz wybrać plakat");
        }
        const r:boolean = await handle();
        if (!r) {
            alert("Spróbuj ponownie");
        }


        let langId: number[] = [];
        langu.forEach((e:CategoryI) => {
            langId.push(e.ID);
        })
        let subId: number[] = [];
        sub.forEach((e: CategoryI) => {
            subId.push(e.ID);
        })

        const data: AddMovieI = {
            Name: e.target.Name.value, Describe: e.target.Describe.value, AgeCategory: e.target.AgeCategory.value,
            IsIMAX: e.target.IsIMAX.checked, CategoryID: e.target.Category.value, Director: e.target.Director.value,
            ImageSrc: image.get("file").name, Is3D: e.target.Is3D.checked, Is4D: e.target.Is4D.checked, IsScreenX: e.target.IsScreenX.checked,
            Length: e.target.Length.value, Languages: langId, Subtitles: subId
        };
        const res = await addMovie(data);
        if (res == "out") {
            navigate("/login");
        } else if (res == "ok") {
            navigate("/movies");
        } else {
            setError(res);
        }
    }


    return (
        <div>
            <Header Main={false} Movie={true} Room={false} Show={false} Ticket={false} Users={false} />
            <button onClick={() => navigate(-1)}>Powrót</button>

            <form onSubmit={async (e) => { await add(e); }}>
                <div>
                    <input type="file" onChange={handleFileInput} /><br/>
                    <label>Tytuł: <input type="text" name="Name" required /></label>
                </div>
                <label>Reżyser: <input type="text" name="Director" required /></label><br />
                <label>Gatunek: <select name="Category" required>
                    {categories?.map((el) => (
                        <option value={el.ID} key={el.ID}>{el.Name}</option>
                    ))}
                </select></label><br />
                <label>Kategoria wiekowa:
                    <select name="AgeCategory" required>
                        <option value="Child" >Child</option>
                        <option value="Teen">Teen</option>
                        <option value="Adult">Adult</option>
                        <option value="All">All</option>
                    </select>
                </label><br />
                <label>Długość: <input type="number" name="Length" required min={1} max={400} /> min</label><br />
                <label>Opis: <textarea name="Describe" required /></label><br />
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
                <input type="submit" value="Utwórz"></input>
            </form>
            <h3>Wersje językowe</h3>
            <table style={{ width: "50%", margin: "auto", tableLayout: "fixed" }}>
                <tbody>
                    <tr>
                        <td>Lp.</td>
                        <td>Język</td>
                        <td>Napisy</td>
                    </tr>
                    {langu.map((el:CategoryI, ind: number) => (
                        <tr key={ind}>
                            <td>-</td>
                            <td>{el.Name}</td>
                            <td>{sub[ind].Name}</td>
                            <button onClick={() => { delIns(ind); }}>Usuń</button>
                        </tr>
                    ))}
                    <tr>
                        <td>Dodaj:</td>
                        <td colSpan={3}>
                            <div>
                                <select name="Language" id="langInput" required>
                                    {lang?.map((el) => (
                                        <option selected={el.Name=="Polski"} value={el.ID + ":" + el.Name} key={el.ID}>{el.Name}</option>
                                    ))}
                                </select>
                                <select name="Subtitles" id="subInput" required>
                                    {lang?.map((el) => (
                                        <option selected={el.Name == "Polski"} value={el.ID+":"+el.Name} key={el.ID}>{el.Name}</option>
                                    ))}
                                </select>
                                <button onClick={() => { addIns(); }}>Dodaj</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p>{error}</p>
        </div>
    );
};

export default AddMovie;