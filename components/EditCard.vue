<template>
  <q-dialog v-model="dish.editCard" v-if="dish.editCard & user.isLogged">
    <q-card style="width: 450px" >
      <q-card-section class="row items-center no-wrap">
        <div class="text-h6">Edit Dish {{dish.id}}</div>
        <q-space />
        <q-btn flat round icon="close" v-close-popup />
      </q-card-section>
      <q-separator />

      <q-space />

      <q-card-section>
        <q-form class="q-gutter-sm">
          <q-input
            outlined
            color="dark"
            v-model="dish.title"
            label="Title"
            :rules="[(value) => !!value]"
            hide-bottom-space
          />
          <q-select
            outlined
            color="dark"
            v-model="dish.category"
            :options="Object.values(dish.fetched.categoryOptions)"
            label="Category"
            :rules="[(value) => !!value]"
            hide-bottom-space
          />
          <div class="row">
            <q-btn
              icon="cloud_upload"
              color="primary"
              class="col-auto"
              text-color="negative"
              label="Change Photo"
            />
            <q-space />
            <q-input
              mask="#.##"
              reverse-fill-mask
              outlined
              v-model="dish.price"
              color="dark"
              class="col-6"
              label="Price $"
              :rules="[(value) => !!value]"
              hide-bottom-space
            >
              <template v-if="dish.discountActivate" v-slot:append>
                {{ dish.price - (dish.price / 100) * dish.sale }}
              </template>
              <template v-else v-slot:append>
                {{ dish.price }}
              </template>
            </q-input>
          </div>
          <div class="row items-center">
            <q-checkbox
              v-model="dish.discountActivate"
              checked-icon="discount"
              unchecked-icon="highlight_off"
              indeterminate-icon="help"
              class="col-2"
              color="negative"
            />
            <q-input
              mask="##"
              outlined
              dense
              v-model="dish.sale"
              class="col-6"
              label="Discount"
              color="dark"
              prefix="%"
              :disable="!dish.discountActivate"
            />
            <q-space />
            <q-separator vertical />
            <q-space />
            <q-btn
              type="submit"
              class="col-3"
              label="edit"
              text-color="negative"
              color="primary"
            />
          </div>
        </q-form>

      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
  export default {
    setup() {
      const dish = useDishStore()
      const user = useUserStore()

      return {dish, user}
    }
  };
</script>