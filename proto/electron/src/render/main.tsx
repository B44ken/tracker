import { StringLogs } from './console'
import React, { useEffect } from 'react'
import {} from './bridge'
import './main.css'

declare const ipc: {
    onTrack: (cb: (message: string) => void) => void
    teardownTrack: () => void
}

export const Main = () => {
    const [messages, setMessages] = React.useState<string[]>([])
    
    useEffect(() => {
        ipc.onTrack((newMessage: string) => {
            setMessages([...messages, JSON.stringify(newMessage)])
        })

        return ipc.teardownTrack
    }, [messages])

    return <div> <StringLogs tracking={messages} /> </div>
}

export default Main