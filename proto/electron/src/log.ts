import { spawn, ChildProcess } from 'child_process'

export interface Trackable {
    name: string
    dataType: string
    data: any
}

export interface Tracker {
    asList: () => Trackable[]
}

const trimBuffer = (buffer: string) => {
    const start = buffer.indexOf('{TRACKER START}')
    if(start == -1)
        return null
    const end = buffer.indexOf('{TRACKER END}')
    if (end == -1)
        return null
    return buffer.slice(start + '{TRACKER START}'.length, end).trim()
}

export class StreamTracker implements Tracker {
    trackables: { [name: string]: Trackable }
    buffer: string

    constructor(stream: NodeJS.ReadableStream) {
        this.trackables = {}
        this.buffer = ''
        stream.on('data', (data: ReadableStream) => this.bufferAppend(data))
    }

    logTrackable = (data: Trackable) => {
        this.trackables[data.name] = data
    }
    
    bufferAppend = (data: ReadableStream) => {
        this.buffer += data
        const trimmed = trimBuffer(this.buffer)
        if (trimmed == null)
            return
        this.buffer = ''
        const parsed = JSON.parse(trimmed) as Trackable[]
        for (const trackable of parsed) {
            this.logTrackable(trackable)
        }
    }

    asList = () => {
        return Object.values(this.trackables)
    }
}

export const trackSubprocess = (subprocess: ChildProcess) => {
    return new StreamTracker(subprocess.stdout)
}