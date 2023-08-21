import readline from "readline";
import chalk from "chalk";
import { fetchEvolutionChain, fetchSpeciesData } from "./pokemonAPI.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const parseEvolutionChain = (chain) => {
  return {
    name: chain.species?.name,
    variations: chain.evolves_to?.map((evolution) =>
      parseEvolutionChain(evolution)
    ),
  };
};

const getPokemonEvolutionChain = async (pokemonName) => {
  try {
    const speciesData = await fetchSpeciesData(pokemonName);
    const chain = await fetchEvolutionChain(speciesData);
    const evolution = parseEvolutionChain(chain);

    console.log(chalk.red(JSON.stringify(evolution, null, 2)));
  } catch (error) {
    console.error("Error fetching evolution chain:", error);
  }

  getPokemonName();
};

const getPokemonName = () => {
  rl.question("Enter a Pokemon name (q to quit): ", (pokemonName) => {
    if (pokemonName.toLowerCase() === "q") {
      rl.close();
    } else {
      getPokemonEvolutionChain(pokemonName);
    }
  });
};

getPokemonName();
