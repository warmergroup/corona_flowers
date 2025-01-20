  <template>
    <div class="flex-col">
      <LayoutsNavbar class="w-full" />
      <div class="flex flex-grow gap-6">
        <layoutsSidebar />
        <section class="w-3/4 p-2 absolute right-0 mt-20">
          <slot />
        </section>
      </div>
    </div>
  </template>
