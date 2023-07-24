import { useCookies } from "vue3-cookies";
import { defineStore } from "pinia";
import { decodeToken } from "~/composables/decodeToken";

const { cookies } = useCookies();
export const useUserStore = defineStore("user", {
  state: () => ({
    id: ref(0),
    username: ref(""),
    //TODO no need for token, just toggle for isLogged
    token: reactive({
      access: "",
      refresh: "",
    }),
  }),

  getters: {
    isLogged: (state) => !!state.id,
  },

  actions: {
    getCookie(name: string) {
      cookies.get(name);
    },

    updateFromCookie() {
      const jwt = this.getCookie('accessToken');
      // const {sub, username} = decodeToken(jwt)
      // this.id = sub
      // this.username = username
    },

    removeCookie(name: string) {
      cookies.remove(name);
    },
  },
});
