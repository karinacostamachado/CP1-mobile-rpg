import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Home";
import AddTask from "./AddTask";
import AllTasks from "./AllTasks";

const MainNavigator = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator initialRouteName="Home"
        screenOptions={{
            headerStyle: {
              backgroundColor: 'green', 
            },
            headerTintColor: 'white', 
            headerTitleStyle: {
              fontWeight: 'bold'
            },
          }}>
            <Stack.Screen name = "Home" component={Home}/>
            <Stack.Screen name="AddTask" component={AddTask}/>
            <Stack.Screen name="AllTasks" component={AllTasks}/>
        </Stack.Navigator>
    )
}

export default MainNavigator;

