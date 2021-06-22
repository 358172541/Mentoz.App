import axios from 'axios'
import router from './router'
import store from './store'

// axios.defaults.baseURL = 'http://localhost:5000' // process.env.WEB_API_BASE_URL,
axios.defaults.timeout = 30000

let refreshing = false
let refreshingInvocation = null
let refresh = callback => {
    if (refreshing) {
        refreshingInvocation = refreshingInvocation.then(callback)
        return refreshingInvocation
    }
    refreshing = true
    return Promise.resolve(
        axios.put('/api/auths/token/refresh', {
            token: store.state.TOKEN,
            tokenExpireTime: store.state.TOKEN_EXPIRE_TIME,
            tokenRefreshExpireTime: store.state.TOKEN_REFRESH_EXPIRE_TIME
        }).then(response => {
            let { token, tokenExpireTime, tokenRefreshExpireTime } = response.data
            store.commit('TOKEN', token)
            store.commit('TOKEN_EXPIRE_TIME', tokenExpireTime)
            store.commit('TOKEN_REFRESH_EXPIRE_TIME', tokenRefreshExpireTime)
            refreshing = false
            refreshingInvocation = null
        }).then(callback)
    )
}

axios.interceptors.request.use(config => {
    if (store.state.TOKEN)
        config.headers['Authorization'] = 'Bearer' + ' ' + store.state.TOKEN
    return config
}, error => {
    return Promise.reject(error)
})

axios.interceptors.response.use(response => {
    return response
}, error => {
    if (error && error.response) {
        switch (error.response.status) {
            case 400:
                // if (error.response.headers['x-validation']) 
                break
            case 401:
                if (error.response.headers['x-token']) {
                    store.commit('SIGNOUT')
                    router.push({ name: 'Login' })
                    refreshing = false
                    refreshingInvocation = null
                } else {
                    return refresh(_ => axios.request(error.config))
                }
                break
            default:
                window.alert(error.response.status)
        }
    }
    return Promise.reject(error)
})

export function sample() {
    return axios({
        url: '/api/sample',
        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    })
}
/*
export function filesDownload() {
    return axios({
        url: '/api/files/download',
        method: 'get',
        responseType: 'blob'
    })
}
*/
export function authsToken(params) {
    return axios({
        url: '/api/auths/token',
        method: 'post',
        data: params
    })
}
export function authsProfile() {
    return axios({
        url: '/api/auths/profile',
        method: 'get'
    })
}
export function authsResource() {
    return axios({
        url: '/api/auths/resource',
        method: 'get'
    })
}

export function rescs() {
    return axios({
        url: '/api/rescs',
        method: 'get'
    })
}
export function rescsSingle(id) {
    return axios({
        url: '/api/rescs/' + id,
        method: 'get'
    })
}
export function rescsBefore() {
    return axios({
        url: '/api/rescs/before',
        method: 'get'
    })
}
export function rescsCreate(params) {
    return axios({
        url: '/api/rescs',
        method: 'post',
        data: params
    })
}
export function rescsUpdate(id, params) {
    return axios({
        url: '/api/rescs/' + id,
        method: 'put',
        data: params
    })
}
export function rescsDelete(id) {
    return axios({
        url: '/api/rescs/' + id,
        method: 'delete'
    })
}

export function structureLevelRescs(data) {
    let func = (structure, source, value = null, level = 0) => {
        level++
        let items = source.filter(x => x.parentId === value)
        for (let i in items) {
            let item = items[i]
            item.level = level
            structure.push(item)
            func(structure, source, item.id, level)
        }
    }
    let structure = []
    func(structure, JSON.parse(JSON.stringify(data)), null)
    return structure
}
export function structureLevelTypeRescs(data) {
    let func = (structure, source, value = null, level = 0) => {
        level++
        let items = source.filter(x => x.parentId === value && x.type === 0)
        for (let i in items) {
            let item = items[i]
            item.level = level
            let opers = source.filter(x => x.parentId === item.id && x.type === 1) // children func
            if (opers.length > 0)
                item.opers = opers
            structure.push(item)
            func(structure, source, item.id, level)
        }
    }
    let structure = []
    func(structure, JSON.parse(JSON.stringify(data)), null)
    return structure
}

export function roles() {
    return axios({
        url: '/api/roles',
        method: 'get'
    })
}
export function rolesSingle(id) {
    return axios({
        url: '/api/roles/' + id,
        method: 'get'
    })
}
export function rolesBefore() {
    return axios({
        url: '/api/roles/before',
        method: 'get'
    })
}
export function rolesCreate(params) {
    return axios({
        url: '/api/roles',
        method: 'post',
        data: params
    })
}
export function rolesUpdate(id, params) {
    return axios({
        url: '/api/roles/' + id,
        method: 'put',
        data: params
    })
}
export function rolesDelete(id) {
    return axios({
        url: '/api/roles/' + id,
        method: 'delete'
    })
}

export function users() {
    return axios({
        url: '/api/users',
        method: 'get'
    })
}
export function usersSingle(id) {
    return axios({
        url: '/api/users/' + id,
        method: 'get'
    })
}
export function usersBefore() {
    return axios({
        url: '/api/users/before',
        method: 'get'
    })
}
export function usersCreate(params) {
    return axios({
        url: '/api/users',
        method: 'post',
        data: params
    })
}
export function usersUpdate(id, params) {
    return axios({
        url: '/api/users/' + id,
        method: 'put',
        data: params
    })
}
export function usersDelete(id) {
    return axios({
        url: '/api/users/' + id,
        method: 'delete'
    })
}