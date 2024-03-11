<script>
import axios from 'axios';
import { ref } from 'vue';

export default {
  name: 'app',
  props: {},
  data() {
    return {
      data: {
        name: '',
        city: '',
        temp: '',
        cloud: '',
        country: '',
      },
      searchError: '',
    };
  },
  methods: {
    async getApi() {
      const apiKey = '2a578b44bda5bbfbfec69e9d2bd19fd0';
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${this.data.city}&units=imperial&appid=${apiKey}`
        );
        console.log(response.data);
        this.data.name = response.data.name;
        this.data.temp = response.data.main.temp;
        this.data.cloud = response.data.weather[0].main;
        this.data.country = response.data.sys.country;
        this.searchError = ''; // Reset searchError on successful fetch
      } catch (error) {
        console.error('Error fetching data:', error);
        this.searchError = 'place you are seaching for incoreect please serch correct place'; 
      }
    },
  },
};
</script>

<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative" >
      <input
        v-model="data.city"
        @input="getApi"
        type="text"
        placeholder="search for a city"
        class="py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary outline-none"
      />
      <p v-if="searchError" class="text-red-600">{{ searchError }}</p> </div>

    <div v-if="!searchError">
      <div class="flex flex-col items-center text white py-12">
        <h1 class="text4xl mb-2">{{ data.name }}</h1>

      </div>
    </div>
  </main>
</template>
