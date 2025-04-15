import React, { useState, useMemo, useEffect, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import UserI from "../utils/User";
import { getData } from "../services/Users";
import User from "../components/user";
import Pagination from "../assets/Pagination";
import Header from "../layouts/Header";


const PageSize:number = 15;
const Users: React.FC = () => {
    if (sessionStorage.getItem("Role") != "Manager") {
        return ("Nie tym razem");
    }

    const navigate = useNavigate();
    const [users, setUsers] = useState<UserI[]>([]);
    const [usersHardData, setUsersHardData] = useState<UserI[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [status, setStatus] = useState<boolean>(false);

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return users.slice(firstPageIndex, lastPageIndex);
    }, [users, currentPage]);

    function search(e: ChangeEvent<HTMLInputElement>) {
        setUsers(usersHardData.filter((a) => (a.Name.toLowerCase().indexOf(e.currentTarget.value.toLowerCase()) >= 0 || a.LastName.toLowerCase().indexOf(e.currentTarget.value.toLowerCase()) >= 0)));
    }

    useEffect(() => {
        const get = async () => {
            const res: boolean = await getData(status);
            if (!res) {
                navigate("/login");
            }else {
                navigate("/users");
            }
        }
        get().then(() => {
            const s = sessionStorage.getItem('users');
            if (s) {
                setUsersHardData(JSON.parse(s));
                setUsers(JSON.parse(s));
            }
        });
    }, [, status]);


    return (
        <>
            <Header Main={false} Movie={false} Room={false} Show={false} Ticket={false} Users={true} />
            <div>
                <label>Wyszukaj: <input type="text" onChange={search}></input></label>
                <label>Czy aktywne?: <input type="checkbox" defaultChecked={status} onChange={(e)=>setStatus(e.currentTarget.checked)}></input></label>
            </div>
            <div>
                {currentTableData.map((v) => (
                    <div key={v.ID}>
                        <User Name={v.Name} LastName={v.LastName} Email={v.Email} Role={v.Role} Confirm={v.Confirm} ID={v.ID}></User>
                    </div>
                ))}
            </div>
            <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={users.length}
                pageSize={PageSize}
                onPageChange={(page: React.SetStateAction<number>) => setCurrentPage(page)}
            />
        </>
    )
}

export default Users;
