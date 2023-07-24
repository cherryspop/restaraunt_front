<template>
  <div class="">
    <q-fab
      flat
      fab-mini
      square
      hide-icon
      label-position="bottom"
      label="LOGIN"
      vertical-actions-align="right"
    >
      <q-form @submit="login(credentials)" style="min-width: 300px" class="row">
        <q-input
          dense
          square
          outlined
          class="col-4"
          placeholder="Username"
          v-model="credentials.username"
          type="text"
        />
        <q-input
          dense
          square
          class="col-5"
          outlined
          placeholder="Password"
          v-model="credentials.password"
          :type="isPwd ? 'password' : 'text'"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
        <q-btn dense class="bg-accent" type="submit" label="Submit" />
      </q-form>
    </q-fab>
  </div>
</template>

<script>
  export default {
    setup() {
      const user = useUserStore();

      const credentials = reactive({
        username: "",
        password: "",
      });

      return {
        user,
        credentials,
        isPwd: ref(true),
      };
    },

    methods: {
      async login(credentials) {
        await useFetch("api/user/login/", {
          method: 'post',
          body: credentials,
        })
        this.user.updateFromCookie()

      },
    },
  };
</script>

<style lang="scss" scoped></style>