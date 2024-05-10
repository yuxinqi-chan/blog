<template>
  <div class="border-base p-4">
    <h3 class="widget-title">分类</h3>
    <form action="https://www.boxmoe.com" method="get">
      <label class="hidden" for="cat">分类</label>
      <select name="cat" id="cat" class="selector w-full" @change="onSelect">
        <option value="">选择分类</option>
        <option
          v-for="category in categories"
          :key="category"
          :value="category"
        >
          {{ category }}
        </option>
      </select>
    </form>
  </div>
</template>

<script lang="ts" setup>
const router = useRouter();
const { getItems } = useDirectusItems();
const { data: categories } = await useAsyncData("categories", () =>
  getItems<{
    category: string;
  }>({
    collection: "blog",
    params: {
      fields: ["category"],
      // @ts-ignore
      groupBy: ["category"],
    },
  }).then((items) => items.map((item) => item.category)),
);
const onSelect = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  const category = target.value;
  if (category) {
    router.push({ query: { category } });
  } else {
    router.push({ query: {} });
  }
};
</script>
