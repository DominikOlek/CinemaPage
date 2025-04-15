import EditMovieI from "../utils/EditMovieI";
import { MovieI } from "../utils/SeansI";
import refreshAccessToken from "./RefreshSession";

async function getData() :Promise <boolean>{
    try {
        const response = await fetch("http://127.0.0.1:5173/api/movie/", {
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
        sessionStorage.setItem("movies", json);
        await getCategory();
        await getLang();
        return true;

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error("Wyst¹pi³ nieznany b³¹d");
        }
    }
    return false;
};

async function getCategory() {
    if (sessionStorage.getItem("categories")) {
        return;
    }
    try {
        const response = await fetch("http://127.0.0.1:5173/api/movie/category", {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("JWT")
            }
        });
        if (response.status == 403) {
            const ref = await refreshAccessToken();
            if (!ref) {
                return false;
            } else {
                await getCategory();
                return true;
            }
        }
        if (!response.ok) {
            throw new Error(`${await response.text()}`);
        }
        const json = await response.text();
        sessionStorage.setItem("categories", json);
        return true;

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error("Wyst¹pi³ nieznany b³¹d");
        }
    }
    return false;
};

async function getLang() {
    if (sessionStorage.getItem("lang")) {
        return;
    }
    try {
        const response = await fetch("http://127.0.0.1:5173/api/lang/", {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("JWT")
            }
        });
        if (response.status == 403) {
            const ref = await refreshAccessToken();
            if (!ref) {
                return false;
            } else {
                await getLang();
                return true;
            }
        }
        if (!response.ok) {
            throw new Error(`${await response.text()}`);
        }
        const json = await response.text();
        sessionStorage.setItem("lang", json);
        return true;

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error("Wyst¹pi³ nieznany b³¹d");
        }
    }
    return false;
};

async function editMovie(id:number, data:EditMovieI) {
    try {
        const response = await fetch("http://127.0.0.1:5173/api/movie/edit"+id, {
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
                return false;
            } else {
                await editMovie(id, data);
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

async function removeInst(id: number) {
    try {
        const response = await fetch("http://127.0.0.1:5173/api/movie/delete" + id, {
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
                await removeInst(id);
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

async function addInst(movieID:number, LangID:number, SubID:number) {
    try {
        const response = await fetch("http://127.0.0.1:5173/api/movie/add/" + movieID+"/"+LangID+"/"+SubID, {
            method: "POST",
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
                await addInst(movieID, LangID, SubID);
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

async function addMovie(data: MovieI) {
    try {
        const response = await fetch("http://127.0.0.1:5173/api/movie/add", {
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
                let res:string=await addMovie(data);
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

export { getData, editMovie, removeInst, addInst, addMovie };