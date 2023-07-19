import { IHeroData } from "@/interfaces/heroes";
import styles from "./positionHero.module.scss";
import Image from "next/image";

interface IProps {
  heroes: IHeroData[];
  activeHero: number;
}

const PositionHero = ({ heroes, activeHero }: IProps) => {
  return (
    <>
      <div className={styles.container}>
        {heroes.map((hero, index) =>
          index === activeHero ? (
            <div key={index}>
              <Image
                src="/icons/circle-dot.svg"
                width={30}
                height={30}
                alt=""
                style={{ fill: "#DBDFEA", color: "#DBDFEA" }}
              />
            </div>
          ) : (
            <div key={index}>
              <Image src="/icons/circle.svg" width={30} height={30} alt="" />
            </div>
          )
        )}
      </div>
    </>
  );
};

export default PositionHero;
