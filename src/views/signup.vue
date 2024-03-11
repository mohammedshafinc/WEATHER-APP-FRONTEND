<!-- SignUpForm.vue -->
<script setup>
import axios from "axios";
import {ref} from 'vue'
import router from "@/router";


const fullName = ref('');
const email = ref('');
const password = ref('');

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
    <div>
        <h2>Sign Up</h2>
        <form @submit.prevent="signup">
            <div>
                <label for="fullName">Username:</label>
                <input type="text" id="fullName" v-model="fullName" required />
            </div>
            <div>
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="email" required />
            </div>
            <div>
                <label for="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    v-model="password"
                    required
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    </div>
</template>

<style scoped>
/* Add your styles here */
</style>
