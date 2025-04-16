<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
})

const { user, clear: clearSession } = useUserSession()

async function logout() {
  await clearSession()
  await navigateTo('/login')
}
</script>

<template>
  <div v-if="user">
    <h1>Welcome {{ user.name }}</h1>
    <UButton @click="logout">Logout</UButton>
  </div>
</template>
