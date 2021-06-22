<template>
    <section id="resc">
        <a-row :gutter="[16,16]">
            <a-col :span="24">
                <a-table :bordered="true"
                         :data-source="structureLevelRescs"
                         :pagination="false"
                         :row-key="'id'"
                         :size="'middle'">
                    <a-table-column data-index="type">
                        <span slot="title">Type</span>
                        <span slot-scope="text, record" v-text="record.typeDisplay" />
                    </a-table-column>
                    <a-table-column data-index="identity">
                        <span slot="title">Identity</span>
                        <span slot-scope="text, record" v-text="text" />
                    </a-table-column>
                    <a-table-column data-index="display">
                        <span slot="title">Display</span>
                        <span slot-scope="text, record" :style="{ paddingLeft: (record.level - 1) * 24 + 'px', }">
                            <a-icon :type="record.icon" :style="{ marginRight: '10px', }" />
                            <span v-text="text" />
                        </span>
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
                 :title="'Create Resc'"
                 :visible="createModal.visible"
                 @ok="createCommit"
                 @cancel="createCancel">
            <a-form-model ref="createRef" :model="createModal.model" :rules="createModal.rules">
                <a-row :gutter="24" type="flex">
                    <a-col :span="12">
                        <a-form-model-item ref="parentId" label="ParentId" prop="parentId">
                            <a-select v-model="createModal.model.parentId" :allowClear="true" :defaultActiveFirstOption="false">
                                <a-select-option v-for="item in structureLevelRescs" :key="item.id" :value="item.id">
                                    <span :style="{ paddingLeft: (item.level - 1) * 24 + 'px', }">
                                        <a-icon :type="item.icon" :style="{ marginRight: '10px', }" />
                                        <span v-text="item.display" />
                                    </span>
                                </a-select-option>
                            </a-select>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-model-item ref="type" label="Type" prop="type">
                            <a-select v-model="createModal.model.type" :allowClear="true" :defaultActiveFirstOption="false">
                                <a-select-option v-for="item in types" :key="item.key" :value="item.key">
                                    <span v-text="item.value" />
                                </a-select-option>
                            </a-select>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-model-item ref="icon" label="Icon" prop="icon">
                            <a-select v-model="createModal.model.icon" :allowClear="true" :defaultActiveFirstOption="false">
                                <a-select-option v-for="item in icons" :key="item.key" :value="item.key">
                                    <a-icon :type="item.key" :style="{ marginRight: '10px', }" />
                                    <span v-text="item.value" />
                                </a-select-option>
                            </a-select>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-model-item ref="identity" label="Identity" prop="identity">
                            <a-input v-model="createModal.model.identity" @blur="() => { $refs.identity.onFieldBlur() }" />
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-model-item ref="display" label="Display" prop="display">
                            <a-input v-model="createModal.model.display" @blur="() => { $refs.display.onFieldBlur() }" />
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="12">
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
                 :title="'Update Resc'"
                 :visible="updateModal.visible"
                 @ok="updateCommit"
                 @cancel="updateCancel">
            <a-form-model ref="updateRef" :model="updateModal.model" :rules="updateModal.rules">
                <a-row :gutter="24" type="flex">
                    <a-col :span="12">
                        <a-form-model-item ref="parentId" label="ParentId" prop="parentId">
                            <a-select v-model="updateModal.model.parentId" :allowClear="true" :defaultActiveFirstOption="false">
                                <a-select-option v-for="item in structureLevelRescs" :key="item.id" :value="item.id">
                                    <span :style="{ paddingLeft: (item.level - 1) * 24 + 'px', }">
                                        <a-icon :type="item.icon" :style="{ marginRight: '10px', }" />
                                        <span v-text="item.display" />
                                    </span>
                                </a-select-option>
                            </a-select>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-model-item ref="type" label="Type" prop="type">
                            <a-select v-model="updateModal.model.type" :allowClear="true" :defaultActiveFirstOption="false">
                                <a-select-option v-for="item in types" :key="item.key" :value="item.key">
                                    <span v-text="item.value" />
                                </a-select-option>
                            </a-select>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-model-item ref="icon" label="Icon" prop="icon">
                            <a-select v-model="updateModal.model.icon" :allowClear="true" :defaultActiveFirstOption="false">
                                <a-select-option v-for="item in icons" :key="item.key" :value="item.key">
                                    <a-icon :type="item.key" :style="{ marginRight: '10px', }" />
                                    <span v-text="item.value" />
                                </a-select-option>
                            </a-select>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-model-item ref="identity" label="Identity" prop="identity">
                            <a-input v-model="updateModal.model.identity" @blur="() => { $refs.identity.onFieldBlur() }" />
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-model-item ref="display" label="Display" prop="display">
                            <a-input v-model="updateModal.model.display" @blur="() => { $refs.display.onFieldBlur() }" />
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="12">
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
        rescs,
        rescsBefore,
        rescsCreate,
        rescsSingle,
        rescsUpdate,
        structureLevelRescs,
    } from '../../plugins/request'

    export default {
        name: 'Resc',
        computed: {
            structureLevelRescs() {
                return structureLevelRescs(this.dataSourceRescs)
            }
        },
        data() {
            return {
                types: [],
                icons: [],
                roles: [],

                dataSourceRescs: [],

                createModal: {
                    errorMessage: '.',
                    confirmLoading: false,
                    model: {
                        type: null,
                        identity: '',
                        icon: '',
                        display: '',
                        available: true,
                        parentId: null,
                        roleIds: [],
                    },
                    rules: {
                        type: [
                            { required: true, message: 'required', trigger: 'blur', },
                        ],
                        icon: [
                            { required: true, message: 'required', trigger: 'blur', },
                        ],
                        identity: [
                            { required: true, message: 'required', trigger: 'blur', },
                        ],
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
                        type: null,
                        identity: '',
                        icon: '',
                        display: '',
                        available: true,
                        parentId: null,
                        roleIds: [],
                    },
                    rules: {
                        type: [
                            { required: true, message: 'required', trigger: 'blur', },
                        ],
                        icon: [
                            { required: true, message: 'required', trigger: 'blur', },
                        ],
                        identity: [
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
                rescs().then(response => {
                    this.dataSourceRescs = response.data
                })
            },
            before() {
                rescsBefore().then(response => {
                    let { types, icons, roles } = response.data
                    this.types = types
                    this.icons = icons
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
                        rescsCreate(this.createModal.model).then(response => {
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
                rescsSingle(id).then(response => {
                    this.updateModal.model = response.data
                    this.updateModal.visible = true
                })
            },
            updateCommit() {
                this.$refs.updateRef.validate(valid => {
                    if (valid) {
                        this.updateModal.confirmLoading = true
                        let id = this.updateModal.model.id
                        rescsUpdate(id, this.updateModal.model).then(response => {
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

<style>
    .ant-form-item-label {
        padding-bottom: unset;
        line-height: 32px;
    }

    .ant-form-item-control {
        line-height: 32px;
    }

    .ant-modal-header {
        border-bottom: unset;
        padding: 16px 24px 0 24px;
    }

    .ant-modal-footer {
        border-top: unset;
        padding: 0 24px 16px 24px;
    }

    .ant-select-selection-selected-value span {
        padding: unset !important;
    }
</style>