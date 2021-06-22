<template>
    <a-layout id="login">
        <a-layout-content>
            <a-form-model ref="loginRef" :model="loginModal.model" :rules="loginModal.rules">
                <a-row :gutter="24">
                    <a-col :span="24">
                        <a-form-model-item>
                            <h1>LOGIN</h1>
                            <span>LOGIN DESCRIPTION</span>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="24">
                        <a-form-model-item prop="account">
                            <a-input placeholder="please enter your account" v-model="loginModal.model.account">
                                <a-icon slot="prefix" type="form" style="color:rgba(0,0,0,.45)" />
                            </a-input>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="24">
                        <a-form-model-item prop="password">
                            <a-input-password placeholder="please enter your password" v-model="loginModal.model.password">
                                <a-icon slot="prefix" type="form" style="color:rgba(0,0,0,.45)" />
                            </a-input-password>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="24">
                        <a-row :gutter="24">
                            <a-col :span="24">
                                <a-checkbox v-model="loginModal.model.remember" style="padding-top:1px;margin-bottom:26px">
                                    Remember
                                </a-checkbox>
                            </a-col>
                        </a-row>
                    </a-col>
                    <a-col :span="24">
                        <a-form-model-item>
                            <a-button block type="primary" :loading="loginModal.confirmLoading" @click="loginCommit">LOGIN</a-button>
                        </a-form-model-item>
                    </a-col>
                </a-row>
            </a-form-model>
        </a-layout-content>
    </a-layout>
</template>

<script>
    import { authsToken, authsProfile, authsResource } from '../plugins/request'
    export default {
        name: 'Login',
        data() {
            return {
                loginModal: {
                    confirmLoading: false,
                    model: {
                        account: '',
                        password: '',
                        remember: false,
                    },
                    rules: {
                        account: [
                            { required: true, message: 'required', trigger: 'blur', },
                        ],
                        password: [
                            { required: true, message: 'required', trigger: 'blur', },
                        ],
                    },
                },
            }
        },
        methods: {
            loginCommit() {
                this.$refs.loginRef.validate(valid => {
                    if (valid) {
                        this.loginModal.confirmLoading = true
                        authsToken(this.loginModal.model).then(_ => {
                            this.$store.commit('TOKEN', _.data.token)
                            this.$store.commit('TOKEN_EXPIRE_TIME', _.data.tokenExpireTime)
                            this.$store.commit('TOKEN_REFRESH_EXPIRE_TIME', _.data.tokenRefreshExpireTime)
                        }).then(_ => {
                            authsProfile().then(_ => {
                                this.$store.commit('PROFILE', _.data)
                            })
                            authsResource().then(_ => {
                                this.$store.commit('RESOURCE', _.data)
                            })
                        }).then(_ => {
                            this.$router.push({ name: 'Main' })
                        }).catch(_ => {
                            this.loginModal.confirmLoading = false
                            this.loginModal.model.password = ''
                        })
                    }
                })
            }
        },
    }
</script>

<style>
    #login .ant-layout-content {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #login .ant-form {
        width: 375px;
        padding: 24px;
    }
</style>