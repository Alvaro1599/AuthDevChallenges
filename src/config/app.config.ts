export const config = () => ({
  MONGO_DB: process.env.MONGODB,
  APP_PORT: parseInt(process.env.PORT),
  JWT_PASSWORD: process.env.JWT,
});
