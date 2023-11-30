
import React, { lazy, useState } from 'react';
import { Suspense } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Link } from 'react-router-dom';
const LazyLoadedImage = lazy(() => import('./LazyLoadedImg'))



export function StayPreview({ stay }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    console.log('stayID', stay._id);

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % stay.imgUrls.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? stay.imgUrls.length - 1 : prevIndex - 1
        );
    };
    const goToImage = (index) => {
        setCurrentImageIndex(index);
    };

    return (
        <section className='stay-preview'>
            <Suspense>
                <LazyLoadedImage className='img-preview' src={stay.imgUrls[currentImageIndex]} alt='img' />
            </Suspense>
            {/* <Link to={`/details/${stay._id}`}> */}


            <div className='preview-loc'>{stay.loc.city},{stay.loc.country}</div>
            <div className='preview-name'>{stay.name}</div>
            <div>{stay.price}$ night</div>
            <div className='image-slider-arrows'>
                <IoIosArrowBack className='arrow arrow-left' onClick={prevImage} />
                <IoIosArrowForward className='arrow arrow-right' onClick={nextImage} />
            </div>
            <div className='image-points'>
                {stay.imgUrls.map((_, index) => (
                    <div
                        key={index}
                        className={`point ${index === currentImageIndex ? 'active' : ''}`}
                        onClick={() => goToImage(index)}
                    />
                ))}
            </div>
            {/* </Link> */}
        </section>
    )
}
