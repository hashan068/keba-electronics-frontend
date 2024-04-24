import protectedRoutes from "./protectedRoutes";
import publicRoutes from "./publicRoutes";

const routes = [...protectedRoutes, ...publicRoutes];

export default routes;