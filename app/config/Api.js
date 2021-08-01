const LinksFunction = () => {
  const home = "https://battledorarena.ml/";
  const api = home + "api/";
  return {
    home: home,
    clubs: api + "clubs/",
    matches: api + "matches/",
    players: api + "players/",
    tournaments: api + "tournaments/",
    news: api + "news/"
  };
};

const Links = LinksFunction();

export { Links };
