<template>
    <div class="navbar">
        <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container" />

        <breadcrumb class="breadcrumb-container" />

        <div class="right-menu">
            <!-- <template v-if="device !== 'mobile'">
                <el-tooltip :content="$t('navbar.screenfull')" effect="dark" placement="bottom">
                    <screenfull class="screenfull right-menu-item" />
                </el-tooltip>

                <el-tooltip :content="$t('navbar.size')" effect="dark" placement="bottom">
                    <size-select class="international right-menu-item" />
                </el-tooltip>

                <lang-select class="international right-menu-item" />

                <el-tooltip :content="$t('navbar.theme')" effect="dark" placement="bottom">
                    <theme-picker class="theme-switch right-menu-item" />
                </el-tooltip>
            </template> -->

            <el-dropdown class="avatar-container right-menu-item" trigger="click">
                <div class="avatar-wrapper">
                    <span class="user-name">{{name}}</span>
                    <!-- <img :src="avatar + '?imageView2/1/w/80/h/80'" class="user-avatar" /> -->
                    <img src="@/assets/user/avatar.png" class="user-avatar" />

                    <!-- <i class="el-icon-caret-bottom" /> -->
                </div>
                <el-dropdown-menu slot="dropdown">
                    <router-link to="/">
                        <el-dropdown-item>
                            {{ $t('navbar.dashboard') }}
                        </el-dropdown-item>
                    </router-link>
                    <!-- <el-dropdown-item divided>
                        <a target="_blank" href="https://github.com/linlinjava/litemall">
                            GitHub
                        </a>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <a target="_blank" href="https://gitee.com/linlinjava/litemall">
                            码云
                        </a>
                    </el-dropdown-item> -->
                    <el-dropdown-item divided>
                        <router-link to="/profile/password">
                            密码修改
                        </router-link>
                    </el-dropdown-item>
                    <el-dropdown-item divided>
                        <span style="display:block;" @click="logout">{{ $t('navbar.logOut') }}</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
    import {
        mapGetters
    } from 'vuex';
    import Breadcrumb from '@/components/Breadcrumb';
    import Hamburger from '@/components/Hamburger';
    import Screenfull from '@/components/Screenfull';
    import SizeSelect from '@/components/SizeSelect';
    import LangSelect from '@/components/LangSelect';
    import ThemePicker from '@/components/ThemePicker';

    export default {
        components: {
            Breadcrumb,
            Hamburger,
            Screenfull,
            SizeSelect,
            LangSelect,
            ThemePicker,
        },
        computed: {
            ...mapGetters(['sidebar', 'name', 'avatar', 'device']),
        },
        methods: {
            toggleSideBar() {
                this.$store.dispatch('toggleSideBar');
            },
            logout() {
                this.$store.dispatch('LogOut').then(() => {
                    location.reload(); // In order to re-instantiate the vue-router object to avoid bugs
                });
            },
        },
    };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .navbar {
        // height: 50px;
        // line-height: 50px;
        height: 64px;
        line-height: 64px;
        border-radius: 0px !important;

        .hamburger-container {
            // line-height: 58px;
            line-height: 72px;
            // height: 50px;
            height: 64px;
            float: left;
            // padding: 0 10px;
            padding: 0 20px;
        }

        .breadcrumb-container {
            float: left;
            line-height: 64px;
        }

        .errLog-container {
            display: inline-block;
            vertical-align: top;
        }

        .right-menu {
            float: right;
            height: 100%;

            &:focus {
                outline: none;
            }

            .right-menu-item {
                display: inline-block;
                margin: 0 8px;
            }

            .screenfull {
                height: 20px;
            }

            .international {
                vertical-align: top;
            }

            .theme-switch {
                vertical-align: 15px;
            }

            .avatar-container {
                // height: 50px;
                height: 64px;
                // margin-right: 30px;
                margin-right: 12px;
                // display: flex;

                .user-name {
                    display: inline-block;
                    height: 55px;
                    line-height: 55px;
                    margin-right: 8px;
                    color: #606266;
                    font-size: 14px;
                }

                .avatar-wrapper {
                    cursor: pointer;
                    // margin-top: 5px;
                    // margin-top: 9px;
                    position: relative;
                    display: flex;
                    display: flex;
                    align-items: center;

                    .user-avatar {
                        // width: 40px;
                        // height: 40px;
                        width: 40px;
                        height: 40px;
                        // border-radius: 10px;
                        border-radius: 100%;
                    }

                    .el-icon-caret-bottom {
                        position: absolute;
                        right: -20px;
                        top: 25px;
                        font-size: 12px;
                    }
                }
            }
        }
    }
</style>