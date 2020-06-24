<template>
    <div class="container">
        <div v-if="cocktail">
            <h1 class="title-coctail">{{cocktail.strDrink}}</h1>
            
            <div class="row">
                <div class="col-md-4">
                    <img :src="cocktail.strDrinkThumb" class=" img-fluid" style="border-radius: 10px">
                </div>
                <div class="col-md-8 align-self-center cocktail-instruction">
                    <h3 style="color: #ed2939">Instructions  </h3>
                    <p class="text-white">{{cocktail.strInstructions}}</p>
                </div>
            </div>

            <h3 class="mt-4" style="text-align: left; color: #ed2939">Ingredients : </h3>
            <div v-for="(ingredient, index) in ingredients" :key="ingredient">
                <div class="ingredient-box">
                    <p>{{index + 1}}. {{ingredient}}</p>
                </div>
            </div>

            <h3 class="mt-4" style="text-align: left; color: #ed2939">Measurments : </h3>
            <div v-for="(measurment, index) in measurments" :key="measurment">
                <div class="ingredient-box">
                    <p>{{index + 1}}. {{measurment}}</p>
                </div>
            </div>

        </div>

        <div class="lds-grid mt-4" v-if="!cocktail"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
</template>

<script>
import axios from "axios"

export default {
    name: "Cocktail",
    data() {
        return {
            id: this.$route.params.id,
            cocktail: null,
            ingredients: [],
            measurments: []
        }
    },
    created() {
        axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${this.id}`)
            .then((res) => {
                let cocktailData = res.data.drinks[0]
                this.cocktail = cocktailData
        
                for(let i = 1; i < 16; i++) {
                    let tempIngredient = cocktailData[`strIngredient${i}`]
                    if( tempIngredient != null) {
                        this.ingredients.push(tempIngredient)
                    }
                }
                for(let i = 1; i < 16; i++) {
                    let tempMeasure = cocktailData[`strMeasure${i}`]
                    if( tempMeasure != null) {
                        this.measurments.push(tempMeasure)
                    }
                }
            })
            .catch((err) => console.log(err))
    }
}
</script>