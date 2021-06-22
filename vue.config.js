module.exports = {
    css: {
        loaderOptions: {
            less: {
                // lessOptions: { // less-loader 5
                modifyVars: {
                    // https://github.com/vueComponent/ant-design-vue/blob/master/components/style/themes/default.less
                    'layout-sider-background-light': '#fafafa',
                    'layout-trigger-background-light': '#fafafa',
                    'border-radius-base': '0px',
                    'btn-height-base': '30px',
                    'btn-height-sm': '21px',
                    'dropdown-edge-child-vertical-padding': '0px',
                    'menu-bg': '#fafafa',
                    'menu-popup-bg': '#fafafa',
                    'menu-item-active-bg': 'white',
                    'menu-item-vertical-margin': '0px',
                    'menu-item-boundary-margin': '0px',
                    'table-padding-vertical': '13px',
                    'tabs-bar-margin': '0px',
                    'tabs-card-gutter': '0px'
                },
                javascriptEnabled: true
                // }
            }
        }
    }
}