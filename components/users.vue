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

const UBadge = resolveComponent('UBadge')

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
    cell: ({ row }) => {
      const color = {
        active: 'success' as const,
        inactive: 'error' as const
      }[row.getValue('status') as string]

      return h(UBadge, { class: 'capitalize', variant: 'subtle', color }, () =>
          row.getValue('status')
      )
    }
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