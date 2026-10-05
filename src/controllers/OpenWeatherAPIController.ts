export class OpenWeatherAPIController {
    // Nova função estática que recebe a lista de cidades e devolve os climas formatados
    public static getClimas = async (cidades: { nome: string, lat: number, lon: number }[]) => {
        const resultados = await Promise.all(
            cidades.map(async (cidade) => {
                try {
                    const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${cidade.lat}&longitude=${cidade.lon}&current_weather=true`);
                    const data = await res.json();
                    
                    const temp = Math.round(data.current_weather.temperature);
                    const code = data.current_weather.weathercode;
                    const isDay = data.current_weather.is_day;
                    
                    let desc = isDay ? "ensolarado" : "céu limpo";
                    if (code === 1 || code === 2) desc = isDay ? "poucas nuvens" : "algumas nuvens";
                    else if (code === 3) desc = "nublado";
                    else if (code >= 45 && code <= 48) desc = "nevoeiro";
                    else if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) desc = "com chuva";
                    else if (code >= 95) desc = "com trovoada";
                    
                    return { nome: cidade.nome, temp: temp.toString(), desc };
                } catch (error) {
                    console.error(`Erro ao buscar clima para ${cidade.nome}:`, error);
                    return { nome: cidade.nome, temp: "--", desc: "indisponível" };
                }
            })
        );
        return resultados;
    }
}