<template>
  <div class="home">
    
      <div class="container">
        <h2 class="mt-3" style="color: #fff">{{ $t('main.wordingWelcome') }} <span style="color: #ed2939">Cokctailspedia</span>,<br> {{ $t('main.welcome1') }} <br> {{ $t('main.welcome2') }} </h2>
        <div class="d-flex justify-content-center mt-4">
          <input class="form-control input-search" type="search" :placeholder="$t('main.searchWording')" aria-label="Search" v-model="searchInput" @keyup.enter="searchCocktail">
          <button class="btn btn-outline-success ml-2" type="submit" @click="searchCocktail">{{ $t('main.btnSearch') }}</button>
        </div>
        
        <div class="lds-grid mt-4" v-if="loading"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>

        <div class="row row-cols-1 row-cols-md-4 row-cols-sm-3  mt-4" v-else>
          <div v-for="(cocktail) in listCocktails" :key="cocktail.idDrink">
            <router-link tag="div" :to=" '/cocktail/' + cocktail.idDrink" class="col mb-4">
              <div class="card cocktail-box">
                <img :src="cocktail.strDrinkThumb" class="card-img-top img-fluid">
                <div class="card-body">
                  <h5 class="card-title">{{cocktail.strDrink}}</h5>
                  <p class="card-text mb-3">{{cocktail.strCategory}}</p>
                </div>
              </div>
            </router-link>
          </div>
          <h5 class="mx-auto text-white" v-if="!listCocktails && checkCocktail">[Data not found]</h5>
        </div>

        <h2 class="text-white">Recommendation</h2>
        
        <div class="lds-grid mt-4" v-if="loadingRecom"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>

        <div v-for="(cocktail,index) in recommendations" :key="index" v-else>
          <router-link tag="div" :to=" '/cocktail/' + cocktail.idDrink " class="card mx-auto cocktail-box mb-4" style="width: 18rem;">
            <img :src="cocktail.strDrinkThumb" class="card-img-top" alt="...">
            <div class="card-body">
              <p class="card-text">{{cocktail.strDrink}}</p>
            </div>
          </router-link>
        </div>

      </div>

      <LangSwitch class="mb-4" />

  </div>
  
</template>

<script>
import axios from "axios"
import LangSwitch from "../components/LangSwitch"

export default {
  name: "Home",
  metaInfo: {
    title: 'Cocktailspedia',
    titleTemplate: '%s | cocktail'
  },
  components: {
    LangSwitch
  },
  data() {
    return {
      searchInput: "",
      listCocktails: null,
      loading: false,
      recommendations: null,
      loadingRecom: true,
      checkCocktail : false,
      langLocal: this.$route.params.lang
    }
  },
  methods: {
    searchCocktail() {
      this.checkCocktail = true
      this.loading = true
      let keywoard = this.searchInput.toLowerCase()
      axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${keywoard}`)
        .then((res) => {
          this.listCocktails = res.data.drinks
          this.loading = false
        })
        .catch(err => console.log(err))
    }
  },
  mounted() {
    axios.get(`https://www.thecocktaildb.com/api/json/v1/1/random.php`)
        .then((res) => {
          this.recommendations = res.data.drinks
          this.loadingRecom = false
        })
        .catch(err => console.log(err))
  }
};
</script>


