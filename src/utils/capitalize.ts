export const capitalize = (str: string) => {
    if (str.length === 0) return str; // Retorna el string vacío si no hay texto
    return str.charAt(0).toUpperCase() + str.slice(1);
}