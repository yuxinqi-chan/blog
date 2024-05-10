<template>
  <SectionHead class="w-full px-10" :title="sectionTitle" />
  <div class="grid gap-6 px-3 lg:grid-cols-3">
    <div class="flex flex-col lg:col-span-2">
      <PostView v-for="post in posts" :key="post.id" :post="post" />
      <Waline
        :serverURL="$config.public.walineUrl"
        :path="$route.path"
        login="disable"
        lang="zh-CN"
      />
    </div>
    <div class="flex flex-col gap-y-5 lg:col-span-1">
      <Categories />
      <PostList :posts="randomPosts" />
      <TagCloud />
    </div>
  </div>
</template>

<script setup lang="ts">
import { commentCount, pageviewCount } from "@waline/client";
const route = useRoute();
const page = computed(() => Number(route.query.page || 1));
const category = computed(() => route.query.category as string | undefined);
const tag = computed(() => route.query.tag as string | undefined);
const sectionTitle = computed(() => {
  if (category.value) {
    return "分类：" + category.value;
  }
  if (tag.value) {
    return "标签：" + tag.value;
  }
  return "首页";
});
const config = useRuntimeConfig();
useHead(() => ({
  title: `${config.public.siteName} - ${sectionTitle.value}`,
  meta: [
    {
      name: "description",
      content: `${config.public.siteName} - ${sectionTitle.value}`,
    },
  ],
}));
const { getItems } = useDirectusItems();
const { data: posts } = await useAsyncData(
  "posts",
  () =>
    getItems<{
      id: number;
      title: string;
      content: string;
      date_created: string;
      category: string;
      cover: string;
      user_created: {
        avatar: string;
      };
      tags: string[];
    }>({
      collection: "blog",
      params: {
        fields: ["*", "user_created.*"],
        filter: {
          category: category.value,
          tags: {
            _contains: tag.value,
          },
        },
        limit: 10,
        page: page.value,
      },
    }),
  {
    watch: [page, category, tag],
  },
);

const { data: randomPosts } = await useAsyncData(
  "randomPosts",
  () =>
    getItems<{
      id: number;
      title: string;
      cover: string;
      date_created: string;
    }>({
      collection: "blog",
      params: {
        fields: ["id", "title", "date_created", "cover"],
        limit: 6,
        sort: "second(date_created)",
      },
    }),
  { default: () => [] },
);
onMounted(() => {
  commentCount({ serverURL: config.public.walineUrl });
  pageviewCount({ serverURL: config.public.walineUrl });
});
</script>
