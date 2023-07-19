import { ethnocentric } from "@/fonts";
import { Play } from "next/font/google";

import { IHeroData } from "@/interfaces/heroes";
import styles from "./heroDetails.module.scss";
import { motion } from "framer-motion";

interface IProps {
  data: IHeroData;
}

const play = Play({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

function color(skill:number){
  if(skill>7)
  return "#A2FF86"
  if(skill>4)
  return "#F6FA70"
  if(skill<5)
  return "#ED2B2A"

}

export default function HeroDetails({ data }: IProps) {
  const { id, title, description, skills } = data;

  return (
    <div className={styles.container}>
      <div className={`${styles.name} ${ethnocentric.className}`}>
        {id},<div>{title}</div>
      </div>
      <div className={`${styles.description} ${play.className}`}>
        {description}
      </div>
      <div className={`${styles.skills} ${ethnocentric.className}`}>
        Skills
        <div className={`${styles.skillContainer} ${play.className}`}>
          <div className={styles.skillPoints}>
            Força
            <div className={styles.skillPointsNumber}>{skills.strength}</div>
          </div>
          <div className={styles.skillBarContent}>
            <motion.div
              className={styles.skillBar}
              initial={{ width: 0 }}
              animate={{ width: `${skills.strength}0%` }}
              transition={{ duration: 1, type: "spring", stiffness: 300 }}
              style={{backgroundColor:color(skills.strength) }}
            ></motion.div>
          </div>

          <div className={styles.skillPoints}>
            Inteligência
            <div className={styles.skillPointsNumber}>{skills.intelligence}</div>
          </div>
          <div className={styles.skillBarContent}>
            <motion.div
              className={styles.skillBar}
              initial={{ width: 0 }}
              animate={{ width: `${skills.intelligence}0%` }}
              transition={{ duration: 1, type: "spring", stiffness: 300 }}
              style={{backgroundColor:color(skills.intelligence) }}
            ></motion.div>
          </div>

          <div className={styles.skillPoints}>
            Agilidade
            <div className={styles.skillPointsNumber}>{skills.agility}</div>
          </div>
          <div className={styles.skillBarContent}>
            <motion.div
              className={styles.skillBar}
              initial={{ width: 0 }}
              animate={{ width: `${skills.agility}0%` }}
              transition={{ duration: 1, type: "spring", stiffness: 300 }}
              style={{backgroundColor:color(skills.agility) }}
            ></motion.div>
          </div>

          <div className={styles.skillPoints}>
            Defesa
            <div className={styles.skillPointsNumber}>{skills.defense}</div>
          </div>
          <div className={styles.skillBarContent}>
            <motion.div
              className={styles.skillBar}
              initial={{ width: 0 }}
              animate={{ width: `${skills.defense}0%` }}
              transition={{ duration: 1, type: "spring", stiffness: 300 }}
              style={{backgroundColor:color(skills.defense) }}
            ></motion.div>
          </div>

          <div className={styles.skillPoints}>
            Ataque
            <div className={styles.skillPointsNumber}>{skills.attack}</div>
          </div>
          <div className={styles.skillBarContent}>
            <motion.div
              className={styles.skillBar}
              initial={{ width: 0 }}
              animate={{ width: `${skills.attack}0%`}}
              transition={{ duration: 1, type: "spring", stiffness: 300 }}
              style={{backgroundColor:color(skills.attack) }}
            ></motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}


