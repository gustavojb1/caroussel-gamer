import styles from "./page.module.scss";
import HeroesList from "@/components/HeroesList";
import { IHeroData } from "@/interfaces/heroes";

async function getData(): Promise<{ data: IHeroData[] }> {
  const res = await fetch(
    "https://caroussel-gamer-gustavojb1.vercel.app//api/heroes"
  );

  if (!res.ok) {
    throw new Error("Falha ao buscar heróis");
  }

  return res.json();
}

export default async function Home() {
  const res = await getData();

  return (
    <main className={styles.main}>
      <HeroesList heroes={res.data} />
    </main>
  );
}
