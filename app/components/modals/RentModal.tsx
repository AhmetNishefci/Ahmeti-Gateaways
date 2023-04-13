'use client'

import useRentModal from "@/app/hooks/useRentModal"
import Modal from "./Modal"
import { useMemo, useState } from "react"
import Heading from "../Heading"
import { categories } from "../navbar/Categories"
import CategoryInput from "../inputs/CategoryInput"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import CountrySelect from "../inputs/CountrySelect"
import dynamic from "next/dynamic"
import Counter from "../inputs/Counter"
import ImageUpload from "../inputs/ImageUpload"
import Input from "../inputs/Input"
import { useBoolean } from "usehooks-ts"
import axios from "axios"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"


enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5,
}

const RentModal = () => {
    const router = useRouter()
    const {isRentModalOpen, closeRentModal} = useRentModal()

    const [currentStep, setCurrentStep] = useState(STEPS.CATEGORY)
    const {value:isLoading, setTrue:setLoadingTrue, setFalse:setLoadingFalse} = useBoolean(false)

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location: '',
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: '',
            price: 1,
            title: '',
            description: '',
        }
    })

    const category = watch('category')
    const location = watch('location')
    const guestCount = watch('guestCount')
    const roomCount = watch('roomCount')
    const bathroomCount = watch('bathroomCount')
    const imageSrc = watch('imageSrc')

    const Map = useMemo(() => dynamic(() => import('../Map'), {
        ssr: false
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }), [location])

    const setCustomValue = (id:string, value:any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        })
    }

    // handle next step
    const onNextStep = () => {
        setCurrentStep((prevStep) => prevStep + 1)
    }

    // handle previous step
    const onPreviousStep = () => {
        if(currentStep === STEPS.CATEGORY) {
            closeRentModal()
            return
        }
        setCurrentStep((prevStep) => prevStep - 1)
    }

    // handle submit
    const onSubmitForm: SubmitHandler<FieldValues> =  (data) => {
        if(currentStep !== STEPS.PRICE) {
            onNextStep()
            return
        }

        setLoadingTrue()

        axios.post('/api/listings', data)
            .then(() => {
                toast.success('Listing created successfully!')
                router.refresh()
                reset()
                setCurrentStep(STEPS.CATEGORY)
                closeRentModal()
            })
            .catch(() => {
                toast.error('Something went wrong! Please try again later.')
            })
            .finally(() => {
                setLoadingFalse()
            })
    }

    // handle action label
    const actionLabel = useMemo(() => {
        if (currentStep === STEPS.PRICE) {
            return 'Submit'
        }
        return 'Next'
    }, [currentStep])

    // handle secondary action label
    const secondaryActionLabel = useMemo(() => {
        if (currentStep === STEPS.CATEGORY) {
            return 'Cancel'
        }
        return 'Back'
    },[currentStep])

    // handle body content
    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading 
                title="Which of these best describes your place?"
                subtitle="Pick a category. You can change it later."
            />
            <div
                className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    gap-3
                    max-h-[50vh]
                    overflow-y-auto">
                {categories.map((item) => (
                    <div key={item.label} className="col-span-1">
                        <CategoryInput 
                            onClick={(category) => setCustomValue('category', category)}
                            selected={category === item.label}
                            label={item.label}
                            icon={item.icon}
                        />
                    </div>
                ))}
            </div>
        </div>
    )

    // handle location step
    if (currentStep === STEPS.LOCATION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading 
                    title="Where is your place located?"
                    subtitle="Help guests get a sense of where your place is."
                />
                <CountrySelect 
                    onChange={(value) => setCustomValue('location', value)}
                    value={location}
                />
                <Map 
                    center={location?.latlng}
                />
            </div>
        )
    }

    // handle info step
    if (currentStep === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading 
                    title="Share some basics about your place."
                    subtitle="What amenities do you have?"
                />
                <Counter 
                    title="Guests"
                    subtitle="How many guests can your place accommodate?"
                    value={guestCount}
                    onChange={(value) => setCustomValue('guestCount', value)}
                />
                <hr/>
                 <Counter 
                    title="Rooms"
                    subtitle="How many rooms do you have?"
                    value={roomCount}
                    onChange={(value) => setCustomValue('roomCount', value)}
                />
                 <hr/>
                 <Counter 
                    title="Bathrooms"
                    subtitle="How many bathrooms do you have?"
                    value={bathroomCount}
                    onChange={(value) => setCustomValue('bathroomCount', value)}
                />
            </div>
        )
    }

    // handle images step
    if (currentStep === STEPS.IMAGES) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading 
                    title="Add some photos of your place."
                    subtitle="Show guests what your place look like!"
                />
                <ImageUpload 
                    value={imageSrc}
                    onChange={(value) => setCustomValue('imageSrc', value)}
                />
            </div>
        )
    }

    // handle description step
    if (currentStep === STEPS.DESCRIPTION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading 
                    title="Describe your place."
                    subtitle="What makes your place special?"
                />
                <Input 
                    id="title"
                    label="Title"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <hr/>
                <Input 
                    id="description"
                    label="Description"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }

    // handle price step
    if (currentStep === STEPS.PRICE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading 
                    title="Set your price."
                    subtitle="How much do you want to charge per night?"
                />
                <Input 
                    id="price"
                    label="Price"
                    formatPrice
                    type="number"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }

    return (
        <Modal 
            isOpen={isRentModalOpen}
            onClose={closeRentModal}
            onSubmit={handleSubmit(onSubmitForm)}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={onPreviousStep}
            title='Rent your home'
            body={bodyContent}
            />
    )
}

export default RentModal