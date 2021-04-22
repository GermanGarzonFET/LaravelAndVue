import axios from 'axios'
import { get } from 'jquery'
 
const state = {
    message: '',
    listUsers:[],
    errorMessage:[]
}
 
const actions = {
    getLogin({commit}, user){
        commit('SetMessage', "")
        commit('setErrors',"")
        axios.post('user/login', {
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
        }).catch((err)=>{

            if (err.response.data.errors) {
                commit('setErrors',err.response.data.errors)
            }
        })
    },
 
    getLogout(){
        localStorage.removeItem('blog_token');
        window.location.replace('login')
    },
    getList({commit}){
        axios.get('user/users')
        .then(response=>{
            commit('setUser', response.data.users)
        })
    },
    getCurrent(){
        axios.get('user/current')
        .then(response=>{
/*             commit('setUser', response.data.users) */
        console.log(response)
    })
    },

    async saveUser({commit}, user){
        const response = await axios.post('user/users/store',{
            name: user.name,
            email:user.email,
            password: user.password
        })
        console.log(response)
    }
}
const mutations = {
    SetMessage(state, data){
        state.message = data
    },
    setUser(state, data){
        state.listUsers= data
    },
    setErrors(state,data){
        state.errorMessage=data

    }
}
 
export default {
    namespaced: true,
    state, 
    actions, 
    mutations
}
