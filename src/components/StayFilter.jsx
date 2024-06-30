import React, { useRef, useState, useEffect } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { BsSliders } from "react-icons/bs";
import { useEffectUpdate } from "../customHooks/useEffectUpdate"
import { useToggle } from "../customHooks/useToggle"
import { ModalFilter } from './stayFilterCmps/ModalFilter';

const iconBasePath = 'img/labels/';
const iconNames = ['amazingpools', 'amazingviews', 'arctics', 'beachfront', 'cabins', 'boats', 'camping', 'castles', 'desert', 'design', 'Countryside'
    , 'cycladichomes', 'iconiccities', 'islands', 'luxe', 'mansions', 'minsus', 'nationalparks', 'omg!', 'towers', 'topoftheworld', 'treehouses', 'tropical', 'trending'];


export function StayFilter({ filterBy, onSetFilter }) {

    const scrollContainerRef = useRef(null);
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    const [arrowVisibility, setArrowVisibility] = useState({ left: false, right: true });
    const [clickedIconIndex, setClickedIconIndex] = useState(null);
    const [isSticky, setIsSticky] = useState(false);
    const [isOpenFilterModal, onToggleFilterModal] = useToggle()


    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            setIsSticky(scrollY > 0); // Adjust the value based on when you want it to become sticky
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffectUpdate(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function onTypeChange(iconName) {
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, "type": iconName }))
    }

    const handleScroll = (direction) => {
        if (scrollContainerRef.current) {
            const scrollAmount = 500;
            const scrollWidth = scrollContainerRef.current.scrollWidth;
            const currentScroll = scrollContainerRef.current.scrollLeft;

            const newScroll = direction === 'left'
                ? Math.max(0, currentScroll - scrollAmount)
                : Math.min(scrollWidth, currentScroll + scrollAmount);

            const isAtLeftEdge = newScroll === 0;
            const isAtRightEdge = newScroll + scrollContainerRef.current.clientWidth >= scrollWidth;

            setArrowVisibility({
                left: !isAtLeftEdge,
                right: !isAtRightEdge
            });

            scrollContainerRef.current.scrollTo({
                left: newScroll,
                behavior: 'smooth',
            });
        }

    }

    const onToggleIcon = (index) => {
        setClickedIconIndex(index);
    }

    return (
        <section className={`stay-filter ${isSticky && ' sticky'}${!isOpenFilterModal && ' low-z-index'}`}>
            {/* <IoIosArrowBack className={`arrow arrow-left  ${!arrowVisibility.left && ' hidden'}`} onClick={() => handleScroll('left')} /> */}
            <div className='scroll-container' ref={scrollContainerRef}>
                {iconNames.map((iconName, index) => (
                    <section className={`stay-icon ${clickedIconIndex === index ? 'hover-icon' : ''}`}
                        key={index}
                        onClick={() => { onTypeChange(iconName), onToggleIcon(index) }}>
                        <img src={`${iconBasePath}${iconName}.jpg`} alt={iconName} />
                        <p>{iconName}</p>
                        <div className="overlay-icon"></div>
                    </section>
                ))}
            </div>
            {/* <IoIosArrowForward
                className={`arrow arrow-right ${!arrowVisibility.right && 'hidden'}`}
                onClick={() => handleScroll('right')} /> */}
            <div className='filter-button' onClick={() => onToggleFilterModal()}>
                <BsSliders className='bold-icon' />
                <p>Filters</p>
            </div>
            {isOpenFilterModal && <ModalFilter
                isOpen={isOpenFilterModal}
                filterByToEdit={filterByToEdit}
                onClose={() => onToggleFilterModal()}
                setFilterByToEdit={setFilterByToEdit} />}
        </section>
    )
}