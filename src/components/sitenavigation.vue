<template>
    <header class="sticky top-0 bg-weather-primary shadow-lg">
        <nav
            class="container flex flex-col sm:flex-row items-start gap-4 text-white py-6"
        >
            <RouterLink :to="{ name: 'home' }">
                <div class="flex items-center gap-3">
                    <i class="fa-solid fa-sun text-2xl"></i>
                    <p class="text-2xl">Clime</p>
                </div>
            </RouterLink>

            <div class="flex gap-3 flex-1 justify-end">
                <i
                    class="fa-solid fa-plus text-xl hover:text-weather-secondary duration-150 cursor-pointer"
                    @click="addcity"
                 v-if = route.query.preview
                ></i>
            </div>
        </nav>
    </header>
</template>

<script setup>
import { RouterLink, useRoute, useRouter } from "vue-router";
import { ref } from 'vue'
import { uid } from 'uid'

const savedCities = ref([])
const route = useRoute()
const router = useRouter()
const addcity = () => {
if(localStorage.getItem('savedCities')) {
    savedCities.value = JSON.parse(localStorage.getItem('savedCities'))
}

const location = {
    id:uid(),
    state:route.params.state,
    city:route.params.city,
    coords: {
        lat:route.query.lat,
        long:route.query.long
    }
}
savedCities.value.push(location)
localStorage.setItem('savedCities', JSON.stringify(savedCities.value))
}

let query = Object.assign({}, route.query)
delete query.preview;
// router.replace({query})
</script>
