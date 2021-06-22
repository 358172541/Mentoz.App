import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let store = new Vuex.Store({
    state: {
        includes: '',
        activeKey: localStorage.getItem('activeKey') ? localStorage.getItem('activeKey') : '',
        openTabs: localStorage.getItem('openTabs') ? JSON.parse(localStorage.getItem('openTabs')) : [],
        openKeys: localStorage.getItem('openKeys') ? JSON.parse(localStorage.getItem('openKeys')) : [],
        selectedKeys: localStorage.getItem('selectedKeys') ? JSON.parse(localStorage.getItem('selectedKeys')) : [],

        BUILTIN: [
            {
                id: '11111111-1111-1111-1111-111111111111',
                type: 0,
                identity: 'Dashboard',
                icon: 'dashboard',
                display: 'Dashboard',
                parentId: null
            }
        ],

        TOKEN: localStorage.getItem('TOKEN'),
        TOKEN_EXPIRE_TIME: localStorage.getItem('TOKEN_EXPIRE_TIME'),
        TOKEN_REFRESH_EXPIRE_TIME: localStorage.getItem('TOKEN_REFRESH_EXPIRE_TIME'),
        PROFILE: localStorage.getItem('PROFILE') ? JSON.parse(localStorage.getItem('PROFILE')) : {},
        RESOURCE: localStorage.getItem('RESOURCE') ? JSON.parse(localStorage.getItem('RESOURCE')) : []
    },
    mutations: {
        includes(state, value) {
            state.includes = value
        },
        activeKey(state, value) {
            state.activeKey = value
            localStorage.setItem('activeKey', state.activeKey)
        },
        openTabs(state, value) {
            state.openTabs = value
            localStorage.setItem('openTabs', JSON.stringify(state.openTabs))
        },
        openKeys(state, value) {
            state.openKeys = value
            localStorage.setItem('openKeys', JSON.stringify(state.openKeys))
        },
        selectedKeys(state, value) {
            state.selectedKeys = value
            localStorage.setItem('selectedKeys', JSON.stringify(state.selectedKeys))
        },

        TOKEN(state, value) {
            state.TOKEN = value
            localStorage.setItem('TOKEN', state.TOKEN)
        },
        TOKEN_EXPIRE_TIME(state, value) {
            state.TOKEN_EXPIRE_TIME = value
            localStorage.setItem('TOKEN_EXPIRE_TIME', state.TOKEN_EXPIRE_TIME)
        },
        TOKEN_REFRESH_EXPIRE_TIME(state, value) {
            state.TOKEN_REFRESH_EXPIRE_TIME = value
            localStorage.setItem('TOKEN_REFRESH_EXPIRE_TIME', state.TOKEN_REFRESH_EXPIRE_TIME)
        },
        PROFILE(state, value) {
            state.PROFILE = value
            localStorage.setItem('PROFILE', JSON.stringify(state.PROFILE))
        },
        RESOURCE(state, value) {
            let dashboard = state.BUILTIN.find(x => x.identity === 'Dashboard')
            state.RESOURCE = [dashboard].concat(value)
            localStorage.setItem('RESOURCE', JSON.stringify(state.RESOURCE))
        },
        SIGNOUT(state) {
            state.TOKEN = null
            localStorage.removeItem('TOKEN')
            state.TOKEN_EXPIRE_TIME = null
            localStorage.removeItem('TOKEN_EXPIRE_TIME')
            state.TOKEN_REFRESH_EXPIRE_TIME = null
            localStorage.removeItem('TOKEN_REFRESH_EXPIRE_TIME')
        }
    }
})

export default store