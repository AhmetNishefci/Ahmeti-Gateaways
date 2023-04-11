'use client'

import { useEffect } from 'react'
import EmptyState from './components/EmptyState'

interface ErrorStateProps {
    error: Error
}

const ErrorState = ({
    error
}: ErrorStateProps) => {
    useEffect(() => {
        throw error
    }, [error])

    return (
        <EmptyState 
            title="Something went wrong!"
            subtitle="Please try again later."
        />
    )
}



export default ErrorState