import React from "react"
import Link from "next/link";
import styled from "styled-components"

const AStyled = styled.a`
    margin: 0 15px;
    color: white;
    cursor: pointer;
    transition: color .2s;
    &:hover {
        color: blue;
    }
    user-select: none;
`

export default function ALink({text, href}) {



    return (
        <Link href={href}>
                <AStyled>{text}</AStyled>
        </Link>
    )
}