<template>
  <div>
    <!-- 搜索 -->
    <div class="header">
      <!-- 搜索框 -->
      <input type="text" class="search-box" placeholder="请输入商品">
      <!-- 结果 -->
    </div>
    <!-- 轮播图 -->
    <swiper class="banner" indicator-dots indicator-color="rgba(255,255,255,.6)" indicator-active-color="#fff" autoplay circular interval="4000">
      <swiper-item v-for="(list, key) in bannerList" :key="key">
        <navigator :url="list.navigator_url">
          <image :src="list.image_src"/>
        </navigator>
      </swiper-item>
    </swiper>

    <!-- 导航图 -->
    <div class="navs">
      <navigator v-for="(list, key) in navList" :key="key" url="list.navigator_url">
        <image :src="list.image_src"></image>
      </navigator>
    </div>

    <!-- 楼层 -->
    <div class="floors">
      <div class="floor" :key="key" v-for="(list, key) in floorList">
        <div class="title">
          <image :src="list.floor_title.image_src"></image>
        </div>
        <div class="pics">
          <navigator class="first-child" :key="index" :url="item.navigator_url" v-for="(item, index) in list.product_list">
            <image :src="item.image_src"></image>
          </navigator>
        </div>
      </div>
    </div>

    <!-- 回顶部 -->
    <span class="gotop" @click="goTop" v-show="!isTop">顶部</span>
  </div>
</template>

<script>
import request from '@/utils/request'
export default {
  data () {
    return {
      bannerList: [],
      navList: [],
      floorList: [],
      isTop: true
    }
  },
  methods: {
    // 轮播图借口
    async getBanner () {
      let { message } = await request({
        url: '/api/public/v1/home/swiperdata'
      })
      this.bannerList = message
    },

    // 导航接口
    async getNavs () {
      let { message } = await request({
        url: '/api/public/v1/home/catitems'
      })
      this.navList = message
    },

    // 楼层接口
    async getFloors () {
      let {message} = await request({
        url: '/api/public/v1/home/floordata'
      })
      this.floorList = message
    },
    goTop () {
      mpvue.pageScrollTo({
        scrollTop: 0
      })
    }
  },
  mounted () {
    this.getBanner();
    this.getFloors();
    this.getNavs()
  },
  onPullDownRefresh () {
    this.getNavs()
    this.getFloors()
    this.getBanner()

    mpvue.stopPullDownRefresh()
  },
  onPageScroll (ev) {
    this.isTop = ev.scrollTop < 200
  }
}
</script>

<style scoped>
.header{
  width: 750rpx;
  height: 100rpx;
  background: #eb4450;
  padding: 20rpx 15rpx;
  box-sizing: border-box;
}
.header .search-box{
  font-size: 28rpx;
  padding-left: 15rpx;
  box-sizing: border-box;
  background: #fff;
  width: 100%;
  height: 60rpx;
  border-radius: 8rpx;
}

/* 轮播图 */
.banner{
  width: 750rpx;
  height: 340rpx;
}
.banner navigator{
  width: 100%;
  height: 100%;
}
.navs{
  display: flex;
  justify-content: space-between;
  padding: 30rpx 40rpx;
}
.navs navigator{
  width: 128rpx;
  height: 140rpx;
}
/* 楼层 */
.floors .title {
  width: 750rpx;
  height: 60rpx;
  padding-top: 27rpx;
  padding-left: 15rpx;
  background-color: #f4f4f4;
}

.floors .pics {
  padding: 20rpx 18rpx;
  overflow: hidden;
}

.floors .pics navigator {
  height: 188rpx;
  margin-left: 10rpx;
  margin-bottom: 10rpx;
  float: left;
}

.floors .pics navigator:first-child {
  width: 232rpx;
  height: 386rpx;
  margin-left: 0;
}

.floors .pics navigator:nth-child(2) {
  width: 273rpx;
}

.floors .pics navigator:nth-child(3) {
  width: 193rpx;
}

.floors .pics navigator:nth-child(4) {
  width: 193rpx;
}

.floors .pics navigator:last-child {
  width: 273rpx;
}

/* 回顶部 */
.gotop {
  width: 88rpx;
  height: 88rpx;
  background: pink;

  /* display: block; */
  text-align: center;
  line-height: 88rpx;
  position: fixed;
  bottom: 60rpx;
  font-size: 32rpx;
  right: 30rpx;
  border-radius: 50%;
}
</style>
