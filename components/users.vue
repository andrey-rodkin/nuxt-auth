<script setup lang="ts">
import type { TableColumn } from '#ui/components/Table.vue'

type Status ='active' | 'inactive'

type User = {
  id: string,
  name: string,
  surname: string,
  email: string,
  status: Status,
  created: string
}

const users: User[] = await $fetch('/api/users', {
  method: 'GET',
})

const statuses = [...new Set(users.map(({status}) => status.toUpperCase()))]

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

      return h(UBadge, { class: 'uppercase', variant: 'subtle', color }, () =>
          row.getValue('status')
      )
    },
    filterFn: 'equalsString'
  },
  {
    accessorKey: 'created',
    header: 'Дата регистрации',
  }
]

const table = useTemplateRef('table')

const columnFilters = ref([
  {
    id: 'status',
    value: ''
  }
])

</script>

<template>
  <div class="p-4">
    <div class="flex gap-4">
      <USelect
          :model-value="table?.tableApi?.getColumn('status')?.getFilterValue() as Status | undefined"
          :items="statuses"
          @update:model-value="table?.tableApi?.getColumn('status')?.setFilterValue($event)"
          class="w-48 capitalize" />

      <UButton
          @click="table?.tableApi?.getColumn('status')?.setFilterValue('')"
          :variant="'ghost'"
      >Очистить</UButton>
    </div>

    <UTable ref="table" :data="users" :columns="columns" v-model:column-filters="columnFilters"/>
  </div>
</template>