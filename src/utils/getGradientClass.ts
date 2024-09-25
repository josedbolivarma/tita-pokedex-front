import React from 'react'

export const getGradientClass = (type: string) => {
    return type === "grass"
    ? "gradient-grass"
    : type === "fire" 
    ? "gradient-fire"
    : type === "water" 
    ? "gradient-water"
    : type === "bug" 
    ? "gradient-but"
    : type === "electric" 
    ? "gradient-electric"
    : type === "ghost" 
    ? "gradient-ghost"
    : type === "normal" 
    ? "gradient-normal"
    : type === "psychic" 
    ? "gradient-psychic"
    : type === "steel" 
    ? "gradient-steel"
    : type === "rock" 
    ? "gradient-rock"
    : "transparent";
}
