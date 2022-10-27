import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = async newBlog => {
    const loggedUser = JSON.parse(window.localStorage.getItem('loggedBlogAppUser'))
    const bearerToken = `bearer ${loggedUser.token}`

    const config = {
        headers: { Authorization: bearerToken },
    }

    const response = await axios.post(baseUrl, newBlog, config)
    return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create }
