import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import PokemonsService from '../Services/PokemonsService';
import PokemonCard from '../Components/PokemonCard';
import { Form } from 'react-bootstrap';

const PokemonByType = () => {
    // États
    const {idType} = useParams();
    const [pokemons, setPokemons] = useState([]);
    const [type, setType] = useState({})
    const [searchValue, setSearchValue] = useState("")
    const [pokemonsFiltered, setPokemonsFiltered] = useState([])


    //Comportements
    const getPokemonByType = async () => {
        const response = await PokemonsService.fetchPokemonByType(idType);
        setType(response.data);
        setPokemons(response.data.pokemon);
        setPokemonsFiltered(response.data.pokemon);
    }

    const handleChange = (e) => {
        setSearchValue(e.target.value)
    }

    useEffect(() => {
        getPokemonByType()
    }, [])

    useEffect(() => {
        if (searchValue != "") {
            let res = pokemons.filter((pokemon) => {
                return pokemon.pokemon.name.toLowerCase().includes(searchValue.toLowerCase())
            })
            setPokemonsFiltered(res);
        }else{
            setPokemonsFiltered(pokemons)
        }
    }, [searchValue])

    //Affichage
    return <>
        <h1 className='text-center'>{type.names && type.names[3].name}</h1>
        <div className="d-flex justify-content-center m-4 col-11">   
            <Form.Control type="text" placeholder="Rechercher un Pokemon" onChange={handleChange}/>
        </div>
        <div className="d-flex gap-3 flex-wrap justify-content-center mt-3">
            {pokemonsFiltered.map((pokemon) => {
                return <PokemonCard nom={pokemon.pokemon.name} id={pokemon.pokemon.url.slice(33).replaceAll("/", "")} />
            })}
        </div>
    </>
}

export default PokemonByType;