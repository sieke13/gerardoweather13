import { Router } from 'express';
import WeatherService from '../service/weatherService.js';
import HistoryService from '../service/historyService.js';
const router = Router();
// POST Request with city name to retrieve weather data
router.post('/', async (req, res) => {
    try {
        const { city } = req.body;
        if (!city) {
            return res.status(400).json({ error: 'City name is required' });
        }
        // GET weather data from city name
        const weatherData = await WeatherService.getWeatherByCity(city);
        // Save city to search history
        await HistoryService.saveCity({ id: Date.now().toString(), name: city });
        return res.json(weatherData);
    }
    catch (error) {
        return res.status(500).json({ error: 'Failed to retrieve weather data' });
    }
});
// GET search history
router.get('/history', async (_req, res) => {
    try {
        const history = await HistoryService.getSearchHistory();
        res.json(history);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve search history' });
    }
});
// BONUS: DELETE city from search history
router.delete('/history/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await HistoryService.deleteCityById(id);
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete city from search history' });
    }
});
export default router;
