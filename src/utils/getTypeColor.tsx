export const getTypeColor = (type: String) => {
    return type === "grass"
    ? "#74CB48"
    : type === "fire" 
    ? "#F57D31"
    : type === "water" 
    ? "#6493EB"
    : type === "bug" 
    ? "#A7B723"
    : type === "electric" 
    ? "#F9CF30"
    : type === "ghost" 
    ? "#70559B"
    : type === "normal" 
    ? "#AAA77F"
    : type === "psychic" 
    ? "#FB5584"
    : type === "steel" 
    ? "#B7B9D0"
    : type === "rock" 
    ? "#B69E31"
    : "transparent";
  }
  