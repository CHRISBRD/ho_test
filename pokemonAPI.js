const speciesURL = "https://pokeapi.co/api/v2/pokemon-species/";

export const fetchSpeciesData = async (pokemonName) => {
  const speciesResponse = await fetch(`${speciesURL}${pokemonName}`);
  if (!speciesResponse.ok) {
    throw new Error(`Error fetching species data`);
  }
  const speciesData = await speciesResponse.json();
  return speciesData;
};

export const fetchEvolutionChain = async (speciesData) => {
  if (!speciesData.evolution_chain) {
    throw new Error(`No evolution chain found`);
  }
  const evolutionChainUrl = speciesData.evolution_chain.url;

  const evolutionResponse = await fetch(evolutionChainUrl);
  if (!evolutionResponse.ok) {
    throw new Error(`Error fetching evolution chain`);
  }
  const evolutionData = await evolutionResponse.json();
  return evolutionData?.chain;
};
