<template>
  <Login v-if="!user.isLogged"/>
  <!--  <q-toolbar-title>{{user}}</q-toolbar-title>-->
  <div v-else class="row q-mx-lg">
    <div class="text-h5 col-1">{{ user.username }}</div>
    <q-btn label="LogOut" class="col-auto  bg-accent"  @click="logout" icon-right="logout"/>
  </div>
</template>

<script>
  export default {
    setup() {
      const user = useUserStore();

      return { user };
    },

    methods: {
      logout() {
        this.user.token = {};
        this.user.removeCookie("jwt");
      },
    },
  };
</script>
