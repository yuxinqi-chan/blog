import { addComponent, defineNuxtModule } from "@nuxt/kit";

export default defineNuxtModule({
  setup() {
    addComponent({
      name: "Waline",
      export: "Waline",
      filePath: "@waline/client/component",
    });
  },
});
