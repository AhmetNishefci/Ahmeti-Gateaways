'use client'

import { TbBeach,TbMountain,TbPool } from 'react-icons/tb'
import { 
    GiWindmill,
    GiIsland,
    GiBoatFishing,
    GiCastle,
    GiForestCamp,
    GiCaveEntrance,
    GiCactus,
    GiBarn} from 'react-icons/gi'
import { MdOutlineVilla } from 'react-icons/md'
import { FaSkiing } from 'react-icons/fa'
import { BsSnow } from 'react-icons/bs'
import { IoDiamond } from 'react-icons/io5'

import Container from '../Container'
import CategoryBox from '../CategoryBox'
import { usePathname, useSearchParams } from 'next/navigation'

export const categories = [
    {
        label: 'Beach',
        icon: TbBeach,
        description: 'This property is located near the beach'
    },
    {
        label: 'Windmills',
        icon: GiWindmill,
        description: 'This property has windmills'
    },
    {
        label: 'Modern',
        icon: MdOutlineVilla,
        description: 'This property is modern'
    },
    {
        label: 'Countryside',
        icon: TbMountain,
        description: 'This property is located in the countryside'
    },
    {
        label: 'Pools',
        icon: TbPool,
        description: 'This property has a pool'
    },
    {
        label: 'Islands',
        icon: GiIsland,
        description: 'This property is located on an island'
    },
    {
        label: 'Lake',
        icon: GiBoatFishing,
        description: 'This property is located near a lake'
    },
    {
        label: 'Skiing',
        icon: FaSkiing,
        description: 'This property is located near a ski resort'
    },
    {
        label: 'Castles',
        icon: GiCastle,
        description: 'This property is located near a castle'
    },
    {
        label: 'Camping',
        icon: GiForestCamp,
        description: 'This property is located near a camping'
    },
    {
        label: 'Arctic',
        icon: BsSnow,
        description: 'This property is located in the arctic'
    },
    {
        label: 'Cave',
        icon: GiCaveEntrance,
        description: 'This property is located near a cave'
    },
    {
        label: 'Desert',
        icon: GiCactus,
        description: 'This property is located in the desert'
    },
    {
        label: 'Barns',
        icon: GiBarn,
        description: 'This property is located near a barn'
    },
    {
        label: 'Lux',
        icon: IoDiamond,
        description: 'This property is luxurious'
    }
]

const Categories = () => {
    const params = useSearchParams()
    const category = params?.get('category')
    const pathName = usePathname()

    const isMainPage = pathName === '/'

    if(!isMainPage) return null
    
    return (
        <Container>
            <div className='
                pt-4
                flex
                flex-row
                items-center
                justify-between
                overflow-x-auto'>
                    {categories.map((item) => (
                        <CategoryBox 
                            key={item.label}
                            label={item.label}
                            selected={item.label === category}
                            icon={item.icon}
                        />
                    ))}
            </div>
        </Container>
    )
}

export default Categories