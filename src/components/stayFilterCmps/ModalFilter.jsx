import React from 'react'
import { useState, useEffect } from 'react';
import { PriceSlider } from './PriceSlider';
import { PropertyFilter } from './PropertyFilter';
import { IoMdCheckmark } from "react-icons/io";
import { useSelector } from "react-redux";
import { IoIosClose } from "react-icons/io";
import { useParams, useSearchParams } from 'react-router-dom'
import { useEffectUpdate } from '../../customHooks/useEffectUpdate';
import { stayService } from '../../services/stay.service';

export function ModalFilter({ isOpen, onClose, setFilterByToEdit, filterByToEdit }) {
    const amenities = [
        {
            title: "wifi",
            txt: "Wifi",
        },
        {
            title: "washer",
            txt: "Washer",
        },
        {
            title: "air-conditioning",
            txt: "Air conditioning",
        },
        {
            title: "dedicated-workspace",
            txt: "Dedicated workspace",
        },
        {
            title: "hair-dryer",
            txt: "Hair dryer",
        },
        {
            title: "kitchen",
            txt: "Kitchen",
        },
        {
            title: "dryer",
            txt: "Dryer",
        },
        {
            title: "heating",
            txt: "Heating",
        },
        {
            title: "tv",
            txt: "TV",
        },
        {
            title: "iron",
            txt: "Iron",
        },
        {
            title: "pets allowed",
            txt: "Pets allowed",
        },
        {
            title: "smoking allowed",
            txt: "Smoking allowed",
        },
    ];

    const stays = useSelector((storeState) => storeState.stayModule.stays);
    const [minPrice, setMinPrice] = useState(filterByToEdit.minPrice || 10);
    const [modalFilters, setModalFilters] = useState({});
    const [maxPrice, setMaxPrice] = useState(filterByToEdit.maxPrice || 500);
    const [selectedBedrooms, setSelectedBedrooms] = useState(filterByToEdit.bedrooms || "Any");
    const [selectedBeds, setSelectedBeds] = useState(filterByToEdit.beds || "Any");
    const [selectedBathrooms, setSelectedBathrooms] = useState(filterByToEdit.bathrooms || "Any");
    const [selectedProperties, setSelectedProperties] = useState(filterByToEdit.propertyType || []);
    const [selectedAmenties, setSelectedAmenties] = useState(filterByToEdit.amenities || []);
    const [resultLength, setResultLength] = useState(stays.length);
    const overlayClassName = isOpen ? 'overlayModal' : '';


    useEffectUpdate(() => {
        setModalFilters((prevFilter) => ({ ...prevFilter, "amenities": selectedAmenties }))
    }, [selectedAmenties])
    useEffectUpdate(() => {
        setModalFilters((prevFilter) => ({ ...prevFilter, "beds": selectedBeds, "bedrooms": selectedBedrooms, "bathrooms": selectedBathrooms }))
    }, [selectedBeds, selectedBathrooms, selectedBedrooms])
    useEffectUpdate(() => {
        setModalFilters((prevFilter) => ({ ...prevFilter, "propertyType": selectedProperties }))
    }, [selectedProperties])
    useEffect(() => {
        onHandleCount()
    }, [modalFilters])

    async function onHandleCount() {
        const filterby = { ...filterByToEdit, ...modalFilters }
        const length = await stayService.getStayCount(filterby)
        setResultLength(length)
    }
    const handlePriceChange = (event, newValue) => {
        setMinPrice(newValue[0])
        setMaxPrice(newValue[1])

        setModalFilters((prevFilter) => ({ ...prevFilter, "minPrice": newValue[0], "maxPrice": newValue[1] }))
    };
    function handleCheckboxChange(ev) {
        const { name, checked } = ev.target;
        setSelectedAmenties((prevSelectedAmmenties) => {
            if (checked) {
                return [...prevSelectedAmmenties, name];
            } else {
                return prevSelectedAmmenties.filter((ammenty) => ammenty !== name);
            }
        });

    }
    function handleSubmitFilterModal() {
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, ...modalFilters }))
    }

    return (
        <div className={overlayClassName} >
            <div className='modal-filters'>
                <div className='modal-header'>
                    <p onClick={() => onClose()}><IoIosClose /></p>
                    <h3>Filters</h3>
                </div>
                <div className='modal-content'>
                    <div className='price-range'>
                        <h4 className='medium-bold' >Price range</h4>
                        <p>Nightly prices including fees and taxes</p>
                        <div className="price-range-slider-container">
                            <PriceSlider defaultValue={[minPrice, maxPrice]} onChange={handlePriceChange} />

                        </div>
                        <div className='price-numbers'>
                            <div className='price-number-item'> <h5>Minimum</h5> ${minPrice}</div>
                            <div className='price-number-item'><h5>Maximum</h5> ${maxPrice}</div>
                        </div>
                    </div>

                    <div className='rooms-and-beds-sec'>
                        <h4 className='bold'>Rooms and beds</h4>
                        <div className="details-title">Bedrooms</div>
                        <div className="details-inputs">
                            {["Any", "1", "2", "3", "4", "5", "6", "7", "8"].map(
                                (label) => (
                                    <div className="details-input" key={label}>
                                        <button
                                            type="button"
                                            className={`details-btn ${selectedBedrooms && (selectedBedrooms.toString() === label
                                                ? "selected"
                                                : ""
                                            )}`}
                                            onClick={() => {
                                                if (label === "Any") {
                                                    setSelectedBedrooms(null);
                                                } else {
                                                    setSelectedBedrooms(parseInt(label));
                                                }
                                            }}
                                        >
                                            <span>{label === "8" ? "8+" : label}</span>
                                        </button>
                                    </div>
                                )
                            )}
                        </div>
                        <div className="details-title">Beds</div>
                        <div className="details-inputs">
                            {["Any", "1", "2", "3", "4", "5", "6", "7", "8"].map(
                                (label) => (
                                    <div className="details-input" key={label}>
                                        <button
                                            type="button"
                                            className={`details-btn ${selectedBeds && (selectedBeds.toString() === label ? "selected" : ""
                                            )}`}
                                            onClick={() => {
                                                if (label === "Any") {
                                                    setSelectedBeds(null);
                                                } else {
                                                    setSelectedBeds(parseInt(label));
                                                }
                                            }}
                                        >
                                            <span>{label === "8" ? "8+" : label}</span>
                                        </button>
                                    </div>
                                )
                            )}
                        </div>

                        <div className="details-title">Bathrooms</div>
                        <div className="details-inputs">
                            {["Any", "1", "2", "3", "4", "5", "6", "7", "8"].map(
                                (label) => (
                                    <div className="details-input" key={label}>
                                        <button
                                            type="button"
                                            className={`details-btn ${selectedBathrooms && (selectedBathrooms.toString() === label
                                                ? "selected"
                                                : ""
                                            )}`}
                                            onClick={() => {
                                                if (label === "Any") {
                                                    setSelectedBathrooms(null);
                                                } else {
                                                    setSelectedBathrooms(parseInt(label));
                                                }
                                            }}
                                        >
                                            <span>{label === "8" ? "8+" : label}</span>
                                        </button>
                                    </div>
                                )
                            )}
                        </div>

                    </div>
                    {/* <div className='stay-property'>
                        <h4 className='bold'>Property Type</h4>
                        <PropertyFilter
                            selectedProperty={selectedProperties}
                            onPropertyChange={setSelectedProperties}
                        />
                    </div> */}
                    <div className='stay-ammenities'>
                        <h4 className='bold'>Amenities</h4>

                        <div className="ammenities-section">
                            {amenities.map((amenity) => (
                                <div className="ammenities-input" key={amenity.title}>
                                    <label htmlFor={amenity.title} className="flex">
                                        <input
                                            type="checkbox"
                                            id={amenity.title}
                                            name={amenity.title}
                                            onChange={handleCheckboxChange}
                                            checked={selectedAmenties.includes(amenity.title)}
                                        />
                                        <div className="input-container">
                                            <span
                                                className={`input-icon ${selectedAmenties.includes(amenity.title)
                                                    ? "selected"
                                                    : ""
                                                    }`}
                                            >
                                                <IoMdCheckmark />
                                                {selectedAmenties.includes(amenity.title)
                                                    ? ""
                                                    : ""}
                                            </span>
                                            <span className="input-title">{amenity.txt}</span>
                                        </div>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="filter-modal-footer">
                        <div
                            className="clear-btn"
                            onClick={() => {
                                setMinPrice(0);
                                setMaxPrice(500);
                                setSelectedBedrooms("Any");
                                setSelectedBeds("Any");
                                setSelectedBathrooms("Any");
                                setSelectedAmenties([]);
                                setModalFilters({});
                                setSelectedProperties([]);
                            }}
                        >
                            Clear all
                        </div>
                        <div className="search-btn">
                            <button
                                type="submit"
                                className="filter-modal-btn"
                                onClick={() => {
                                    handleSubmitFilterModal()
                                    onClose()

                                }}
                                disabled={!resultLength}
                            >
                                {resultLength ? `Show ${resultLength} places` : "No places"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
