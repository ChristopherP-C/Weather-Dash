import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}

// TODO: Define a class for the Weather object
class Weather {
  city: string;
  icon: string;
  temperature: number;
  windSpeed: number;
  humidity: number;
  date: string;

  constructor(city: string, temperature: number, windSpeed: number, humidity: number, icon: string, date: string) {
    this.city = city;
    this.icon = icon;
    this.temperature = temperature;
    this.windSpeed = windSpeed;
    this.humidity = humidity;
    this.date = date;
  }
}

// TODO: Complete the WeatherService class
class WeatherService {

  // TODO: Define the baseURL, API key, and city name properties
  baseURL: string = process.env.WEATHER_BASE_URL || "";
  baseGeoURL: string = process.env.GEO_BASE_URL || "";
  appid: string = process.env.API_KEY || "";

  //get city from user input request
  async fetchGeoData(city: string): Promise<Coordinates | null> {
    try {
      // Store the city name
      console.log(`City: ${city}`);

      // Fetch geocoding data
      const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${this.appid}`);
      const geoData = await response.json();

      console.log('Geocoding API Response:', geoData);

      // Validate response
      if (!Array.isArray(geoData) || geoData.length === 0) {
        console.error("No results found for the city");
        return null;
      }

      // Destructure lat and lon from the first result
      const { lat, lon } = geoData[0];
      return { lat, lon };
    } catch (error) {
      console.error("Error fetching geocode data:", error);
      return null;
    }
  }

  //get weather data from coordinates and spread it into an array of weather objects
  async fetchWeatherData(coordinates: Coordinates, city: string): Promise<Weather[]> {
    try {
      // Fetch weather data
      const response = await fetch(`${this.baseURL}lat=${coordinates.lat}&lon=${coordinates.lon}&cnt=6&units=imperial&appid=${this.appid}`);
      const weatherData = await response.json();

      //console.log('Weather API Response:', weatherData);
  
      // Validate response
      if (!weatherData || !weatherData.list) {
        console.error("No weather data found for the city");
        return [];
      }
  
      // Map the response into an array of Weather objects
      const forecast: Weather[] = weatherData.list.map((entry: any) => {
        const icon = entry.weather[0]?.icon || "";
        const temperature = entry.main.temp;
        const windSpeed = entry.wind.speed;
        const humidity = entry.main.humidity;
        const date = entry.dt_txt;

        console.log(`Temperature: ${temperature}`);
  
        return new Weather(city, temperature, windSpeed, humidity, icon, date);
      });
  
      return forecast;
    } catch (error) {
      console.error("Error fetching weather data:", error);
      return [];
    }
  }

  async getWeatherForCity(city: string) {
    // Fetch geocoding data
    const coordinates = await this.fetchGeoData(city);

    if (!coordinates) {
      return null;
    }

    // Fetch weather data
    const weatherData = await this.fetchWeatherData(coordinates, city);

    if (!weatherData) {
      return null;
    }

    return weatherData;
  };

};

export default new WeatherService();
// // TODO: Create fetchLocationData method
// private async fetchLocationData() {
// }
// // TODO: Create destructureLocationData method
// private destructureLocationData(locationData: Coordinates): Coordinates {
// }
// // TODO: Create buildGeocodeQuery method
// private buildGeocodeQuery(): string {
// }
// // TODO: Create buildWeatherQuery method
// private buildWeatherQuery(coordinates: Coordinates): string {
// }
// // TODO: Create fetchAndDestructureLocationData method
// private async fetchAndDestructureLocationData(city: string) {
// }
// // TODO: Create fetchWeatherData method
// private async fetchWeatherData(coordinates: Coordinates) {
// }
// // TODO: Build parseCurrentWeather method
// private parseCurrentWeather(response: any): Weather {
// }
// // TODO: Complete buildForecastArray method
// private buildForecastArray(currentWeather: Weather, weatherData: any[]): any[] {
// }
// // TODO: Complete getWeatherForCity method

