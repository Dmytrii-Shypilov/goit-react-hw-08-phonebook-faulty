import axios from "axios";

const setToken = (token) => {
    instance.defaults.headers.common.Authorization = `Bearer ${token}`
}

const unsetToken = (token) => {
    instance.defaults.headers.common.Authorization = ""
}

const instance = axios.create({
    baseURL: "https://connections-api.herokuapp.com"
})

export const fetchContacts = async () => {
    console.log( "fecth contacts",instance.defaults.headers.common.Authorization)
    const {data} = await instance.get("/contacts")
    console.log('conatacts', data)
    return data
}

export const addContact = async (data) => {
    
    const {data: result} = await instance.post("/contacts", data)
    return result
}

export const removeContact = async (id) => {
    await instance.delete(`contacts/${id}`)
    return id
}

export const logIn = async (user) => {
    console.log('fetch from fetch', user)
    const {data} = await instance.post('/users/login', user)
    setToken(data.token)
    return data
}

export const register = async (user) => {
    const {data} = await instance.post('/users/signup', user)
    setToken(data.token)
    return data
}

export const getCurrentUser = async (token) => {
    setToken(token)
    const {data} = await instance.get('/users/current')
    return data
}

export const toLogOut = async () => {
   const {data} = await instance.post('/users/logout')
   console.log(data)
   unsetToken()
   return data
}

export const contactsAPI = {
    removeContact,
    fetchContacts: fetchContacts,
    addContact
}

export const authAPI = {
    logIn: logIn,
    register: register,
    getCurrentUser: getCurrentUser,
    toLogOut: toLogOut,
}



