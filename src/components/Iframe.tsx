"use client"
import React from "react"
import HTMLFlipBook from "react-pageflip"

function Book() {
  const pokemonData = [
    {
      id: "006",
      name: "/images/flipImage/1.png",
      types: ["Fire", "Flying"],
      description:
        "Flies in search of strong opponents. Breathes extremely hot fire that melts anything, but never uses it on weaker foes.",
    },
    {
      id: "025",
      name: "/images/flipImage/2.png",
      types: ["Electric"],
      description:
        "When Pikachu meet, they touch tails to exchange electricity as a greeting.",
    },
    {
      id: "125",
      name: "/images/flipImage/1.png",
      types: ["Electric"],
      description:
        "Often kept at power plants to regulate electricity. Competes with others to attract lightning during storms.",
    },
    {
      id: "185",
      name: "/images/flipImage/2.png",
      types: ["Rock"],
      description:
        "Despite looking like a tree, its body is more like rock. Hates water and hides when it rains.",
    },
  ]

  return (
    <div className="w-full h-screen flex justify-center items-center ">
      <HTMLFlipBook
        width={600}
        height={600}
        maxShadowOpacity={0.5}
        drawShadow={true}
        showCover={true}
        size="fixed"
        startPage={1}
      >
        {/* Cover Page */}
        <div className="page" style={{ background: "transparent" }}>
          <div className="page-content cover">
            <img
              src={"/images/flipImage/1.png"}
              alt="Pokémon Logo"
              className="pokemon-logo"
            />
          </div>
        </div>

        {/* Data Pages */}
        {pokemonData.map((pokemon) => (
          <div className="page" key={pokemon.id}>
            <div className="page-content">
              <div className="pokemon-container ">
                <img
                  src={pokemon.name}
                  alt={pokemon.name}
                  className="h-full"
                />
                {/* <div className="pokemon-info">
                  <h2 className="pokemon-name">{pokemon.name}</h2>
                  <p className="pokemon-number">#{pokemon.id}</p>
                  <div>
                    {pokemon.types.map((type) => (
                      <span
                        key={type}
                        className={`pokemon-type type-${type.toLowerCase()}`}
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                  <p className="pokemon-description">{pokemon.description}</p>
                </div> */}
              </div>
            </div>
          </div>
        ))}
      </HTMLFlipBook>
    </div>
  )
}

export default Book
