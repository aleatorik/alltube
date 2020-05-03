import routes from "./routes";

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "AllTube";
  res.locals.routes = routes;
  next();
};
