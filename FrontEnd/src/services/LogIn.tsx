import LoginI from "../utils/LoginI"
async function LogIn(data: LoginI): Promise<string> {
    try {
        const response = await fetch("http://127.0.0.1:5173/api/api/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            credentials: "include"
        });
        if (!response.ok) {
            throw new Error(`${await response.text()}`);
        }
        const res = await response.text();
        const obj = JSON.parse(res);
        sessionStorage.setItem("JWT", obj.token);
        sessionStorage.setItem("Role", obj.role);
        return "Zalogowano";

    } catch (error) {
        return ""+error;
    }
    return "";
};
export default LogIn;