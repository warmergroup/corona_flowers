<script setup lang="ts">
const colorMode = useColorMode();
const isDark = ref(false);

const props = defineProps({
  title: String,
  total: Number,
  lastThreeDays: Number,
  lastTwentyFourHours: Number,
  style: String,
});

onMounted(() => {
  const cards = document.querySelectorAll<HTMLElement>(".card");

  cards.forEach(card => {
    card.onmousemove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--x", x + "px");
      card.style.setProperty("--y", y + "px");
    };
  });
});
</script>

<template>
  <div
    :style="'--clr:' + style"
    class="card bg-blue-100 dark:bg-gray-700 relative rounded-md w-full hover:shadow-md h-72 overflow-hidden p-3 after:dark:bg-gray-700/90  after:bg-blue-100/90  after:rounded-md">
    <div class="card-content rounded-md  w-full h-full">
      <h1 class="text-2xl font-semibold">{{ title }}</h1>
      <p>Jami: {{ total }} ta</p>
      <h3 class="text-base font-semibold">yangi qo'shilganlar</h3>
      <p>Oxirgi 3 kun: {{ lastThreeDays }} ta</p>
      <p>Oxirgi 24 soat: {{ lastTwentyFourHours }} ta</p>
    </div>
  </div>
</template>

<style scoped>
.card {
  position: relative;
  transition: all 0.3s ease;
}

.card-content {
  position: absolute;
  z-index: 10;
}

.card::before {
  content: "";
  position: absolute;
  width: 900px;
  height: 900px;
  background: radial-gradient(var(--clr), transparent, transparent);
  top: var(--y);
  left: var(--x);
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: 0.5s, top 0s, left 0s;
}

.card:hover:before {
  opacity: 1;
}

.card::after {
  content: "";
  position: absolute;
  inset: 1px;

}
</style>