<template>
    <a-layout id="main">
        <a-layout-sider v-if="show" theme="light" class="border-end">
            <a-menu v-if="visible" mode="inline" theme="light" class="border-top border-end-0"
                    :defaultOpenKeys="$store.state.openKeys" :defaultSelectedKeys="$store.state.selectedKeys" @select="select">
                <template v-for="item in menus">
                    <SubMenu v-if="item.children" :item="item" />
                    <a-menu-item v-else :key="item.id">
                        <a-icon :type="item.icon" />
                        <span v-text="item.display" />
                    </a-menu-item>
                </template>
            </a-menu>
        </a-layout-sider>
        <a-layout-content>
            <!--a-layout-header-->
            <a-tabs hide-add type="editable-card" v-model="$store.state.activeKey" class="border-top"
                    @edit="(key, action) => this[action](key)" @change="change">
                <a-tab-pane v-for="item in $store.state.openTabs" :key="item.id" :closable="item.identity!=='Dashboard'">
                    <span slot="tab" @contextmenu.prevent="refresh(item.id)">
                        <a-icon type="form" />
                        <span v-text="item.display" />
                    </span>
                    <keep-alive :include="$store.state.includes">
                        <component :is="item.identity" v-if="available" />
                    </keep-alive>
                </a-tab-pane>
                <div slot="tabBarExtraContent" :style="{ background: 'transparent', paddingRight: '16px', }">
                    <a-dropdown placement="bottomRight" :trigger="['click']">
                        <a-badge dot>
                            <a-avatar :style="{ marginTop: '-2px', }">Mentoz</a-avatar>
                        </a-badge>
                    </a-dropdown>
                </div>
            </a-tabs>
            <!--a-layout-footer-->
        </a-layout-content>
        <a-button shape="circle" type="primary" @click="fullscreen" :icon="'menu'"
                  :style="{  position: 'fixed', bottom: '4px', paddingLeft:'5px', left: '-17px', zIndex: 2, }" />
    </a-layout>
</template>
<script>
    import screenfull from 'screenfull'
    import SubMenu from '../components/SubMenu'
    import Dashboard from './_/Dashboard'
    import Resc from './_/Resc'
    import Role from './_/Role'
    import User from './_/User'
    export default {
        components: {
            SubMenu,
            Dashboard,
            Resc,
            Role,
            User
        },
        computed: {
            menus() {
                let func = (structure, source, value = null) => {
                    let items = source.filter(x => {
                        let children = source.filter(xx => x.id === xx.parentId)
                        if (children.length > 0)
                            x.children = children
                        return x.parentId === value
                    })
                    for (let i in items)
                        structure.push(items[i])
                }
                let structure = []
                func(structure, JSON.parse(JSON.stringify(this.$store.state.RESOURCE)).filter(x => x.type === 0), null) // (arr || []).filter()
                return structure
            }
        },
        data() {
            return {
                show: true,
                visible: true,
                available: true
            }
        },
        methods: {
            change(changeKey) {
                let openKeys = []
                let recursive = key => {
                    let item = this.$store.state.RESOURCE.find(x => x.id === key)
                    if (item)
                        openKeys.push(key)
                    else
                        return false
                    if (item.parentId === null)
                        return false
                    recursive(item.parentId)
                }
                recursive(changeKey)
                let selectedKeys = []
                if (changeKey !== '')
                    selectedKeys.push(changeKey)
                this.$store.commit('activeKey', changeKey)
                this.$store.commit('openKeys', openKeys)
                this.$store.commit('selectedKeys', selectedKeys)
                this.visible = false
                this.$nextTick(() => this.visible = true)
            },
            remove(removeKey) {
                let index
                this.$store.state.openTabs.forEach((x, i) => {
                    if (x.id === removeKey)
                        index = i - 1
                })
                let openTabs = this.$store.state.openTabs.filter(x => x.id !== removeKey)
                let activeKey = this.$store.state.activeKey
                if (openTabs.length) {
                    if (activeKey === removeKey) {
                        if (index >= 0)
                            activeKey = openTabs[index].id
                        else
                            activeKey = openTabs[0].id
                    }
                }
                else {
                    activeKey = ''
                }
                this.$store.commit('openTabs', openTabs)
                this.$store.commit('activeKey', activeKey)
                this.change(activeKey)
            },
            select(item) {
                let openTabs = this.$store.state.openTabs
                if (openTabs.findIndex(x => x.id === item.key) < 0) {
                    openTabs.push(this.$store.state.RESOURCE.find(x => x.id === item.key))
                    this.$store.commit('openTabs', openTabs)
                }
                this.$store.commit('activeKey', item.key)
                this.change(item.key)
            },
            refresh(selectKey) {
                this.available = false
                this.$store.commit('includes', this.$store.state.openTabs.filter(x => x.id != selectKey).map(x => x.identity).join(','))
                this.$nextTick(() => {
                    this.available = true
                    this.$store.commit('includes', this.$store.state.openTabs.map(x => x.identity).join(','))
                })
            },
            /*
            profile() {
                let item = this.$store.state.BUILTIN.find(x => x.identity === 'Profile')
                let openTabs = this.$store.state.openTabs
                openTabs.push(item)
                this.$store.commit('openTabs', openTabs)
                this.$store.commit('activeKey', item.id)
                this.change(item.id)
            }
            */
            fullscreen() {
                screenfull.toggle()
                // this.show = screenfull.isFullscreen
            },
        },
        mounted() {
            let openTabs = this.$store.state.openTabs
            if (openTabs.length === 0) {
                openTabs.push(this.$store.state.BUILTIN.find(x => x.identity === 'Dashboard'))
                this.$store.commit('openTabs', openTabs)
                this.$store.commit('activeKey', openTabs[0].id)
                this.change(openTabs[0].id)
            }
            /*
            let source = [
                { id: 'a', identity: 'Dashboard', icon: 'form', display: 'Dashboard', parentId: null },
                { id: 'b', identity: 'System', icon: 'form', display: 'System', parentId: null },
                { id: 'c', identity: 'Resc', icon: 'form', display: 'Resc', parentId: 'b' },
                { id: 'cc', identity: 'Resc.Create', icon: 'form', display: 'Resc.Create', parentId: 'c' },
                { id: 'e', identity: 'Role', icon: 'form', display: 'Role', parentId: 'b' },
                { id: 'f', identity: 'User', icon: 'form', display: 'User', parentId: 'b' },
            ]
            let func = (structure, source, value = null, merge = '', level = 0) => {
                level++
                let items = source.filter(x => x.parentId === value)
                for (let i in items) {
                    let item = items[i]
                    item.merge = (item.parentId === null ? '' : merge) + (merge === '' ? '' : '/') + item.display
                    item.level = level
                    structure.push(item)
                    func(structure, source, item.id, item.merge, level)
                }
            }
            let structure = []
            func(structure, JSON.parse(JSON.stringify(source)), null)
            console.log(structure)
            */
        }
    }
</script>

<style>
    #main .ant-tabs-tabpane {
        padding: 16px;
    }

    #main .ant-tabs-card > .ant-tabs-bar {
        background: #fafafa;
    }

    #main .ant-tabs-tab {
        border-top: unset;
        border-left: 1px solid #fafafa;
    }

    #main .ant-tabs-tab-active {
        border-left: 1px solid #ffffff;
    }

    .border-top {
        /* border-top: 1px solid #e8e8e8; */
    }

    .border-end-0 {
        border-right: unset;
    }

    .border-end {
        border-right: 1px solid #e8e8e8;
    }
</style>