'use client'

import axios from 'axios'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle} from 'react-icons/fc'
import { useCallback, useState } from 'react'
import { 
    FieldValues,
    SubmitHandler,
    useForm,
} from 'react-hook-form'

import useRegisterModal from '@/app/hooks/useRegisterModal'
import { useBoolean } from 'usehooks-ts'
import Modal from './Modal'
import Heading from '../Heading'
import Input from '../inputs/Input'
import toast from 'react-hot-toast'
import Button from '../Button'
import { signIn } from 'next-auth/react'
import useLoginModal from '@/app/hooks/useLoginModal'

const RegisterModal = () => {
    const {isRegisterModalOpen, closeRegisterModal} = useRegisterModal()

    const { openLoginModal } = useLoginModal()

    const {value: isLoading, setTrue: setLoadingTrue, setFalse: setLoadingFalse} = useBoolean(false)
    
    const {register, handleSubmit, formState: {errors}} = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        }
    })

    // handle register
    const onSubmit: SubmitHandler<FieldValues> =  (data) => {
        setLoadingTrue()
      
        axios.post('/api/register', data)
            .then(() => {
                toast.success('Registered successfully!')
                closeRegisterModal()
                openLoginModal()     
            })
            .catch((error) => {
                toast.error('Something went wrong!')
            })
         .finally(() => {
            setLoadingFalse()
         })           
    }

    // close register modal and open login modal
    const closeRegisterOpenLoginModal = useCallback(() => {
        openLoginModal()
        closeRegisterModal()
    },[openLoginModal, closeRegisterModal])

    // modal body content
    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading title='Welcome to Ahmet Gateways' subtitle='Create an account!' />
            <Input 
                id='email'
                label='Email'
                disabled={isLoading}
                errors={errors}
                register={register}
                required
                />
             <Input 
                id='name'
                label='Name'
                disabled={isLoading}
                errors={errors}
                register={register}
                required
                />
             <Input 
                id='password'
                label='Password'
                type='password'
                disabled={isLoading}
                errors={errors}
                register={register}
                required
                />
        </div>
    )

    // modal footer content
    const footerContent = (
        <div className='flex flex-col gap-4 mt-3'>
            <hr />
            <Button 
                outline
                label='Continue with Google'
                icon={FcGoogle}
                onClick={() => signIn('google')}
            />
            <Button 
                outline
                label='Continue with Github'
                icon={AiFillGithub}
                onClick={() => signIn('github')}
            />
            <div className='
                text-neutral-500
                text-center
                mt-4
                font-light
            '>
                <div className='
                    justify-center
                    flex
                    flex-row
                    items-center
                    gap-2
                '>
                    <div>
                        Already have an account?
                    </div>
                    <div
                        onClick={closeRegisterOpenLoginModal} 
                        className='
                        text-neutral-800
                        cursor-pointer
                        hover:underline
                    '>
                        Log in
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <Modal 
            disabled={isLoading}
            isOpen={isRegisterModalOpen}
            title='Register'
            actionLabel='Continue'
            onClose={closeRegisterModal}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
            />
    )
}

export default RegisterModal