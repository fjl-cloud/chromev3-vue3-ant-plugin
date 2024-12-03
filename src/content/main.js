import {createApp} from "vue";
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import { createPinia } from 'pinia'
import piniaPersist from "pinia-plugin-persist";
const pinia = createPinia().use(piniaPersist)
// 引入组件
import demo from "./components/demo.vue";


//------------vue实例-----挂载入口---------------------
function createEntry(myapp, id) {
  const el = document.querySelector("body");
  console.log("el", el);

  if (el) {
    //  afterbegin 插入body内部最前面------afterend插入body外部后面
    el.insertAdjacentHTML("afterend", `<div id="${id}"></div>`);
    createApp(myapp).use(pinia).use(Antd).mount(`#${id}`);
  }
}

createEntry(demo, "my-plugin-app");

//-----------------注入js到任意页面------------------

//----参考------https://stackoverflow.com/questions/9515704/use-a-content-script-to-access-the-page-context-variables-and-functions/9517879#9517879
const s = document.createElement("script");
s.src = chrome.runtime.getURL("js/inject.js");
s.onload = function () {
  console.log("inject注入完成");
}; //---------此处分号不可去掉,应该是立即执行函数必须以分号分隔------
document.body.appendChild(s);

const style = document.createElement("link");
style.rel = "stylesheet";
style.src = chrome.runtime.getURL("assets/content.css");
style.onload = function () {
  console.log("content css 注入完成");
}; //---------此处分号不可去掉,应该是立即执行函数必须以分号分隔------
document.body.appendChild(style);
