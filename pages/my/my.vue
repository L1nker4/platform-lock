<template>
	<view>
		<view class="u-flex user-box u-p-l-30 u-p-r-20 u-p-b-30">
			<view class="u-m-r-10">
				<u-avatar :src="pic" size="140"></u-avatar>
			</view>
			<view class="u-flex-1">
				<view class="u-font-18 u-p-b-20">{{TeacherName}}</view>
				<view class="u-font-14 u-tips-color">部门:{{DepartmentName}}</view>
			</view>
			<!-- <view class="u-m-l-10 u-p-10">
				<u-icon name="scan" color="#969799" size="28"></u-icon>
			</view>
			<view class="u-m-l-10 u-p-10">
				<u-icon name="arrow-right" color="#969799" size="28"></u-icon>
			</view> -->
		</view>
		<view class="u-m-t-20">
			<u-cell-group>
				<!-- <u-cell-item icon="star" title="收藏"></u-cell-item>
				<u-cell-item icon="thumb-up-fill" title="赞赏支持"></u-cell-item> -->
				<u-cell-item icon="info-circle-fill" title="更新日志"></u-cell-item>
				<u-cell-item icon="account-fill" title="关于我们" @click="openModal"></u-cell-item>
			</u-cell-group>
		</view>
		<u-modal v-model="show" content="11-309"></u-modal>
		<!-- <view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="setting" title="设置"></u-cell-item>
			</u-cell-group>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pic:'https://uviewui.com/common/logo.png',
				show:false,
				DepartmentName: '',
				TeacherName: ''
			}
		},
		onLoad() {
			this.isLogin();
			this.getData();
		},
		methods: {
			isLogin() {
				//判断缓存中是否登录过，直接登录
				const value = uni.getStorageSync('TeacherName');
				if (!value) {
					uni.reLaunch({
						url: '../login/login',
					});
				}
			},
			getData() {
				const TeacherName = uni.getStorageSync('TeacherName');
				const DepartmentName = uni.getStorageSync('DepartmentName');
				this.TeacherName = TeacherName;
				this.DepartmentName = DepartmentName;
			},
			openModal() {
				this.show = true;
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color: #ededed;
}

.camera{
	width: 54px;
	height: 44px;
	
	&:active{
		background-color: #ededed;
	}
}
.user-box{
	background-color: #fff;
}
</style>
