const API_V1_AUTH = {
  mainPath: "/api/v1/auth",
  feature: {
    login: "/login",
    logout: "/logout",
    generateOTP: "/generateOTP",
    createSessionRegister: "/createSessionRegister",
    confirmRegister: "/confirmRegister",
    createSessionResetPassword: "/createSessionResetPassword",
    confirmOTPResetPassword: "/confirmOTPResetPassword",
    confirmResetPassword: "/confirmResetPassword",
    refreshAccessToken: "/refreshAccessToken",
  },
};

export default API_V1_AUTH;
