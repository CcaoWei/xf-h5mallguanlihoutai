<template>
    <el-scrollbar wrap-class="scrollbar-wrapper">
        <el-menu :show-timeout="200" :default-active="$route.path" :collapse="isCollapse" mode="vertical"
            background-color="#20222a" text-color="hsla(0,0%,100%,.7)" active-text-color="#409EFF">
            <div style="height:64px"></div>
            <sidebar-item v-for="route in permission_routers" :key="route.path" :item="route" :base-path="route.path" />
        </el-menu>
    </el-scrollbar>
</template>

<script>
    import {
        mapGetters
    } from 'vuex';
    import SidebarItem from './SidebarItem';

    export default {
        components: {
            SidebarItem
        },
        computed: {
            ...mapGetters(['permission_routers', 'sidebar']),
            isCollapse() {
                return !this.sidebar.opened;
            },
        },
        // created() {
        //     console.log(this.permission_routers)
        // }
    };
</script>