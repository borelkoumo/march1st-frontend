<template>
    <div>
        <q-img src="vectors/frame.svg" class="wrap-img"/>
        <div class="box-img" style="">
            <q-img src="images/crawl.png" alt="" class="img-content"/>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
    .wrap-img{
        width: 200px;
    }
    .img-content{
        width: 100px;
    }
    .box-img{
        margin-top:-150px;
    }
    @media (max-width: 599px){
        .wrap-img{
            width: 150px;
        }
        .img-content{
        width: 75px;
    }
    .box-img{
        margin-top:-115px
    }
    }
</style>