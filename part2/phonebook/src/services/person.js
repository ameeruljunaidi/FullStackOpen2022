import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/phonebook'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newPerson => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(response => response.data)
}

const update = (id, newPerson) => {
    const request = axios.put(`${baseUrl}/${id}`, newPerson)
    return request.then(response => response.data)
}

const remove = personId => axios.delete(`${baseUrl}/${personId}`)

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, remove, update }
