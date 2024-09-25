import React, { FC } from 'react'
import styles from "./Layout.module.css";

type PropsWithChildren = {
  size?: "sm" | "md" | "lg",
  children: React.ReactElement,
}

export const Layout: FC<PropsWithChildren> = ({size = "lg", children}) => {
  return (
    <div className={`${styles.root} relative container ${size === "lg" ? "w-100" : size === "md" ? "w-80" : size === "sm" ? "w-60" : "w-100"} h-100 min-h-100 color-white-bg box-shadow-primary`} >
        {
          children
        }
    </div>
  )
}
