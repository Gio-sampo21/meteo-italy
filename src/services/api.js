export const base_url = "http://api.openweathermap.org/data/2.5/";
const app_id = process.env.REACT_APP_ID;

export const api = (path, query) => {
  return `${base_url}${path}?q=${query}&appid=${app_id}&units=metric&lang=it`;
};
