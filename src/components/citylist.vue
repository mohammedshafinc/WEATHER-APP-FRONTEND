<template>
    <!-- <div v-for="city in savedCities" :key="city.id">
        <citycardVue :city="city"/>

    </div> -->
</template>

<script setup>
import  Axios  from 'axios';
import {ref} from 'vue'
import citycardVue from './citycard.vue';


const savedCities = ref([])

const getcities = async () => {
    if(localStorage.getItem('savedCities')) {
        savedCities.value = JSON.parse(localStorage.getItem('savedCities'))
  

    const request = []
    savedCities.value.forEach(async (city) =>{
        const api_key = "2a578b44bda5bbfbfec69e9d2bd19fd0";
        console.log(city.coords.lat);
        request.push(
          await  Axios.get(
                ` https://api.openweathermap.org/data/2.5/weather?lat=${city.coords.lat}&lon=${city.coords.long}&appid=${api_key}&units=metric `

            )
        )
         
    });
    
    const weatherData = await Promise.all(request);

    weatherData.forEach((value, index) => {
      savedCities.value[index].weather = value.data;
    });

}
}

// await getcities()
</script>

