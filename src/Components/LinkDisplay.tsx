import React from "react"
import Typography from "@mui/joy/Typography"
import Link from "@mui/joy/Link"

const makeLink = (data: string) => {
    return "/tic-tac-toe/?g=" + btoa(data)
}

export default function LinkDisplay({data} : {data: string}) {
    return (
        <Typography level="body-lg" textAlign="center"><b>Your link is: </b>
        <Link href={makeLink(data)}>omer-sm.github.io{makeLink(data)}</Link>
        <br/>Share it with a friend!</Typography>
    )
}