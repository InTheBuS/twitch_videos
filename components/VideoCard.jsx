import React from "react"
import styled from "styled-components";

const CardLink = styled.a`
    text-decoration: none;
    color: white;
`

const VisualOpacity = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`

const AddToFavourite = styled.div`
    position: absolute;
    align-self: flex-start;
    display: none;
    transition: color .1s;
    
    &:hover {
        color: grey;
        display: block;
    }
    
    &:active {
        color: white;
    }
`

const VideoCard = styled.div`
        color: white;
        width: 599px;
        height: 337px;
        display: flex;
        align-items: center;
        justify-content: center;
        
        &:hover {
            cursor: pointer;
        }
        &:hover span {
            display: block;
        }
        &:hover ${AddToFavourite} {
            display: block;
        }
        
        &:hover ${VisualOpacity} {
            height: 100%;
            width: 100%;
            background: rgba(25, 25, 25, .5);
            color: white;
        }
        span {
            display: none;
        }   
`


const VideosCard = (props) => {

    if (!Array.isArray(props.videos)) return

    const clickMethod = (id, title) => {
        return (
            <>
                <AddToFavourite onClick={(e) => {
                    e.preventDefault()
                    props.clickMethod(id)
                }}>

                    {props.spanText}

                </AddToFavourite>
                <span>{title}</span>
            </>
        )
    }

    const videos = props.videos.map((videoInfo, index) => {
        let src = videoInfo.thumbnail_url
            ?  videoInfo.thumbnail_url.replace('%{width}', '599').replace('%{height}', '337')
            : '/404_image.jpg'

        const style = {
            background: `url(${src}) no-repeat 100% 100%`,
            backgroundSize: 'cover'
        }

        return (
            <CardLink key={`${videoInfo.id} + ${index} + ${videoInfo.thumbnail_url}`}
                      href={videoInfo.url} target="_blank">

                <VideoCard style={style}>
                    <VisualOpacity>
                        {clickMethod(videoInfo.id, videoInfo.title)}
                    </VisualOpacity>
                </VideoCard>

            </CardLink>
        )
    })
    return (
        <>
            {videos}
        </>
    )
}
export default VideosCard