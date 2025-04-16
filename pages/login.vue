<script setup lang="ts">
import * as z from 'zod'

const { fetch: refreshSession } = useUserSession()

const schema = z.object({
  email: z.string().email('Введите email'),
  password: z.string().min(8, 'Введите пароль')
})

type Schema = z.output<typeof schema>

const credentials = reactive<Schema>({
  email: '',
  password: ''
})

const toast = useToast()

async function login() {
  $fetch('/api/login', {
    method: 'POST',
    body: credentials
  })
      .then(async () => {
        await refreshSession()
        await navigateTo('/')
      })
      .catch(() => toast.add({
        description: 'Введены неверные данные авторизации. Попробуйте ещё раз',
        color: 'error'
      }))
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <UForm :schema="schema" :state="credentials" class="space-y-4" @submit.prevent="login">
      <UFormField label="Email" name="email">
        <UInput v-model="credentials.email" />
      </UFormField>

      <UFormField label="Password" name="password">
        <UInput v-model="credentials.password" type="password" />
      </UFormField>

      <UButton type="submit">
        Вход
      </UButton>
    </UForm>
  </div>
</template>
