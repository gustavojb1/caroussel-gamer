"use client";
import { IHeroData } from "@/interfaces/heroes";
import styles from "./carousel.module.scss";
import HeroDetails from "../HeroDetails";
import { useEffect, useMemo, useState } from "react";
import HeroPicture from "../HeroPicture";
import { AnimatePresence, motion } from "framer-motion";
import useWindowSize from "@/app/Hooks/useWindowSize";



enum enPosition {
  FRONT = 0,
  MIDDLE = 1,
  BACK = 2,
}

interface IProps {
  heroes: IHeroData[];
  activeId: string;
}

export default function Carousel({ heroes, activeId }: IProps) {  
  
  
  //Hook personalizado de largura e altura da tela
  const { width, height } = useWindowSize();
  // Controla os itens visíveis do carrossel
  const [visibleItems, setVisibleItems] = useState<IHeroData[] | null>(null);

  // Armazena o item ativo do carrossel
  const [activeIndex, setActiveIndex] = useState(
    heroes.findIndex((hero) => hero.id === activeId) - 1
  );

  // Armazena a posição inicial, no eixo x, da interação com o carrossel
  const [startInteractionPosition, setStartInteractionPosition] =
    useState<number>(0);

  // Altera o visibleItems sempre que o activeIndex é alterado
  useEffect(() => {
    // itens que serão mostrados ao longo do carrossel
    const items = [...heroes];

    // calcula o índice do array de acordo com o item ativo
    // de forma que o número nunca saia do escopo do array
    const indexInArrayScope =
      ((activeIndex % items.length) + items.length) % items.length;

    // itens que estão visíveis neste momento para o usuário
    // duplicamos o array para dar a impressão de um carrossel infinito (360deg)
    const visibleItems = [...items, ...items].slice(
      indexInArrayScope,
      indexInArrayScope + 3
    );

    setVisibleItems(visibleItems);
  }, [heroes, activeIndex]);

  // Altera o fundo da página de acordo com o herói selecionado
  useEffect(() => {
    const htmlEl = document.querySelector("html");

    if (!htmlEl || !visibleItems) {
      return;
    }

    function background(idHero:string):any{
      switch (idHero) {
        case "lira":
          return "#D7BBF5";
          break;
        case "boros":
          return "#FFA559";
          break;
        case "zephyr":
          return  "#9AC5F4";
          break;
        case "kuro":
          return  "#DDE6ED";
          break;
        case "ragnar":
          return  "#F45050";
          break;
        case "nimue":
          return   "#CCEEBC";
          break;
        case "axel":
          return   "#F2F2F2";
          break;
    
        default:
          return  "linear-gradient(#1d2024, #3d3d3d )"
      }
    }

    const currentHeroId = visibleItems[1].id;
    htmlEl.style.backgroundColor = background(currentHeroId);
    htmlEl.classList.add("hero-page");

    // remove a classe quando o componente é desmontado
    return () => {
      htmlEl.classList.remove("hero-page");
    };
  }, [visibleItems]);

  const transitionAudio = useMemo(() => new Audio("/songs/transition.mp3"), []);

  // Voz de cada personagem
  const voicesAudio: Record<string, HTMLAudioElement> = useMemo(
    () => ({
      "lira": new Audio("/songs/lira.mp3"),
      "boros": new Audio("/songs/boros.mp3"),
      "zephyr": new Audio("/songs/zephyr.mp3"),
      "kuro": new Audio("/songs/kuro.mp3"),
      "ragnar": new Audio("/songs/ragnar.mp3"),
      "nimue": new Audio("/songs/nimue.mp3"),
      "axel": new Audio("/songs/axel.mp3"),
    }),
    []
  );

  // Reproduz efeitos sonoros ao rotacionar o carrossel
  useEffect(() => {

    if (!visibleItems) {
      return;
    }
    transitionAudio.play();
    const voiceAudio =  voicesAudio[visibleItems[1].id];
    if (voiceAudio) {

      voiceAudio.volume = 0.3;
      voiceAudio?.play();
    }
  }, [visibleItems, transitionAudio, voicesAudio]);

  // Altera herói ativo no carrossel
  // +1 rotaciona no sentido horário
  // -1 rotaciona no sentido anti-horário
  const handleChangeActiveIndex = (newDirection: number) => {
    setActiveIndex((prevActiveIndex) => prevActiveIndex + newDirection);
  };

  // onDragStart (mouse): armazena a posição inicial da interação
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    setStartInteractionPosition(e.clientX);
  };

  // onDragEnd (mouse): armazena a posição final da interação
  // Mexe o carrossel na direção que o usuário fez o evento de interação
  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    if (!startInteractionPosition) {
      return null;
    }

    const endInteractionPosition = e.clientX;
    const diffPosition = endInteractionPosition - startInteractionPosition;

    // diffPosition > 0 => direita para esquerda
    // diffPosition < 0 => esquerda para direita
    const newPosition = diffPosition > 0 ? -1 : 1;
    handleChangeActiveIndex(newPosition);
  };

  //INTERAÇÃO COM O TOUCH
  // onTouchStart (touch): armazena a posição inicial da interação
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setStartInteractionPosition(e.touches[0].clientX);
  };

  // onTouchEnd (touch): armazena a posição final da interação
  // Mexe o carrossel na direção que o usuário fez o evento de interação
  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!startInteractionPosition) {
      return null;
    }

    const endInteractionPosition = e.changedTouches[0].clientX;

    // diffPosition > 0 => direita para esquerda
    // diffPosition < 0 => esquerda para direita
    const diffPosition = endInteractionPosition - startInteractionPosition;

    const newPosition = diffPosition > 0 ? -1 : 1;
    handleChangeActiveIndex(newPosition);
  };

  if (!visibleItems) {
    return null;
  }
  return (
    <div className={styles.container}>
      <div className={styles.carousel}>
        <div
          className={styles.wrapper}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="popLayout">
            {visibleItems?.map((item, position) => (
              <motion.div
                key={item.id}
                className={styles.hero}
                transition={{ duration: 0.8 }}
                initial={{
                  x: -1500,
                  scale: 0.75,
                }}
                animate={{ x: 0, ...getItemStyles(position, width) }}
                exit={exitStyle(width)}
              >
                <HeroPicture hero={item} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      <motion.div
        className={styles.details}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 2 }}
      >
        <HeroDetails data={visibleItems[enPosition.MIDDLE]} />
      </motion.div>
    </div>
  );
}

//pegar a largura da tela
// var largura =
//   window.innerWidth ||
//   document.documentElement.clientWidth ||
//   document.body.clientWidth;

// estilos para o item que está visível na animação
// dependendo da posição do herói no carrossel
const getItemStyles = (position: enPosition, width: any) => {
  if (position === enPosition.FRONT) {
    if (width && width < 780) {
      return {
        left: "-15%",
        filter: "blur(10px)",
        scale: 1.2,
        zIndex: 3,
      };
    } else {
      return {
        filter: "blur(10px)",
        scale: 1.2,
        zIndex: 3,
      };
    }
  }

  if (position === enPosition.MIDDLE) {
    if (width && width < 780) {
      return {
        left: "50%",
        scale: 1.7,
        zIndex: 4,
        
      };
    } else {
      return {
        left: 410,
        scale: 1.3,
        top: "-10%",
        zIndex: 2,
      };
    }
  }
  if (width && width < 780) {
    return {
      filter: "blur(10px)",
      scale: 1.2,
      left: "80%",
      opacity: 0.8,
      zIndex: 3,
    };
  } else {
    return {
      filter: "blur(10px)",
      scale: 0.6,
      left: 160,
      opacity: 0.8,
      zIndex: 1,
      top: "-20%",
    };
  }
};

const exitStyle = (width: any) => {
  if (width && width < 780) {
    return {
      x: -1000,
      opacity: 0,
      scale: 1,
    };
  } else {
    return {
      x: 0,
      left: "-20%",
      opacity: 0,
      scale: 1,
    };
  }
};
