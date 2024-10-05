import React from 'react'
import { ProgressBar } from '../../../shared'

type Props = { stat: any, color: string }

export const StatRow = ({ stat, color }: Props) => {
    
  return (
    <div className='flex gap-10 justify-content-start align-items-center'>
      <p style={{color, width: "30%"}}>{stat?.pokemon_v2_stat?.name.toLocaleUpperCase()}</p>
        <div className="divider" />
        <p>{stat?.base_stat}</p>
        <div className="w-100">
        <ProgressBar color={color} percentage={stat?.base_stat} />
        </div>
    </div>
  )
}
