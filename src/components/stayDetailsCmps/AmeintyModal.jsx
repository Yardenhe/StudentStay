import React from 'react'
import { TagToIcon } from '../UI/TagToIcon'

export function AmeintyModal({ payload }) {
    const { amenities } = payload
    console.log("🚀 ~ AmeintyModal ~ amenities:", amenities)


    return (
        <div className="amenity-modal">
            <h3>Amenities</h3>
            <div className="amenity-modal-list">
                {amenities.map(a => (
                    <li key={a} className="amenity clean-list">
                        <TagToIcon tag={a}/>
                        <div className="amenity-name">{a}</div>
                    </li>))}
            </div>

        </div>
    )
}
