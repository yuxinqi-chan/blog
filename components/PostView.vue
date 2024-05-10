<template>
  <div class="post-list-view border-base grid grid-cols-5">
    <div class="post-thumbnail col-span-2">
      <NuxtLink to="/posts/1" :title="post.title" class="post-overlay">
        <img
          class="img-fluid"
          :src="
            post?.cover
              ? `https://directus.compilesoul.com/assets/${post?.cover}`
              : 'https://api.boxmoe.com/random.php?size=mw690'
          "
          :alt="post.title"
        />
      </NuxtLink>
    </div>
    <div class="post-list-content col-span-3">
      <div class="post-list-header">
        <span class="category-meta">
          <NuxtLink
            :to="`/?category=${post.category}`"
            :title="`查看[${post.category}]下的所有文章`"
            rel="category tag"
          >
            <i class="fa fa-folder-o"></i>
            {{ post.category }}
          </NuxtLink>
        </span>
        <h2 class="post-list-title">
          <NuxtLink :to="`/posts/${post.id}`" :title="post.title">
            {{ post.title }}
          </NuxtLink>
        </h2>
      </div>
      <div class="post-list-text line-clamp-3">
        {{ summary }}
      </div>
      <div class="post-list-info">
        <div class="post-list-avatar">
          <img
            :src="`https://directus.compilesoul.com/assets/${post.user_created.avatar}`"
            class="avatar avatar-50 photo"
            width="50"
            height="50"
            alt="avatar"
          />
        </div>
        <div class="post-meta-info">
          <span class="list-post-date">
            <i class="fa fa-clock-o"></i>
            Post on
            {{ $dayjs(post.date_created).format("YYYY-MM-DD") }}</span
          >
          <span>
            <i class="fa fa-street-view"></i>
            <span
              class="waline-pageview-count"
              :data-path="`/posts/${props.post.id}`"
              >0</span
            >
          </span>
          <span>
            <i class="fa fa-comments-o"></i>
            <span
              class="waline-comment-count"
              :data-path="`/posts/${props.post.id}`"
              >0</span
            >
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  post: {
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
  };
}>();
const summary = computed(() => {
  return props.post.content?.replace(/<[^>]+>/g, "");
});
</script>

<style lang="scss">
.post-list-view {
  margin-bottom: 30px;
  background: url(/images/comment.png) right bottom no-repeat;
  padding: 20px;
  background-color: #fff;
  transition:
    box-shadow 0.3s cubic-bezier(0.215, 0.61, 0.355, 1),
    transform 0.3s cubic-bezier(0.215, 0.61, 0.355, 1),
    -webkit-box-shadow 0.3s cubic-bezier(0.215, 0.61, 0.355, 1),
    -webkit-transform 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
  transform: translate(0, 0);
  @media (max-width: 767px) {
    display: inline-block;
  }
  .post-thumbnail {
    overflow: hidden;
    border-radius: 10px;
    position: relative;
    @media (max-width: 767px) {
      width: 100%;
      margin: 0;
    }
    img {
      max-width: 100%;
      min-height: 220px;
      height: auto;
      transition: all 0.4s cubic-bezier(0.7, 0, 0.3, 1);
      object-fit: cover;
      @media (max-width: 767px) {
        border-radius: 10px 10px 0 0;
        width: 100%;
      }
    }
    a {
      overflow: hidden;
      display: block;
      max-height: 220px;
    }
    &:hover .post-overlay:after {
      visibility: visible;
      opacity: 1;
      opacity: 0.5;
    }
  }
  .post-list-content {
    margin-left: 20px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    @media (max-width: 767px) {
      width: 100%;
      margin-left: 0;
      margin-bottom: 0;
      padding-top: 5px;
    }
    .post-list-header {
      padding-bottom: 5px;
      .category-meta {
        text-shadow: #b9b9b9 0.031em 0.031em 0.051em;
        letter-spacing: 2px;
        a {
          letter-spacing: 2px;
          font-size: 13px;
        }
        i {
          padding-right: 5px;
        }
      }
      h2.post-list-title {
        font-size: 17px;
        font-weight: 400;
        padding-top: 5px;
        margin-bottom: 0;
        a {
          color: #37475c;
          font-size: 16px;
          line-height: 24px;
          text-shadow: #d0cdcd 0.031em 0.031em 0.051em;
          &:hover {
            color: #f34159;
          }
        }
      }
    }
    .post-list-text,
    .post-list-info {
      font-size: 13px;
      font-weight: 400;
      margin: 5px 0;
      color: #7087a7;
    }
    .post-list-info {
      align-items: center;
      display: flex;
      flex-wrap: wrap;
      padding: 0 1rem;
      border-top: 1px #ececec solid;
      padding-top: 8px;
      position: absolute;
      bottom: 0;
      @media (max-width: 767px) {
        border: 0;
        position: relative;
      }
      .post-list-avatar {
        width: 50px;
        height: 50px;
        z-index: 0;
        float: left;
        margin-right: 20px;
        position: relative;
        text-align: right;
        img {
          -webkit-clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
          clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
          border: 1px solid transparent;
          -webkit-transition: all 0.8s ease-in-out;
          -moz-transition: all 0.8s ease-in-out;
          transition: all 0.8s ease-in-out;
        }
        &:after {
          content: "";
          position: absolute;
          transform: rotate(45deg);
          border-radius: 4px;
          border: 2px solid #ff00009c;
          width: 72%;
          height: 72%;
          top: 8px;
          left: 2px;
          z-index: -1;
        }
        .avatar {
          width: 50px;
          height: 50px;
        }
      }
      .post-meta-info {
        padding-top: 5px;
        display: block;
        span {
          &.list-post-date {
            display: block;
            border-right: 0;
          }
          color: #7d93b2;
          font-size: 12px;
          line-height: 22px;
          margin-right: 12px;
          padding-right: 12px;
          border-right: 1px solid #d8d8d8;
          &:last-child {
            border-right: none;
            margin-right: 0;
            padding-right: 0;
          }
          i {
            font-size: 15px;
            padding-right: 5px;
          }
          a {
            color: #747992;
            font-size: 12px;
            text-transform: uppercase;
            line-height: 22px;
            &:hover {
              color: #ff9966;
            }
          }
        }
      }
    }
  }
  &:hover {
    .post-thumbnail {
      .post-overlay:after {
        visibility: visible;
        opacity: 1;
        opacity: 0.75;
      }
      img {
        transform: scale3d(1.05, 1.05, 1.05);
      }
    }
  }
}
</style>
