<template>
  <q-dialog
    v-if="dish.addCard & user.isLogged"
    v-model="dish.addCard"
    seamless
    position="bottom"
  >
    <q-card style="width: 350px">
      <q-card-section class="row items-center no-wrap">
        <div class="text-h6">New Dish</div>
        <q-space />
        <q-btn flat round icon="close" v-close-popup />
      </q-card-section>
      <q-separator />
      <q-space />
      <q-card-section>
        <q-form @submit="dish.addDish()" class="q-gutter-sm">
          <q-input
            outlined
            color="dark"
            v-model.trim="dish.title"
            label="Title"
            :rules="[(value) => !!value]"
            hide-bottom-space
          />
          <q-select
            outlined
            use-input
            input-debounce="0"
            @new-value="createValue"
            :options="filterOptions"
            @filter="filterFn"
            color="dark"
            v-model.trim="dish.category"
            label="Category"
            :rules="[(value) => !!value]"
            hide-bottom-space
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-green">
                  Enter to Add new category
                </q-item-section>
              </q-item>
            </template>
          </q-select>
          <div class="row">
            <q-btn
              icon="cloud_upload"
              color="primary"
              class="col-auto"
              text-color="negative"
              label="Add Photo"
            />
            <q-space />
            <q-input
              mask="#.##"
              reverse-fill-mask
              outlined
              v-model.trim="dish.price"
              color="dark"
              class="col-6"
              label="Price $"
              :rules="[(value) => !!value]"
              hide-bottom-space
            >
              <template v-if="dish.discountActivate" v-slot:append>
                {{ (dish.price - (dish.price / 100) * dish.sale).toFixed(2) }}
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
              v-model.trim="dish.sale"
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
              label="add"
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
      const user = useUserStore();
      const dish = useDishStore();
      const filterOptions = ref(dish.fetched.categories);

      return {
        user,
        filterOptions,
        dish,

        createValue(val, done) {
          if (val.length > 0) {
            if (!dish.fetched.categories.includes(val)) {
            }
            done(val, "toggle");
          }
        },

        filterFn(val, update) {
          update(() => {
            if (val === "") {
              filterOptions.value = dish.fetched.categories;
            } else {
              const needle = val.toLowerCase();
              filterOptions.value = dish.fetched.categories.filter(
                (v) => v.toLowerCase().indexOf(needle) > -1
              );
            }
          });
        },
      };
    },
  };
</script>

<style lang="scss" scoped></style>