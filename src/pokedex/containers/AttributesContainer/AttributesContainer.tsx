import React from 'react'
import { BoxAttribute } from '../../components';

export const AttributesContainer = ({ color, weight, height, moves }: { color: string, weight: string, height: string, moves: string[]}) => {
  return (
    <div className={`w-100 h-100 flex flex-col justify-content-center gap-20`}>      
      <div className={`flex justify-content-center`}>
        <BoxAttribute iconClass="fa-solid fa-weight-hanging" value={weight} label="Weight" />
        <div className="divider" />
        <BoxAttribute iconClass="fa-solid fa-ruler-vertical" value={height} label="Height" />
        <div className="divider" />

        <div className="flex flex-col gap-20 align-items-center justify-content-between px-em-2">
          <div className='flex flex-col gap-4'>
            {moves.map((move, index) => (
              <p key={index}>{move}</p>
            ))}
          </div>
          <p>Moves</p>
        </div>
      </div>
    </div>
  );
}
