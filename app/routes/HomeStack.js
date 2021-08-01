import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import HomeScreen from "../screens/Home";
import ClubsScreen from "../screens/Clubs";
import MatchesScreen from "../screens/Matches";
import PlayersScreen from "../screens/Players";
import SingleClubScreen from "../screens/SingleClub";
import SinglePlayerScreen from "../screens/SinglePlayer";
import SingleMatchScreen from "../screens/SingleMatch";
import TournamentsScreen from "../screens/Tournaments";
import SingleTournamentScreen from "../screens/SingleTournament";
import SingleNewsScreen from "../screens/SingleNews";

// All navigation screens declared here, by default the first screen is opened when the app starts
const screens = {
  Home: {
    screen: HomeScreen
  },
  Clubs: {
    screen: ClubsScreen
  },
  Matches: {
    screen: MatchesScreen
  },
  Players: {
    screen: PlayersScreen
  },
  Tournaments: {
    screen: TournamentsScreen
  },
  SingleClub: {
    screen: SingleClubScreen
  },
  SinglePlayer: {
    screen: SinglePlayerScreen
  },
  SingleMatch: {
    screen: SingleMatchScreen
  },
  SingleTournament: {
    screen: SingleTournamentScreen
  },
  SingleNews: {
    screen: SingleNewsScreen
  }
};

const homeStack = createStackNavigator(screens);

export default createAppContainer(homeStack);
