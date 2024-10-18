import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}

// TODO: Define a class for the Weather object
class Weather {
  temperature: number;
  windSpeed: number;
  humidity: number;

  constructor (temperature: number, windSpeed: number, humidity: number) {
    this.temperature = temperature,
    this.windSpeed = windSpeed,
    this.humidity = humidity
  };
};

// TODO: Complete the WeatherService class
class WeatherService {

  // TODO: Define the baseURL, API key, and city name properties
  baseURL: string = "https://api.openweathermap.org/data/2.5";
  appid: string = process.env.API_KEY || "";
  city: string = "";

  // TODO: Create fetchLocationData method
  private async fetchLocationData() {
    const response = await fetch(this.buildGeocodeQuery());
    const data = await response.json();
    return data;
  }
  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates): Coordinates {
    const { lat, lon } = locationData;
    return { lat, lon };
  }
  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(): string {
    return `${this.baseURL}/geo/1.0/direct?q=${this.city},{state code},{country code}&limit={limit}&appid=${process.env.API_KEY}`;
  }
  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    const { lat, lon } = coordinates;
    return `${this.baseURL}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}`;
  }
  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData(city: string) {
    this.city = city;
    const response = await this.fetchLocationData();
    return this.destructureLocationData(response);
  }
  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {
    // Build the query URL
    const weatherQuery = this.buildWeatherQuery(coordinates);
    // Fetch the weather data
    const response = await fetch(weatherQuery);
    // Parse the JSON response
    const data = await response.json();
    return data;   
  }
  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any): Weather {

    const { temp: temperature, humidity } = response.main;
    const { speed: windSpeed } = response.wind;
    
    return new Weather(temperature, windSpeed, humidity);;
  }
  // TODO: Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: any[]): any[] {
    return [currentWeather, ...weatherData];
  }
  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {
    const coordinates = await this.fetchAndDestructureLocationData(city);
    const weatherResponse = await this.fetchWeatherData(coordinates);
    const currentWeather = this.parseCurrentWeather(weatherResponse);
    const forecastData = weatherResponse.forecast || [];
    return this.buildForecastArray(currentWeather, forecastData);
  };
};

export default new WeatherService();
