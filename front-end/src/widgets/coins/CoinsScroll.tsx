import { useDynamicDataStore } from '@shared/stores';
import { useId } from 'react'
import NaImage from 'shared/components/NaImage'; 

export default function CoinsScroll() { 
    const id = useId(); 
    const coinsValue = useDynamicDataStore((state) => state.data.calculations.coinsValue); 

    const coinsArray = coinsValue?.map((item, index) => (
        <div className='grid grid-cols-3 text-center' key={index + id}>
            <p>{item.coin}</p>
            <p>{item.algorithm}</p>
            <p>{item.value} Mh/s</p> 
        </div>
    )) 

    const naImage = (width: string) => (
        <div className='flex justify-center  w-50'>
            <NaImage width= {width}/>
        </div>
    )  

    return ( 
        <div className='border-line'>
            <div className='coin-scroll'>
                {coinsArray.length !== 0 ? coinsArray : naImage("90px")}
            </div>
        </div>
    )
}