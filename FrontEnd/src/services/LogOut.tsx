

async function LogOut(): Promise<boolean> {
    try {
        const response = await fetch("http://127.0.0.1:5173/api/api/logout", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Baerer ' + sessionStorage.getItem("JWT")
            }
        });
        if (response.status == 403) {
            sessionStorage.removeItem("JWT");
            return true;
        }
        if (!response.ok) {
            throw new Error(`${await response.text()}`);
        }
        sessionStorage.removeItem("JWT");
        return true;

    } catch (error) {
        return false;
    }
    return false;
};
export default LogOut;