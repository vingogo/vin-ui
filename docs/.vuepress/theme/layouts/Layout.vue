<script setup>
import { watch, ref, nextTick, onBeforeUnmount, onMounted } from 'vue'
import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue'
import { useRouter, useRoute } from 'vue-router'
import pathList from './../pathList.js'

const isDarkMode = ref(false)
const route = useRoute()
const iframeId = ref()
const iframeBaseUrl = import.meta.env.MODE === 'development' ? 'http://localhost:3001#' : '/ui/index.html#'
const iframeUrl = ref(iframeBaseUrl)
const hasIframe = ref(false);

// 根据父 path 拿到 子 path
function parentPathToChildrenPath(parentPath) {
  const cur = pathList.find(x => x.parentPath === parentPath)
  return cur ? cur.childrenPath : ''
}

// 首次设置 iframe 的链接
iframeUrl.value = `${iframeBaseUrl}${parentPathToChildrenPath(route.path)}`

let osEnd = ref('pc')
// 获取是移动端还是PC，摘自：https://tim.qq.com/
const OS = function() {
  var a = navigator.userAgent,
      b = /(?:Android)/.test(a),
      d = /(?:Firefox)/.test(a),
      e = /(?:Mobile)/.test(a),
      f = b && e,
      g = b && !f,
      c = /(?:iPad.*OS)/.test(a),
      h = !c && /(?:iPhone\sOS)/.test(a),
      k = c || g || /(?:PlayBook)/.test(a) || d && /(?:Tablet)/.test(a),
      a = !k && (b || h || /(?:(webOS|hpwOS)[\s\/]|BlackBerry.*Version\/|BB10.*Version\/|CriOS\/)/.test(a) || d && e);
  return {
      android: b,
      androidPad: g,
      androidPhone: f,
      ipad: c,
      iphone: h,
      tablet: k,
      phone: a
  }
}();
if (OS.phone || OS.ipad) {
  osEnd.value = 'phone'
}
let oldPath = route.path
watch(
  route,
  async (val) => {
    await nextTick()

    hasIframe.value = val.path.startsWith('/components/')

    if (val.path !== oldPath) {
      oldPath = val.path
      const childrenPath = parentPathToChildrenPath(val.path)
      if (childrenPath) {
        if (osEnd.value === 'pc') {
          iframeId.value && iframeId.value.contentWindow.location.replace(`${iframeBaseUrl}${childrenPath}`)
        } else {
          iframeUrl.value = `${iframeBaseUrl}${childrenPath}`
        }
      }
    }
  },
  {
    deep: true,
    immediate: true
  }
)

let observer
onMounted(() => {
  const html = document.querySelector("html")
  isDarkMode.value = html.classList.contains("dark")
  // watch theme change
  observer = new MutationObserver(() => {
    isDarkMode.value = html.classList.contains("dark")
  })
  observer.observe(html, {
    attributeFilter: ["class"],
    attributes: true,
  })
})
onBeforeUnmount(() => {
  observer.disconnect()
})
</script>

<template>
  <ParentLayout>
    <!-- 因为page每次都重新渲染，所以pc端放在 navbar-after ，但移动端为了放置位置，所以放在 page-content-bottom -->
    <template #navbar-after>
      <div v-if="hasIframe && osEnd === 'pc'" class="docs-box">
        <iframe :src="iframeUrl" frameborder="0" ref="iframeId"></iframe>
      </div>
    </template>
    <template #page-content-bottom>
      <div v-if="hasIframe && osEnd === 'phone'" class="docs-box-wrap">
        <div class="docs-box">
          <iframe :src="iframeUrl" frameborder="0" ref="iframeId"></iframe>
        </div>
      </div>
    </template>
    <template #page-bottom>
      <CommentService :darkmode="isDarkMode" />
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
  padding-right: 450px;
}
.back-to-top {
  z-index: 100;
}
@media (max-height: 800px) {
  .docs-box {
    top: calc(var(--navbar-height) + 20px);
  }
}
@media (max-height: 730px) {
  .docs-box {
    top: calc(var(--navbar-height) + 10px);
  }
}
@media (max-width: 1600px) {
  .page {
    padding-right: 380px;
  }
  .docs-box {
    right: 20px;
  }
  .back-to-top {
    right: 385px;
  }
}

@media (max-width: 419px) {
  .page {
    padding-right: 0;
  }
  .docs-box-wrap {
    width: 100vw;
    margin-left: calc(calc(100% - 100vw) / 2);
  }
  .docs-box {
    position: inherit;
    top: 0;
    right: 0;
    margin: 0 auto;
    z-index: 5;
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