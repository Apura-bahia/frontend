import { useEffect, useState } from "react";
import { OpenWeatherAPIController } from "../../../controllers/OpenWeatherAPIController";

const opts: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
}

const LineHeaderTop = () => {
    const [climaAPI, setClimaAPI] = useState<number | undefined>();
    useEffect(() => {
            const getWeather = async () => {
            const clima: number | undefined = await OpenWeatherAPIController.getWeatherByCity("qualquer coisa");
            if (typeof clima === "number") {
                setClimaAPI(clima);
            }
            
        }
        getWeather();
    }, [])

    
    return (
        <div>
            {/*DIA E DATA*/}
            <div>
                <p>{new Date().toLocaleDateString("pt-BR", opts)}</p>
            </div>

            {/*temperatura e city*/}
            <div>28</div>

            {/*SOCIAL ICONS*/}
            <div>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
            </div>
        </div>
    );
}

export default LineHeaderTop;