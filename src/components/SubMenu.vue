<template functional>
    <a-sub-menu :key="props.item.id">
        <span slot="title">
            <a-icon :type="props.item.icon" />
            <span v-text="props.item.display" />
        </span>
        <template v-for="item in props.item.children">
            <SubMenu v-if="item.children" :key="item.id" :item="item" />
            <a-menu-item v-else :key="item.id">
                <a-icon :type="item.icon" />
                <span v-text="item.display" />
            </a-menu-item>
        </template>
    </a-sub-menu>
</template>

<script>
    export default {
        name: 'SubMenu',
        props: ['item'],
    }
</script>