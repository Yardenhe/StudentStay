import React, { useState } from 'react'
import { useEffectUpdate } from '../../customHooks/useEffectUpdate';

export function LocationModal({ onSetFilter }) {
    const imageInfo = [
        { url: 'https://a0.muscache.com/pictures/f9ec8a23-ed44-420b-83e5-10ff1f071a13.jpg', label: 'I’m flexible' },
        { url: 'https://a0.muscache.com/im/pictures/a0fd6dfc-6bec-4abb-850e-9ab78ed7bf37.jpg?im_w=320', label: 'Spain' },
        { url: 'https://a0.muscache.com/im/pictures/66355b01-4695-4db9-b292-c149c46fb1ca.jpg?im_w=320', label: 'Middle East' },
        { url: 'https://a0.muscache.com/im/pictures/09be1400-6a42-4a4f-90f6-897e50110031.jpg?im_w=320', label: 'Greece' },
        { url: 'https://a0.muscache.com/im/pictures/4e762891-75a3-4fe1-b73a-cd7e673ba915.jpg?im_w=320', label: 'United States' },
        { url: 'https://a0.muscache.com/im/pictures/ea5598d7-2b07-4ed7-84da-d1eabd9f2714.jpg?im_w=320', label: 'Italy' },
    ];
    const locations = [
        { id: 1, name: 'Spain', imgUrl: '../img/general-icons/location.svg' },
        { id: 2, name: 'Israel', imgUrl: '../img/general-icons/location.svg' },
        { id: 3, name: 'United States', imgUrl: '../img/general-icons/location.svg' },
        { id: 4, name: 'Portugal', imgUrl: '../img/general-icons/location.svg' },
        { id: 5, name: 'Turkey', imgUrl: '../img/general-icons/location.svg' },
        { id: 6, name: 'Hong Kong', imgUrl: '../img/general-icons/location.svg' }

    ];
    const [filterByToEdit, setFilterByToEdit] = useState({});
    useEffectUpdate(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])
    function handleChooseCountry(location) {
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, "country": location }))
    }
    return (
        <div className='location-modal'>
            <div className='loc-left'>

                <div className='loc-list-scroll'>
                    {locations.map((location) => (
                        <div key={location.id} className={'loc-list'} onClick={() => handleChooseCountry(location.name)} >
                            <img src={location.imgUrl} alt={`${location.name} icon`} />
                            <div className='loc-name'>{location.name}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='loc-right'>
                <div className='loc-title-map'>Search by region</div>
                <div className='loc-map-list'>
                    {imageInfo.map((info, index) => (
                        <div key={index} onClick={() => handleChooseCountry(info.label)}>
                            <img className='img-loc' alt='' src={info.url} />
                            <p>{info.label}</p>
                        </div>
                    ))}
                </div>

            </div>

        </div>
    )
}
