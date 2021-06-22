<template>
    <section id="user">
        <!--
        <a-row :gutter="[16,16]">
            <a-col :span="24">
                <a-row :gutter="[16,16]" type="flex" justify="start">
                    <a-col :xs="24" :md="12" :lg="6" :xl="4">
                        <a-input v-model="name"></a-input>
                    </a-col>
                    <a-col :xs="24" :md="12" :lg="6" :xl="4">
                        <a-input v-model="name"></a-input>
                    </a-col>
                    <a-col :xs="24" :md="12" :lg="6" :xl="4">
                        <a-input v-model="name"></a-input>
                    </a-col>
                    <a-col :xs="24" :md="12" :lg="6" :xl="4">
                        <a-input v-model="name"></a-input>
                    </a-col>
                    <a-col :xs="24" :md="12" :lg="6" :xl="4">
                        <a-input v-model="name"></a-input>
                    </a-col>
                    <a-col :xs="12" :md="6" :lg="3" :xl="2">
                        <a-button block type="primary">
                            Search
                        </a-button>
                    </a-col>
                    <a-col :xs="12" :md="6" :lg="3" :xl="2">
                        <a-button block type="primary">
                            Cancel
                        </a-button>
                    </a-col>
                </a-row>
            </a-col>
        </a-row>
        -->
        <!--
        <a-row :gutter="[16,16]">
            <a-col :span="24">
                <a-row :gutter="[16,16]" type="flex" justify="end">
                    <a-col :xs="12" :md="6" :lg="3" :xl="2">
                        <a-button block type="primary">Refresh</a-button>
                    </a-col>
                    <a-col :xs="12" :md="6" :lg="3" :xl="2">
                        <a-button block type="primary">Create</a-button>
                    </a-col>
                    <a-col :xs="12" :md="6" :lg="3" :xl="2">
                        <a-button block type="primary">Import</a-button>
                    </a-col>
                    <a-col :xs="12" :md="6" :lg="3" :xl="2">
                        <a-button block type="primary">Export</a-button>
                    </a-col>
                </a-row>
            </a-col>
        </a-row>
        -->
        <a-row :gutter="[16,16]">
            <a-col :span="24">
                <a-table :bordered="true"
                         :data-source="dataSourceUsers"
                         :pagination="false"
                         :row-key="'id'"
                         :size="'middle'">
                    <a-table-column data-index="account">
                        <span slot="title">Account</span>
                        <span slot-scope="text, record" v-text="text" />
                    </a-table-column>
                    <a-table-column data-index="display">
                        <span slot="title">Display</span>
                        <span slot-scope="text, record" v-text="text" />
                    </a-table-column>
                    <a-table-column data-index="available">
                        <span slot="title">Available</span>
                        <span slot-scope="text, record" v-text="record.availableDisplay" />
                    </a-table-column>
                    <a-table-column>
                        <a-button-group slot="title">
                            <a-button type="link" size="small" @click="create">Create</a-button>
                        </a-button-group>
                        <a-button-group slot-scope="text, record">
                            <a-button type="link" size="small" @click="update(record.id)">Update</a-button>
                            <a-button type="link" size="small" @click="remove(record.id)">Remove</a-button>
                        </a-button-group>
                    </a-table-column>
                </a-table>
            </a-col>
        </a-row>

        <a-modal :bodyStyle="{ padding: '16px 24px', }"
                 :cancel-button-props="{ props: { type: 'default', }, }"
                 :cancelText="'CANCEL'"
                 :centered="true"
                 :closable="false"
                 :confirm-loading="createModal.confirmLoading"
                 :maskClosable="false"
                 :okText="'COMMIT'"
                 :ok-button-props="{ props: { type: 'primary', }, }"
                 :title="'Create User'"
                 :visible="createModal.visible"
                 @ok="createCommit"
                 @cancel="createCancel">
            <a-form-model ref="createRef" :model="createModal.model" :rules="createModal.rules">
                <a-row :gutter="24" type="flex">
                    <a-col :span="8">
                        <a-form-model-item ref="account" label="Account" prop="account">
                            <a-input v-model="createModal.model.account" @blur="() => { $refs.account.onFieldBlur() }" />
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-model-item ref="display" label="Display" prop="display">
                            <a-input v-model="createModal.model.display" @blur="() => { $refs.display.onFieldBlur() }" />
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-model-item ref="available" label="Available" prop="available">
                            <a-switch default-checked v-model="createModal.model.available" />
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="24">
                        <a-form-model-item ref="roleIds" label="RoleIds" prop="roleIds">
                            <a-checkbox-group v-model="createModal.model.roleIds" style="width:100%">
                                <a-row :gutter="24" type="flex">
                                    <a-col :span="6" v-for="item in roles" :key="item.id">
                                        <a-checkbox :value="item.id">
                                            <span v-text="item.display" />
                                        </a-checkbox>
                                    </a-col>
                                </a-row>
                            </a-checkbox-group>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="24" style="color:#F5222D" v-text="createModal.errorMessage" />
                </a-row>
            </a-form-model>
        </a-modal>

        <a-modal :bodyStyle="{ padding: '16px 24px', }"
                 :cancel-button-props="{ props: { type: 'default', }, }"
                 :cancelText="'CANCEL'"
                 :centered="true"
                 :closable="false"
                 :confirm-loading="updateModal.confirmLoading"
                 :maskClosable="false"
                 :okText="'COMMIT'"
                 :ok-button-props="{ props: { type: 'primary', }, }"
                 :title="'Update User'"
                 :visible="updateModal.visible"
                 @ok="updateCommit"
                 @cancel="updateCancel">
            <a-form-model ref="updateRef" :model="updateModal.model" :rules="updateModal.rules">
                <a-row :gutter="24" type="flex">
                    <a-col :span="8">
                        <a-form-model-item ref="account" label="Account" prop="account">
                            <a-input v-model="updateModal.model.account" @blur="() => { $refs.account.onFieldBlur() }" />
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-model-item ref="display" label="Display" prop="display">
                            <a-input v-model="updateModal.model.display" @blur="() => { $refs.display.onFieldBlur() }" />
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-model-item ref="available" label="Available" prop="available">
                            <a-switch default-checked v-model="updateModal.model.available" />
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="24">
                        <a-form-model-item ref="roleIds" label="RoleIds" prop="roleIds">
                            <a-checkbox-group v-model="updateModal.model.roleIds" style="width:100%">
                                <a-row :gutter="24" type="flex">
                                    <a-col :span="6" v-for="item in roles" :key="item.id">
                                        <a-checkbox :value="item.id">
                                            <span v-text="item.display" />
                                        </a-checkbox>
                                    </a-col>
                                </a-row>
                            </a-checkbox-group>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="24" style="color:#F5222D" v-text="updateModal.errorMessage" />
                </a-row>
            </a-form-model>
        </a-modal>
    </section>
</template>

<script>
    import {
        users,
        usersBefore,
        usersCreate,
        usersSingle,
        usersUpdate,
    } from '../../plugins/request'

    export default {
        name: 'User',
        data() {
            return {
                roles: [],

                dataSourceUsers: [],

                createModal: {
                    errorMessage: '.',
                    confirmLoading: false,
                    model: {
                        account: '',
                        display: '',
                        available: true,
                        roleIds: [],
                    },
                    rules: {
                        account: [
                            { required: true, trigger: 'blur', message: 'required', },
                        ],
                        display: [
                            { required: true, trigger: 'blur', message: 'required', },
                        ],
                    },
                    visible: false,
                },
                updateModal: {
                    errorMessage: '.',
                    confirmLoading: false,
                    model: {
                        id: '',
                        account: '',
                        display: '',
                        available: true,
                        roleIds: [],
                    },
                    rules: {
                        account: [
                            { required: true, message: 'required', trigger: 'blur', },
                        ],
                        display: [
                            { required: true, message: 'required', trigger: 'blur', },
                        ],
                    },
                    visible: false,
                },
            }
        },
        methods: {
            search() {
                users().then(response => {
                    this.dataSourceUsers = response.data
                })
            },
            before() {
                usersBefore().then(response => {
                    let { roles } = response.data
                    this.roles = roles
                })
            },
            create() {
                this.before()
                this.createModal.visible = true
            },
            createCommit() {
                this.$refs.createRef.validate(valid => {
                    if (valid) {
                        this.createModal.confirmLoading = true
                        usersCreate(this.createModal.model).then(response => {
                            console.log(response)
                            this.search()
                            this.createModal.visible = false
                            this.createModal.errorMessage = '.'
                            this.createModal.confirmLoading = false
                            this.$refs.createRef.resetFields()
                        }).catch(error => {
                            this.createModal.errorMessage = error.response.data
                            this.createModal.confirmLoading = false
                        })
                    }
                })
            },
            createCancel() {
                this.$refs.createRef.resetFields()
                this.createModal.visible = false
                this.createModal.errorMessage = '.'
            },
            update(id) {
                this.before()
                usersSingle(id).then(response => {
                    this.updateModal.model = response.data
                    this.updateModal.visible = true
                })
            },
            updateCommit() {
                this.$refs.updateRef.validate(valid => {
                    if (valid) {
                        this.updateModal.confirmLoading = true
                        let id = this.updateModal.model.id
                        usersUpdate(id, this.updateModal.model).then(response => {
                            console.log(response)
                            this.search()
                            this.updateModal.visible = false
                            this.updateModal.errorMessage = '.'
                            this.updateModal.confirmLoading = false
                            this.$refs.updateRef.resetFields()
                        }).catch(error => {
                            this.updateModal.errorMessage = error.response.data
                            this.updateModal.confirmLoading = false
                        })
                    }
                })
            },
            updateCancel() {
                this.$refs.updateRef.resetFields()
                this.updateModal.visible = false
                this.updateModal.errorMessage = '.'
            },
            remove(id) {
                console.log(id)
            },
        },
        created() {
            this.search()
        },
    }
</script>