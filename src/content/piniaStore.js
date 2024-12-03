import {defineStore} from "pinia";

//------------此处可放置任意vue实例变量-------------------------
const StoreId = "selfInfo"
export const Store = defineStore(StoreId, {
  // arrow function recommended for full type inference
  state: () => {
    return {
      count: 0,
      loginInfo: {},
    };
  },
  getters: {},
  actions: {
    //支持异步
    increment() {
      this.count++;
    },
  },
  // 持久化设置
  persist: {
    enabled: true,
    strategies: [{key: StoreId, storage: localStorage, paths: ["loginInfo"]}],
  },
});
