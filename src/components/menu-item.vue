<template>
    <q-btn class="red q-pl-none q-pr-none q-mr-lg btn-menu" flat dense>
        {{name}}
    </q-btn>
</template>
<script>
export default {
    props:['name']
    
}
</script>
<style scoped>
    .q-btn.q-hoverable:hover::before{
        border-bottom: 2px solid #1976D2;
        border-radius: 0;
    }
    .btn-menu{
        font-family: 'nunito';
    }
</style>