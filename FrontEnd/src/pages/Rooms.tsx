import { ChangeEvent, useEffect, useState, useMemo } from "react";
import RoomI  from '../utils/Room';
import Pagination from '../assets/Pagination';
import { getData,remove } from '../services/Rooms';
import '../utils/stylePagin.css';
import Room from "../components/room";
import { useNavigate} from "react-router-dom";
import Header from "../layouts/Header";

let PageSize = 5;
const Rooms: React.FC = () => {
    const [rooms, setRooms] = useState<RoomI[]>([]);
    const [roomsHardData, setRoomsHardData] = useState<RoomI[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return rooms.slice(firstPageIndex, lastPageIndex);
    }, [rooms, currentPage]);


    useEffect(() => {
        const get = async () => {
            await getData();
        }
        get().then(() => {
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
                return b.Number > a.Number?1:-1;
            } else if (value === "NI") {
                return a.Number >b.Number?1:-1;
            }
            return 0;
        });
        setRooms(sortedList);
    }

    const removeRoom = async (id: number) => {
        const resp = await remove(id);
        if (!resp) {
            navigate("/login");
        } else {
            const s = sessionStorage.getItem('rooms');
            if (s) {
                setRoomsHardData(JSON.parse(s));
                setRooms(JSON.parse(s));
            }
        }
    }


    return (
        <>
            <Header Main={false} Movie={false} Room={true} Show={false} Ticket={false} Users={false} />
            <button onClick={() => { navigate("/rooms/add"); }}>Dodaj salę</button>
            <div>
                <label>Wyszukaj: <input type="text" onChange={search}></input></label>
                <br />
                <label>Sortuj według: <select onChange={sort}>
                    <option value="NI">Numer (rosnąco)</option>
                    <option value="ND">Numer (malejąco)</option>
                </select>
                </label>
            </div>
            <div>
                {currentTableData.map((v) => (
                    <Room removeF={removeRoom} key={v.Number} Number={v.Number} IsIMAX={v.IsIMAX} ScreenSize={v.ScreenSize} Places={v.Places} Is3D={v.Is3D} Is4D={v.Is4D} IsScreenX={v.IsScreenX}></Room>
                ))}
            </div>
            <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={rooms.length}
                pageSize={PageSize}
                onPageChange={page => setCurrentPage(page)}
            />
        </>
    )
}
export default Rooms;