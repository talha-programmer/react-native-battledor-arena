export const Links = () =>{
  const home = 'http://127.0.0.1:8000/api/';
  return ({
    home: home,
    clubs: home + 'clubs/',
    matches: home + 'matches/',
    players: home + 'players/',
  });
}

