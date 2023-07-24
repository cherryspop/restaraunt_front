<template>
  <q-layout view="hHh lpR fFf" class="main">
    <q-page-container fit row wrap justify-start items-start content-start>
      <q-page padding>
        <Header />
        <!--        <slot />-->
        <router-view></router-view>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script>
  import { useUserStore } from "~/stores/userStore";

  export default {
    setup() {
      const user = useUserStore();
      return { user };
    },

    mounted() {
      this.user.updateFromCookie()
    },
  };
</script>
<style>
  .main {
    background-image: url("assets/mainBg.svg");
    background-size: cover;
  }
</style>
