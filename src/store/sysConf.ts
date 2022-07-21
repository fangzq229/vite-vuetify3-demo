// @ts-check
import { defineStore } from 'pinia';

export interface ISysConf {
  navDrawer: boolean;
  navBg: string;
  sysName: string;
  sysLogo: string;
  sysVersion: string;
  companyName: string;
}

export const UseSysConfStore = defineStore({
  id: 'sysConf',
  state: () => ({
    navDrawer: true,
    navBg: '',
    sysName: 'Vuetify3',
    sysLogo:
      'https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-light.svg',
    sysVersion: '',
    companyName: '',
  }),

  actions: {
    setSys(param: ISysConf) {
      this.$patch({
        ...param,
      });
    },
  },
});
