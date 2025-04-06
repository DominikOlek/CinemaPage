import React, { FormEvent } from "react";
import { useLocation } from "react-router-dom";
import TicketI from "../utils/TicketI"
import addTicket from "../services/AddTicket"

const ReservForm: React.FC = () => {
    const location = useLocation();
    const data = location.state || {};

    function typeToStr(i:number) {
        if (i == 0)
            return "Normalny"
        return "VIP"
    }
    async function Pay(e:FormEvent) {
        e.preventDefault();
        const ticket: TicketI = { Name: e.target.name.value, LastName: e.target.lastName.value, Email: e.target.email.value, Places: data.places, ShowID: data.showID }
        let res = await addTicket(ticket);
        if (res != null) {
            alert("Opłacono kod dostępu: " + res);
        } else {
            alert("Błąd ! Spróbuj ponownie")
        }
    }

    return (
        <div>
            <h1>Movie: {data.Name}</h1>
            <h4>Play: {data.StartDate}</h4>
            <h4>Kwota do zapłaty: {data.cost} zł</h4>
            {data.places.map((v:Number[]) => <span key={v[0]+" "+v[1]}>{("Rząd: " + v[1] + " Miejsce: " + v[0] + " Typ: " + typeToStr(v[2]))}<br/></span>) }
            <form onSubmit={async (e) => { await Pay(e); }}>
                <label>Imię: <input type="text" name="name"></input></label>
                <label>Nazwisko: <input type="text" name="lastName"></input></label>
                <label>Email: <input type="email" name="email"></input></label>
                <br/>
                <input type="submit" value="Zamów"></input>
            </form>
        </div>
    );
};
export default ReservForm;