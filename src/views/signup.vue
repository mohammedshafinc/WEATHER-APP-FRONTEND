<!-- SignUpForm.vue -->
<script setup>
import axios from "axios";
import {ref} from 'vue'
import router from "@/router";


const fullName = ref('');
const email = ref('');
const password = ref('');


function goToLogin(){
    router.push('/login')
}

async function signup() {
    try {
        const response = await axios.post("http://localhost:3000/graphql", {
            query: `
            mutation {
                addUser(fullName: "${fullName.value}", email: "${email.value}", password: "${password.value}") {
                id
                fullName
                email

                }
            }
            `,
            variables: {
                fullName: fullName.value,
                email: email.value,
                password: password.value,
            },
        });
        console.log(response);

        if (response.data.errors) {
            console.log("Error in signup: " + response.data.errors[0].message);
        } else {
            
            console.log(router)
        router.push('/home')
            console.log("user added succesfully", response.data.data.addUser);
        }
        // Reset form after successful signup
    } catch (error) {
        console.error(error);
    }
}

//   export default {
//     data() {
//       return {
//         fullName: '',
//         email: '',
//         password: '',
//       };
//     },
//     methods: {

//     },
//   };
</script>

<template>
    <div class="container mx-auto px-4 py-8">
      <h2 class="text-3xl font-bold text-center mb-8">Sign Up</h2>
      <form @submit.prevent="signup" class="flex flex-col space-y-4">
        <div class="flex items-center">
          <label for="fullName" class="w-1/3 text-right mr-4">Username:</label>
          <input type="text" id="fullName" v-model="fullName" required class="w-full bg-gray-100 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div class="flex items-center">
          <label for="email" class="w-1/3 text-right mr-4">Email:</label>
          <input type="email" id="email" v-model="email" required class="w-full bg-gray-100 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div class="flex items-center">
          <label for="password" class="w-1/3 text-right mr-4">Password:</label>
          <input type="password" id="password" v-model="password" required class="w-full bg-gray-100 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div class=" flex justify-center gap-4 items-center">
            <button type="submit" class="w-[100px] ml-28 py-2 text-center bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">

                Submit
            </button>
            <a>have account <span class="text-white cursor-pointer ml-1" @click.prevent="goToLogin">Login</span></a>
        </div>
      </form>
    </div>
  </template>
  

<style scoped>
/* Add your styles here */
</style>
