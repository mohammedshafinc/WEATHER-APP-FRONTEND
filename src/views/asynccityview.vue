<template>
    <div class="flex flex-col flex-1 items-center">
      <!-- weather overview -->
      <div class="flex flex-col items-center text-white py-12 h-[350px]">
        <h1 class="text-4xl ">{{ route.params.city }}</h1>
        <p class="text-6xl mt-2">{{ Math.round(weatherData.data.main.temp) }}&deg</p>
        <div class="text-center mt-4">Feels like   {{ Math.round(weatherData.data.main.feels_like) }}&deg</div>
        <!-- <p>{{ p }}</p> -->
        <div class="capitalize">
          {{ weatherData.data.weather[0].description }}
          <img class="w-[150px] h-auto" :src="`http://openweathermap.org/img/wn/${weatherData.data.weather[0].icon}@2x.png`">
        </div>
      </div>
      <hr class="border-white border-opacity-10 border w-full">
      <!-- daily weather forecast -->
      <!-- <div class="max-w-screen-md w-full py-12">
        <div class="mx-8 text-white">
          <h2 class="mb-4">Daily Weather</h2>
          <div class="flex gap-10 overflow-x-scroll">
            <div v-for="daildata in dailyForecasts " :key="daildata.date">
                <p class="text-md whitespace-nowrap">{{ daildata.date }}</p>
                <img class="w-[150px] h-auto" :src="`http://openweathermap.org/img/wn/${daildata.forecast.weather[0].icon}@2x.png`">
                <p class="text-xl">{{ Math.round(daildata.forecast.main.temp) }}&deg</p>
            </div>
          </div>
        </div>
      </div> -->


      <!-- weekly -->

      <div class="max-w-screen-md w-full py-12">
        <div class="mx-8 text-white">
          <h2 class="mb-4">Day Forecast</h2>
        
            <div v-for="daildata in dailyForecasts " :key="daildata.date" class="flex items-center">
                <p class="flex-1">
                  {{ new Date(daildata.date).toLocaleDateString('en-US', {weekday: 'long'}) }}
                </p>
                <img class="w-[50px] h-[50px] object-cover" :src="`http://openweathermap.org/img/wn/${daildata.forecast.weather[0].icon}@2x.png`">
                <div class="flex gap-2 flex-1 justify-end">
                  <p>H:{{ Math.round(daildata.forecast.main.temp_max) }}</p>
                  <p>L:{{ Math.round(daildata.forecast.main.temp_min) }}</p>
                </div>
            </div>
          
        </div>
      </div>
    </div>
</template>

<script setup>
import axios from "axios";
import { computed } from "vue";
import { useRoute } from "vue-router";
import {ref} from 'vue'

const route = useRoute();

const getWeatherData = async () => {
    try {
        console.log(route.query.lat);
        console.log(route.query.long);
        const api_key = "2a578b44bda5bbfbfec69e9d2bd19fd0";
      
        const weatherData = await axios.get(
            ` https://api.openweathermap.org/data/2.5/weather?lat=${route.query.lat}&lon=${route.query.long}&appid=${api_key}&units=metric `
        );
        
        return weatherData
    } catch (error) {
        console.log(error);
    }
    

};

// forecasting daily weather

const dailyWeatherApi = async ()=>{
  try {
    
    // console.log(route.params.city);
    const city = route.params.city
   
    console.log(city);
    const api_key = "2a578b44bda5bbfbfec69e9d2bd19fd0";
    const dailyweather = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${api_key}&units=metric  `
        )
    return dailyweather
  } catch (error) {
    console.log(error);
  }
}

const dailyForcast = await dailyWeatherApi()
console.log(dailyForcast);
const data = dailyForcast.data.list; // Assuming this is your array of forecast data
const dailyForecastData = dailyForcast.data.list;

// Group data by date
const dailyData = dailyForecastData.reduce((acc, current) => {
  const date = new Date(current.dt * 1000).toLocaleDateString();
  acc[date] = acc[date] || [];
  acc[date].push(current);
  return acc;
}, {});

// Extract the first entry (morning/daytime forecast) for each day
const dailyForecasts = Object.entries(dailyData).map(([date, dayData]) => {
  return { date, forecast: dayData[0] };
});

console.log('daily',dailyForecasts);




const weatherData = await getWeatherData();
console.log(weatherData);
</script>
