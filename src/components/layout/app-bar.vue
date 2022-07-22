<template>
  <v-app-bar prominent class="elevation-0" app>
    <template v-slot:prepend>
      <v-col v-if="storeCore.isMobile">
        <v-btn
          class="mr-1"
          variant="flat"
          width="26"
          height="26"
          min-width="26"
          @click.stop="navUpdate()"
          color="#90CAF9"
        >
          <v-icon size="x-small" color="#FFFFFF">density_medium</v-icon>
        </v-btn>
      </v-col>

      <v-list width="255" v-if="!storeCore.isMobile">
        <v-list-item>
          <v-row class="ml-2 text-title">{{ storeSysConf.sysName }}</v-row>
          <template v-slot:prepend start>
            <v-avatar size="small">
              <v-img :src="storeSysConf.sysLogo"></v-img>
            </v-avatar>
          </template>
          <template v-slot:append>
            <v-btn
              class="mr-1"
              variant="flat"
              width="26"
              height="26"
              min-width="26"
              @click.stop="navUpdate()"
              color="#90CAF9"
            >
              <v-icon size="x-small" color="#FFFFFF">density_medium</v-icon>
            </v-btn>
          </template>
        </v-list-item>
      </v-list>
    </template>
    <v-btn
      :icon="isScreen ? 'center_focus_strong' : 'center_focus_weak'"
      color="#353535"
      @click="handleFullScreen()"
    ></v-btn>
    <v-btn icon="bug_report" color="#353535"></v-btn>
    <v-btn variant="text" color="#353535"
      >EN/CN
      <v-menu anchor="bottom end" activator="parent">
        <v-card>
          <v-list-item link>
            <v-btn variant="text">中文简体</v-btn>
          </v-list-item>
          <v-list-item link>
            <v-btn variant="text">中文繁体</v-btn>
          </v-list-item>
          <v-list-item link>
            <v-btn variant="text">English</v-btn>
          </v-list-item>
        </v-card>
      </v-menu></v-btn
    >
    <v-badge color="error" dot>
      <v-btn icon>
        <v-avatar color="brown" size="30"><span>FA</span></v-avatar>
        <v-menu location="bottom end" activator="parent">
          <v-card>
            <v-list-item link>
              <v-btn variant="text"
                >Notice <v-badge color="error" content="6" inline></v-badge
              ></v-btn>
            </v-list-item>
            <v-list-item>
              <v-btn @click="logout" variant="text">Logout</v-btn>
            </v-list-item>
          </v-card>
        </v-menu>
      </v-btn>
    </v-badge>
    <div style="width: 10px"></div>
  </v-app-bar>
</template>
<script lang="ts">
import { getCurrentInstance, nextTick, ref } from "vue";
import { useSysConfStore } from "@/store/sysConf";
import { useCoreStore } from "@/store/core";
import { useDisplay } from "vuetify";
import screenfull from "screenfull";
export default {
  setup() {
    const { mobile } = useDisplay();
    const storeCore = useCoreStore();
    const storeSysConf = useSysConfStore();
    let dom: any;
    function initWin(i?: number) {
      if (i && mobile.value) {
        storeSysConf.navDrawer = false;
      }
      storeCore.setCore({ isMobile: mobile.value });
      storeCore.setCore({
        mainPL: mobile.value ? "20px" : storeSysConf.navDrawer ? "0px" : "20px",
      });
      if (dom) {
        dom.style.paddingLeft = storeCore.mainPL;
      }
    }
    nextTick(() => {
      dom = document.getElementsByClassName("v-main__wrap")[0];
      initWin(1);
    });
    window.onresize = () => {
      initWin();
    };

    const routerItems = ["Home", "Table"];
    const isScreen = ref(false);
    const { proxy } = getCurrentInstance() as any;
    function handleFullScreen() {
      if (!screenfull.isEnabled) {
        // 提示用户版本过低不支持全屏
        return false;
      }
      screenfull.toggle();
      proxy.isScreen = !proxy.isScreen;
    }
    function logout() {
      proxy.$router.push("/login");
    }
    function navUpdate() {
      storeSysConf.navDrawer = !storeSysConf.navDrawer;
      initWin();
    }
    return {
      storeSysConf,
      storeCore,
      isScreen,
      routerItems,
      navUpdate,
      handleFullScreen,
      logout,
    };
  },
};
</script>