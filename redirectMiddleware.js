export const redirectMiddleware = (req, res, next) => {
  const authToken = req.cookies["JWT_TOKEN"];

  if (req.originalUrl === "/" && authToken) {
    return res.redirect("/posts");
  }

  if (authToken && req.originalUrl === "/authentication") {
    return res.redirect("/posts");
  }

  if (!authToken && req.originalUrl !== "/authentication") {
    return res.redirect("/authentication");
  }

  next();
};
