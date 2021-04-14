import React, {useEffect} from "react"
import styled from "styled-components"
import {observer} from "mobx-react-lite";

import FavouritesStore from "../stores/favouritesStore";
import VideoCardLoading from "./VideoCardLoading";
import VideosCard from "./VideoCard";

const VideosWrapperStyled = styled.div`
    min-height: 50px;
    box-sizing: border-box;
    display: flex;
    margin: 25px;
    gap: 25px;
    flex-wrap: wrap;
    font-size: 1.3rem;
`


const FavouriteWrapper = observer(() => {
    let mappedVideos = []

    const {
        isLoadingFavourite, favouriteVideos,
        deleteFromFavourite, videosIDs,
        fetchFavouriteVideos, initializeFromLocalstorage
    } = FavouritesStore

    useEffect(() => {
        initializeFromLocalstorage()
    }, [])



    useEffect(() => {
        if (videosIDs.length !== favouriteVideos.length) {
            fetchFavouriteVideos()
        }
        check()
    }, [videosIDs, favouriteVideos])

    function check() {

        if (Array.isArray(favouriteVideos) && favouriteVideos && favouriteVideos.length > 0 && !isLoadingFavourite) {
            mappedVideos.push(
                <VideosCard key={`videosCardFavourites ${mappedVideos.length}`}
                            videos={favouriteVideos} clickMethod={deleteFromFavourite} spanText={'Удалить'}/>)
        }

        if (isLoadingFavourite && favouriteVideos && favouriteVideos.length > 0) {
            mappedVideos.push(<VideoCardLoading key={`videosFavouritesLoading ${mappedVideos.length}`}/>)
        }

    }

    check()

    return (
        <VideosWrapperStyled>
            {mappedVideos}
        </VideosWrapperStyled>
    )
})

export default FavouriteWrapper