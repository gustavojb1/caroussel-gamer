import { IHeroData } from "@/interfaces/heroes";
import styles from "./carousel.module.scss";
import HeroDetails from "../HeroDetails";

interface IProps {
  heroes: IHeroData[];
  activeId: string;
}

export default function Carousel({ heroes, activeId }: IProps) {
  return (
    <div className={styles.container}>
      <div className={styles.carousel}>
        <div className={styles.wrapper}>Lista com os heróis</div>
      </div>
      <div className={styles.details}>
        <HeroDetails data={heroes[0]} />
      </div>
    </div>
  )
}