<template>
	<div>
		<u-grid :col="2" @click="navigatorTo">
			<u-grid-item index="0">
				<u-icon name="photo" :size="46"></u-icon>
				<view class="grid-text">修改密码</view>
			</u-grid-item>
			<u-grid-item index="1">
				<u-icon name="lock" :size="46"></u-icon>
				<view class="grid-text">物理卡号重新申请</view>
			</u-grid-item>
			<!-- <u-grid-item>
				<u-icon name="hourglass" :size="46"></u-icon>
				<view class="grid-text">沙漏</view>
			</u-grid-item> -->
		</u-grid>
		<u-gap height="80" bg-color="#bbb"></u-gap>
		<u-cell-group>
			<u-cell-item icon="lock" title="A303"></u-cell-item>
			<u-cell-item icon="lock" title="123"></u-cell-item>
		</u-cell-group>

	</div>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onLoad() {

		},
		methods: {
			navigatorTo(value) {
				switch(value) {
					case'0' :
					uni.navigateTo({
						url: "../editPassword/editPassword"
					})
					break;
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.grid-text {
		font-size: 28rpx;
		margin-top: 4rpx;
		color: $u-type-info;
	}
</style>
