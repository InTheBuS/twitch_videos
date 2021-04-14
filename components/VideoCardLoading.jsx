import React from "react"
import styled, {keyframes} from "styled-components";

const changeBGColor = keyframes`
  0%   {background-color: rgb(35 35 35);}
  50%  {background-color: rgb(80 80 80);}
`

const VideosIsFetching = styled.div`
        width: 599px;
        height: 337px;
        background: rgb(35 35 35);
        border-radius: 12px;
        animation-name: ${changeBGColor};
        animation-duration: .5s;
        animation-iteration-count: infinite;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.3rem;
        color: white;
`

const VideoCardLoading = () => {
    let loadingVideosCards = []
    for (let i = 0; i < 3; i++) {
        loadingVideosCards.push(
            <VideosIsFetching key={i}>
                <span>Loading</span>
            </VideosIsFetching>
        )
    }
    return (
        <>
            {loadingVideosCards}
        </>)
}
export default VideoCardLoading