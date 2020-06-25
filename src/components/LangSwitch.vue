<template>
    <select class="custom-select switch-select" @change="switchLocale($event)">
        <option value="en" selected>Select Languange</option>
        <option value="en">English</option>
        <option value="de">German</option>
    </select>

</template>

<script>
export default {
    name: 'LangSwitch',
    methods: {
        switchLocale(event) {
            let locale = event.target.value
            if(this.$i18n.locale !== locale) {
                this.$i18n.locale = locale
                window.localStorage.setItem('lang' , locale)
            }
        }
    }
}
</script>