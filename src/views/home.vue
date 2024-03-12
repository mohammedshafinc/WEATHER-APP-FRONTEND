<template>
    <main class="container text-white">
        <div class="pt-4 mb-8 relative">
            <input
                v-model="search"
                @input="getSearch"
                type="text"
                placeholder="search for a city"
                class="py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary outline-none focus:shadow-[0px_1px_0_0_#004E71]"
            />
            <ul
                v-if="mapboxresult"
                class="absolute bg-weather-secondary text-white w-full shadow-md py-2 px-1 top[66px]"
            >
                <p v-if="errorSearch">
                    sorry something went wrong ! please try again
                </p>
                <p v-if="!servererror && mapboxresult.length === 0">
                    no place available please enter correct place
                </p>
                <template v-else>
                    <li
                        v-for="searchresult in mapboxresult"
                        :key="searchresult.id"
                        class="py-2 cursor-pointer"
                        @click="showCity(searchresult)"
                    >
                        {{ searchresult.place_name }}
                    </li>
                </template>
            </ul>
            <!-- <p  class="text-red-600">{{ searchError }}</p>  -->
        </div>
        <div class="flex flex-col gap-4">
            <Suspense>
                <citylistVue />
                <template #fallback>
                    <div role="status">
                        <svg
                            aria-hidden="true"
                            class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                            />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                            />
                        </svg>
                        <span class="sr-only">Loading...</span>
                    </div>
                </template>
            </Suspense>
            <template v-if="isLoggedIn">
        <button @click="logout">Logout</button>
      </template>
        </div>

        <div>
            <div class="flex flex-col items-center text white py-12">
                <!-- <h1 class="text4xl mb-2">{{ data.name }}</h1> -->
            </div>
        </div>
    </main>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import citylistVue from "@/components/citylist.vue";

const router = useRouter();

const isLoggedIn = ref(false);
const loggedInUser = ref(null);
const logout = async () => {
  
  isLoggedIn.value = false;
  loggedInUser.value = null;
  router.push('/'); 
}

// show city function

const showCity = (searchresult) => {
    console.log(searchresult);
    const [city, state] = searchresult.place_name.split(",");
    router.push({
        name: "city",
        params: { state: state.replaceAll(" ", " "), city: city },
        query: {
            lat: searchresult.geometry.coordinates[1],
            long: searchresult.geometry.coordinates[0],
            preview: true,
        },
    });
    console.log(city, state);
};

const mapboxapi = `pk.eyJ1Ijoic2hhZmluMjEiLCJhIjoiY2x0bjBwODRqMDFmOTJsbnk1NHU2cHVpMiJ9.xRsOX0hLn_C3hziaNpYcIw`;
const search = ref("");
//   timeout for search
const queryTime = ref(null);
// store mapbox search result
const mapboxresult = ref(null);
// variable to store error

const errorSearch = ref(null);

const getSearch = () => {
    queryTime.value = setTimeout(async () => {
        // clear settimeout =
        clearTimeout(queryTime.value);
        if (search.value !== "") {
            try {
                const result = await axios.get(
                    `https://api.mapbox.com/geocoding/v5/mapbox.places/${search.value}.json?access_token=${mapboxapi}&types=place`
                );
                mapboxresult.value = result.data.features;
                console.log(mapboxresult.value);
            } catch {
                errorSearch.value = true;
            }
            return;
        }
        mapboxresult.value = null;
    }, 300);
};
</script>
