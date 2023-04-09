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

const RegisterModal = () => {
    const registerModal = useRegisterModal()
    const {isRegisterModalOpen, closeRegisterModal} = registerModal
    const {value: isLoading, setTrue: setLoadingTrue, setFalse: setLoadingFalse} = useBoolean(false)
    const {register, handleSubmit, formState: {errors}} = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        }
    })

    const onSubmit: SubmitHandler<FieldValues> =  (data) => {
        setLoadingTrue()
      
        axios.post('/api/register', data)
            .then(() => {
                closeRegisterModal()
            })
            .catch((error) => {
                toast.error('Something went wrong!')
            })
         .finally(() => {
            setLoadingFalse()
         })           
    }

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading title='Welcome to Airbnb' subtitle='Create an account!' />
            <Input 
                id='email'
                label='Email'
                type='email'
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

    const footerContent = (
        <div className='flex flex-col gap-4 mt-3'>
            <hr />
            <Button 
                outline
                label='Continue with Google'
                icon={FcGoogle}
                onClick={() => {}}
            />
            <Button 
                outline
                label='Continue with Github'
                icon={AiFillGithub}
                onClick={() => {}}
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
                        onClick={closeRegisterModal} 
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