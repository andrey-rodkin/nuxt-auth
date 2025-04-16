<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
})
</script>

<template>
  <Header />
  <Users />
</template>
