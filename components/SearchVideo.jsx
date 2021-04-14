import React, {useCallback} from "react"
import {observer} from "mobx-react-lite";
import VideosStore from "../stores/videosStore";
import styled from "styled-components"
import {debounce} from "../utils/debounce";


const SearchVideoStyled = styled.div`
    color: black;
    font-size: 1.5rem;
    display: flex;
    flex-direction: row;
    padding: 15px;
    height: 60px;
    
        label {
        width: 15%;
            color: black;
        }
        
        input {
        outline: none;
        width: 80%;
        justify-self: center;
        font-size: 1.3rem;
        border: none;
        border-bottom: 1px solid black;
        }
`
const SearchVideo = observer(() => {

    const {channelName, setChannelName, getVideos} = VideosStore

    const onChangeDebounced = useCallback(debounce(() => {
        getVideos(true)
    }, 300),[])

    const changeHandler = (e) => {
        setChannelName(e.target.value)
        onChangeDebounced(channelName)
    }

    return (
        <SearchVideoStyled>

            <label>Введите название канала:</label>
            <input value={channelName}
                   onChange={changeHandler}/>

        </SearchVideoStyled>
    )
})

export default SearchVideo