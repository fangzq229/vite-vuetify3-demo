<template>
  <v-navigation-drawer
    floating
    v-model="storeSysConf.navDrawer"
    :temporary="storeCore.isMobile"
    bottom
    :image="storeSysConf.navBg"
  >
    <!-- isMobile Logo -->
    <v-list width="255" v-if="storeCore.isMobile">
      <v-list-item>
        <v-row class="ml-2 text-title">{{ storeSysConf.sysName }}</v-row>
        <template v-slot:prepend start>
          <v-avatar size="small">
            <v-img :src="storeSysConf.sysLogo"></v-img>
          </v-avatar>
        </template>
      </v-list-item>
    </v-list>
    <!-- 菜单 -->
    <v-list style="background: rgba(0, 0, 0, 0)" class="py-2">
      <div v-for="(item, index) in menuList" :key="index" class="px-2 mb-2">
        <v-list-item
          v-if="item.path && item.children?.length < 1"
          :to="item.path"
          :prepend-icon="item.icon"
          :title="item.label"
        ></v-list-item>
        <v-list-group v-if="item.path && item.children.length > 0">
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              :title="item.label"
              :prepend-icon="item.icon"
              :value="item.value"
            ></v-list-item>
          </template>
          <v-list-item
            class="mt-2"
            v-for="(i, idx) in item.children"
            :key="idx"
            :to="i.path"
            :title="i.label"
            :value="i.value"
          ></v-list-item>
        </v-list-group>
      </div>
    </v-list>
  </v-navigation-drawer>
</template>
<script lang="ts">
import { reactive } from "vue";
import { useSysConfStore } from "@/store/sysConf";
import { useCoreStore } from "@/store/core";
import { menuConf } from "@/plugins/menu";
export default {
  setup() {
    const storeSysConf = useSysConfStore();
    const storeCore = useCoreStore();
    const menuList = reactive(menuConf);
    return {
      storeCore,
      storeSysConf,
      menuList,
    };
  },
};
</script>