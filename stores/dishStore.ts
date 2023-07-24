import { defineStore } from "pinia";

type TDish = {
  id: string,
  title: string,
  photo: string,
  category: string,
  price: number,
  sale: number

}
export const useDishStore = defineStore("dish", {
  state: () => ({
      id: ref(""),
      title: ref(""),
      photo: ref("testPhoto"),
      category: ref(""),
      price: ref<number>(),
      sale: ref<number>(),
      addCard: ref(false),
      editCard: ref(false),
      discountActivate: ref(false),
      calculateDiscount: ref(true),
      fetched: reactive({
        dishList: [],
        categories: [],
        categoryOptions: [],
      })
  }),

  actions: {
    async getDishList() {
      const { data } = await useFetch("api/dish/fetch");
      this.fetched.dishList = data.value;
    },

    async fetchCategories() {
      const { data } = await useFetch("/api/dish/fetchCategories");
      this.fetched.categoryOptions = data;
      this.fetched.categories = this.fetched.categoryOptions.map(
        (x) => x.title
      );
    },

    addPopup() {
      this.addCard ? (this.addCard = false) : (this.addCard = true);

      this.id = "";
      this.title = "";
      this.photo = "testPhoto";
      this.price = null;
      this.sale = null;
      this.category = "";
      this.discountActivate = false;
    },

    editPopup(row: object) {
      this.addCard = false;
      this.editCard ? (this.editCard = false) : (this.editCard = true);

      // TODO redefine state
      // this.state = {...this.state, ...dish}
      this.id = row.id;
      this.title = row.title;
      this.photo = row.photo;
      this.price = row.price;
      this.sale = row.sale;
      this.category = row.category.title;

      row.sale == 0
        ? (this.discountActivate = false)
        : (this.discountActivate = true);
    },

    async addDish() {
      if (this.fetched.categories.includes(this.category) == false) {
        await this.addCategory(this.category);
      }

      const data = await useFetch("api/dish/add", {
        method: "post",
        body: {
          // token: this.user.token,
          title: this.title,
          photo: this.photo,
          price: Number(this.price),
          category_id: Number(
            this.fetched.categoryOptions.filter((obj) => {
              return obj.title === this.category
            })[0].id
          ),
          sale: this.discountActivate ? this.sale | 0 : 0,
        },
      });

      this.title = "";
      this.category = "";
      this.price = null;
      this.sale = 0;
      this.addCard = false;

      await this.getDishList();
    },
    async addCategory(category: string) {
      await useFetch("api/dish/addCategory", {
        method: "post",
        body: {
          title: category,
        },
      });

      await this.fetchCategories();
    },
  },
});
