'use client'

import { Range, RangeKeyDict } from 'react-date-range'
import Calendar from '../inputs/Calendar'
import Button from '../Button'

interface ListingReservationProps {
    price: number
    totalPrice: number
    dateRange: Range
    disabledDates: Date[]
    onChangeDateRange: (range: Range) => void
    onSubmit: () => void
    disabled?: boolean
}

const ListingReservation = ({
    price,
    totalPrice,
    dateRange,
    disabledDates,
    onChangeDateRange,
    onSubmit,
    disabled
}: ListingReservationProps) => {
    return (
        <div
            className='
                bg-white
                rounded-xl
                border-[1px]
                border-neutral-200
                overflow-hidden
            '
        >
            <div className='
            flex flex-row items-center gap-1 p-4
        '>
                <div className='text-2xl font-semibold'>
                $ {price}
                </div>
                <div className='font-light text-neutral-600'>
                / night
                </div>
            </div>
            <hr/>
            <Calendar 
                dateRange={dateRange}
                onChangeDateRange={(range) => onChangeDateRange(range.selection)}
                disabledDates={disabledDates}
            />
            <hr/>
            <div className='p-4'>
                <Button 
                    disabled={disabled}
                    label='Book Now'
                    onClick={onSubmit}
                />
            </div>
            <div className='
                p-4
                flex
                flex-row
                items-center
                justify-between
                font-semibold
                text-lg
            '>
                <div>
                    Total
                </div>
                <div>
                    $ {totalPrice}
                </div>
            </div>
        </div>
    )
}

export default ListingReservation