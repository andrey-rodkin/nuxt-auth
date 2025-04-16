<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
})

const users = await $fetch('/api/users', {
  method: 'GET',
})

</script>

<template>
  <Header />

  <UTable :data="users" />
</template>
