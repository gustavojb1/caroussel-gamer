import styles from "./page.module.scss";
import HeroesList from "@/components/HeroesList";
import { IHeroData } from "@/interfaces/heroes";

async function getData(): Promise<{ data: IHeroData[] | null}> {
  

  const res = await fetch(
    "https://caroussel-gamer-git-main-gustavojb1.vercel.app/api/heroes"
  );

  if (!res.ok) {
    throw new Error("Falha ao buscar heróis");
  }

  return res.json();
}

export default async function Home() {
  const res = await getData();
 if(res.data){
   return (
     <main className={styles.main}>
       <HeroesList heroes={res.data} />
     </main>
   );
 }else{
  return(
    <div>Erro na API</div>
  )
 }
}
