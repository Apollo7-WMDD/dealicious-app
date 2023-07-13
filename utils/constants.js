export const IS_PRODUCTION = process.env.NODE_ENV === "production";

export const SERVER_URL = IS_PRODUCTION
  ? process.env.NEXT_PUBLIC_SERVER_URL
  : "http://localhost:3000";
