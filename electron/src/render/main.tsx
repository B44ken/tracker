import { List } from './console'
import React, { useEffect } from 'react'
import { Trackable } from 'src/log'
import './main.css'

declare const ipc: {
    onTrack: (cb: (t: Trackable[]) => void) => void
    teardownTrack: () => void
}

export const Main = () => {
    const [tracking, setTracking] = React.useState([])
    
    useEffect(() => {
        ipc.onTrack(setTracking)
        return ipc.teardownTrack
    }, [tracking])

    return <List tracking={tracking} />
}

export default Main