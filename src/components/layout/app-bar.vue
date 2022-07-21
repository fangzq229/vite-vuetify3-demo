<template>
  <v-app-bar app>
    <template v-slot:prepend>
      <v-app-bar-nav-icon
        class="ma-1"
        @click.stop="sysConf.navDrawer = !sysConf.navDrawer"
      ></v-app-bar-nav-icon>
      <!-- <v-breadcrumbs class="d-none d-xl-flex d-lg-flex" :items="routerItems">
        <template v-slot:divider>
          <v-icon size="12" icon="arrow_forward_ios"></v-icon>
        </template>
      </v-breadcrumbs> -->
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
        <v-avatar color="brown" size="30"><span>HD</span></v-avatar>
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
import { getCurrentInstance, ref } from "vue";
import { UseSysConfStore } from "@/store/sysConf";
import screenfull from "screenfull";
export default {
  setup() {
    const routerItems = ["Home", "Table"];
    const sysConf = UseSysConfStore();
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
    return {
      sysConf,
      isScreen,
      routerItems,
      handleFullScreen,
      logout,
    };
  },
};
</script>