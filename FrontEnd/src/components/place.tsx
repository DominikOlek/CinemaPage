import React, { useState } from "react";

interface seatI {
    Status: Number,
    col: number,
    row:number,
    Set: Function,
    isRoom: boolean
}
const Seat: React.FC<seatI> = ({ Status, Set,col,row,isRoom }) => {
    const [status,setStatus] = useState<Number>(Status);
    function resrerv() {
        if (status == 0 || status == 2) {
            setStatus(status == 0 ? 2 : 0);
            Set(row, col, status == 0)
        } else if (isRoom && status== -1) {
            setStatus(2);
            Set(row, col, status == 0)
        }
    }

    return (
        <div onClick={resrerv} style={{ visibility: status == -1 ? isRoom?"visible":"hidden" : "visible", backgroundColor: status == 0 ? "green" : status == 2 ? "red" : "gray", width: 20, height: 20, display: "inline-block",margin:10 }}></div>
    );
};

export default Seat;