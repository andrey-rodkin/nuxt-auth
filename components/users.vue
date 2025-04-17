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
const emails = users.map(({email}) => email)

const UBadge = resolveComponent('UBadge')

const columns: TableColumn<User>[] = [
  {
    id: 'id',
    accessorKey: 'id',
    header: '#',
  },
  {
    id: 'name',
    accessorKey: 'name',
    header: 'Имя',
  },
  {
    id: 'surname',
    accessorKey: 'surname',
    header: 'Фамилия',
  },
  {
    id: 'email',
    accessorKey: 'email',
    header: 'E-mail',
    filterFn: 'arrIncludesSome'
  },
  {
    id: 'status',
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
    id: 'created',
    accessorKey: 'created',
    header: 'Дата регистрации',
  }
]

const table = useTemplateRef('table')

const columnFilters = ref([
  {
    id: 'status',
    value: ''
  },
  {
    id: 'email',
    value: []
  }
])

const clearFilters = () => {
  table?.value?.tableApi?.getColumn('status')?.setFilterValue('')
  table?.value?.tableApi?.getColumn('email')?.setFilterValue([])
}

onMounted(() => {
  // применяем фильтры при монтировании компонента
  table?.value?.tableApi?.setColumnFilters(columnFilters.value)
})

</script>

<template>
  <div class="p-4">
    <div class="flex gap-4">
      <USelect
          :model-value="table?.tableApi?.getColumn('status')?.getFilterValue() as Status | undefined"
          :items="statuses"
          :placeholder="'Выберите статус...'"
          @update:model-value="table?.tableApi?.getColumn('status')?.setFilterValue($event)"
      />

      <USelect
          :model-value="table?.tableApi?.getColumn('email')?.getFilterValue() as string[] | undefined"
          :items="emails"
          :placeholder="'Выберите один или несколько e-mail...'"
          multiple
          @update:model-value="($event) => table?.tableApi?.getColumn('email')?.setFilterValue($event || [])"
          class="w-2xl"
      />

      <UButton
          @click="clearFilters"
          :variant="'ghost'"
      >Очистить</UButton>
    </div>

    <UTable ref="table" :data="users" :columns="columns" :column-filters="columnFilters"/>
  </div>
</template>