'use client'

import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";

interface ModalProps {
    isOpen?: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title?: string;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    disabled?: boolean;
    actionLabel: string;
    secondaryActionLabel?: string;
    secondaryAction?: () => void;
}

const Modal = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    footer,
    disabled,
    actionLabel,
    secondaryActionLabel,
    secondaryAction,
}: ModalProps) => {
    const [showModal, setShowModal] = useState(isOpen)

    // if the modal is open, show the modal
    useEffect(() => {
        setShowModal(isOpen)
    }, [isOpen])

    //add a delay to the modal closing animation
    const handleClose = useCallback(() => {
        if(disabled) return

        setShowModal(false)
        setTimeout(() => {
            onClose()
        }, 300)
    },[disabled,onClose])

    //submit the form
    const handleSubmit = useCallback(() => {
        if(disabled) return

         onSubmit()
    },[disabled,onSubmit])

    //handle the secondary action
    const handleSecondaryAction = useCallback(() => {
        if(disabled || !secondaryAction) return

        secondaryAction()
    },[disabled,secondaryAction])

    //if the modal is not open, return null
    if(!isOpen) return null

    //modal styles
    const containerClassNames = `
    justify-center
    items-center
    flex
    overflow-x-hidden
    overflow-y-auto
    fixed
    inset-0
    z-50
    outline-none
    focus:outline-none
    bg-neutral-800/70
`;

const modalContainerClasses = `
  relative
  w-full
  md:w-4/6
  lg:w-3/6
  xl:w-2/5
  my-6
  mx-auto
  h-full
  lg:h-auto
  md:h-auto
`;


const modalClassNames =`
    translate
    duration-300
    h-full
    ${showModal ? 'translate-y-0' : 'translate-y-full'}
    ${showModal ? 'opacity-100' : 'opacity-0'}
`;

const contentClassNames = `
    translate
    h-full
    lg:h-auto
    md:h-auto
    border-0
    rounded-lg
    shadow-lg
    relative
    flex
    flex-col
    w-full
    bg-white
    outline-none
    focus:outline-none
`;

const headerClassNames = `
    flex
    items-center
    p-6
    rounded-t
    justify-center
    relative
    border-b-[1px]
`;

const closeButtonClassNames = `
    p-1
    border-0
    hover:opacity-70
    transition
    absolute
    left-9
`;

const buttonContainerClassNames = `
    flex
    flex-row
    items-center
    gap-4
    w-full
`;

    return (
       <>
        <div className={containerClassNames}>
            <div className={modalContainerClasses}>
                {/* CONTENT OF MODAL*/}
                <div className={modalClassNames}>
                    <div className={contentClassNames}>
                         {/* HEADER */}
                        <div className={headerClassNames }>
                                <button 
                                    onClick={handleClose}
                                    className={closeButtonClassNames }>
                                    <IoMdClose size={15}/>
                                </button>
                                <div className="text-lg font-bold">
                                    {title}
                                </div>
                        </div>
                        {/* BODY */}
                        <div className="relative p-6 flex-auto">
                            {body}
                        </div>
                        {/* FOOTER */}
                        <div className="flex flex-col gap-2 p-6">
                            <div className={buttonContainerClassNames}>
                                {secondaryAction && secondaryActionLabel && (
                                    <Button 
                                    outline
                                    disabled={disabled}
                                    label={secondaryActionLabel}
                                    onClick={handleSecondaryAction}
                                />
                                )} 
                                <Button 
                                    disabled={disabled}
                                    label={actionLabel}
                                    onClick={handleSubmit}
                                />
                            </div>
                            {footer}
                        </div>
                     </div>
                 </div>
            </div>
        </div>
       </>
    )
}

export default Modal