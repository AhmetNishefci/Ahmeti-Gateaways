'use client'

import { useEffect } from 'react';
import {useBoolean} from 'usehooks-ts'

interface ClientOnlyProps {
    children: React.ReactNode;
}

const ClientOnly = ({children}:ClientOnlyProps) => {
    const {value:hasMounted, setTrue: setHasMountedTrue} = useBoolean(false)

    //set hasMounted to true after the component has mounted
    useEffect(() => {
        setHasMountedTrue()
    }, [setHasMountedTrue])

    //return null if the component has not mounted
    if(!hasMounted) return null

    //return the children if the component has mounted
    return (
        <>
            {children}
        </>
    )
}

export default ClientOnly