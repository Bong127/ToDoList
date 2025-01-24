import api from './api'

export const getList = (page=1) => api.get(`/todos?page=${page}`)

export const insert = (data) => api.post(`/todos`, data,{
  headers: {
    'Content-Type': 'application/json'
  }
});

export const update = (data) => api.put(`/todos`, data,{
  headers: {
    'Content-Type': 'application/json'
  }
});

export const remove = (id) => api.delete(`/todos/${id}`)
