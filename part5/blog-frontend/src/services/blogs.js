import axios from 'axios'
import userService from '../services/user'
import PropTypes from 'prop-types'
import { info } from '../utils/logger'

const baseUrl = '/api/blogs'

const getConfig = () => {
    const loggedUser = JSON.parse(window.localStorage.getItem('loggedBlogAppUser'))
    const bearerToken = `bearer ${loggedUser.token}`

    const config = {
        headers: { Authorization: bearerToken },
    }

    info(`config retrieved: ${config}`)
    return config
}

const getAll = async () => {
    const response = await axios.get(baseUrl)
    info('all blogs retrieved')
    return response.data
}

const create = async newBlog => {
    const response = await axios.post(baseUrl, newBlog, getConfig())
    info(`new blog create: ${response.data}`)
    return response.data
}

const update = async (id, newBlog) => {
    await axios.put(`${baseUrl}/${id}`, newBlog, getConfig())
    info('blog updated')
}

const remove = async id => {
    await axios.delete(`${baseUrl}/${id}`, getConfig())
    info('blog removed')
}

const shape = {
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.shape(userService.shape).isRequired
}

export default { getAll, create, remove, update, shape }
