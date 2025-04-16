<script setup lang="ts">
import type { TableColumn } from '#ui/components/Table.vue'

type User = {
  id: string,
  name: string,
  surname: string,
  email: string,
  status: 'active' | 'inactive',
  created: string
}

const users: User[] = await $fetch('/api/users', {
  method: 'GET',
})
const columns: TableColumn<User>[] = [
  {
    accessorKey: 'id',
    header: '#',
  },
  {
    accessorKey: 'name',
    header: 'Имя',
  },
  {
    accessorKey: 'surname',
    header: 'Фамилия',
  },
  {
    accessorKey: 'email',
    header: 'E-mail',
  },
  {
    accessorKey: 'status',
    header: 'Статус',
  },
  {
    accessorKey: 'created',
    header: 'Дата регистрации',
  }
]

</script>

<template>
  <UTable :data="users" :columns="columns"/>
</template>