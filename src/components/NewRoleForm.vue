<template>
  <v-card>
    <v-card-title class="primary white--text">
      <span class="headline">Добавление нового пользователя</span>
    </v-card-title>
    <v-divider></v-divider>

    <v-form v-model="valid" ref="form">
      <v-card-text>
        <v-container>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field
                v-model="name"
                label="Название категории прав доступа"
                hint="Имя роли"
                :rules="[v => !!v || 'Имя роли - Обязательное поле']"
                autofocus
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-checkbox hide-details label="Администратор" v-model="isAdmin"></v-checkbox>
              <v-checkbox hide-details label="Создание" v-model="isCreate"></v-checkbox>
              <v-checkbox hide-details label="Просмотр" v-model="isRead"></v-checkbox>
              <v-checkbox hide-details label="Правка" v-model="isUpdate"></v-checkbox>
              <v-checkbox hide-details label="Удаление" v-model="isDelete"></v-checkbox>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn flat @click="clear">Отмена</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="submit">Сохранить</v-btn>
      </v-card-actions>
    </v-form>

  </v-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {

  name: 'NewRoleForm',

  data () {
    return {
      name: '',
      isAdmin: false,
      isCreate: false,
      isRead: false,
      isUpdate: false,
      isDelete: false,
      valid: true
    }
  },

  methods: {
    ...mapActions('roles', [
      'create'
    ]),
    submit () {
      if (this.$refs.form.validate()) {
        let { name, isAdmin, isCreate, isRead, isUpdate, isDelete } = this
        this.create({
          name: name,
          create: isCreate,
          read: isRead,
          update: isUpdate,
          delete: isDelete,
          admin: isAdmin
        })
        this.clear()
      }
    },
    clear () {
      this.$refs.form.reset()
      this.$emit('close')
    }
  }
}
</script>

<style scoped>

</style>
