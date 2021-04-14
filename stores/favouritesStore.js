import {makeAutoObservable} from "mobx";
import {fetchVideosByIDs} from "../API/API";

class Favourites {

    isLoadingFavourite = false
    favouriteVideos = []
    videosIDs = []

    constructor() {
        makeAutoObservable(this)
    }

    initializeFromLocalstorage = async () => {
        if (!localStorage) return
        this.loading(true)

        const itemFromLocalStorage = JSON.parse(localStorage.getItem('favouriteVideos'));

        if (!itemFromLocalStorage) {
            this.loading(false)
            return
        }

        this.setIDsFromLocalStorage(itemFromLocalStorage)
        if (!Array.isArray(itemFromLocalStorage)) {
            localStorage.setItem('favouriteVideos', JSON.stringify([]))
            this.loading(false)
            return
        }

        if (Array.isArray(itemFromLocalStorage)) {
            let result = await fetchVideosByIDs(itemFromLocalStorage)
            this.setFavouriteVideos(result)
        }
        this.loading(false)
    }

    fetchFavouriteVideos = async () => {
        if (!this.videosIDs.length) return
        this.loading(true)
        let fetchedData = await fetchVideosByIDs(this.videosIDs)
        const result = fetchedData.map(res => res)

        this.setFavouriteVideos(result)
        this.loading(false)

    }

    addToFavourite = (id) => {
        let duplicate = this.videosIDs.some(videoID => videoID === id)

        if (duplicate) return

        this.videosIDs.push(id)
        localStorage.setItem('favouriteVideos', JSON.stringify(this.videosIDs))
    }
    deleteFromFavourite = (id) => {

        let newLocalStorage = this.videosIDs.filter(video => video !== id)

        this.videosIDs = newLocalStorage
        localStorage.setItem('favouriteVideos', JSON.stringify(newLocalStorage))
        this.favouriteVideos = this.favouriteVideos.filter(video => video.id !== id)
    }

    setIDsFromLocalStorage = (value) => {
        this.videosIDs = value
    }

    setFavouriteVideos = (value) => {
        this.favouriteVideos = value
    }
    loading = (loading) => {
        this.isLoadingFavourite = loading
    }
}

const FavouritesStore = new Favourites()
export default FavouritesStore