


export class OpenWeatherAPIController {
    public static apiKey: string | undefined = import.meta.env.VITE_API_OPEN_WEATHER;;
    public static getWeatherByCity = async (city): Promise<number | undefined> => {
        try {
            const response: Response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=-12.6975&lon=-38.3242&units=metric&appid=${this.apiKey}`);
            if (!response.ok) throw new Error("Error API clima tempo");
            const { main } = await response.json();
            console.dir(main);
            return main?.temp as number;
        } catch (error: unknown) {
            console.error(error);
        }
    }
}