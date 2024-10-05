import React from 'react'
import { IconWithText } from '../../../shared'

export const BoxAttribute = ({ iconClass, value, label }: { iconClass: string, value: string, label: string }) => {
  return (
    <div className="flex flex-col gap-20 align-items-center justify-content-between px-em-2">
      <IconWithText iconClass={iconClass} text={value} />
      <p>{label}</p>
    </div>
  )
}
