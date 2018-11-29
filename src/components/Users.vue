<template>
  <v-data-table
    :headers="headers"
    :items="users"
    hide-actions
  >
    <template slot="items" slot-scope="props">
      <td>{{ props.item.username }}</td>
      <td @click.stop="editableField = props.item.id">
        <div v-if="editableField === props.item.id && props.item.username !== username">
          <v-select
            :items="roles"
            item-text="name"
            item-value="id"
            autofocus
            @blur="editableField = null"
            :value="props.item.role_id"
          ></v-select>
        </div>
        <a v-else>{{ role(props.item.role_id).name }}</a>
      </td>
      <td>
        <v-btn
               icon
               flat
               :disabled="props.item.username === username"
               @click.stop="deleteUser(props.item.id)"
               color="primary">
          <v-icon dark>delete</v-icon>
        </v-btn>
      </td>
    </template>
    <template slot="footer">
      <td colspan="100%" class="text-xs-center">
        <v-dialog v-model="dialog" persistent max-width="500px">
          <v-btn slot="activator" color="primary" small>
            <v-icon dark>add</v-icon>
          </v-btn>
          <new-user-form @close="dialog = false"></new-user-form>
        </v-dialog>
      </td>
    </template>
  </v-data-table>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import NewUserForm from './NewUserForm'

export default {

  name: 'UsersTable',

  data () {
    return {
      editableField: null,
      dialog: false,
      headers: [
        { text: 'Имя', sortable: false, width: '40%' },
        { text: 'Права доступа', sortable: false, width: '40%' },
        { text: '', sortable: false }
      ]
    }
  },

  computed: {
    ...mapGetters('users', [
      'users'
    ]),
    ...mapGetters('user', [
      'username'
    ]),
    ...mapGetters('roles', [
      'roles',
      'role'
    ])
  },

  methods: {
    ...mapActions('users', [
      'delete',
      'update'
    ]),
    toggleFlag ({ id, flag }) {
      let user = this.user(id)
      user[flag] = !user[flag]
      this.update(user)
    },
    deleteUser (id) {
      this.delete(id)
    }
  },

  components: {
    NewUserForm
  }
}
</script>

<style scoped>

</style>
