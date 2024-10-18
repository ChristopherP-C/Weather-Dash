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

const searchHistory = `./server/db/db.json`

// TODO: Complete the HistoryService class
class HistoryService {
  // TODO: Define a read method that reads from the searchHistory.json file
  private async read() {
    try {
    const historyData = await fs.readFile(searchHistory, 'utf8');
    history = JSON.parse(historyData);
    return history;
  } catch {
    console.log(`error reading history`);
  }
};
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
   private async write(cities: City[]) {
    try {
      await fs.writeFile(searchHistory, JSON.stringify(cities));
    } catch {
      console.log(`nope`);
    };
   };
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities() {
    try {
      const history = await this.read();
      return history.map((city: {name: string; id: string}) => new City(city.name, city.id));
    } catch {
      console.log(`error getting cities`);
    };
  };
  // TODO Define an addCity method that adds a city to the searchHistory.json file
   async addCity(city: string) {
    try {
    const cities = await this.getCities();
    const newCity = new City(city, uuidv4());
    cities.push(newCity);
    await this.write(cities)
   } catch {
    console.log(`error adding city`);
   }
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  // async removeCity(id: string) {}
};
};

export default new HistoryService();
