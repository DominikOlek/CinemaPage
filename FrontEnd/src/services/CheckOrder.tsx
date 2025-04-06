import refreshAccessToken from "./RefreshSession";

async function checkOrder(email:string, id:number) {
    try {
        const response = await fetch("http://127.0.0.1:5173/api/order/check/"+id+"/"+email, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem("JWT")
            },
        });
        if (response.status == 403) {
            const ref = await refreshAccessToken();
            if (!ref) {
                return "out";
            } else {
                let res:string = await checkOrder(email,id);
                return res;
            }
        }
        if (response.status == 204) {
            return "Brak zamówienia";
        }
        if (!response.ok) {
            throw new Error(`${await response.text()}`);
        }
        const json = await response.text();
        const obj = JSON.parse(json);
        let places = "";
        obj.Places.forEach((el: number[]) => { let ty =el[2]? "Normalny" : "VIP"; places += " Rząd: " + el[0] + " Krzesło: " + el[1] + " Rodzaj: " + ty +"\n"});
        return "Ok Sala: " + obj.RoomID + "\n Miejsca: \n" + places;

    } catch (error) {
        return error.message;
    }
    return "error";
};

export default checkOrder;