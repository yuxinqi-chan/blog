<template>
  <div class="border-base p-4">
    <h3 class="widget-title">随机阅读</h3>
    <ul>
      <li class="mb-2 flex" v-for="post in randomPosts" :key="post.id">
        <div class="mr-3 h-10 w-16 shrink-0 overflow-hidden rounded-md">
          <NuxtLink :to="`/posts/${post.id}`">
            <img
              class="h-10 w-16"
              :src="
                post?.cover
                  ? `https://directus.compilesoul.com/assets/${post?.cover}`
                  : 'https://api.boxmoe.com/random.php?size=small'
              "
            />
          </NuxtLink>
        </div>
        <div class="flex flex-col">
          <NuxtLink class="text-sm text-[#4c6280]" :to="`/posts/${post.id}`">
            {{ post.title }}
          </NuxtLink>
          <small>
            <i class="fa fa-clock-o"></i>
            {{ $dayjs(post.date_created).format("YYYY-MM-DD") }}
          </small>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
const { getItems } = useDirectusItems();
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
</script>
