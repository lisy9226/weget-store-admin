<template>
  <a-row type="flex" justify="center" align="middle">
    <a-col :span="6" style="margin: 0 auto">
      <a-divider>WeGet－ログイン</a-divider>
      <a-form
        id="components-form-demo-normal-login"
        :form="form"
        class="login-form"
        @submit="handleSubmit"
        :span="6"
      >
        <a-form-item>
          <a-input
            v-decorator="[
              'userName',
              {
                rules: [
                  {
                    required: true,
                    message: 'メールアドレスを入力してください!',
                  },
                ],
              },
            ]"
            placeholder="メールアドレス"
          >
            <a-icon
              slot="prefix"
              type="user"
              style="color: rgba(0, 0, 0, 0.25)"
            />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            v-decorator="[
              'password',
              {
                rules: [
                  { required: true, message: 'パスワードを入力してください!' },
                ],
              },
            ]"
            type="password"
            placeholder="パスワード"
          >
            <a-icon
              slot="prefix"
              type="lock"
              style="color: rgba(0, 0, 0, 0.25)"
            />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a class="login-form-forgot" href=""> パスワードを忘れた場合 </a>
          <a-button type="primary" html-type="submit" class="login-form-button">
            {{ $t("message.login") }}
          </a-button>
        </a-form-item>
      </a-form>
    </a-col></a-row
  >
</template>

<script>
export default {
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },
  data() {
    return {
      userName: "",
      password: "",
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          this.$store.commit("setUserInfo", {
            userInfo: {
              userName: "admin",
              userPwd: "88888",
            },
          });
          this.$router.push({
            name: "adminTop",
          });

          this.$http.post('/login',{
             userInfo: {
              userName: "admin",
              userPwd: "88888",
            }
          }).then((response) => {
             console.log(response.data)
          });
        } else {
          // this.$router.push("/adminTop");
        }
      });
    },
  },
};
</script>
<style>
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
</style>