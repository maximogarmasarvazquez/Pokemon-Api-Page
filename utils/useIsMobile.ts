import { useState, useEffect } from 'react';

function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    // Función para actualizar el estado según el tamaño de la ventana
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640); // Considera como móvil dispositivos con un ancho menor a 640px
    };

    // Comprobar el tamaño de la ventana al cargar el componente
    checkMobile();

    // Añadir un event listener para escuchar los cambios en el tamaño de la ventana
    window.addEventListener('resize', checkMobile);

    // Limpiar el event listener cuando el componente se desmonte
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return isMobile;
}

export default useIsMobile;