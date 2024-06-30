import { Trackable } from '../log'
import React from 'react'

export const ConsoleLogs = ({ tracking }: { tracking: Trackable[] }) => {
    return <main>
        <input type='text' placeholder='Search...'/>
        {tracking.map((trackable, i) =>
            <LoggedTrackable key={i} trackable={trackable} />
        )}
    </main>
}

export const StringLogs = ({ tracking }: { tracking: string[] }) => {
    return <main>
        <input type='text' placeholder='Search...'/>
        {tracking.map((trackable, i) =>
            <p key={i}>{trackable}</p>
        )}
    </main>
}

const LoggedTrackable = ({ trackable }: { trackable: Trackable }) => {
    const [unfolded, setUnfolded] = React.useState({});
    return <div>
        <p>{trackable.name} = {trackable.data}</p>
    </div>
}