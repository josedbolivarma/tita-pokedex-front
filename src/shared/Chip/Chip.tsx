import React from 'react'
import { getTypeColor } from '../../utils'

export const Chip = ({type}: {type: String}) => {
  return (
    <button className="radius-16 p-6 px-8 color-white font-300" style={{
        backgroundColor: getTypeColor(type)
    }}>
        { type }
    </button>
  )
}
