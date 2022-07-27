/* stylelint-disable CssSyntaxError */
<template>
  <v-layout>
    <!-- 左侧菜单 -->
    <vNavigation v-if="storeCore.isMobile"></vNavigation>
    <!-- 上 导航 -->
    <appBar></appBar>
    <!-- 左侧菜单 -->
    <vNavigation v-if="!storeCore.isMobile"></vNavigation>
    <!-- 内容部分 -->
    <v-main>
      <v-container
        fluid
        class="container-css"
        :style="{ height: height + 'px' }"
      >
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-layout>
</template>
<script lang="ts">
import { useSysConfStore, ISysConf } from "@/store/sysConf";
import { useCoreStore } from "@/store/core";
import vNavigation from "@/components/layout/v-navigation.vue";
import appBar from "@/components/layout/app-bar.vue";
export default {
  components: {
    vNavigation,
    appBar,
  },
  setup() {
    const sysConf: ISysConf = useSysConfStore();
    const storeCore = useCoreStore();
    const height = window.innerHeight - 64 - 20;
    return {
      sysConf,
      storeCore,
      height,
    };
  },
};
</script>
<style>
.container-css {
  width: 100%;
  background: #e3f2fd;
  /* border-top-left-radius: 10px;
  border-top-right-radius: 10px; */
  border-radius: 10px;
  box-sizing: border-box;
  padding: 16px;
  overflow: hidden;
}
.v-main__wrap {
  padding-right: 20px;
  box-sizing: border-box;
}
</style>