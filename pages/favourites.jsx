import React from "react"
import MainContainer from "../components/MainContainer";
import FavouriteWrapper from "../components/FavouriteWrapper";
import {observer} from "mobx-react-lite";

const Favourites = observer(() => {

    return (
        <MainContainer>
            <FavouriteWrapper />
        </MainContainer>
    )
})

export default Favourites