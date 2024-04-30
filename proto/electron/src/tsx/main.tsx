import { ConsoleLogs } from './console'
import React from 'react'

import './main.css'

export const Main = () => {
    return (
        <div>
            <ConsoleLogs tracking={[
                { name: 'foo', dataType: 'float64', data: Math.PI },
                { name: 'bar', dataType: 'int64', data: 3 }
            ]} />
        </div>
    )
}

export default Main