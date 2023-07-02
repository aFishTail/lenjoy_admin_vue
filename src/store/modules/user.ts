import { defineStore } from "pinia";
import { store } from "../index";

export const useUserStore = defineStore({
    id: "fm-user",
    state: () => {
        return {
            userInfo: {id:2}
        }
    },
    getters: {
        getUserInfo: (state) => state.userInfo
    },
    actions: {
        setUserInfo(userInfo) {
            this.userInfo = userInfo
        }
    }
})

export const useUserStoreHook = () => {
    return useUserStore(store)
}