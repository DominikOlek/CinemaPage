
var refCnt = 0;
export default async function refreshAccessToken() {
    try {
        refCnt += 1;
        if (refCnt > 3) {
            return false;
        }
        const response = await fetch("http://127.0.0.1:5173/api/api/refresh", {
            method: "POST",
            credentials: "include"
        });

        if (!response.ok) {
            throw new Error("Refresh Session Error");
        }
        refCnt = 0;
        const data = await response.json();
        sessionStorage.setItem("JWT", data.token);
        return true;
    } catch(error) {
        console.log(error);
        return false;
    }
}