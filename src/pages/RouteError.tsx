import { isRouteErrorResponse, useRouteError } from "react-router-dom";

const RouteError = () => {
    const error = useRouteError();
    const message = isRouteErrorResponse(error)
        ? error.statusText || "Não foi possível carregar esta página."
        : "Não foi possível carregar esta página.";

    return (
        <main>
            <h1>Algo deu errado</h1>
            <p>{message}</p>
        </main>
    );
};

export default RouteError;
