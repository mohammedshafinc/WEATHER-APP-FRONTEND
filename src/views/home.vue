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
                        @click="showcity(searchresult)"
                    >
                        {{ searchresult.place_name }}
                        
                    </li>
                </template>
            </ul>
            <!-- <p  class="text-red-600">{{ searchError }}</p>  -->
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


// show city function

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
