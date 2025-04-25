export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonImg {
  back_default: string;
  back_female: string;
  back_shiny: string;
  front_default: string;
}

export interface Ability {
  ability: {
    name: string;
    url: string;
  };
}

export interface Stat {
  base_stat: number;
  effort: number; // 👈
  stat: {
    name: string;
    url: string;
  };
}


export interface Pokemon {
  id: number;
  nombre: string;
  types: PokemonType[];
  imagenes: PokemonImg;
  habilidades: {
    habilidad: {
      nombre: string;
    };
  }[];
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      nombre: string;
    };
  }[];
}


export interface PokemonAPIResponse {
  id: number;
  name: string;
  types: PokemonType[];
  sprites: PokemonImg;
  abilities: Ability[];
  stats: Stat[];
}
