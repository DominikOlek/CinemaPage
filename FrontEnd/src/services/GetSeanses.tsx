import refreshAccessToken from "./RefreshSession";

async function getData():Promise<boolean> {
    try {
        const response = await fetch("http://127.0.0.1:5173/api/show/", {
            method: "POST"
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
        sessionStorage.setItem("seanses", json);
        return true;

    } catch (error: unknown) {
        if (error instanceof Error) {
            alert(error.message);
        } else {
            console.error("Wyst¹pi³ nieznany b³¹d");
        }
    }
    return false;
};
export default getData;