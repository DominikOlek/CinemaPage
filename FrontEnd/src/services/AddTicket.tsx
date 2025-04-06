import TicketI from "../utils/TicketI"

async function addTicket(ticket: TicketI) {
    try {
        const response = await fetch("http://127.0.0.1:5173/api/order/add", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ticket),
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const res = await response.text();
        return res;

    } catch (error) {
        console.error(error.message);
    }
    return null;
};
export default addTicket;