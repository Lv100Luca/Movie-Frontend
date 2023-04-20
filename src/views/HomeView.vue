<script setup lang="ts">

import {onMounted, ref} from "vue";
import MovieApi from "@/model/MovieApi";
import type Movie from "@/model/Movie";

const listOfMovies = ref<Movie[]>([]);
const listOfMoviesByName = ref<Movie[]>([]);
const movieName = ref<string>("");
const movieNameGet = ref<string>("");

onMounted(() => {
    getMovies();
});

function getMovies() { //todo rename to updateMovies and run onMounted
    console.log("Getting");
    MovieApi.ApiGet().then(response => listOfMovies.value = response);
}

function addMovie(name: string) {
    console.log("Posting");
    MovieApi.ApiPost(name).then(getMovies);
    movieName.value = "";
    // getMovies();
}

function getMovieByName(name: string) {
    console.log("getByName: " + name)
    MovieApi.ApiGetByName(name).then(movies => listOfMoviesByName.value = movies);
}

function getMovieById(id: number) {
    console.log("getByID: " + id);
    MovieApi.ApiGetById(id);
}

</script>

<template>
    <div class="home-wrapper">
        <h1 class="header">Movie API Test</h1>
        <div class="body">
            <div class="movie-get">
                <button class="movie-get-button" @click="getMovies()">Get Movies</button>
                <div class="movie-get-wrapper">
                    <div v-for="movie in listOfMovies">
                        <label class="movie-get-label">{{ movie }}</label>
                    </div>
                </div>
            </div>
            <div class="movie-post">
                <div class=movie-post-request>
                    <input @keydown.enter="addMovie(movieName)" v-model="movieName" placeholder="Name:" type="text"
                           class="movie-post-text-input">
                    <button class="movie-post-button" @click="addMovie(movieName)">add Movie</button>
                </div>
                <!--                <label class="movie-post-response-code">-->
                <!--                    code-->
                <!--                </label>-->
            </div>
            <div class=movie-get-by-Name>
                <input type="text" v-model="movieNameGet" placeholder="Name:">
                <button @click="getMovieByName(movieNameGet)">get Movie</button>
                <div class="movie-get-wrapper">
                    <div v-for="movieName in listOfMoviesByName">
                        <label class="movie-get-label">{{ movieName }}</label>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
.home-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-items: center;
}

.body {
    display: flex;
    flex-direction: column;
    gap: 1em;
}

.movie-get {
    display: flex;
    flex-direction: column;
}

.movie-get-wrapper {
    border: gray 2px solid;
}


</style>