import {makeAutoObservable} from "mobx";
import {fetchVideosByChannelName} from "../API/API";

class Videos {

    channelName = ''
    isLoadingVideos = false
    videos = []
    pagination = ''

    constructor() {
        makeAutoObservable(this)
    }

    getVideos = async (newVideos) => {

        this.loading(true)

        let ifNew

        if (newVideos) {
            this.videos = []
            ifNew = null
        } else {
            ifNew = this.videos
        }
        await fetchVideosByChannelName(this.channelName, this.pagination)
            .then((data) => {
                this.success(data, ifNew)
            }, this.withError)
    }

    success = (data, ifNew) => {

        if (!data) {
            this.videos = []
            this.pagination = ''
            this.loading(false)
            return
        }

        if (!ifNew) {
            this.videos = data.data
            this.pagination = data.pagination
            this.loading(false)
            return

        }
        if (ifNew) {
            this.videos.push(...data.data)
            this.pagination = data.pagination
            this.loading(false)
        }
    }

    withError = (err) => {
        alert(err)
        this.loading(false)
    }

    loading = (loading) => {
        this.isLoadingVideos = loading
    }

    setChannelName = (value) => {
        this.channelName = value
    }
}

const VideosStore = new Videos()
export default VideosStore