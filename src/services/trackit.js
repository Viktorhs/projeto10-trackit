import axios from "axios";

const BASE_URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit';


function createHeaders() {
    const auth = localStorage.getItem("trackit");
    const config = {
      headers: {
        Authorization: `Bearer ${auth.token}`
      }
    };
  
    return config;
  }


function postLogin(params) {
    const promise = axios.post(`${BASE_URL}/auth/login`, params);
    return promise;
}

function postRegister(params){
    const promise = axios.post(`${BASE_URL}/auth/sign-up`, params);
    return promise;
}

function postHabit(params){
    const config = createHeaders();
    const promise = axios.post(`${BASE_URL}/habits`, params, config);
    return promise;
}

function postMarkHabit(id){
    const config = createHeaders();
    const promise = axios.post(`${BASE_URL}/habits/${id}/check`, config);
    return promise;
}

function postMarkOffHabit(id){
    const config = createHeaders();
    const promise = axios.post(`${BASE_URL}/habits/${id}/uncheck`, config);
    return promise;
}

function getListHabits(){
    const config = createHeaders();
    const promise = axios.get(`${BASE_URL}/habits`, config);
    return promise;
}

function getSerchHabits(){
    const config = createHeaders();
    const promise = axios.get(`${BASE_URL}/habits/today`, config);
    return promise;
}

function getHistoricHAbits(){
    const config = createHeaders();
    const promise = axios.get(`${BASE_URL}/habits/history/daily`, config);
    return promise;
}

function deleteHabit(id){
    const config = createHeaders();
    const promise = axios.delete(`${BASE_URL}/habits/${id}`, config);
    return promise
}

export {
    postLogin, 
    postRegister, 
    postHabit, 
    postMarkHabit, 
    postMarkOffHabit,
    getListHabits,
    getSerchHabits,
    getHistoricHAbits,
    deleteHabit,
};