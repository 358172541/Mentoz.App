<template>
    <section id="role">
        <a-row :gutter="[16,16]">
            <a-col :span="24">
                <a-table :bordered="true"
                         :data-source="dataSourceRoles"
                         :pagination="false"
                         :row-key="'id'"
                         :size="'middle'">
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
                 :title="'Create Role'"
                 :visible="createModal.visible"
                 @ok="createCommit"
                 @cancel="createCancel">
            <a-form-model ref="createRef" :model="createModal.model" :rules="createModal.rules">
                <a-row :gutter="24" type="flex">
                    <a-col :span="12">
                        <a-form-model-item ref="display" label="Display" prop="display">
                            <a-input v-model="createModal.model.display" @blur="() => { $refs.display.onFieldBlur() }" />
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-model-item ref="available" label="Available" prop="available">
                            <a-switch v-model="createModal.model.available" />
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="24">
                        <a-form-model-item ref="rescIds" label="RescIds" prop="rescIds">
                            <a-checkbox-group v-model="createModal.model.rescIds" style="width:100%">
                                <a-row :gutter="24" type="flex" v-for="item in structureLevelTypeRescs" :key="item.id">
                                    <a-col :span="6">
                                        <a-checkbox :value="item.id" :style="{ marginLeft: (item.level - 1) * 24 + 'px', }">
                                            <span v-text="item.display" />
                                        </a-checkbox>
                                    </a-col>
                                    <a-col :span="18">
                                        <a-row :gutter="24" type="flex">
                                            <a-col :span="8" v-if="item.opers" v-for="oper in item.opers" :key="oper.id">
                                                <a-checkbox :value="oper.id">
                                                    <span v-text="oper.display" />
                                                </a-checkbox>
                                            </a-col>
                                        </a-row>
                                    </a-col>
                                </a-row>
                            </a-checkbox-group>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="24">
                        <a-form-model-item ref="userIds" label="UserIds" prop="userIds">
                            <a-checkbox-group v-model="createModal.model.userIds" style="width:100%">
                                <a-row :gutter="24" type="flex">
                                    <a-col :span="6" v-for="item in users" :key="item.id">
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
                 :title="'Update Role'"
                 :visible="updateModal.visible"
                 @ok="updateCommit"
                 @cancel="updateCancel">
            <a-form-model ref="updateRef" :model="updateModal.model" :rules="updateModal.rules">
                <a-row :gutter="24" type="flex">
                    <a-col :span="12">
                        <a-form-model-item ref="display" label="Display" prop="display">
                            <a-input v-model="updateModal.model.display" @blur="() => { $refs.display.onFieldBlur() }" />
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-model-item ref="available" label="Available" prop="available">
                            <a-switch v-model="updateModal.model.available" />
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="24">
                        <a-form-model-item ref="rescIds" label="RescIds" prop="rescIds">
                            <a-checkbox-group v-model="createModal.model.rescIds" style="width:100%">
                                <a-row :gutter="24" type="flex" v-for="item in structureLevelTypeRescs" :key="item.id">
                                    <a-col :span="6">
                                        <a-checkbox :value="item.id" :style="{ marginLeft: (item.level - 1) * 24 + 'px', }">
                                            <span v-text="item.display" />
                                        </a-checkbox>
                                    </a-col>
                                    <a-col :span="18">
                                        <a-row :gutter="24" type="flex">
                                            <a-col :span="8" v-if="item.opers" v-for="oper in item.opers" :key="oper.id">
                                                <a-checkbox :value="oper.id">
                                                    <span v-text="oper.display" />
                                                </a-checkbox>
                                            </a-col>
                                        </a-row>
                                    </a-col>
                                </a-row>
                            </a-checkbox-group>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="24">
                        <a-form-model-item ref="userIds" label="UserIds" prop="userIds">
                            <a-checkbox-group v-model="updateModal.model.userIds" style="width:100%">
                                <a-row :gutter="24" type="flex">
                                    <a-col :span="6" v-for="item in users" :key="item.id">
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
        roles,
        rolesBefore,
        rolesCreate,
        rolesSingle,
        rolesUpdate,
        structureLevelTypeRescs,
    } from '../../plugins/request'

    export default {
        name: 'Role',
        computed: {
            structureLevelTypeRescs() {
                return structureLevelTypeRescs(this.rescs)
            },
        },
        data() {
            return {
                rescs: [],
                users: [],

                dataSourceRoles: [],
                
                createModal: {
                    errorMessage: '.',
                    confirmLoading: false,
                    model: {
                        display: '',
                        available: true,
                        rescIds: [],
                        userIds: [],
                    },
                    rules: {
                        display: [
                            { required: true, message: 'required', trigger: 'blur', },
                        ],
                    },
                    visible: false,
                },
                updateModal: {
                    errorMessage: '.',
                    confirmLoading: false,
                    model: {
                        id: '',
                        display: '',
                        available: true,
                        rescIds: [],
                        userIds: [],
                    },
                    rules: {
                        display: [
                            { required: true, message: 'required', trigger: 'blur', },
                        ],
                    },
                    visible: false,
                }
            }
        },
        methods: {
            search() {
                roles().then(response => {
                    this.dataSourceRoles = response.data
                })
            },
            before() {
                rolesBefore().then(response => {
                    let { rescs, users } = response.data
                    this.rescs = rescs
                    this.users = users
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
                        rolesCreate(this.createModal.model).then(response => {
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
                rolesSingle(id).then(response => {
                    this.updateModal.model = response.data
                    this.updateModal.visible = true
                })
            },
            updateCommit() {
                this.$refs.updateRef.validate(valid => {
                    if (valid) {
                        this.updateModal.confirmLoading = true
                        let id = this.updateModal.model.id
                        rolesUpdate(id, this.updateModal.model).then(response => {
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