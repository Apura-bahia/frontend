
import { createBrowserRouter, redirect } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import CategoryPage from "../pages/category/CategoryPage";
import SearchPage from "../pages/search/SearchPage";
import RouteError from "../pages/RouteError";
import Login from "../pages/login/Login";
import { PostagemController } from "../controllers/PostagemController";
import { navigationItems } from "../config/navigation";
import Dashboard from "../pages/dashboard/Dashboard";
import { AuthController, AuthSessionError } from "../controllers/AuthController";
import Noticia from "../pages/noticia/Noticia";


const articlesLoader = ({ request }: { request: Request }) => {
    return PostagemController.getPostagens(request?.signal);
};


const dashboardLoader = async ({ request }: { request: Request }) => {
    try {
        const usuario = await AuthController.verificarSessao(request.signal);
        return { usuario };
    } catch (error) {
        if (error instanceof AuthSessionError && (error.status === 401 || error.status === 403)) {
            throw redirect("/login");
        }
        throw error;
    }
};


const router = createBrowserRouter(
    [
        {
            path: "/dashboard",
            element: <Dashboard />,
            loader: dashboardLoader,
            errorElement: <RouteError />,
        },
        {
            path: "/login",
            element: <Login />,
            errorElement: <RouteError />,
        },
        {
            path: "/",
            element: <App />,
            errorElement: <RouteError />,
            children: [
                { index: true, element: <Home />, loader: articlesLoader },
                { path: "busca", element: <SearchPage />, loader: articlesLoader },
                ...navigationItems.map((item) => ({
                    path: item.path.slice(1),
                    element: <CategoryPage category={item.category} />,
                    loader: articlesLoader,
                })),
                {
                    path: "/noticia/:noticia",
                    element: <Noticia />,
                    loader: articlesLoader,
                }
            ]
        }
    ]

);


export default router;
