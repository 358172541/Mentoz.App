<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
    export default {
        name: 'App',
        data() {
            return {

            }
        }
    }
</script>

<style>
    * {
        font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    }

    .ant-menu-item,
    .ant-menu-submenu-title {
        border-bottom: 1px solid #e8e8e8;
    }

    .ant-card,
    .ant-table {
        box-shadow: 1px 1px 5px #e8e8e8;
    }

    .ant-layout {
        background: unset;
        min-height: 100vh;
    }
</style>