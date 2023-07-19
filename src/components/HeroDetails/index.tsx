import { ethnocentric } from "@/fonts";
import { Play } from "next/font/google";

import { IHeroData } from "@/interfaces/heroes";
import styles from "./heroDetails.module.scss";

interface IProps {
  data: IHeroData;
}

const play = Play({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export default function HeroDetails({ data }: IProps) {
  const { id, title, description, skills } = data;

  return (
    <div className={styles.container}>
      <div className={`${styles.name} ${ethnocentric.className}`}>{id},</div>
      <div className={`${styles.title} ${ethnocentric.className}`}>{title}</div>
      <div className={`${styles.description} ${play.className}`}>{description}</div>
      <div className={`${styles.skills} ${ethnocentric.className}`}>
        Skills
        <div>{skills.strength}</div>
        <div>{skills.intelligence}</div>
        <div>{skills.agility}</div>
        <div>{skills.defense}</div>
        <div>{skills.attack}</div>
      </div>
    </div>
  );
}
