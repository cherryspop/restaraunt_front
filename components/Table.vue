<template>
  <div class="q-pa-md">
    <q-table
      title="Dish List"
      :rows="dish.fetched.dishList"
      :columns="headers"
      row-key="id"
      rows-per-page-label="Dishes per page"
    >
      <template v-slot:top>
        <div class="col-2 q-table__title">Dish List</div>

        <q-space />

        <q-btn
          v-if="user.isLogged"
          label="Add Dish"
          rounded
          icon="add"
          @click="dish.addPopup()"
          color="primary"
          text-color="negative"
        />
      </template>

      <template v-slot:body="props">
        <q-tr :props="props" >
          <q-td key="id" :props="props">{{ props.row.id }}</q-td>
          <q-td key="title" :props="props" @click="dish.editPopup(props.row)">{{ props.row.title }}</q-td>
          <q-td key="photo" :props="props">{{ props.row.photo }}</q-td>
<!--          todo sale calculator toggle-->
          <q-td key="price" :props="props" @click="dish.calculateDiscount ? dish.calculateDiscount=false : dish.calculateDiscount=true">
            <div v-if="dish.calculateDiscount & (props.row.sale != 0)">
              {{ (props.row.price - (props.row.price / 100) * props.row.sale).toFixed(2) }}
              <div style="text-decoration: line-through;color: grey">{{ props.row.price }}</div>
            </div>
            <div v-else>
              {{ props.row.price }}
            </div>
          </q-td>
          <q-td key="discount" :props="props">{{ props.row.sale }}</q-td>
          <q-td
            key="category"
            :props="props"
            >{{ props.row.category.title }}
          </q-td>
<!--          todo dishEdit btn-->
        </q-tr>
      </template>
    </q-table>

    <AddCard />
    <EditCard />
  </div>
</template>

<script>
  import { useDishStore } from "~/stores/dishStore";

  export default {
    data() {
      return {
        headers: [
          {
            name: "id",
            label: "id",
            field: "id",
            align: "left",
            sortable: true,
          },
          { name: "title", label: "title", field: "title", align: "left" },
          { name: "photo", label: "photo", field: "photo", align: "left" },
          { name: "price", label: "price", field: "price" },
          { name: "discount", label: "sale", field: "sale" },
          {
            name: "category",
            label: "category",
            field: (row) => row.category.title,
          },
        ],
      };
    },

    setup() {
      const user = useUserStore();
      const dish = useDishStore();

      return {
        user,
        dish
      };
    },

    mounted() {
      this.dish.getDishList();
      this.dish.fetchCategories();
    },
  };
</script>