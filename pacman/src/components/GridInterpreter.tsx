import React, { useState, useCallback } from 'react'
import Loader from './Loader'

interface IPacPosition {
    xPos: number;
    yPos: number;
    direction: number;
}

const GridInterpreter = (): JSX.Element => {
    const [pacPosition, setPacPosition] = useState<IPacPosition>({xPos: 0, yPos: 0, direction: 0})
    const [hasPacMoved, setHasPacMoved] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    const interpret = useCallback((): void => {
        setLoading(true)
        //readline util function

    }, [])

    return (
        <div>
            {loading ? <Loader/> : <button type="button" onClick={() => interpret()}>Interpret</button>}
        </div>
    )
}

export default GridInterpreter