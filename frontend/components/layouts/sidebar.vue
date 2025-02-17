<template>
  <aside
    class="fixed z-20 p-4 left-0 sm:left-3 transition-transform duration-500 absolute flex flex-col gap-3 top-20 dark:bg-gray-800 bg-blue-50 w-[260px] rounded-lg  aside-height">
    <UiSidebarItems/>
  </aside>
</template>
<style scoped>
.aside-height {
  height: calc(100vh - 100px);
}
</style>