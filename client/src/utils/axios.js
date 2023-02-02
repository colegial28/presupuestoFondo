import axios from 'axios'


const baseURL = 'http://localhost:5000'

const inst = axios.create({
    baseURL,
    headers: {
        "Authorization": "Bearer " + localStorage.getItem('token')
    }
})


export default inst