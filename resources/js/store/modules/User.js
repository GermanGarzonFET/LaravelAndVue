import axios from 'axios'
import { get } from 'jquery'
 
const state = {
    message: '',
    listUsers:[]
}
 
const actions = {
    getLogin({commit}, user){
        axios.post('http://localhost:8080/fet/ejemplo/public/api/user/login', {
            email: user.email,
            password: user.password
        })
        .then(response => {
            console.log(response)
            if(response.data.user){
                localStorage.setItem("blog_token", response.data.access_token)
                window.location.replace('home')
            } 
 
            if(response.data.message){
                commit('SetMessage', response.data.message)
            }
        })
    },
 
    getLogout(){
        localStorage.removeItem('blog_token');
        window.location.replace('login')
    },
    getList({commit}){
        axios.get('http://localhost:8080/fet/ejemplo/public/api/user/users')
        .then(response=>{
            commit('setUser', response.data.users)
        })
    },
    getCurrent(){
        axios.get('http://localhost:8080/fet/ejemplo/public/api/user/current')
        .then(response=>{
/*             commit('setUser', response.data.users) */
console.log(response)
    })
    }
}
const mutations = {
    SetMessage(state, data){
        state.message = data
    },
    setUser(state, data){
        state.listUsers= data
    }
}
 
export default {
    namespaced: true,
    state, 
    actions, 
    mutations
}
