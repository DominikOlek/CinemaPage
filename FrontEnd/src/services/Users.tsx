import UserI from "../utils/User";
import refreshAccessToken from "./RefreshSession";


async function getData(active:boolean): Promise<boolean> {
    try {
        const data = { IsConfirm: active };
        const response = await fetch("http://127.0.0.1:5173/api/api/", {
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
                return false;
            } else {
                let res:boolean = await getData(active);
                return res;
            }
            return false;
        }
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.text();
        sessionStorage.setItem("users", json);
        return true;

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error("Wyst¹pi³ nieznany b³¹d");
        }
    }
    return true;
};

async function setRole(data) :Promise<string>{
    try {
        const response = await fetch("http://127.0.0.1:5173/api/api/role", {
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
                let res: string = await setRole(data);
                return res;
            }
        }
        if (!response.ok) {
            throw new Error(`${await response.text()}`);
        }
        await getData(true);
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

async function setStatus(data: UserI) {
    try {
        const response = await fetch("http://127.0.0.1:5173/api/api/confirm", {
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
                let res: string = await setStatus(data);
                return res;
            }
        }
        if (!response.ok) {
            throw new Error(`${await response.text()}`);
        }
        await getData(data.Confirm);
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
export { setRole, getData, setStatus }