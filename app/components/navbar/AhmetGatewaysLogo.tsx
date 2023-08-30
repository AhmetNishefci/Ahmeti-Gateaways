'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

const AhmetGatewaysLogo = () => {
    const router = useRouter()

    return (
        <Image 
            onClick={() => router.push('/')}
            alt='Logo' 
            className='hidden md:block cursor-pointer'
            height='60' 
            width='60' 
            src='/images/ahmetGateways.jpg'/>
    )
}

export default AhmetGatewaysLogo