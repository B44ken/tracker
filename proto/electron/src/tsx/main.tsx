import { StringLogs } from './console'
import React, { useEffect } from 'react'
import {} from './bridge'
import './main.css'

window.addEventListener('DOMContentLoaded', () => {
    window.ipcRenderer.on('test', (event: any, message: string) => {
        console.log(message + ' (logged from renderer)')
    })
})

export const Main = () => {
    const [messages, setMessages] = React.useState<string[]>([])

    useEffect(() => {
    })

    return <div> <StringLogs tracking={messages} /> </div>
}

export default Main