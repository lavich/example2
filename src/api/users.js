import { Http } from './http'

const url = '/api/users'

export default {
  get (data) {
    return Http
      .get(url, { params: data })
      .then(response => response.data)
      .catch(error => error)
  },
  post (formData) {
    return Http
      .post(url, formData)
      .then(response => response.data)
      .catch(error => error)
  },
  put (formData) {
    return Http
      .put(url + '/' + formData.id, formData)
      .then(response => response.data)
      .catch(error => error)
  },
  delete (id) {
    return Http
      .delete(url + '/' + id)
      .then(response => response.data)
      .catch(error => error)
  }
}
