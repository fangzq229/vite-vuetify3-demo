<template>
  <v-navigation-drawer
    v-model="sysConf.navDrawer"
    :rail="rail"
    permanent
    @click="rail = false"
    theme="dark"
    :image="sysConf.navBg"
  >
    <v-list-item
      :prepend-avatar="sysConf.sysLogo"
      :title="sysConf.sysName"
      height="63"
    >
      <template v-slot:append>
        <v-btn
          variant="text"
          size="small"
          icon="arrow_back_ios"
          @click.stop="rail = !rail"
        ></v-btn>
      </template>
    </v-list-item>
    <v-divider></v-divider>
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
import { ref, reactive } from "vue";
import { UseSysConfStore } from "@/store/sysConf";
import { menuConf } from "@/plugins/menu";
export default {
  setup() {
    const sysConf = UseSysConfStore();
    const rail = ref(false);
    const menuList = reactive(menuConf);
    return {
      sysConf,
      rail,
      menuList,
    };
  },
};
</script>