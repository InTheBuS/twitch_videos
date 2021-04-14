import React from "react"
import {observer} from "mobx-react-lite";
import MainContainer from "../components/MainContainer";
import SearchVideo from "../components/SearchVideo";
import VideosWrapper from "../components/VideosWrapper";

const Index = observer(() => {

    return (
        <MainContainer>
            <SearchVideo/>
            <VideosWrapper />
        </MainContainer>
    )
})

export default Index