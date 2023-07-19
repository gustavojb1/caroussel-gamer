export interface IHeroData {
  id: string;
  title: string;
  description: string;
  skills: {
    strength: number;
    intelligence: number;
    agility: number;
    defense: number;
    attack: number;
  };
}