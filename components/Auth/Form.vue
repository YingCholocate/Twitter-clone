<template>
  <div>
    <div class="pt-5 space-y-6">
      <UIInput
        label="Username"
        placeholder="@username"
        v-model="data.username"
      />
      <UIInput
        label="Password"
        placeholder="********"
        v-model="data.password"
        type="password"
      />

      <button @click="handleLogin">Login</button>
    </div>
  </div>
</template>
<script setup>
const data = reactive({
  username: '',
  password: '',
  loading: false,
});

const handleLogin = async () => {
  const { login } = useAuth();
};
</script>
