import { Trackable } from "./log";
import { readFileSync } from "original-fs";

interface TrackerStream {
    next(): Trackable[]
    close(): void
}


// {TRACKER START}
// [
//   {"name": "pi", "typeof": "float64", "value": 4.000000}
// ]
// {TRACKER END}
export class FileTracker implements TrackerStream {
    private lines: string[]

    constructor(filePath: string) {
        let file = readFileSync(filePath, 'utf8')
        const lines = file.split("\n")
    }

    handleFile(err: any, data: any) {
    }

    // next(): Trackable[] {
    //     let trackables: Trackable[] = []
    //     let started = false
    //     let buffer = ""
    //     while(true) {
    //         const line = this.file.readline()
    //         if (line === null || line === "{TRACKER END}")
    //             break
    //         if (started)
    //             buffer += line
    //         if (line === "{TRACKER START}")
    //             started = true
    //     }
    //     const json = JSON.parse(buffer)
    //     for (const trackable of json) {
    //         trackables.push({
    //             name: trackable.name,
    //             dataType: trackable.dataType,
    //             data: trackable.data
    //         })
    //     }
    // }

    close() {
        this.file.close()
    }
}