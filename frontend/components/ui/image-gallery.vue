<!--<template>-->
<!--  <div class="flex justify-center items-center h-[80vh]">-->
<!--    <div-->
<!--      class="container relative flex justify-center items-center gap-5 flex-wrap w-full h-full"-->
<!--    >-->
<!--      <div style="&#45;&#45;clr:#0f0;" class="card overflow-hidden relativ w-10 h-12 rounded-xl"></div>-->
<!--      <div style="&#45;&#45;clr:#ff0;" class="card overflow-hidden relativ w-10 h-12 rounded-xl"></div>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->

<!--onMounted(() => {-->


<!--  let cards = document.querySelectorAll(".card");-->

<!--  cards.forEach(card => {-->
<!--    card.onmousemove = (e) => {-->
<!--      let x = e.pageX - card.offsetLeft;-->
<!--      let y = e.pageY - card.offsetTop;-->

<!--      card.style.setProperty("&#45;&#45;x", x + "px");-->
<!--      card.style.setProperty("&#45;&#45;y", y + "px");-->
<!--    }-->
<!--  })-->
<!--})-->

<!--</script>-->

<!--<style scoped>-->
<!--.container .card::before {-->
<!--  content: "";-->
<!--  position: absolute;-->
<!--  top: var(&#45;&#45;y);-->
<!--  left: var(&#45;&#45;x);-->
<!--  transform: translate(-50%, -50%);-->
<!--  background: radial-gradient(var(&#45;&#45;clr), transparent, transparent);-->
<!--  width: 700px;-->
<!--  height: 700px;-->
<!--  opacity: 0;-->
<!--  transition: 0.5s, top 0s, left 0s;-->
<!--}-->

<!--.container .card:hover::before {-->
<!--  opacity: 1;-->
<!--}-->

<!--.container .card::after {-->
<!--  content: "";-->
<!--  position: absolute;-->
<!--  inset: 2px;-->
<!--  background: rgba(45, 45, 45, 0.75);-->
<!--}-->
<!--</style>-->


<template>
  <h1>Image gallery</h1>
  <UButton label="Qo'shish" color="blue"/>
</template>