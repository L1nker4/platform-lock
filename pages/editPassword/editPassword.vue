<template>
	<view>
		<u-form :model="form" ref="uForm" style="margin-left: 20px;">
			<u-form-item label="旧密码" label-width="60px">
				<u-input v-model="form.oldPass" placeholder="请输入旧密码"/>
			</u-form-item>
			<u-form-item label="新密码" label-width="60px">
				<u-input v-model="form.newPass" placeholder="请输入新密码"/>
			</u-form-item>
			<u-form-item label="确认密码" label-width="70px">
				<u-input v-model="form.confirmPass" placeholder="请输入确认密码"/>
			</u-form-item>
			</u-form-item>
		</u-form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					name: '',
					intro: '',
					sex: ''
				}
			}
		},
		methods: {

		}
	}
</script>

<style>

</style>
