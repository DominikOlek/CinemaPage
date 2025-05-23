
import RoomI from "../utils/Room";
import refreshAccessToken from "./RefreshSession";

async function getData() : Promise<boolean>{
    try {
        const response = await fetch("http://127.0.0.1:5173/api/room/", {
            method: "GET"
        });
        if (response.status == 403) {
            const ref = await refreshAccessToken();
            if (!ref) {
                return false;
            } else {
                return await getData();
            }
        }
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.text();
        sessionStorage.setItem("rooms", json);
        return true;

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error("Wyst�pi� nieznany b��d");
        }
    }
    return false;
};

async function remove(id: number) {
    try {
        const response = await fetch("http://127.0.0.1:5173/api/room/delete" + id, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem("JWT")
            }
        });
        if (response.status == 403) {
            const ref = await refreshAccessToken();
            if (!ref) {
                return false;
            } else {
                await remove(id);
                return true;
            }
        }
        if (!response.ok) {
            throw new Error(`${await response.text()}`);
        }
        await getData();
        return true;

    } catch (error: unknown) {
        if (error instanceof Error) {
            alert(error.message);
        } else {
            console.error("Wyst�pi� nieznany b��d");
        }
    }
    return true;
};

async function addRoom(data: RoomI) {
    try {
        const response = await fetch("http://127.0.0.1:5173/api/room/add", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem("JWT")
            },
            body: JSON.stringify(data)
        });
        if (response.status == 403) {
            const ref = await refreshAccessToken();
            if (!ref) {
                return "out";
            } else {
                let res:string = await addRoom(data);
                return res ;
            }
        }
        if (!response.ok) {
            throw new Error(`${await response.text()}`);
        }
        await getData();
        return "ok";

    } catch (error: unknown) {
        if (error instanceof Error) {
            alert(error.message);
            return error.message;
        } else {
            console.error("Wyst�pi� nieznany b��d");
        }
    }
    return "error";
};

async function editRoom(id: number, data: RoomI) {
    try {
        const response = await fetch("http://127.0.0.1:5173/api/room/edit" + id, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem("JWT")
            },
            body: JSON.stringify(data)
        });
        if (response.status == 403) {
            const ref = await refreshAccessToken();
            if (!ref) {
                return "out";
            } else {
                let res:string =await editRoom(id, data);
                return res;
            }
        }
        if (!response.ok) {
            throw new Error(`${await response.text()}`);
        }
        await getData();
        return "ok";

    } catch (error: unknown) {
        if (error instanceof Error) {
            alert(error.message);
            return error.message;
        } else {
            console.error("Wyst�pi� nieznany b��d");
        }
    }
    return "error";
};

export { getData, remove, addRoom, editRoom };