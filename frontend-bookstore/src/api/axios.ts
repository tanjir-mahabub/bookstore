import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:4000/books'
})

export const getBooksPage =  async(pageParam = 1, options={}) => {
    const response = await api.get(`/books?page=${pageParam}`, options)
    return response;
}