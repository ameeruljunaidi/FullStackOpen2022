import axios from 'axios'
const baseUrl = '/api/blogs'

const getConfig = () => {
    const loggedUser = JSON.parse(window.localStorage.getItem('loggedBlogAppUser'))
    const bearerToken = `bearer ${loggedUser.token}`

    const config = {
        headers: { Authorization: bearerToken },
    }

    return config
}

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const create = async newBlog => {
    const response = await axios.post(baseUrl, newBlog, getConfig())
    return response.data
}

const update = async (id, newBlog) => {
    await axios.put(`${baseUrl}/${id}`, newBlog, getConfig())
}

const remove = async id => {
    await axios.delete(`${baseUrl}/${id}`, getConfig())
}

export default { getAll, create, remove, update }
