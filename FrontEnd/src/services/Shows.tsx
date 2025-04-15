import ShowI from "../utils/ShowI";
import getData from "./GetSeanses";
import refreshAccessToken from "./RefreshSession";

async function addShow(data: ShowI) {
    try {
        const response = await fetch("http://127.0.0.1:5173/api/show/add", {
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
                let res:string = await addShow(data);
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
            console.error("Wyst¹pi³ nieznany b³¹d");
        }
    }
    return "error";
};

async function remove(id: number) {
    try {
        const response = await fetch("http://127.0.0.1:5173/api/show/delete" + id, {
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
            console.error("Wyst¹pi³ nieznany b³¹d");
        }
    }
    return true;
};

async function editShow(id: number, data: ShowI) {
    try {
        const response = await fetch("http://127.0.0.1:5173/api/show/edit" + id, {
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
                let res: string = await editShow(id, data);
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
            console.error("Wyst¹pi³ nieznany b³¹d");
        }
    }
    return "error";
};

export { addShow, remove, editShow }