import axios from 'axios'

const Http = axios.create({
  headers: { 'Access-Control-Allow-Origin': '*' }
})

export { Http }
