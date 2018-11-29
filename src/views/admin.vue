<template>
  <v-layout row wrap>
    <v-flex xs12 lg4 order-xs1 order-lg0>
      <div class="title">Пользователи</div>
      <users-table></users-table>
    </v-flex>
    <v-flex xs12 lg8 order-xs0 order-lg1>
      <div class="title">Категории прав доступа</div>
      <roles-table></roles-table>
    </v-flex>
  </v-layout>
</template>

<script>
import UsersTable from '@/components/Users'
import RolesTable from '@/components/Roles'
import { mapActions } from 'vuex'

export default {

  name: 'Admin',

  components: {
    UsersTable,
    RolesTable
  },

  data () {
    return {
    }
  },

  methods: {
    ...mapActions('users', {
      fetchUsers: 'fetch'
    }),
    ...mapActions('roles', {
      fetchRoles: 'fetch'
    }),
    init () {
      this.fetchUsers()
      this.fetchRoles()
    }
  },

  created () {
    this.init()
  }
}
</script>

<style scoped>

</style>
