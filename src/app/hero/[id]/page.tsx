import { GetDataHeroes } from "@/app/api/heroes/route";
import Carousel from "@/components/Carousel";
import { IHeroData } from "@/interfaces/heroes";

interface IProps {
  params: {
    id: string;
  };
}

async function getData(): Promise<{ data: IHeroData[] }> {
  const res  = await GetDataHeroes()
  if (!res.ok) {
    throw new Error("Falha ao buscar heróis");
  }

  return res.json();
  
}

export default async function Hero({ params: { id } }: IProps) {
  const res = await getData();

  return <Carousel heroes={res.data} activeId={id} />;
}
