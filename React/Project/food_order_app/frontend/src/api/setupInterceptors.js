let interceptorAdded = false;

export const setupInterceptors = (API, setLoading) => {
  if (interceptorAdded) return;

  interceptorAdded = true;

  API.interceptors.request.use((config) => {
    setLoading(true);

    return config;
  });

  API.interceptors.response.use(
    (response) => {
      setLoading(false);

      return response;
    },

    (error) => {
      setLoading(false);

      return Promise.reject(error);
    },
  );
};
