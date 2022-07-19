<template>
  <div class="generality">
    <nav class="navbar navbar-light bg-light">
      <div class="container-fluid">
        <h1 style="padding-left: 20px">ListToDo</h1>

        <ul class="list-item">
          <li class="list-item-link">Home</li>
          <li class="list-item-link" @click="handlLogout()">Logout</li>
        </ul>
      </div>
    </nav>
    <div class="container">
      <h2>Todos</h2>
      <input type="text" v-model="title" required placeholder="Add todo" />
      <button @click="handlAddToDo" v-if="!isUpdate" class="btn-addtodo">
        Add
      </button>
      <button @click="actionUpdateTodo" v-else class="btn-update">
        Update
      </button>

      <table class="table table-bordered mt-5">
        <thead>
          <tr>
            <th scope="col" class="text-center" style="font-size: 20px">
              Title
            </th>
            <th scope="col" class="text-center" style="font-size: 20px">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in todos" :key="item._id">
            <td style="font-size: 18px">{{ item.title }}</td>
            <td class="text-center">
              <button @click="handlUpdate(item)" class="btn-update">
                Update
              </button>

              <button @click="handlDelete(item._id)" class="btn-delete">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
export default {
  name: 'ListToDo',
  setup() {
    const title = ref('');
    const todos = ref([]);
    const isUpdate = ref(false);

    const todoUpdate = ref();
    const router = useRouter();
    // getAll todo
    const getAllToDo = async () => {
      try {
        const accessToken = await localStorage.getItem('token');
        const res = await axios.get(`http://localhost:8000/td1/list`, {
          headers: {
            token: `Bearer ${accessToken}`
          }
        });
        todos.value = res.data;
        console.log('res', res.data);
      } catch (error) {
        console.log(error);
      }
    };
    onMounted(() => {
      getAllToDo();
    });
    // creat todo
    const handlAddToDo = async (event) => {
      event.preventDefault();
      try {
        const accessToken = await localStorage.getItem('token');
        const addToDo = {
          title: title.value
        };
        const res = await axios.post(
          'http://localhost:8000/td1/list/todo',
          addToDo,
          {
            headers: {
              token: `Bearer ${accessToken}`
            }
          }
        );
        console.log('res', res.data);
        getAllToDo();
        title.value = '';
      } catch (err) {
        console.log(err);
      }
    };
    // delete todo
    const handlDelete = async (id) => {
      try {
        const accessToken = await localStorage.getItem('token');
        const todo = axios.delete(`http://localhost:8000/td1/list/${id}`, {
          headers: {
            token: `Bearer ${accessToken}`
          }
        });
        console.log('todo', todo);
        getAllToDo();
      } catch (error) {
        console.log(error);
      }
    };
    // Update todo
    const handlUpdate = async (data) => {
      if (data) {
        todoUpdate.value = data;
        console.log(data);
        title.value = data.title;
        isUpdate.value = true;
      }
    };
    const actionUpdateTodo = async () => {
      try {
        const accessToken = await localStorage.getItem('token');
        const res = await axios.put(
          `http://localhost:8000/td1/list/${todoUpdate.value._id}`,
          {
            title: title.value
          },
          {
            headers: {
              token: `Bearer ${accessToken}`
            }
          }
        );
        console.log('res', res.data);
      } catch (error) {
        console.log(error);
      }
      title.value = '';
    };

    const handlLogout = async () => {
      try {
        await localStorage.removeItem('token');
        router.push('/login');
      } catch (error) {
        console.log(error);
      }
    };
    return {
      title,
      handlAddToDo,
      todos,
      handlDelete,
      handlUpdate,
      isUpdate,
      actionUpdateTodo,
      handlLogout
    };
  }
};
</script>

<style>
.list-item {
  display: flex;
  list-style: none;
}
.list-item-link {
  padding: 12px 20px 8px 12px;
  margin-top: 12px;
  font-size: 20px;
}
h1 {
  padding: 10px 0 0;
  text-align: center;
  color: blue;
}
.container {
  width: 650px;
  height: auto;
  margin: 100px auto;
  border: 2px solid #bdbdbd;
  border-radius: 5px;
}
.btn-addtodo {
  width: 9%;
  height: 30px;
  margin: 0 4px;
  border: 2px solid blue;
  border-radius: 5px;
  background: blue;
  color: white;
}
.btn-update {
  margin-right: 20px;
  border: 2px solid blue;
  border-radius: 5px;
  background: blue;
  color: white;
}
.btn-delete {
  margin-left: 20px;
  border: 2px solid red;
  border-radius: 5px;
  background: red;
  color: white;
}
.btn-Logout {
  border: 2px solid #777777;
  border-radius: 2px;
  background: #777777;
  color: white;
  margin: 15px 0px 20px 560px;
}
</style>
