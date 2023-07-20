import styles from "./page.module.scss";
import HeroesList from "@/components/HeroesList";
import { IHeroData } from "@/interfaces/heroes";
import { GetDataHeroes } from "./api/heroes/route";

async function getData(): Promise<{ data: IHeroData[] }> {

  const res  = await GetDataHeroes()

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
