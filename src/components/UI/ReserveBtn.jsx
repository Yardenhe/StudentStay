import React, { useState } from 'react'

export function ReserveBtn({ text, cb }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // console.log(mousePosition);
  function handleMouseMove(ev) {
    const rect = ev.currentTarget.getBoundingClientRect();
    let { x, y } = ev.nativeEvent
    const { clientWidth, clientHeight } = ev.currentTarget
    x = ((x - rect.left) / clientWidth) * 100;
    y = ((y - rect.top) / clientHeight) * 100;
    setMousePosition({ x, y });
  }

  let dynamicGradient = `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%,#FFAC1C 0%,#E61E4D 27.5%,#E31C5F 40%,#D70466 57.5%,#BD1E59 75%,#BD1E59 100%)`
  return (
    <button
      onMouseMove={handleMouseMove}
      onClick={cb}
      className='btn-continue bnb-color bold'
      style={{ background: dynamicGradient }}
    >
      {text}
    </button>
  )
}
