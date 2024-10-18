import { Router } from 'express';
const router = Router();

 import HistoryService from '../../service/historyService.js';
import weatherService from '../../service/weatherService.js';
// import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', (req, res) => {
  const { city } = req.body;
  if (req.body) {
    // TODO: GET weather data from city name
    router.get(`/weather/:city`, req, res) => {
      weatherService.getWeatherForCity(city).then((data) => res.json(data));
    };
    // TODO: save city to search history
    router.get(`/:city`, async (_req, res) => {
      const data = req.params.city;
      const weatherData = await weatherService.getWeatherForCity(data);
      const history = await HistoryService.addCity(data);
      if (typeof data === 'string') {
        res.status(404).json({ message: 'No events found' });
      } else {
        res.json(data);
      }
    });

  };
});

// TODO: GET search history
router.get('/history', async (_req, res) => {
  try {
    const savedCities = await HistoryService.getCities();
    res.json(savedCities);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// * BONUS TODO: DELETE city from search history
//router.delete('/history/:id', async (req, res) => {});

export default router;
