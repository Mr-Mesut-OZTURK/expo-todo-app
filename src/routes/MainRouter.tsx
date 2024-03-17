import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { AccountScreen, CreateUpdateTodoScreen, HomeScreen, TodoDetailScreen, TodoTagsScreen } from '@/screens';




const Tab = createBottomTabNavigator();
const Stack = createStackNavigator()


const TabRouter = () => {

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Tab.Screen
                name="home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Ionicons
                                name={focused ? 'home' : "home-outline"}
                                size={24}
                                color="orange"
                            />
                        )
                    },
                    title: ""
                }}
            />

            <Tab.Screen
                name="account"
                component={AccountScreen}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Ionicons
                                name={focused ? 'person' : "person-outline"}
                                size={24}
                                color="orange"
                            />
                        )
                    },
                    title: ""
                }}
            />
        </Tab.Navigator>
    )
}


export const MainRouter = () => {

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >

            <Stack.Screen
                name="tabScreens"
                component={TabRouter}
                options={{
                    title: "Taglar",
                }}
            />

            <Stack.Screen
                name="todo-create"
                component={CreateUpdateTodoScreen}
                options={{
                    title: "Oluştur",
                }}
            />
            <Stack.Screen
                name="todo-detail"
                component={TodoDetailScreen}
                options={{
                    title: "Detay",
                }}
            />
            <Stack.Screen
                name="todo-tags"
                component={TodoTagsScreen}
                options={{
                    title: "Taglar",
                }}
            />

        </Stack.Navigator>
    )
}




// export const MainRouter = () => {

//     return (
//         <Stack.Group>
//             <Stack.Screen
//                 name='tabRouter'
//                 component={TabRouter}
//                 options={{
//                     title: ""
//                 }}
//             />
//             <Stack.Screen
//                 name='stackRouter'
//                 component={StackRouter}
//                 options={{
//                     title: ""
//                 }}
//             />
//         </Stack.Group>
//     )
// }