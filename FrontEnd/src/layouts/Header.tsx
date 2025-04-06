
import refreshAccessToken from "../services/RefreshSession";
import LogOut from "../services/LogOut";
import { useNavigate } from "react-router-dom";
import HeaderI from "../utils/HeaderI";
//<button onClick={async () => { if (!await refreshAccessToken()) navigate("/login"); }}>Ref</button>

const Header: React.FC<HeaderI> = ({Movie,Room,Show,Ticket,Users,Main}) => {
    const navigate = useNavigate();
    let Manager:boolean = sessionStorage.getItem("Role") == "Manager";
    return (
        <>
            <button className={Main?"Current":"NavOpt"} onClick={async () => { navigate("/"); }}>Klienta*</button>
            <button className={Ticket ? "Current" : "NavOpt"} onClick={async () => { navigate("/check"); }}>Sprawdzanie biletów</button>
            <button className={Movie ? "Current" : "NavOpt"} onClick={async () => {navigate("/movies"); }}>Zarządzaj filmami</button>
            <button className={Show ? "Current" : "NavOpt"} onClick={async () => {navigate("/main"); }}>Zarządzaj seansami</button>
            <button className={Room ? "Current" : "NavOpt"} onClick={async () => { navigate("/rooms"); }}>Zarządzaj salami</button>
            {Manager ? <button className={Users ? "Current" : "NavOpt"} onClick={async () => { navigate("/users"); }}>Zarządzaj użytkownikami</button>:"" }
            <button className={Main ? "Current" : "NavOpt"} onClick={async () => { if (await LogOut()) navigate("/login"); }}>Wyloguj</button>
            <br/>
        </>
    )
}
export default Header;