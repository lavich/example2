<template>
  <v-card>
    <v-card-title class="primary white--text">
      <span class="headline">Добавление нового пользователя</span>
    </v-card-title>
    <v-divider></v-divider>

    <v-form v-model="valid" ref="form">
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field
                v-model="username"
                label="Логин для входа"
                hint="Должно быть уникальным"
                :rules="[v => !!v || 'Обязательное поле']"
                autofocus
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                v-model="password"
                label="Пароль для входа"
                type="password"
                :rules="[v => !!v || 'Обязательное поле']"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-select
                v-model="roleId"
                label="Категория прав пользователя"
                :items="roles"
                :rules="[v => !!v || 'Обязательное поле']"
                item-text="name"
                item-value="id"
              ></v-select>
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
import { mapActions, mapGetters } from 'vuex'

export default {

  name: 'NewUserForm',

  data () {
    return {
      username: '',
      password: '',
      roleId: '',
      valid: true
    }
  },

  computed: {
    ...mapGetters('users', {
      storeUsers: 'users',
      user: 'user'
    }),
    ...mapGetters('roles', [
      'roles',
      'role'
    ])
  },

  methods: {
    ...mapActions('users', [
      'create'
    ]),
    submit () {
      if (this.$refs.form.validate()) {
        this.create({
          username: this.username,
          password: this.password,
          role_id: this.roleId
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
