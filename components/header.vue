<script setup lang="ts">
const { user, clear: clearSession } = useUserSession()

async function logout() {
  await clearSession()
  await navigateTo('/login')
}
</script>

<template>
  <div v-if="user" class="flex space-y-4 p-4 items-center justify-between">
    <h1 class="m-0">Добро пожаловать, {{ user.name }}!</h1>
    <UButton @click="logout">Logout</UButton>
  </div>
</template>