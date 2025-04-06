import { ChangeEvent, useEffect, useState, useMemo } from "react";
import MovieI from '../utils/MovieI';
import Pagination from '../assets/Pagination';
import Movie from '../components/movie';
import { getData } from '../services/Movies';
import '../utils/stylePagin.css';
import Header from "../layouts/Header"
import { useNavigate } from 'react-router-dom';
import CategoryI from "../utils/CategoryI";

let PageSize = 5;
const Movies: React.FC = () => {
    const navigate = useNavigate();
    const [movies, setMovies] = useState<MovieI[]>([]);
    const [moviesHardData, setMoviesHardData] = useState<MovieI[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    let categories: CategoryI[] | null;

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return movies.slice(firstPageIndex, lastPageIndex);
    }, [movies, currentPage]);


    useEffect(() => {
        /*if (sessionStorage.getItem('seanses') == null) {
            if (!getData()) {
                return;
            }
        }*/
        const get = async () => {
            await getData();
        }
        get().then(() => {
            const s = sessionStorage.getItem('movies');
            if (s) {
                setMoviesHardData(JSON.parse(s));
                setMovies(JSON.parse(s));
                if (sessionStorage.getItem("categories")) {
                    categories = JSON.parse(sessionStorage.getItem("categories"));
                } else {
                    categories = null;
                }
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
        <>
            <Header Main={false} Movie={true} Room={false} Show={false} Ticket={false} Users={false} />
            <button onClick={() => { navigate("/movie/add"); }}>Dodaj film</button>
            <div>
                <label>Wyszukaj: <input type="text" onChange={search}></input></label>
                <br />
                <label>Sortuj według: <select onChange={sort}>
                    <option value="ND">Nazwy (malejąco)</option>
                    <option value="NI">Nazwy (rosnąco)</option>
                </select>
                </label>
            </div>
            <div>
                {currentTableData.map((v) => (
                    <Movie Name={v.Name} Describe={v.Describe} AgeCategory={v.AgeCategory} ImageSrc={v.ImageSrc}
                        SubtitlesName={v.SubtitlesName} LanguageName={v.LanguageName} Director={v.Director}
                        IsIMAX={v.IsIMAX} Is3D={v.Is3D} key={v.ID} ID={v.ID} Length={v.Length} Category={v.Category}
                        CategoryID={v.CategoryID} Is4D={v.Is4D} IsScreenX={v.IsScreenX} InstID={v.InstID}></Movie>
                ))}
            </div>
            <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={movies.length}
                pageSize={PageSize}
                onPageChange={page => setCurrentPage(page)}
            />
        </>
    )
}
export default Movies;