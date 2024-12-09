import {promises as fs} from 'fs';
import { v4 as uuidv4 } from 'uuid';

// TODO: Define a City class with name and id properties
class City {
  name: string;
  id: string;

  constructor(name: string, id: string) {
    this.name = name,
    this.id = id
  };
};

const searchHistory = `./db/db.json`

// TODO: Complete the HistoryService class
class HistoryService {
  // TODO: Define a read method that reads from the searchHistory.json file
  private async read() {
    try {
    const historyData = await fs.readFile(searchHistory, 'utf8');
    const history = JSON.parse(historyData);
    return history;
  } catch (err) {
    console.log(`error reading history: ${err}`);
  }
};
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
   private async write(cities: City[]) {
    try {
      await fs.writeFile(searchHistory, JSON.stringify(cities));
    } catch (err) {
      console.log(`nope: ${err}`);
    };
   };
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities() {
    try {
      const history = await this.read();
      return history.map((city: {name: string; id: string}) => new City(city.name, city.id));
    } catch (err) {
      console.log(`error getting cities: ${err}`);
      return [];
    };
  };
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  async addCity(city: string) {
    try {
      const cities = await this.getCities();
      const newCity = new City(city, uuidv4());
      cities.push(newCity);
  
      await this.write(cities);
      console.log(`City ${city} added successfully.`);
    } catch (err) {
      console.error('Failed to add city:', err);
    }
  }
   // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
   async removeCity(id: string) {
    try {
      // Read the current list of cities
      const cities = await this.getCities();

      // Filter out the city with the matching ID
      const updatedCities = cities.filter((city: City) => city.id !== id);

      // If no city was removed, indicate it
      if (cities.length === updatedCities.length) {
        console.log(`City with ID "${id}" not found.`);
        return false;
      }

      // Write the updated list back to the file
      await this.write(updatedCities);
      console.log(`City with ID "${id}" removed successfully.`);
      return true;
    } catch (err) {
      console.error('Failed to remove city:', err);
      throw err; // Re-throw error for upstream handling
    }
  }
};

export default new HistoryService();
