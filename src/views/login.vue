<template>
  <v-app id="inspires">
    <v-main>
      <v-img
        width="100vw"
        height="100vh"
        src="https://www.metagaia.io/assets/images/nft/img_bg.jpg?v=20220418113"
        lazy-src="https://www.metagaia.io/assets/images/nft/img_bg.jpg?v=20220418113"
        :aspect-ratio="1"
        cover
      >
        <v-container fluid>
          <v-row
            style="height: 100vh; align-items: center; justify-content: center"
          >
            <v-col cols="12" xs="8" sm="6" md="4" lg="3" xl="2">
              <v-card style="opacity: 0.9">
                <v-toolbar>
                  <v-toolbar-title class="text-h6"
                    >METAGIA ADMIN</v-toolbar-title
                  >
                </v-toolbar>
                <v-divider></v-divider>
                <v-card-text class="justify-center">
                  <v-form class="mt-1">
                    <v-text-field
                      label="username"
                      type="text"
                      v-model="username"
                    ></v-text-field>
                    <v-text-field
                      label="password"
                      type="password"
                      v-model="password"
                    ></v-text-field>
                    <v-row>
                      <v-col>
                        <v-text-field
                          label="code"
                          type="text"
                          v-model="code"
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="5"
                        @click="getCaptcha()"
                        v-html="captcha"
                      ></v-col>
                    </v-row>
                  </v-form>
                  <v-btn
                    width="100%"
                    flat
                    size="large"
                    color="success"
                    @click="login"
                  >
                    LOGIN
                  </v-btn>
                </v-card-text>
                <v-card-actions class="justify-center">
                  <p class="text-disabled text-subtitle-2">
                    2022-04-22 ADVOKATE
                  </p>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-img>
    </v-main>
  </v-app>
</template>
<script lang="ts">
import { ref, getCurrentInstance } from "vue";
export default {
  setup() {
    const username = ref("");
    const password = ref("");
    const code = ref("");
    const captcha = ref("");
    // 登陆方法
    const { proxy } = getCurrentInstance() as any;
    function login() {
      proxy.$totas.success("Login Success", { timeout: 2000 });
      setTimeout(() => {
        proxy.$router.push("/");
      }, 1000);
    }
    // 获取验证码方法
    function getCaptcha() {
      console.log("Get code");
    }

    return {
      username,
      password,
      code,
      captcha,
      login,
      getCaptcha,
    };
  },
};
</script>
