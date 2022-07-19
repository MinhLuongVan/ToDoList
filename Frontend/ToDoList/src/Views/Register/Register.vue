<template>
  <form @submit.prevent="handlRegister">
    <div class="container-register">
      <h2>Đăng ký</h2>
      <input
        type="text"
        v-model="fullname"
        required
        placeholder="Vui lòng nhập họ tên"
      />
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
      <button class="btn-register">Đăng ký</button>
      <span>or</span>
      <button class="btn-login" @click="router.push('/login')">
        Đăng nhập
      </button>
    </div>
  </form>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
export default {
  name: 'Register',
  setup() {
    const fullname = ref('');
    const username = ref('');
    const password = ref('');
    const router = useRouter();

    const handlRegister = async (event) => {
      event.preventDefault();
      try {
        const registerForm = {
          fullname: fullname.value,
          username: username.value,
          password: password.value
        };
        const res = await axios.post(
          'http://localhost:8000/i1/auth/register',
          registerForm
        );
        console.log('res', res.data);
      } catch (error) {
        console.log(error);
      }
      // console.log({fullname,username,password});
      router.push('/login');
    };
    return { fullname, username, password, handlRegister, router };
  }
};
</script>

<style>
h2 {
  margin: 10px 0;
  text-align: center;
  color: blue;
  font-weight: 500;
}
.container-register {
  width: 300px;
  height: 370px;
  margin: 140px auto;
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
.btn-register {
  width: 80%;
  height: 30px;
  margin-left: 30px;
  color: white;
  background-color: blue;
  font-size: 14px;
  border: 2px solid blue;
  border-radius: 5px;
  margin-top: 30px;
  cursor: pointer;
}
span {
  margin-left: 140px;
}
.btn-login {
  width: 80%;
  height: 30px;
  margin-left: 30px;
  color: white;
  background-color: blue;
  font-size: 14px;
  border: 2px solid blue;
  border-radius: 5px;
  margin-top: 3px;
  cursor: pointer;
}
</style>
