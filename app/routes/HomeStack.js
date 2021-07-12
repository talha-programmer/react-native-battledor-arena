import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Home from '../screens/Home'
import Clubs from "../screens/Clubs";
import Matches from "../screens/Matches";
import Players from "../screens/Players";

// All navigation screens declared here, by default the firt screen is opened when the app starts 
const screens = {
  Home: {
    screen: Home
  },
  Clubs: {
    screen: Clubs
  },
  Matches: {
    screen: Matches
  },
  Players: {
    screen: Players
  },
}

const homeStack = createStackNavigator(screens);

export default createAppContainer(homeStack);