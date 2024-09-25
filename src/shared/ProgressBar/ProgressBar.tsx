import React from 'react'

export const ProgressBar = ({ color }: { color: string | number | undefined }) => {
  return (
    <div className="w-100 color-black-bg radius-16 h-2.5 dark:bg-gray-700" style={{backgroundColor: "#C2C2C2", height: "8px"}}>
      <div
        className="color-white-bg h-2.5 radius-16"
        style={{ width: `40%`, background: color, zIndex: 100, height: "8px" }}
      />
    </div>
  )
}
