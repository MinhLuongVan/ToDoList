<template>
  <form @submit.prevent="handlLogin">
    <div class="container-login">
      <h2>Đăng nhập</h2>
      <input
        type="text"
        v-model="username"
        required
        placeholder="Vui lòng nhập username"
      />
      <input
        type="password"
        v-model="password"
        required
        placeholder="Vui lòng nhật mật khẩu"
      />
      <button class="btn-Login">Đăng Nhập</button>
      <span>or</span>
      <button class="btn-login" @click="router.push('/')">Đăng ký</button>
    </div>
  </form>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
export default {
  name: 'Login',
  setup() {
    const router = useRouter();
    const username = ref('');
    const password = ref('');
    const handlLogin = async () => {
      try {
        const loginForm = {
          username: username.value,
          password: password.value
        };
        console.log(loginForm);
        const res = await axios.post(
          'http://localhost:8000/i1/auth/login',

          loginForm
        );
        console.log('token', res.data.data.Token);
        localStorage.setItem('token', res.data.data.Token);
        console.log('login', res.data);
        if (res.data.success === true) {
          router.push('/todolist');
        } else {
          console.log('Sai username hoặc password');
        }
      } catch (error) {
        console.log(error);
      }
    };
    return {
      router,
      handlLogin,
      username,
      password
    };
  }
};
</script>

<style>
.container-login {
  width: 300px;
  height: 310px;
  margin: 150px auto;
  border-radius: 5px;
  border: 2px solid #bdbdbd;
}
input[type='text'] {
  width: 80%;
  height: 30px;
  margin-top: 25px;
  margin-left: 30px;
  padding-left: 12px;
  outline: none;
  border: 2px solid #bdbdbd;
  border-radius: 5px;
}
input[type='password'] {
  width: 80%;
  height: 30px;
  margin-top: 25px;
  margin-left: 30px;
  padding-left: 12px;
  outline: none;
  border: 2px solid #bdbdbd;
  border-radius: 5px;
}
.btn-Login {
  width: 80%;
  height: 30px;
  margin-left: 30px;
  color: white;
  background-color: blue;
  font-size: 14px;
  border: 2px solid blue;
  border-radius: 5px;
  margin-top: 30px;
}
.btn-Login:hover {
  cursor: pointer;
}
</style>
