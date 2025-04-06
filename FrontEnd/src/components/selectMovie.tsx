import React, { useState, useEffect, useMemo, ChangeEvent } from "react";
import { getData as getMovi } from "../services/Movies";
import MovieI from "../utils/MovieI";
import Pagination from '../assets/Pagination';

interface props {
    set: (id: number) => void,
    PageSize: number,
    showSelected: number,
    instSelected:number
}

const selectMovie: React.FC<props> = ({ set, PageSize, showSelected = -1, instSelected=-1 }) => {
    const [movies, setMovies] = useState<MovieI[]>([]);
    const [moviesHardData, setMoviesHardData] = useState<MovieI[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showM, setshowM] = useState(-1);
    const [select, setSelect] = useState(1);

    const currentMoviesData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return movies.slice(firstPageIndex, lastPageIndex);
    }, [movies, currentPage]);

    useEffect(() => {
        setshowM(showSelected);
        setSelect(instSelected);
        const getMovies = async () => {
            await getMovi();
        }
        getMovies().then(() => {
            const s = sessionStorage.getItem('movies');
            if (s) {
                setMoviesHardData(JSON.parse(s));
                setMovies(JSON.parse(s));
            }
        });
    }, []);

    function search(e: ChangeEvent<HTMLInputElement>) {
        setMovies(moviesHardData.filter((a) => (a.Name.toLowerCase().indexOf(e.currentTarget.value.toLowerCase()) >= 0)));
    }
    function sort(e: ChangeEvent<HTMLSelectElement>) {
        const value = e.currentTarget.value;

        const sortedList = [...movies].sort((a, b) => {
            if (value === "ND") {
                return b.Name.localeCompare(a.Name);
            } else if (value === "NI") {
                return a.Name.localeCompare(b.Name);
            }
            return 0;
        });
        setMovies(sortedList);
    }

    return (
        <div style={{ width: "50%" }}>
            <div>
                <label>Wyszukaj: <input type="text" onChange={search}></input></label>
                <br />
                <label>Sortuj według: <select onChange={sort}>
                    <option value="ND">Nazwy (malejąco)</option>
                    <option value="NI">Nazwy (rosnąco)</option>
                </select>
                </label>
            </div>
            <div style={{ width: "100%", margin: "auto" }}>
                {currentMoviesData.map((v) => (
                    <div onClick={() => { setshowM(v.ID); }} style={{ border: showM == v.ID ? "1px solid" : "none" }} key={v.ID }>
                        <p><h3 style={{ display: "inline", margin: "auto" }}>{v.Name}</h3> Dł: {v.Length} Kat: {v.Category} 3D: {v.Is3D ? '\u2714' : '\u2716'} 4D: {v.Is4D ? '\u2714' : '\u2716'} IMAX: {v.IsIMAX ? '\u2714' : '\u2716'} ScreenX: {v.IsScreenX ? '\u2714' : '\u2716'}</p>
                        <span  style={{display:showM==v.ID?"inline":"none"} }>
                            {v.LanguageName.map((el, ind) => (
                                <div key={v.InstID[ind]} onClick={() => { setSelect(v.InstID[ind]); set(v.InstID[ind]); }} style={{ border: select == v.InstID[ind] ? "1px solid" : "none", fontWeight: select == v.InstID[ind] ? "bold" : "normal" }} >Język: {el} Napisy: {v.SubtitlesName[ind]}</div> 
                            ))}
                        </span>
                    </div>
                ))}
            </div>
            <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={movies.length}
                pageSize={PageSize}
                onPageChange={page => setCurrentPage(page)}
            />
        </div>
    );
}
export default selectMovie;