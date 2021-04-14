const headers = {
    'Authorization': 'Bearer wpqih8rd2z9l9q4jrhinskoucpmwyb',
    'Client-ID': 'gp762nuuoqcoxypju8c569th9wz7q5'
}

export async function fetchVideosByChannelName(channelName, pagination = null) {
    if (!channelName) return
    let Options = {
        method: 'GET',
        headers: {...headers},
        params: {
            after: pagination
        }
    }
    let userID = await fetch(`https://api.twitch.tv/helix/users?login=${channelName}`, Options)
        .then(res => {
            return res.json()
        }).catch(err => alert(err))

    if (!userID.data || !userID.data[0]) return

    return await fetch(`https://api.twitch.tv/helix/videos?user_id=${userID.data[0].id}`, Options)
        .then(res => {
            return res.json()
        }).catch(err => err);
}

export async function fetchVideosByIDs(arrayIDs) {

    if (!Array.isArray(arrayIDs)) return
    let Options = {
        method: 'GET',
        headers:
            {
                ...headers
            }
    }
    let mapOfIDs = arrayIDs.map((videoAPI) => {
        return fetch(`https://api.twitch.tv/helix/videos?id=${videoAPI}`, Options)
            .then(res => res.json())
    })

    return await Promise.allSettled(mapOfIDs)
        .then(res => {
            return res.map(e => {
                if (e.status === 'fulfilled') return e.value.data[0]
            })
        })
}