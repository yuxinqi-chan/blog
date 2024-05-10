<template>
  <div class="border-base p-4">
    <h3 class="widget-title">标签云</h3>
    <div class="flex flex-wrap">
      <NuxtLink
        v-for="tag in tags"
        :key="tag"
        :title="`[${tag}]有34个相关`"
        :to="`/?tag=${tag}`"
        class="tag"
      >
        {{ tag }}
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { getItems } = useDirectusItems();
const { data: tags } = await useAsyncData("tags", () =>
  getItems<{
    tags: string[];
  }>({
    collection: "blog",
    params: {
      fields: ["tags"],
      limit: 50,
    },
  })
    .then((items) => items.map((item) => item.tags).flat())
    .then((tags) => useUniq(tags)),
);
</script>

<style></style>
