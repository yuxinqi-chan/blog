<template>
  <SectionHead class="w-full px-10" title="文章" />
  <div class="grid w-full gap-6 px-3 lg:grid-cols-3">
    <div class="border-base flex w-full flex-col p-10 lg:col-span-2">
      <div class="post-header">
        <p class="post-category">
          <NuxtLink
            :to="`/?category=${post?.category}`"
            :title="`查看[${post?.category}]下的所有文章`"
            rel="category tag"
          >
            <i class="fa fa-folder-o"></i>
            {{ post?.category }}
          </NuxtLink>
        </p>
        <h3 class="post-title">
          {{ post?.title }}
        </h3>
        <div class="post-meta thw-sept">
          <div class="post-auther-avatar">
            <img
              :src="`https://directus.compilesoul.com/assets/${post?.user_created.avatar}`"
              class="avatar avatar-50 photo"
              width="50"
              height="50"
              alt="avatar"
            />
          </div>
          <div class="post-meta-info">
            <span class="post-date">
              <i class="fa fa-clock-o"></i>Post on 2022-08-28</span
            >
            <span class="post-view">
              <i class="fa fa-street-view"></i>
              <span class="waline-pageview-count" :data-path="$route.path">
                0
              </span>
            </span>
            <span class="post-comment">
              <i class="fa fa-comments-o"></i>
              <span class="waline-comment-count" :data-path="$route.path">
                0
              </span>
            </span>
          </div>
        </div>
      </div>
      <div v-html="post?.content" class="post-content" v-viewer></div>
      <div class="post-footer">
        <div class="post-tags">
          <div class="article-categories">
            <NuxtLink
              v-for="tag in post?.tags"
              :key="tag"
              :to="`/?tag=${tag}`"
              rel="tag"
            >
              {{ tag }}
            </NuxtLink>
          </div>
        </div>
      </div>
      <Waline
        :serverURL="$config.public.walineUrl"
        :path="$route.path"
        login="disable"
        lang="zh-CN"
        pageview="true"
      />
    </div>
    <div class="flex flex-col gap-y-5 lg:col-span-1">
      <Categories />
      <PostList :posts="randomPosts" />
      <TagCloud />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { commentCount, pageviewCount } from "@waline/client";

const config = useRuntimeConfig();
const route = useRoute();
const { getItemById, getItems } = useDirectusItems();
const { data: post } = await useAsyncData(
  "blog",
  () =>
    getItemById<{
      id: number;
      title: string;
      content: string;
      category: string;
      tags: string[];
      user_created: {
        avatar: string;
      };
    }>({
      collection: "blog",
      id: route.params.id as string,
      params: {
        fields: ["*", "user_created.*"],
      },
    }),
  { watch: [route] },
);
const { data: randomPosts } = await useAsyncData(
  "randomPosts",
  () =>
    getItems<{
      id: number;
      title: string;
      date_created: string;
      cover: string;
    }>({
      collection: "blog",
      params: {
        fields: ["id", "title", "date_created", "cover"],
        limit: 100,
        sort: "second(date_created)",
      },
    }),
  { default: () => [] },
);
onMounted(() => {
  commentCount({
    serverURL: config.public.walineUrl,
  });
  pageviewCount({
    serverURL: config.public.walineUrl,
  });
});
</script>

<style lang="scss">
.post-header {
  .post-category {
    a {
      position: relative;
      color: #26cda4;
      display: inline-block;
      font-size: 13px;
      letter-spacing: 2px;
      font-weight: 500;
      background-color: #f2f5f7;
      padding: 2px 5px;
      border-radius: 5px;
      &:hover {
        letter-spacing: 3px;
      }
    }
    i {
      padding-right: 5px;
    }
  }
  .post-title {
    font-size: 19px;
    color: #000;
    text-align: center;
    margin-top: 10px;
    letter-spacing: 0;
    font-weight: 700;
  }
  .post-meta {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    padding: 0 1rem;
    bottom: 0;
    width: 100%;
    padding-top: 5px;
    margin-top: 5px;
    .post-auther-avatar img {
      border-radius: 100px;
      width: 40px;
      height: 40px;
      float: left;
      margin-right: 10px;
      border: 2px solid #ad9ad4;
      border-right-color: #db9693;
      border-bottom-color: #db9693;
    }
    .post-auther-avatar img {
      -webkit-transition: all 0.8s ease-in-out;
      -moz-transition: all 0.8s ease-in-out;
      transition: all 0.8s ease-in-out;
    }
    .post-auther-avatar img:hover {
      opacity: 1;
      -webkit-transform: rotate(360deg);
      -moz-transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      transform: rotate(360deg);
    }
    .post-meta-info {
      padding: 5px 0;
      > span {
        color: #333;
        font-size: 12px;
        line-height: 22px;
        margin-right: 12px;
        padding-right: 12px;
        border-right: 1px solid #d8d8d8;
        i {
          font-size: 15px;
          padding-right: 5px;
        }
      }
    }
  }
}
.post-content {
  word-break: break-all;
  padding-top: 10px;
  p {
    color: #000;
    font-size: 0.96rem;
    font-weight: 400;
    line-height: 1.7;
    word-break: break-all;
  }
  h1 {
    letter-spacing: 0.5px;
    text-align: center;
    color: #4c6280;
    font-size: 13px;
    font-weight: 400;
    padding-top: 20px;
    padding-bottom: 5px;
  }
  h2,
  h3,
  h4 {
    letter-spacing: 1.5px;
  }
  h4 {
    line-height: 1.4;
    font-weight: 700;
    font-size: 15px;
    border-bottom: 2px #f00 solid;
    width: auto;
    display: table;
    margin: 15px 0;
  }
  h3,
  h2 {
    position: relative;
    padding: 0 0 0 1rem;
    line-height: 1.8;
    margin: 1.5rem 0 1rem -1rem;
    font-size: 1.2rem;
    &:before {
      content: "";
      position: absolute;
      left: 0;
      top: 7px;
      width: 6px;
      height: 22px;
      border-radius: 10px;
      background: #f0494d;
      background: -o-linear-gradient(bottom, #ff843a, #f0494d);
      background: -webkit-gradient(
        linear,
        left bottom,
        left top,
        from(#ff843a),
        to(#f0494d)
      );
      background: linear-gradient(to top, #ff843a, #f0494d);
    }
  }
  h2:before {
    background: #47484e;
    background: -o-linear-gradient(bottom, #47484e, #d0caca);
    background: -webkit-gradient(
      linear,
      left bottom,
      left top,
      from(#47484e),
      to(#d0caca)
    );
    background: linear-gradient(to top, #47484e, #d0caca);
  }
  blockquote {
    z-index: -1;
    margin: 1em;
    background-color: #fff;
    border: solid 2px #757575;
    display: block;
    padding: 1em;
    position: relative;
    &:before {
      z-index: -1;
      background-color: #fff;
      bottom: -10%;
      content: "";
      left: 0;
      position: absolute;
      right: 0;
      top: -10%;
      transform: rotate(-15deg) skew(5deg);
    }
  }
  ol {
    padding: 15px;
    font-size: 13px;
    font-weight: 600;
    line-height: 3;
    color: #53689a;
    &:hover {
      padding-left: 20px;
    }
    &:before {
      content: "";
      position: absolute;
      left: 0;
      top: 18px;
      height: 6px;
      width: 6px;
      border-radius: 20px;
      background-color: #888cdc;
    }
    a {
      color: #53689a;
    }
  }
  img {
    max-width: 100%;
    margin-bottom: 10px;
    border-radius: 5px;
    box-shadow:
      0 0.25rem 0.375rem -0.0625rem hsla(0, 0%, 8%, 0.12),
      0 0.125rem 0.25rem -0.0625rem hsla(0, 0%, 8%, 0.07);
  }
}
.post-footer {
  padding: 10px;
  .article-categories {
    a {
      padding: 4px 10px;
      background-color: #19b5fe;
      color: white;
      font-size: 12px;
      line-height: 16px;
      font-weight: 400;
      margin: 0 5px 5px 0;
      border-radius: 2px;
      display: inline-block;
    }
    a:nth-child(5n) {
      background-color: #4a4a4a;
      color: #fff;
    }
    a:nth-child(5n + 1) {
      background-color: #ff5e5c;
      color: #fff;
    }
    a:nth-child(5n + 2) {
      background-color: #ffbb50;
      color: #fff;
    }
    a:nth-child(5n + 3) {
      background-color: #1ac756;
      color: #fff;
    }
    a:nth-child(5n + 4) {
      background-color: #19b5fe;
      color: #fff;
    }
    a:hover {
      background-color: #1b1b1b;
      color: #fff;
    }
  }
}
</style>
