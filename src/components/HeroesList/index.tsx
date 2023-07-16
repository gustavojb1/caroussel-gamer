"use client";
import { IHeroData } from "@/interfaces/heroes";
import styles from "./heroesList.module.scss";
import { spidermanFont } from "@/fonts";
import HeroPicture from "../HeroPicture";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import useWindowSize from "@/app/Hooks/useWindowSize";

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

  function handleClickRight(){
    if(activeHero===heroes.length-1){
      setActiveHero(0)
    }else
    setActiveHero(activeHero + 1)
  }
  
  function handleClickLeft(){
    if(activeHero===0){
      setActiveHero(heroes.length-1)
    }else
    setActiveHero(activeHero - 1)
  }

  if (!width) return null;

  return (
    <>
      <motion.h1
        className={`${spidermanFont.className} ${styles.title}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 2 }}
      >
        Personagens
      </motion.h1>
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
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 1 }}
                transition={{ duration: 0.8 }}
                className={`${styles.imageContainer} ${styles[hero.id]}`}
              >
                <Link href={`/hero/${hero.id}`}>
                  <HeroPicture hero={hero} />
                </Link>
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
        <div
          className={`${styles.imageContainerMobile} ${
            styles[heroes[activeHero].id]
          }`}
        >
          <HeroPicture hero={heroes[activeHero]} />
        </div>
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
    </>
  );
}
