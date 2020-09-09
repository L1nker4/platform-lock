<template>
	<view>
		<u-form :model="form" ref="editPassForm" style="margin-left: 20px;margin-right: 20px;;">
			<u-form-item label="旧密码" label-width="70px" prop="oldPass">
				<u-input v-model="form.oldPass" :border="true" placeholder="请输入旧密码" />
			</u-form-item>
			<u-form-item label="新密码" label-width="70px" prop="newPass">
				<u-input v-model="form.newPass" :border="true" placeholder="请输入新密码" />
			</u-form-item>
			<u-form-item label="确认密码" label-width="70px" prop="confirmPass">
				<u-input v-model="form.confirmPass" :border="true" placeholder="请输入确认密码" />
			</u-form-item>
			<u-button type="primary" shape="square" :ripple="true" @click="editPassAction">提交</u-button>
		</u-form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				TeacherID: '',
				form: {
					oldPass: '',
					newPass: '',
					confirmPass: ''
				},
				rules: {
					oldPass: [{
						required: true,
						message: '请输入旧密码',
						trigger: ['change'],
					}],
					newPass: [{
						required: true,
						message: '请输入新密码',
						trigger: 'change'
					}],
					confirmPass: [{
						required: true,
						message: '请输入确认新密码',
						trigger: 'change'
					}]
				}
			}
		},
		onReady() {
			this.$refs.editPassForm.setRules(this.rules);
		},
		onLoad() {
			this.isLogin();
		},
		methods: {
			editPassAction() {
				this.$refs.editPassForm.validate(valid => {
					if (valid) {
						if (this.form.confirmPass == this.form.newPass) {
							//发送修改密码请求
							uni.request({
								method: "POST",
								url: "api/PasswordChange",
								header: {
									"content-type": "application/json"
								},
								data: {
									TeacherID: this.TeacherID,
									Password: this.form.oldPass,
									NewPassword: this.form.confirmPass
								},
								success(res) {
									console.log(res);
									let data = res.data.Data;
									if (data.ErrorCode != '0') {
										uni.showToast({
											title: data.Message,
											icon: "none",
											duration: 2000
										})
									}else {
										//修改成功
										uni.showToast({
											title: data.Message,
											icon: "success",
											duration: 2000
										})
										//删除缓存信息
										uni.removeStorageSync("DepartmentName");
										uni.removeStorageSync("TeacherName");
										uni.removeStorageSync("RoomName");
										uni.removeStorageSync("TeacherID");
										setTimeout(function() {
											uni.reLaunch({
												url: "../index/index"
											})
										}, 2000)
									}
								}
							});
						} else {
							uni.showToast({
								title: "两次输入密码不一致，请重新输入",
								icon: "none",
								duration: 2000
							})
						}
					}
				});
			},
			isLogin() {
				//判断缓存中是否登录过，直接登录
				const value = uni.getStorageSync('TeacherID');

				if (!value) {
					uni.reLaunch({
						url: '../login/login',
					});
				} else {
					this.TeacherID = value;
				}
			}
		}
	}
</script>

<style>

</style>
