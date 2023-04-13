'use client'

import { AiOutlineMenu } from 'react-icons/ai'
import Avatar from '../Avatar'
import MenuItem from './MenuItem'
import { useBoolean } from 'usehooks-ts'

import useRegisterModal from '@/app/hooks/useRegisterModal'
import useLoginModal from '@/app/hooks/useLoginModal'
import useRentModal from '@/app/hooks/useRentModal'

import { signOut } from 'next-auth/react'
import { SafeUser } from '@/app/types'
import { useCallback } from 'react'
import { useRouter } from 'next/navigation'


interface UserMenuProps {
    currentUser: SafeUser | null
}

const UserMenu = ({
    currentUser
}:UserMenuProps) => {
    const router = useRouter()

    const {openRegisterModal} = useRegisterModal()
    const {openLoginModal} = useLoginModal()
    const {openRentModal} = useRentModal()

    const {value: isMenuOpen, setTrue: openMenu, setFalse: closeMenu, toggle: toggleMenu} = useBoolean(false)

    // handle rent modal
    const onHandleRentModal = useCallback(() => {
        if(!currentUser){
            return openLoginModal()
        }
        openRentModal()
    },[currentUser, openLoginModal,openRentModal])


    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div 
                    onClick={onHandleRentModal}
                    className="
                        hidden
                        md:block
                        text-sm
                        font-semibold
                        py-3
                        px-4
                        rounded-full
                        hover:bg-neutral-100
                        transition
                        cursor-pointer">
                    {currentUser ? `Rent your home, ${currentUser.name}` : `Rent your home`}
                </div>
                <div 
                    onClick={toggleMenu}
                    className="
                         p-4
                         md:py-1
                         md:px-2
                         border-[1px]
                         border-neutral-200
                         flex
                         flex-row
                         items-center
                         gap-3
                         rounded-full
                         cursor-pointer
                         hover:shadow-md
                         transition">
                    <AiOutlineMenu/>
                </div>
                <div className='hidden md:block'>
                    <Avatar src={currentUser?.image}/>
                </div>
            </div>
            {isMenuOpen && (
                <div className='
                    absolute
                    rounded=xl
                    shadow-md
                    w-[40vw]
                    md:w-3/4
                    bg-white
                    overflow-hidden
                    right-0
                    top-12
                    text-sm'>
                    <div className='flex flex-col cursor-pointer'>
                        <>
                        {currentUser ? (
                            <>
                            <MenuItem 
                                onClick={() => router.push('/trips')}
                                label='My trips' />
                                 <MenuItem 
                                 onClick={() => router.push('/favorites')}
                                label='My favorites' />
                            <MenuItem 
                              onClick={() => router.push('/reservations')}
                                label='My reservations' />
                            <MenuItem 
                                onClick={() => router.push('/properties')}
                                label='My properties' />
                            <MenuItem 
                                onClick={openRentModal}
                                label='Rent my home' />
                            <MenuItem 
                                onClick={() => signOut()}
                                label='Logout' />
                            </>
                        ) : (
                            <>
                            <MenuItem 
                                onClick={openLoginModal}
                                label='Login' />
                            <MenuItem 
                                onClick={openRegisterModal}
                                label='Register' />
                            </>
                        )}       
                        </>
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserMenu