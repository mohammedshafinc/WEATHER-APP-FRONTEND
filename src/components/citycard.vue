<template>
    <div class="flex py-6  px-3 bg-weather-secondary rounded-md shadow-md cursor-pointer">
        <div class="flex flex-col flex-1">
          <h2 class="text-xl">{{ city.city }}</h2>
          <h3 >{{ city.state }}</h3>
        </div>
        <div class="flex flex-col gap-2">
            <p class="text-xl self-end">
                {{ Math.round(city.weather.main.temp) }}
            </p>

        </div>
    </div>
</template>

<script setup>

defineProps({
    city: {
        type:Object,
        default:() => {}
    }
})

</script>

