import { ChangeEvent, useEffect, useState,useMemo } from "react";
import { MovieI } from '../utils/SeansI';
import Pagination from '../assets/Pagination';
import Seans from '../components/seans';
import getData from '../services/GetSeanses';
import '../utils/stylePagin.css';

let PageSize = 5;
const Main: React.FC = () => {
    const [seanses, setSeanses] = useState<MovieI[]>([]);
    const [seansesHardData, setSeansesHardData] = useState<MovieI[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return seanses.slice(firstPageIndex, lastPageIndex);
    }, [seanses,currentPage]);


    useEffect(()=>{
        /*if (sessionStorage.getItem('seanses') == null) {
            if (!getData()) {
                return;
            }
        }*/
        const get = async() => {
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
            <div>
                <label>Wyszukaj: <input type="text" onChange={search}></input></label>
                <br/>
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
                    <Seans Name={v.Name} Describe={v.Describe} StartTime={new Date(v.StartTime)} ImageSrc={v.ImageSrc} EndTime={new Date(v.EndTime)} key={v.ID} ID={v.ID} Is3D={v.Is3D} Is4D={v.Is4D} IsIMAX={v.IsIMAX} IsScreenX={v.IsScreenX }></Seans>
                ))}
            </div>
            <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={seanses.length}
                pageSize={PageSize}
                onPageChange={(page: React.SetStateAction<number>) => setCurrentPage(page)}
            />
        </>
    )
}
export default Main;