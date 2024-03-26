import axios from "axios";

class VersionService {
    static fetchVersions(){
        return axios.get("https://pokeapi.co/api/v2/version-group")
    }

    static getVersionByID(id){
        return axios.get("https://pokeapi.co/api/v2/version-group/"+id)
    }
}

export default VersionService;