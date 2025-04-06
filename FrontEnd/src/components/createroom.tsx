import React, { useEffect, useState } from "react";
import Seat from "./place";

interface props {
    current: number[][],
    set: (arr: number[][]) => void
}

const PlacesCreate: React.FC<props> = ({current,set}) => {
    const [places, setPlaces] = useState<number[][]>([[0]])

    useEffect(() => {
        setPlaces(current);
    }, [])

    useEffect(() => {
        set(places);
    }, [places])

    const changePlace = (row: number, col: number, isAdd: boolean) => {
        if (!isAdd) {
            const p = [...places];
            p[row][col] = 0;
            setPlaces(p);
        } else {
            const p = [...places];
            p[row][col] = -1;
            setPlaces(p);
        }
    }

    const changeSize = (row: number, col: number) => {
        if (row > 0 && col > 0) {
            const p = [...places];
            p.length = row;
            for (let i = 0; i < row; i++) {
                if (p[i] == null) {
                    p[i] = [];
                }
                p[i].length = col;
                for (let j = 0; j < col; j++) {
                    if (p[i][j] == null) {
                        p[i][j] = 0;
                    }
                }
            }
            setPlaces(p);
        }
    }

    return (
        <>
            {places.map((v: Number[], rowIndex: number) => (
                <div key={rowIndex}>
                    {(v.map((el: Number, colIndex: number) => (<Seat isRoom={true} key={colIndex} Status={el} col={colIndex} row={rowIndex} Set={changePlace}></Seat>)))}
                    <br />
                </div>
            ))}
            <input value={places[0].length} type="number" min={1} onChange={(e) => { changeSize(places.length, Number(e.target.value)) }}></input>
            <input value={places.length} type="number" min={1} onChange={(e) => { changeSize(Number(e.target.value), places[0].length) }}></input>
        </>
    );
};

export default PlacesCreate;