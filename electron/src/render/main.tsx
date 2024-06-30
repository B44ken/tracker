import { ConsoleLogs, StringLogs } from './console'
import React, { useEffect } from 'react'
import './main.css'
import { Trackable } from 'src/log'

declare const ipc: {
    onTrack: (cb: (t: Trackable[]) => void) => void
    teardownTrack: () => void
}

export const Main = () => {
    const [tracking, setTracking] = React.useState<Trackable[]>([])
    
    useEffect(() => {
        ipc.onTrack((next: Trackable[]) => setTracking(next))

        return ipc.teardownTrack
    }, [tracking])

    return <div> <ConsoleLogs tracking={tracking} /> </div>
}

export default Main