export default useAuth = () => {
  const useAuthToken = () => useState('auth_token');
  const useAuthUser = () => useState('auth_user');
  const setToken = (newToken) => {
    const authToken = useAuthToken();
    authToken.value = newToken;
  };
  const setUser = (newUser) => {
    const authUser = userAuthUser();
    authUser.value = newToken;
  };
  const login = ({ username, password }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await $fetch('/api/autj/login', {
          method: 'POST',
          body: {
            username,
            password,
          },
        });

        setToken(data.access_token);
        setUser(data.user);
        console.log(data);
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };
  const initAuth = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await $fetch('/api/auth.refresh');
        setToken(data.access_token);
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };

  return {
    login,
    useAuthUser,
  };
};
