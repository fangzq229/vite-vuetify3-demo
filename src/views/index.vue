/* stylelint-disable CssSyntaxError */
<template>
  <!-- 左侧菜单 -->
  <vNavigation></vNavigation>
  <!-- 上 导航 -->
  <appBar></appBar>
  <!-- 内容部分 -->
  <v-main>
    <v-container fluid>
      <router-view></router-view>
    </v-container>
  </v-main>
</template>
<script lang="ts">
import { UseSysConfStore, ISysConf } from "@/store/sysConf";
import vNavigation from "@/components/layout/v-navigation.vue";
import appBar from "@/components/layout/app-bar.vue";
export default {
  components: {
    vNavigation,
    appBar,
  },
  setup() {
    const sysConf: ISysConf = UseSysConfStore();
    return {
      sysConf,
    };
  },
};
</script>