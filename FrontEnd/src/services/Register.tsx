import RegisterI from "../utils/RegisterI"
async function Reg(data: RegisterI): Promise<string> {
    try {
        const response = await fetch("http://127.0.0.1:5173/api/api/register", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error(`${await response.text()}`);
        }
        return "OK";

    } catch (error) {
        return "" + error;
    }
    return "";
};
export default Reg;