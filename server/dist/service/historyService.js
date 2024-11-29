import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, '..', '..', 'data', 'searchHistory.json');
(async () => {
    try {
        await fs.access(filePath);
    }
    catch (error) {
        await fs.writeFile(filePath, JSON.stringify([]));
    }
})();
class HistoryService {
    async deleteCityById(id) {
        const cities = await this.read();
        const filteredCities = cities.filter((city) => city.id !== id);
        await this.write(filteredCities);
    }
    async getSearchHistory() {
        const cities = await this.read();
        return cities
            .sort((a, b) => b.timestamp - a.timestamp)
            .slice(0, 10);
    }
    async saveCity(city) {
        const cityHistory = {
            id: city.id,
            name: city.name,
            timestamp: Date.now()
        };
        let cities = await this.read();
        cities.unshift(cityHistory);
        cities = cities.slice(0, 10);
        await this.write(cities);
    }
    async read() {
        try {
            const data = await fs.readFile(filePath, 'utf-8');
            return JSON.parse(data);
        }
        catch (error) {
            if (error.code === 'ENOENT') {
                return [];
            }
            else {
                throw error;
            }
        }
    }
    async write(cities) {
        await fs.writeFile(filePath, JSON.stringify(cities, null, 2));
    }
    async getCities() {
        return await this.read();
    }
    async addCity(city) {
        const cities = await this.read();
        cities.push(city);
        await this.write(cities);
    }
}
export default new HistoryService();
