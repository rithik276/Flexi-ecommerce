import {TOKEN} from './constants'
const server = "localhost"
const port = 8000
const version = "v1"

export const header = { authorization: "Bearer " + TOKEN };

export const URL = (endpoint) => {
    return "http://"+ server + ":"+ port + "/api/"+version+"/"+endpoint+"/";
}

export const STATIC_URL = (endpoint) => {
  return "http://" + server + ":" + port +  "/" + endpoint
};
