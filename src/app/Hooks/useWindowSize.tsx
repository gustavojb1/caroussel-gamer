'use client'
import { useEffect, useState } from "react";

interface Size {
  width: number | undefined,
  height: number | undefined,
}
// Hook
export default function useWindowSize() {
  // Inicializa o estado com largura/altura indefinidos para que o servidor e o cliente renderizem de forma compatível
  const [windowSize, setWindowSize] = useState<Size>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Handler para chamar ao redimensionar a janela
    function handleResize() {
      // Define a largura/altura da janela no estado
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    
    // Add event listener
    window.addEventListener("resize", handleResize);
     
    // Chama o handler para que o estado seja atualizado com o tamanho inicial da janela
    handleResize();
    
    // Remove event listener 
    return () => window.removeEventListener("resize", handleResize);
  }, []); 
  return windowSize;
}