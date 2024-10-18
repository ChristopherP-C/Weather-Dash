import { Router } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import weatherService from '../../service/weatherService.js';
// import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req, res) => {
  const { cityName } = req.body;
  
  if (!cityName) {
    return res.status(400).json({ message: 'City name is required' });
  }
  // TODO: GET weather data from city name
  try{
    const weatherData = await weatherService.getWeatherForCity(cityName);

    if (!weatherData) {
      return res.status(404).json({ message: 'Weather data not found for this city' });
  };
  
  // TODO: save city to search history
  await HistoryService.addCity(cityName);
  return res.json(weatherData);
  } catch (err) {
  console.error(err);
  return res.status(500).json({ message: 'Error retrieving weather data' });
}
});

router.get('/weather/:city', async (req, res) => {
  const { city } = req.params;
  try {
    const weatherData = await weatherService.getWeatherForCity(city);

    if (!weatherData) {
      return res.status(404).json({ message: 'Weather data not found for this city' });
    }

    return res.json(weatherData);
    } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error retrieving weather data' });
  }
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
//   try {
//     const { id } = req.params;
//     await HistoryService.removeCity(id);
//     res.status(204).send(); // Send no content response
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error deleting city from history' });
//   }
// });

export default router;
