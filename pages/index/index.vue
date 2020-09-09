<template>
	<div>
		<u-notice-bar type="success" :list="list"></u-notice-bar>
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
		<u-cell-group v-for="(item, index) in RoomName" :key="item">
			<u-cell-item icon="lock" :title="item" @click="openDoor(item)"></u-cell-item>
		</u-cell-group>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				list: [
					"你好，欢迎使用淮阴工学院多媒体锁客户端，",
					"远程开门有网络延迟，请耐心等待",
					"请勿短时间内重复开锁"
				],
				RoomName: []
			}
		},
		onLoad() {
			this.isLogin();
		},
		methods: {
			navigatorTo(value) {
				switch (value) {
					case '0':
						uni.navigateTo({
							url: "../editPassword/editPassword"
						})
						break;
				}
			},
			isLogin() {
				//判断缓存中是否登录过，直接登录
				let value = uni.getStorageSync('TeacherName');
				let RoomName = uni.getStorageSync("RoomName");
				this.RoomName = RoomName;
				if (!value) {
					uni.reLaunch({
						url: '../login/login',
					});
				}
			},
			openDoor(value) {
				let TeacherID = uni.getStorageSync("TeacherID");
				let RoomName = value;
				let Password = uni.getStorageSync("Password");
				uni.showModal({
					title: '提示',
					content: '您是否确认开锁？',
					success: function(res) {
						if (res.confirm) {
							uni.request({
								method: "POST",
								url: "api/DoorLockControl",
								header: {
									"content-type": "application/json"
								},
								data: {
									TeacherID: TeacherID,
									RoomName: RoomName,
									Password: Password,
									CtrlMode: 2
								},
								success(res) {
									console.log(res);
									let data = res.data.Data;
									if (data.ErrorCode == '0') {
										//开锁成功
										uni.showToast({
											icon: 'success',
											position: 'center',
											title: "开锁成功",
											duration: 2000,
										});
									}else {
										uni.showToast({
											icon: 'none',
											position: 'center',
											title: data.Message,
											duration: 2000,
										});
									}
								}
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
				console.log(value);
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
