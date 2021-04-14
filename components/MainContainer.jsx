import React from "react"
import styled from "styled-components"
import ALink from "./ALink";

const MainContainerStyled = styled.div`
    width: 100%;
    background: black;
    color: white;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 30px;
`

const MainContainer = ({children}) => {
    return (
        <>
            <MainContainerStyled>
                <ALink href="/" text="Поиск"/>
                <ALink href="/favourites" text="Избранное"/>
            </MainContainerStyled>

            <div>
                {children}
            </div>
        </>
    )
}

export default MainContainer