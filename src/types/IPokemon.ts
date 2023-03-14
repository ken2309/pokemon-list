export interface IPokemon {
  abilities: object[];
  base_experience: number;
  forms: object[];
  game_indices: object[];
  height: number;
  held_items: object[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: object[];
  name: string;
  order: number;
  past_types: object[];
  species: object[];
  sprites: {
    back_default: string,
    back_female: null,
    back_shiny: string,
    back_shiny_female: null,
    front_default: string,
    front_female: string,
    front_shiny: string,
    front_shiny_female: string,
    other: {
      dream_world: {
        front_default: string,
        front_female: null
      },
      home: {
        front_default: string,
        front_female: string,
        front_shiny: string,
        front_shiny_female: string
      },
      "official-artwork": {
        front_default: string,
        front_shiny: string
      }
    },
    versions: object
  }
  stats: object[];
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  weight: number;
}

export interface IPokemonType {
    double_damage_from: object[];
    double_damage_to: object[];
    half_damage_from: object[];
    half_damage_to: object[];
    no_damage_from: object[];
    no_damage_to: object[];
    game_indices: object[];
    generation: object;
    id: number;
    move_damage_class: object;
    moves: object[];
    name: string;
    names: {
      language: { name: string; url: string };
      name: string;
    }[];
    past_damage_relations: [];
    pokemon: {
      pokemon: {
        name: string; url: string
      };
      slot: number;
    }[];
}