<script setup lang="ts">
const users = await $fetch('/api/users', {
  method: 'GET',
})

</script>

<template>
  <UTable :data="users" />
</template>