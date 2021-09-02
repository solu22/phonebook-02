/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'

const baseURL = '/api/persons'

const getAll = ()=> {
    const request = axios.get(baseURL)
    return request.then(response => response.data)
}

const create = (person) =>{
    const request = axios.post(baseURL, person)
    return request.then(response => response.data)
}

const remove = (id)=>{
    const request = axios.delete(`${baseURL}/${id}`)
    return request.then(response => response.data)
}

const update = (person)=>{
    const request = axios.put(`${baseURL}/${person.id}`,person)
    return request.then(response=> response.data)
}

export default { getAll, create, remove, update}


