<template>
  <v-data-table
    :headers="headers"
    :items="roles"
    hide-actions
  >
    <template slot="items" slot-scope="props">
      <td @click.stop="editableField = props.item.id">
        <div v-if="editableField === props.item.id">
          <v-text-field
            :value="props.item.name"
            autofocus
            @change="updName"
            @blur="editableField = null"
          ></v-text-field>
        </div>
        <a v-else>{{ props.item.name }}</a>
      </td>
      <td><v-checkbox hide-details :disabled="props.item.id === selfRole.id" :input-value="props.item.admin" @click.stop="toggleFlag({id: props.item.id, flag: 'admin'})"></v-checkbox></td>
      <td><v-checkbox hide-details :input-value="props.item.create" @click.stop="toggleFlag({id: props.item.id, flag: 'create'})"></v-checkbox></td>
      <td><v-checkbox hide-details :input-value="props.item.read" @click.stop="toggleFlag({id: props.item.id, flag: 'read'})"></v-checkbox></td>
      <td><v-checkbox hide-details :input-value="props.item.update" @click.stop="toggleFlag({id: props.item.id, flag: 'update'})"></v-checkbox></td>
      <td><v-checkbox hide-details :input-value="props.item.delete" @click.stop="toggleFlag({id: props.item.id, flag: 'delete'})"></v-checkbox></td>
    </template>
    <template slot="footer">
      <td colspan="100%" class="text-xs-center">
        <v-dialog v-model="dialog" persistent max-width="500px">
          <v-btn slot="activator" color="primary" small>
            <v-icon dark>add</v-icon>
          </v-btn>
          <new-role-form @close="dialog = false"></new-role-form>
        </v-dialog>
      </td>
    </template>
  </v-data-table>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import NewRoleForm from './NewRoleForm'

export default {

  name: 'Roles',

  data () {
    return {
      dialog: false,
      editableField: null,
      headers: [
        { text: 'Имя', sortable: false },
        { text: 'Администратор', sortable: false },
        { text: 'Создание', sortable: false },
        { text: 'Просмотр', sortable: false },
        { text: 'Правка', sortable: false },
        { text: 'Удаление', sortable: false }
      ]
    }
  },

  computed: {
    ...mapGetters('user', {
      selfRole: 'role'
    }),
    ...mapGetters('roles', [
      'roles'
    ])
  },

  methods: {
    ...mapActions('roles', [
      'update'
    ]),
    toggleFlag ({ id, flag }) {
      let role = this.role(id)
      role[flag] = !role[flag]
      this.update(role)
    },
    updName (newName) {
      let role = this.role(this.editableField)
      role.name = newName
      this.update(role)
      this.editableField = null
    }
  },

  components: {
    NewRoleForm
  }
}
</script>

<style scoped>

</style>
