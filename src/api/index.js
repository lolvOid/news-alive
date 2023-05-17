import axios from 'axios'
import store from '../store'

export const api = axios.create()
api.interceptors.request.use(
  (config) => {
    store.dispatch('setLoading', true)
    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => {
    store.dispatch('setLoading', false)
    return response
  },
  (error) => {
    const errorMap = {
      400: 'Bad Request',
      401: 'Unauthorized',
      403: 'Forbidden',
      404: 'Not Found',
      500: 'Internal Server Error',
    }
    store.dispatch('setLoading', false)

    if (error.response) {
      store.dispatch('setError', error.response.data.message)
    } else {
      store.dispatch('setError', error.message)
    }

    return Promise.reject(error)
  }
)
