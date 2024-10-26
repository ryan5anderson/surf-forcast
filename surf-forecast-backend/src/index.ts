import express, { Request, Response } from 'express';
import axios from 'axios';
import { fetchWeatherApi } from 'openmeteo';
import dotenv from 'dotenv';
import cors from 'cors';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Root endpoint
app.get('/', (req: Request, res: Response) => {
    res.send('Surf Forecast Backend is running');
});

// Surf and weather data endpoint using Open-Meteo API
app.get('/api/surf-weather', async (req: Request, res: Response) => {
    try {
        const { lat, lon } = req.query;

        // 1. Fetch weather data (temperature, visibility, wind speed)
        const weatherUrl = "https://api.open-meteo.com/v1/forecast";
        const weatherParams = {
            latitude: parseFloat(lat as string),
            longitude: parseFloat(lon as string),
            current: ["temperature_2m", "pressure_msl", "wind_speed_10m", "wind_direction_10m"],
            timezone: "auto",
            temperature_unit: "fahrenheit",
            wind_speed_unit: "kn"
        };

        // Fetching from the weather API
        const weatherResponse = await fetchWeatherApi(weatherUrl, weatherParams);
        console.log('Weather API Response:', JSON.stringify(weatherResponse, null, 2)); // Full response

        const weatherData = weatherResponse[0];
        console.log('Parsed weatherData:', weatherData); // Parsed weather data

        const weatherCurrent = weatherData.current()!;
        console.log('Parsed weatherCurrent:', weatherCurrent); // Specific weather current data

        const utcOffsetSeconds = weatherData.utcOffsetSeconds();

        const weatherCurrentData = {
            time: new Date((Number(weatherCurrent.time()) + utcOffsetSeconds) * 1000),
            temperature2m: weatherCurrent.variables(0)!.value(),
            pressureMsl: weatherCurrent.variables(1)!.value(),
            windSpeed10m: weatherCurrent.variables(2)!.value(),
            windDirection10m: weatherCurrent.variables(3)!.value(),
        };
        console.log('Weather Current Data:', weatherCurrentData); // Final extracted data

        // Check for missing values
        if (!weatherCurrentData.temperature2m || !weatherCurrentData.pressureMsl || !weatherCurrentData.windSpeed10m || !weatherCurrentData.windDirection10m) {
            console.warn('Some weather data values are missing:', weatherCurrentData);
        }

        

        // 2. Fetch marine data (wave height, wave direction, wave period)
        const marineUrl = "https://marine-api.open-meteo.com/v1/marine";
        const marineParams = {
            "latitude": parseFloat(lat as string),
            "longitude": parseFloat(lon as string),
            "current": ["wave_height", "wave_direction", "wave_period"],
            "length_unit": "imperial",
            "wind_speed_unit": "kn"
        };
        
        const marineResponse = await fetchWeatherApi(marineUrl, marineParams);
        const marineData = marineResponse[0];
        const MarineCurrent = marineData.current()!;
        
        const marineCurrentData = {
            time: new Date((Number(MarineCurrent.time()) + utcOffsetSeconds) * 1000),
            waveHeight: MarineCurrent.variables(0)!.value(),
            waveDirection: MarineCurrent.variables(1)!.value(),
            wavePeriod: MarineCurrent.variables(2)!.value(),
        };

        // Combine weather and marine data
        const combinedData = {
            weather: weatherCurrentData,
            marine: marineCurrentData
        };

        // Send the combined data back to the client
        res.status(200).json(combinedData);

    } catch (error) {
        console.error('Error fetching surf and weather data:', error);
        res.status(500).json({ error: 'An unknown error occurred' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
