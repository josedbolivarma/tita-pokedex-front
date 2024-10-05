import React, { useState } from 'react'

export const ImageWithSkeleton = ({ pokemon, image, handleImageError }: { pokemon: any, image: string, handleImageError: () => void }) => {
    const [loading, setLoading] = useState(true);

    const handleImageLoad = () => {
      setLoading(false);
    };
  
    return (
      <div style={{ position: 'relative', width: '100%', height: '100%', maxHeight: '280px' }}>
        {/* Esqueleto de carga (solo se muestra mientras loading es true) */}
        {loading && (
          <div
            style={{
              height: '200px', // Ajusta la altura del esqueleto según necesites
              backgroundColor: '#e0e0e0',
              borderRadius: '8px',
              animation: 'pulse 1.5s infinite',
              zIndex: 100
            }}
          />
        )}
  
        {/* Imagen real */}
        <img
          className='w-100 h-100'
          src={pokemon?.community && pokemon?.img ? pokemon?.img : image}
          alt="Pokemon"
          onError={handleImageError}
          onLoad={handleImageLoad} // Cuando la imagen se carga, cambiamos el estado
          style={{
            display: loading ? 'none' : 'block', // Oculta la imagen mientras se carga
            width: '100%',
            zIndex: 1000
          }}
        />
  
        {/* Animación de esqueleto */}
        <style>{`
          @keyframes pulse {
            0% {
              background-color: #e0e0e0;
            }
            50% {
              background-color: #f0f0f0;
            }
            100% {
              background-color: #e0e0e0;
            }
          }
        `}</style>
      </div>
    );
}
