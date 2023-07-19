"use client";
import { IHeroData } from "@/interfaces/heroes";
import styles from "./heroesList.module.scss";
import HeroPicture from "../HeroPicture";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import useWindowSize from "@/app/Hooks/useWindowSize";
import PositionHero from "../PositionHero";

interface IProps {
  heroes: IHeroData[];
}

export default function HeroesList({ heroes }: IProps) {
  //Hook personalizado de largura e altura da tela
  const { width, height } = useWindowSize();

  //Lista de heróis sem o herói ativo (mobile)
  const [herosList, setHerosList] = useState<IHeroData[]>([...heroes]);

  //heroi ativo (em destaque mobile)
  const [activeHero, setActiveHero] = useState<number>(0);

  //retirar o herói ativo da lista de herois
  useEffect(() => {
    setHerosList([...heroes].filter((hero, index) => index !== activeHero));
  }, [activeHero]);

  const [side, setSide] = useState<boolean>(true);

  function handleClickRight() {
    setSide(true);
    if (activeHero === heroes.length - 1) {
      setActiveHero(0);
    } else setActiveHero(activeHero + 1);
  }

  function handleClickLeft() {
    setSide(false);
    if (activeHero === 0) {
      setActiveHero(heroes.length - 1);
    } else setActiveHero(activeHero - 1);
  }

  const sideEfect = () => {
    if (side) {
      return { x: 300 };
    } else {
      return { x: -300 };
    }
  };

  if (!width) return null;

  return (
    <>
        <motion.div 
        className={styles.mainImage}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 2 }}
        >
        <Image
            src="/ancient-text.svg"
            alt="Login"
            fill={true}
            priority
          />

        </motion.div>
      <motion.section
        className={styles.heroes}
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0.8 }}
        transition={{ duration: 3 }}
      >
        {width > 780
          ? heroes.map((hero) => (
              <motion.div
                key={hero.id}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 1 }}
                transition={{ duration: 0.8 }}
                className={`${styles.imageContainer} ${styles[hero.id]}`}
              >
                <Link href={`/hero/${hero.id}`}>
                  <HeroPicture hero={hero} />
                </Link>
              </motion.div>
            ))
          : herosList.map((hero) => (
              <motion.div
                key={hero.id}
                initial={{ filter: "blur(3px)", scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 2 }}
                className={`${styles.imageContainer} ${styles[hero.id]}`}
              >
                <HeroPicture hero={hero} />
              </motion.div>
            ))}
      </motion.section>

      <div className={styles.mobileWrapper}>
        <div className={styles.leftRow}>
          <Image
            src="/icons/ArrowLeft.svg"
            width={30}
            height={30}
            alt="Left Arrow"
            onClick={handleClickLeft}
          />
        </div>
        <AnimatePresence mode="popLayout">
          <Link
            href={`/hero/${heroes[activeHero].id}`}
            className={styles.imageContainerMobile}
          >
            <motion.div
              className={`${styles.imageContainerMobile} ${
                styles[heroes[activeHero].id]
              }`}
              key={activeHero}
              initial={sideEfect()}
              animate={{ x: 0, opacity: 1 }}
              exit={{ scale: 0, y: 110 }}
            >
              <HeroPicture hero={heroes[activeHero]} />
            </motion.div>
          </Link>
        </AnimatePresence>
        <div className={styles.rightRow}>
          <Image
            src="/icons/ArrowRight.svg"
            width={30}
            height={30}
            alt="Left Arrow"
            onClick={handleClickRight}
          />
        </div>
      </div>
      <PositionHero
        heroes={heroes}
        activeHero={activeHero}
      />
    </>
  );
}
