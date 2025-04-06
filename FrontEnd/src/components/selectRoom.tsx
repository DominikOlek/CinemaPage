import React, { useState, useEffect, useMemo, ChangeEvent } from "react";
import { getData as getRoo } from "../services/Rooms";
import RoomI from "../utils/Room";
import Pagination from '../assets/Pagination';

interface props {
    set: (id: number) => void,
    PageSize: number,
    selected:number
}
const selectRoom: React.FC<props> = ({ set, PageSize,selected=-1 }) => {
    const [rooms, setRooms] = useState<RoomI[]>([]);
    const [roomsHardData, setRoomsHardData] = useState<RoomI[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [select, setSelect] = useState(1);

    const currentRoomsData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return rooms.slice(firstPageIndex, lastPageIndex);
    }, [rooms, currentPage]);

    useEffect(() => {
        setSelect(selected);
        const getMovies = async () => {
            await getRoo();
        }
        getMovies().then(() => {
            const s = sessionStorage.getItem('rooms');
            if (s) {
                setRoomsHardData(JSON.parse(s));
                setRooms(JSON.parse(s));
            }
        });
    }, []);

    function search(e: ChangeEvent<HTMLInputElement>) {
        if (e.currentTarget.value != "") {
            setRooms(roomsHardData.filter((a) => (a.Number == Number(e.currentTarget.value))));
        } else {
            setRooms(roomsHardData);
        }
    }

    function sort(e: ChangeEvent<HTMLSelectElement>) {
        const value = e.currentTarget.value;

        const sortedList = [...rooms].sort((a, b) => {
            if (value === "ND") {
                return b.Number > a.Number ? 1 : -1;
            } else if (value === "NI") {
                return a.Number > b.Number ? 1 : -1;
            }
            return 0;
        });
        setRooms(sortedList);
    }

    return (
        <div style={{ width: "50%" }}>
            <div>
                <label>Wyszukaj: <input type="text" onChange={search}></input></label>
                <br />
                <label>Sortuj według: <select onChange={sort}>
                    <option value="NI">Numer (rosnąco)</option>
                    <option value="ND">Numer (malejąco)</option>
                </select>
                </label>
            </div>
            <div style={{ width: "100%", margin: "auto" }}>
                {currentRoomsData.map((v) => (
                    <div onClick={() => { setSelect(v.Number); set(v.Number); }} style={{ border: select == v.Number ? "1px solid" : "none" }} key={v.Number}>
                        <p><h3 style={{ display: "inline", margin: "auto" }}>{v.Number}</h3> Ekran: {v.ScreenSize} 3D: {v.Is3D ? '\u2714' : '\u2716'} 4D: {v.Is4D ? '\u2714' : '\u2716'} IMAX: {v.IsIMAX ? '\u2714' : '\u2716'} ScreenX: {v.IsScreenX ? '\u2714' : '\u2716'}</p>
                    </div>
                ))}
            </div>
            <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={rooms.length}
                pageSize={PageSize}
                onPageChange={page => setCurrentPage(page)}
            />
        </div>
    );
}
export default selectRoom;