<script setup>
import { watch, ref, nextTick, onBeforeUnmount, onMounted } from 'vue';
import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue';
import { useRouter, useRoute } from 'vue-router';
import pathList from './../pathList.js';

const isDarkMode = ref(false);
const route = useRoute();
const iframeId = ref();
const iframeBaseUrl =
  import.meta.env.MODE === 'development' ? 'http://localhost:3000/ui/#' : '/ui/index.html#';
const iframeUrl = ref(iframeBaseUrl);
const hasIframe = ref(false);

// 根据父 path 拿到 子 path
function parentPathToChildrenPath(parentPath) {
  const cur = pathList.find((x) => x.parentPath === parentPath);
  return cur ? cur.childrenPath : '';
}

// 首次设置 iframe 的链接
iframeUrl.value = `${iframeBaseUrl}${parentPathToChildrenPath(route.path)}`;

let oldPath = route.path;
watch(
  route,
  async (val) => {
    await nextTick();

    hasIframe.value = val.path.startsWith('/components/');

    if (val.path !== oldPath) {
      oldPath = val.path;
      const childrenPath = parentPathToChildrenPath(val.path);
      if (childrenPath) {
        iframeId.value &&
          iframeId.value.contentWindow.location.replace(`${iframeBaseUrl}${childrenPath}`);
      }
    }
  },
  {
    deep: true,
    immediate: true,
  },
);

let observer;
onMounted(() => {
  const html = document.querySelector('html');
  isDarkMode.value = html.classList.contains('dark');
  // watch theme change
  observer = new MutationObserver(() => {
    isDarkMode.value = html.classList.contains('dark');
  });
  observer.observe(html, {
    attributeFilter: ['class'],
    attributes: true,
  });
});
onBeforeUnmount(() => {
  observer.disconnect();
});
</script>

<template>
  <ParentLayout :class="hasIframe ? 'isPreview' : ''">
    <!-- 因为page每次都重新渲染，所以pc端放在 navbar-after ，但移动端为了放置位置，所以放在 page-content-bottom -->
    <template #navbar-after>
      <div v-if="hasIframe" class="docs-box">
        <iframe :src="iframeUrl" frameborder="0" ref="iframeId"></iframe>
      </div>
    </template>
  </ParentLayout>
</template>

<style lang="css">
.docs-box {
  overflow: hidden;
  position: fixed;
  top: calc(var(--navbar-height) + 50px);
  right: 50px;
  width: 375px;
  height: 640px;
  z-index: -1;
  background-color: #fff;
  border: 1px solid var(--c-border);
  border-radius: 16px;
}
.docs-box iframe {
  display: block;
  width: 100%;
  height: 640px;
}
.page {
  position: relative;
}

.isPreview .page {
  padding-right: 450px;
}

.back-to-top {
  z-index: 100;
}
@media (max-height: 800px) {
  .docs-box {
    display: none;
  }
}

@media (max-width: 1600px) {
  .isPreview .page {
    padding-right: 380px;
  }
  .isPreview .docs-box {
    right: 20px;
  }
}

@media (max-width: 890px) {
  .page {
    padding-right: 0;
  }

  .docs-box {
    display: none;
  }
}

@media (max-width: 419px) {
  .page {
    padding-right: 0;
  }
}

.theme-container.no-sidebar .docs-box {
  display: none;
}
:root {
  --sidebar-width: 15rem;
  --content-width: auto;
}
</style>
