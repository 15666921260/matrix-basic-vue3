// 存储登录用户信息
import { StoreOptions } from "vuex";

export default {
    namespace: true,
    // initial state 初始化全局变量(state 主要存储状态信息)
    state: () => ({
        loginUser: {
            token: "",
            userId: "",
            username: "",
            phone: "",
            // 权限集合
            auths: []
        },
    }),
} as StoreOptions<any>;