import Image, { StaticImageData } from "next/image";
import ImageAxel from "/public/heroes/ImageAxel.png";
import ImageBoros from "/public/heroes/ImageBoros.png";
import ImageKuro from "/public/heroes/ImageKuro.png";
import ImageLira from "/public/heroes/ImageLira.png";
import ImageNimue from "/public/heroes/ImageNimue.png";
import ImageRagnar from "/public/heroes/ImageRagnar.png";
import ImageZephyr from "/public/heroes/ImageZephyr.png";

import { IHeroData } from "@/interfaces/heroes";

const heroesImage: Record<string, StaticImageData> = {
  axel: ImageAxel,
  boros: ImageBoros,
  kuro: ImageKuro,
  lira: ImageLira,
  nimue: ImageNimue,
  ragnar: ImageRagnar,
  zephyr: ImageZephyr,
};

interface IProps {
  hero: IHeroData;
}

export default function HeroPicture({ hero }: IProps) {
  return (
    <Image
      src={heroesImage[hero.id] || ImageAxel}
      alt={`${hero.id} ` || ""}
      priority
    />
  );
}
