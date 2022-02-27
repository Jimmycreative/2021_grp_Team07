// ! 本模块主要是进行local数据存储
import store from 'store'
const USER_KEY = 'user_key';

export default {
    // 保存用户
    saveUser(user) {
        store.set(USER_KEY, JSON.stringify(user))
    },

    // 读取用户
    getUser() {
        return store.get(USER_KEY) || {}
    },

    // 删除用户
    removeUser() {
        store.remove(USER_KEY);
    }
}