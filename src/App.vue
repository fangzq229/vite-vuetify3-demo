<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script lang="ts">
// import { useCoreStore } from "@/store/core";
// import { useSysConfStore } from "@/store/sysConf";
// import { useDisplay } from "vuetify";
export default {
  setup() {
    // const { mobile } = useDisplay();
    // const storeCore = useCoreStore();
    // const storeSysConf = useSysConfStore();
    // let dom: any;
    // const initWin = () => {
    //   storeCore.setCore({ isMobile: mobile.value });
    //   storeCore.setCore({
    //     mainPL: mobile.value ? "20px" : storeSysConf.navDrawer ? "0px" : "20px",
    //   });
    //   if (dom) {
    //     dom.style.paddingLeft = storeCore.mainPL;
    //   }
    // };
    // setTimeout(() => {
    //   dom = document.getElementsByClassName("v-main__wrap")[0];
    //   initWin();
    // }, 600);
    // window.onresize = () => {
    //   initWin();
    // };
  },
};
</script>

<style>
</style>
