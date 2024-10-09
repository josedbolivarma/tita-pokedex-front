export const updateUrlWithType = ({name, value, navigate, location}: any) => {
    const searchParams = new URLSearchParams(location.search);

    // Agregar o actualizar el parámetro
    if (value) {
      searchParams.set(name, value);
    } else {
      searchParams.delete(name); // Eliminar si no hay parámetro
    }

    // Actualizar la URL sin recargar la página
    navigate({
      pathname: location.pathname,
      search: searchParams.toString(),
    }, { replace: true });  // Usamos replace para evitar agregar entradas innecesarias en el historial
  };