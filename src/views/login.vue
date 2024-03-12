    <template>
        <div class="container mx-auto px-4 py-8">
        <h2 class="text-3xl font-bold text-center mb-8">Login</h2>
        <form @submit.prevent="loginSubmit" class="flex flex-col space-y-4">
            <div class="flex items-center">
            <label for="email" class="w-1/3 text-right mr-4">Email:</label>
            <input
                type="email"
                id="email"
                v-model="email"
                required
                class="w-full bg-gray-100 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            </div>
            <div class="flex items-center">
            <label for="password" class="w-1/3 text-right mr-4">Password:</label>
            <input
                type="password"
                id="password"
                v-model="password"
                required
                class="w-full bg-gray-100 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            </div>
            <div v-if="errorMessage" class="text-red-500 text-center mt-4">{{ errorMessage }}</div>
            <div class="flex justify-center gap-4 items-center">
            <button
                type="submit"
                class="w-[100px] ml-28 py-2 text-center bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
                Submit
            </button>
            <a>Don't have an account? <span class="text-white cursor-pointer ml-1" @click.prevent="goToSignup">Signup</span></a>
            </div>
            
        </form>
        </div>
    </template>
    
    <script>
    import axios from "axios";
    import router from '@/router'; // Assuming your router is imported correctly
    
    export default {
        name: "LoginForm",
        data() {
        return {
            email: "",
            password: "",
            errorMessage: "",
        };
        },
        methods: {
        async loginSubmit() {
            try {
            const response = await axios.post("http://localhost:3000/graphql", {
                query: `
                mutation {
                    loginuser(email: "${this.email}", password: "${this.password}") {
                    email
                    }
                }
                `,
            });
    
            if (response.data.errors) {
                this.errorMessage = response.data.errors[0].message;
            } else if (response.data.data.loginuser) {
                
            router.push('/home'); // Replace with your home route
            console.log(response.data.data);
                this.errorMessage = ""; // Clear any previous error messages
            } else {
                this.errorMessage = "Invalid login credentials"; // Handle unexpected response
            }
            } catch (error) {
            console.error("Login error:", error);
            this.errorMessage = "An error occurred. Please try again later."; // User-friendly error message
            }
        },
        goToSignup() {
            router.push('/'); // Assuming your signup route is the root path
        },
        },
    };
    </script>
    