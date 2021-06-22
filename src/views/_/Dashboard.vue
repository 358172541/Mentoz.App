<template>
    <section id="dashboard">
        <a-row :gutter="[16,16]">
            <a-col :md="24" :lg="12" :xl="6">
                <a-card size="small" :bodyStyle="{ padding: '16px', }">
                    <a-row type="flex" justify="space-between">
                        <a-tag color="#1DA57A">
                            <a-icon type="form" :style="{ fontSize: '61px', }" />
                        </a-tag>
                        <a-statistic title="Statistic" :value="123456" />
                    </a-row>
                </a-card>
            </a-col>
            <a-col :md="24" :lg="12" :xl="6">
                <a-card size="small" :bodyStyle="{ padding: '16px', }">
                    <a-row type="flex" justify="space-between">
                        <a-tag color="#1DA57A">
                            <a-icon type="form" :style="{ fontSize: '61px', }" />
                        </a-tag>
                        <a-statistic title="Statistic" :value="123456" />
                    </a-row>
                </a-card>
            </a-col>
            <a-col :md="24" :lg="12" :xl="6">
                <a-card size="small" :bodyStyle="{ padding: '16px', }">
                    <a-row type="flex" justify="space-between">
                        <a-tag color="#1DA57A">
                            <a-icon type="form" :style="{ fontSize: '61px', }" />
                        </a-tag>
                        <a-statistic title="Statistic" :value="123456" />
                    </a-row>
                </a-card>
            </a-col>
            <a-col :md="24" :lg="12" :xl="6">
                <a-card size="small" :bodyStyle="{ padding: '16px', }">
                    <a-row type="flex" justify="space-between">
                        <a-tag color="#1DA57A">
                            <a-icon type="form" :style="{ fontSize: '61px', }" />
                        </a-tag>
                        <a-statistic title="Statistic" :value="123456" />
                    </a-row>
                </a-card>
            </a-col>
            <a-col :span="24">
                <a-card size="small" title="echarts" :bodyStyle="{ padding: '0px' }">
                    <a slot="extra" href="#" @click="chart_example_data_one" style="margin-left:12px">chart_example_data_one</a>
                    <a slot="extra" href="#" @click="chart_example_data_two" style="margin-left:12px">chart_example_data_two</a>
                    <div ref="chart_example" :style="{ height: '200px', }"></div>
                </a-card>
            </a-col>
            <a-col :span="24">
                <a-card size="small" :bodyStyle="{ padding: '0px' }">
                    <a-tabs type="card">
                        <a-tab-pane key="1" tab="Tab 1">
                            Content of Tab Pane 1
                        </a-tab-pane>
                        <a-tab-pane key="2" tab="Tab 2">
                            Content of Tab Pane 2
                        </a-tab-pane>
                        <a-tab-pane key="3" tab="Tab 3">
                            Content of Tab Pane 3
                        </a-tab-pane>
                    </a-tabs>
                </a-card>
            </a-col>
            <a-col :span="24">
                <a-card size="small" :bodyStyle="{ padding: '0px' }">
                    <a-descriptions bordered size="small" id="description">
                        <a-descriptions-item label="Product">
                            Cloud Database
                        </a-descriptions-item>
                        <a-descriptions-item label="Billing">
                            Prepaid
                        </a-descriptions-item>
                        <a-descriptions-item label="Time">
                            18:00:00
                        </a-descriptions-item>
                        <a-descriptions-item label="Amount">
                            $80.00
                        </a-descriptions-item>
                        <a-descriptions-item label="Discount">
                            $20.00
                        </a-descriptions-item>
                        <a-descriptions-item label="Official">
                            $60.00
                        </a-descriptions-item>
                    </a-descriptions>
                </a-card>
            </a-col>
        </a-row>
    </section>
</template>

<script>
    import echarts from 'echarts/lib/echarts';
    import 'echarts/lib/chart/bar';
    // import { filesDownload } from '../../plugins/request'
    export default {
        name: 'Dashboard',
        data() {
            return {
                chart_example: null,
                chart_example_data: []
            }
        },
        methods: {
            chart_example_data_init() {
                this.chart_example = echarts.init(this.$refs.chart_example)
                this.chart_example.setOption({
                    xAxis: {
                        data: ["Dashboard", "Profile", "Role", "User", "Form"]
                    },
                    yAxis: {},
                    series: [{
                        name: "Select",
                        type: "bar",
                        data: this.chart_example_data
                    }]
                })
            },
            chart_example_data_one() {
                this.chart_example_data = [10, 30, 50, 30, 10]
                this.chart_example_data_init()
            },
            chart_example_data_two() {
                this.chart_example_data = [50, 30, 10, 30, 50]
                this.chart_example_data_init()
            },
            // fetchimg(e) {
            //     filesDownload().then(response => e.target.src = window.URL.createObjectURL(response.data))
            // }
        },
        created() {
            this.chart_example_data = [10, 30, 50, 30, 10]
        },
        mounted() {
            this.$nextTick(() => {
                this.chart_example_data_init()
                setTimeout(() => {
                    this.chart_example.resize()
                    window.onresize = () => {
                        this.chart_example.resize()
                    }
                }, 0)
            })
        }
    }
</script>

<style>
    #description .ant-descriptions-view {
        border: unset;
    }
</style>