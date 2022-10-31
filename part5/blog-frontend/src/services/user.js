import axios from 'axios'

const basedUrl = '/api/users'
import PropTypes from 'prop-types'

const getUser = async id => {
    const response = await axios.get(`${basedUrl}/${id}`)
    return response.data
}

const shape = {
    username: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
}

export default { getUser, shape }

