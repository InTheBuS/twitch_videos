import React, {useEffect, useCallback} from "react"
import styled from "styled-components"
import {observer} from "mobx-react-lite";
import {throttle} from "../utils/throttle";
import VideosStore from "../stores/videosStore";
import VideosCard from "./VideoCard";
import FavouritesStore from "../stores/favouritesStore";
import VideoCardLoading from "./VideoCardLoading";

const VideosWrapperStyled = styled.div`
    min-height: 50px;
    box-sizing: border-box;
    display: flex;
    margin: 25px;
    gap: 25px;
    flex-wrap: wrap;
    font-size: 1.3rem;
`


const VideosWrapper = observer(() => {
    let mappedVideos = []

    const {isLoadingVideos, videos, pagination, getVideos} = VideosStore
    const {addToFavourite} = FavouritesStore

    function check() {

        if (Array.isArray(videos)) {
            mappedVideos.push(<VideosCard key={`videosCardKeySearch + ${mappedVideos.length}`}
                                          videos={videos} clickMethod={addToFavourite}
                                          spanText={'Добавить в избранное'}/>)
        }
        if (isLoadingVideos) {
            mappedVideos.push(<VideoCardLoading key={`videosCardsLoading + ${mappedVideos.length}`}/>)
        }
    }

    check()

    const scrollThrottle = useCallback(throttle(() => {
        getVideos(false)
    }, 500), [])

    useEffect(() => {

        window.addEventListener('scroll', loadMore)

        async function loadMore() {
            let currentLocation = window.innerHeight + document.documentElement.scrollTop
            let maxY = document.scrollingElement.scrollHeight
            if (maxY < currentLocation + 900 && !isLoadingVideos) {
                scrollThrottle(true)
            }
        }

        return () => {
            window.removeEventListener('scroll', loadMore)
        }
    }, [videos, pagination])

    return (
        <VideosWrapperStyled>
            {mappedVideos}
        </VideosWrapperStyled>
    )
})

export default VideosWrapper