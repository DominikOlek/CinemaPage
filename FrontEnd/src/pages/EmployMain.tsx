import { ChangeEvent, useEffect, useState, useMemo, FormEvent } from "react";
import { MovieI } from '../utils/SeansI';
import Pagination from '../assets/Pagination';
import getData from '../services/GetSeanses';
import { remove } from '../services/Shows';
import '../utils/stylePagin.css';
import Header from "../layouts/Header"
import Show from "../components/show";
import { useNavigate } from 'react-router-dom';

let PageSize = 5;
const EMain: React.FC = () => {
    const navigate = useNavigate();
    const [seanses, setSeanses] = useState<MovieI[]>([]);
    const [seansesHardData, setSeansesHardData] = useState<MovieI[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return seanses.slice(firstPageIndex, lastPageIndex);
    }, [seanses, currentPage]);


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
            const s = sessionStorage.getItem('seanses');
            if (s) {
                setSeansesHardData(JSON.parse(s));
                setSeanses(JSON.parse(s));
            }
        });
    }, []);

    const removeF = async (id: number) => {
        const resp = await remove(id);
        if (!resp) {
            navigate("/login");
        } else {
            const s = sessionStorage.getItem('seanses');
            if (s) {
                setSeansesHardData(JSON.parse(s));
                setSeanses(JSON.parse(s));
            }
        }
    }

    function search(e: ChangeEvent<HTMLInputElement>) {
        setSeanses(seansesHardData.filter((a) => (a.Name.toLowerCase().indexOf(e.currentTarget.value.toLowerCase()) >= 0)));
    }
    function getDate(e: ChangeEvent<HTMLInputElement>) {
        if (e.currentTarget.value == "") {
            setSeanses(seansesHardData);
            return;
        }
        const dateInput: Date = new Date(e.currentTarget.value);
        setSeanses(seansesHardData.filter((a) => (new Date(a.StartTime).getDate() == dateInput.getDate() && new Date(a.StartTime).getMonth() == dateInput.getMonth() && new Date(a.StartTime).getFullYear() == dateInput.getFullYear())));
    }
    function sort(e: ChangeEvent<HTMLSelectElement>) {
        const value = e.currentTarget.value;

        const sortedList = [...seanses].sort((a, b) => {
            if (value === "DI") {
                return new Date(a.StartTime).getTime() - new Date(b.StartTime).getTime();
            } else if (value === "DD") {
                return new Date(b.StartTime).getTime() - new Date(a.StartTime).getTime();
            } else if (value === "ND") {
                return b.Name.localeCompare(a.Name);
            } else if (value === "NI") {
                return a.Name.localeCompare(b.Name);
            }
            return 0;
        });
        setSeanses(sortedList);
    }


    return (
        <>
            <Header Main={false} Movie={false} Room={false} Show={true} Ticket={false} Users={false} />
            <button onClick={() => { navigate("/shows/add"); }}>Dodaj seans</button>
            <div>
                <label>Wyszukaj: <input type="text" onChange={search}></input></label>
                <br />
                <label>Data: <input type="date" onChange={getDate}></input></label>
                <br />
                <label>Sortuj według: <select onChange={sort}>
                    <option value="DI">Daty (rosnąco)</option>
                    <option value="ND">Nazwy (malejąco)</option>
                    <option value="DD">Daty (malejąco)</option>
                    <option value="NI">Nazwy (rosnąco)</option>
                </select>
                </label>
            </div>
            <div>
                {currentTableData.map((v) => (
                    <div key={v.ID}>
                        <Show Name={v.Name} Describe={v.Describe} StartTime={new Date(v.StartTime)} ImageSrc={v.ImageSrc} EndTime={new Date(v.EndTime)} ID={v.ID} Is3D={v.Is3D} Is4D={v.Is4D} IsIMAX={v.IsIMAX} IsScreenX={v.IsScreenX}></Show>
                        <button onClick={async () => { await removeF(v.ID); }}>Usuń seans (gdy brak zapisów)</button>
                    </div>
                ))}
            </div>
            <br/>
            <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={seanses.length}
                pageSize={PageSize}
                onPageChange={page => setCurrentPage(page)}
            />
        </>
    )
}
export default EMain;