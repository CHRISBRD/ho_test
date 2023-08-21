//require("jest-fetch-mock").enableMocks();
//const { fetchSpeciesData, fetchEvolutionChain } = require("./pokemonAPI");
import { fetchEvolutionChain, fetchSpeciesData } from "./pokemonAPI.js";
import { enableFetchMocks } from "jest-fetch-mock";
enableFetchMocks();

describe("fetchSpeciesData", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("should fetch species data for a given pokemon", async () => {
    const mockData = {
      name: "bulbasaur",
      evolution_chain: { url: "https://pokeapi.co/api/v2/evolution-chain/1/" },
    };
    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    const result = await fetchSpeciesData("bulbasaur");
    expect(result).toEqual(mockData);
  });

  it("should throw an error if the response is not ok", async () => {
    fetchMock.mockResponseOnce("Not Found", {
      status: 404,
      statusText: "Not Found",
    });
    await expect(fetchSpeciesData("bulbasaur")).rejects.toThrow(
      "Error fetching species data"
    );
  });
});

describe("fetchEvolutionChain", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("should fetch the evolution chain for a given species data", async () => {
    const mockSpeciesData = {
      evolution_chain: { url: "https://pokeapi.co/api/v2/evolution-chain/1/" },
    };
    const mockEvolutionData = {
      chain: { species: { name: "bulbasaur" }, evolves_to: [] },
    };
    fetchMock.mockResponseOnce(JSON.stringify(mockEvolutionData));

    const result = await fetchEvolutionChain(mockSpeciesData);
    expect(result).toEqual(mockEvolutionData.chain);
  });

  it("should throw an error if no evolution chain is found", async () => {
    await expect(fetchEvolutionChain({})).rejects.toThrow(
      "No evolution chain found"
    );
  });

  it("should throw an error if the evolution chain response is not ok", async () => {
    const mockSpeciesData = {
      evolution_chain: { url: "https://pokeapi.co/api/v2/evolution-chain/1/" },
    };
    fetchMock.mockResponseOnce("Error", {
      status: 500,
    });
    await expect(fetchEvolutionChain(mockSpeciesData)).rejects.toThrow(
      "Error fetching evolution chain"
    );
  });
});
