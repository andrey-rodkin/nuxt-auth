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

const users: User[] = (await useFetch('/api/users')).data.value as User[] || []

const createds = [...new Set(users.map(({created}) => created.split(' ')[0]).sort())]
const emails = users.map(({email}) => email)

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
    filterFn: 'arrIncludesSome'
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
  },
  {
    accessorKey: 'created',
    header: 'Дата регистрации',
  }
]

const table = useTemplateRef('table')

const columnFilters = ref([
  {
    id: 'created',
    value: ''
  },
  {
    id: 'email',
    value: []
  }
])

const clearFilters = () => {
  table?.value?.tableApi?.getColumn('created')?.setFilterValue('')
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
          :model-value="table?.tableApi?.getColumn('created')?.getFilterValue() as Status | undefined"
          :items="createds"
          :placeholder="'Выберите дату...'"
          @update:model-value="table?.tableApi?.getColumn('created')?.setFilterValue($event)"
          class="w-60"
      />

      <USelect
          :model-value="table?.tableApi?.getColumn('email')?.getFilterValue() as string[] | undefined"
          :items="emails"
          :placeholder="'Выберите один или несколько e-mail...'"
          multiple
          @update:model-value="table?.tableApi?.getColumn('email')?.setFilterValue($event)"
          class="w-full"
      />

      <UButton
          @click="clearFilters"
          :variant="'ghost'"
      >Очистить</UButton>
    </div>

    <UTable ref="table" :data="users" :columns="columns" :column-filters="columnFilters"/>
  </div>
</template>