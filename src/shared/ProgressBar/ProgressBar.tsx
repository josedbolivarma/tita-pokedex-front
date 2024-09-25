import React from 'react'

export const ProgressBar = ({ color, percentage }: { color: string | number | undefined, percentage: number }) => {
  return (
    <div className="relative w-100 color-black-bg radius-16 h-2.5 dark:bg-gray-700" style={{backgroundColor: "#C2C2C2", height: "8px"}}>
      <div
        className="color-white-bg h-2.5 radius-16"
        style={{ width: `${Math.min(percentage, 100)}%`, background: color, zIndex: 100, height: "8px" }}
      />
    </div>
  )
}
