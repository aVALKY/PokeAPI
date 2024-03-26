import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import VersionService from '../Services/VersionService';
import PokemonsService from '../Services/PokemonsService';
import PokemonCard from '../Components/PokemonCard';
import { Form } from 'react-bootstrap';

const PokemonByVersion = () => {
    // États
    const {idVersion} = useParams();
    const [version, setVersion] = useState({});
    const [pokemons, setPokemons] = useState([]);
    const [searchValue, setSearchValue] = useState("")
    const [pokemonsFiltered, setPokemonsFiltered] = useState([])

    // Comportements
    const getVersions = async () => {
        const response = await VersionService.getVersionByID(idVersion);
        setVersion(response.data);
        const generation = await PokemonsService.fetchPokemonByGeneration(response.data.generation.url.slice(36).replaceAll("/", ""))
        setPokemons(generation.data.pokemon_species);
        setPokemonsFiltered(generation.data.pokemon_species);
    }

    const handleChange = (e) => {
        setSearchValue(e.target.value)
    }

    useEffect(() => {
        getVersions()
    }, [])

    useEffect(() => {
        if (searchValue != "") {
            let res = pokemons.filter((pokemon) => {
                return pokemon.name.toLowerCase().includes(searchValue.toLowerCase())
            })
            setPokemonsFiltered(res);
        }else{
            setPokemonsFiltered(pokemons)
        }
    }, [searchValue])

    // Affichage
    return <>
        <h1 className='text-center'>Pokemon de {version.name}</h1>
        <div className="d-flex justify-content-center m-4 col-11">   
            <Form.Control type="text" placeholder="Rechercher un Pokemon" onChange={handleChange}/>
        </div>
        <div className="d-flex gap-3 flex-wrap justify-content-center mt-3">
            {pokemonsFiltered.map((pokemon) => {
                return <PokemonCard nom={pokemon.name} id={pokemon.url.slice(42).replaceAll("/", "")} />
            })}
        </div>
    </>

}

export default PokemonByVersion;