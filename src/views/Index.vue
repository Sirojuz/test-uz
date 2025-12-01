<template>
  <div class="home">
    <h1 class="mt-4">Aktiv Testlar</h1>
    <div style="width: 300px">
      <router-link to="/test" style="text-decoration: none">
        <testCard />
      </router-link>
    </div>
  </div>
</template>

<script>
import testCard from "@/components/test-card.vue";

export default {
  components: {
    testCard,
  },
};
</script>

<style scoped></style>
