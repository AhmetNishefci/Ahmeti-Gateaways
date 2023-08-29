'use client'

import { RangeKeyDict, Range, DateRange } from "react-date-range"

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
   
interface CalendarProps {
    dateRange: Range
    onChangeDateRange: (range: RangeKeyDict) => void
    disabledDates?: Date[]
}

const Calendar = ({
    dateRange,
    onChangeDateRange,
    disabledDates
}: CalendarProps) => {
    return (
       <DateRange 
            rangeColors={['#262626']}
            ranges={[dateRange]}
            date={new Date()}
            onChange={onChangeDateRange}
            direction="vertical"
            showDateDisplay={false}
            minDate={new Date()}
            disabledDates={disabledDates}
       />
    )
}

export default Calendar