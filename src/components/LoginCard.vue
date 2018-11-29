<template>
  <v-card class="my-cards">
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="username"
          label="Логин"
          :rules="rule"
          required
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="Пароль"
          type="password"
          :rules="rule"
          required
        ></v-text-field>
        <v-checkbox
          v-model="rememberMe"
          label="Запомнить меня?"
        ></v-checkbox>

        <v-btn
          class="primary"
          block
          :disabled="!valid"
          @click="submit"
        >
          Войти
        </v-btn>
      </v-form>
      <div v-show="error" class="error--text">{{errorMsg}}</div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {

  name: 'LoginCard',

  props: {
    error: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      valid: false,
      username: '',
      password: '',
      rule: [
        v => !!v || 'Не может быть пустым'
      ],
      rememberMe: true,
      errorMsg: 'Не верный логин или пароль!'
    }
  },

  methods: {
    submit () {
      const { username, password, rememberMe } = this
      this.$emit('submit', { username, password, rememberMe })
    }
  }
}
</script>

<style scoped>
  .my-cards {
    width: 300px;
  }
</style>
