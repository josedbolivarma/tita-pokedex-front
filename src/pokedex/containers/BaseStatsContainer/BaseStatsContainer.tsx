import React from 'react'
import { Pokemon, PokemonStat } from '../../../interfaces/pokemon.interface'
import { StatRow } from '../../components'

type Props = {
  stats: PokemonStat[], 
  color: string 
}

export const BaseStatsContainer = ({ stats, color }: Props) => {
  return (
    <div className='flex flex-col gap-em-2'>
      {/* <Heading text="Base Stats" color={color} /> */}
      <div className="w-100 flex flex-col gap-8">
        {stats?.map((stat: any, index: number) => (
          <StatRow key={index} stat={stat} color={color} />
        ))}
      </div>
    </div>
  )
}
