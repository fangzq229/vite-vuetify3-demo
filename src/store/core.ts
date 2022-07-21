// @ts-check
import { defineStore } from 'pinia';
export interface ICore {
  isMobile?: boolean;
  mainPL?: string;
}

export const useCoreStore = defineStore({
  id: 'core',
  state: () => ({
    isMobile: false,
    mainPL: '0px', // margin left
  }),
  actions: {
    setCore(param: ICore) {
      this.$patch({
        ...param,
      });
    },
  },
});
