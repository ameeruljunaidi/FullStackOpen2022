import axios from 'axios'
const basedUrl = '/api/users'

const getUser = async id => {
    const response = await axios.get(`${basedUrl}/${id}`)
    return response.data
}

export default { getUser }

