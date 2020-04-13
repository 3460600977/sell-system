import { type } from "os";

/**
 * 对于本地存储操作的封装
 */

export default {
    get(key) {
        let val = window.localStorage.getItem(key);
        return JSON.parse(val);
    },
    set(key, value) {
        window.localStorage.setItem(key, JSON.stringify(value))
    },
    remove(key) {
        window.localStorage.removeItem(key)
    },
    clear() {
        window.localStorage.clear()
    }
}


