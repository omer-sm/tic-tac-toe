import React from "react"
import Table from "@mui/joy/Table"
import Typography from "@mui/joy/Typography"
import Button from "@mui/joy/Button"


const makeCell = (c : string, index: number, handleClick: Function, rowIndex: number) => {
    switch (c) {
        case "x":
            return <Typography color="danger" level="h1" sx={{textAlign: "center"}}>❌</Typography>
        case "o":
            return <Typography color="primary" level="h1" sx={{textAlign: "center"}}>🔵</Typography>
        default:
            return <Button color="neutral" variant="soft" sx={{width: "100%", height: "100%"}}
            onClick={() => handleClick(index + rowIndex * 3)}></Button>
    }
}

const makeRow = (data: string, handleClick: Function, rowIndex: number) => {
    return Array.from(data).map((c, i) => <td style={{width: "3rem", height: "3rem",
     display: "inline-flex", justifyContent: "center", alignItems: "center"}}>{makeCell(c, i, handleClick, rowIndex)}</td>)
}

export default function GameTable({data, handleClick} : {data: string, handleClick: Function}) {
    return (
        <Table sx={{display: "flex", justifyContent: "center", width: "fit-content"}} 
        variant="soft" borderAxis="bothBetween"> 
            <tbody>
                <tr>
                    {makeRow(data.slice(0, 3), handleClick, 0)}
                </tr>
                <tr>
                    {makeRow(data.slice(3, 6), handleClick, 1)}
                </tr>
                <tr>
                    {makeRow(data.slice(6, 9), handleClick, 2)}
                </tr>
            </tbody>
        </Table>
    )
}