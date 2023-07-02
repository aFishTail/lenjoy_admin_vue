import { defineStore } from "pinia";
import { store } from "../index";

export const useSettingStore = defineStore({
    id: "fm-setting",
    state: () => {
        return {
            sidebarOpen: false
        }
    },
    getters: {
        getSidebarOpen: (state) => state.sidebarOpen
    },
    actions: {
        setSidebarOpen(open: boolean) {
            this.sidebarOpen = open
        }
    }
})

export const useSettingStoreHook = () => {
    return useSettingStore(store)
}