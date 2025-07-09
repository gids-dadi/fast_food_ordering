import { Redirect, Tabs } from "expo-router";
import useAuthStore from "@/store/auth.store";

export default function TabLayout() {
    const { isAuthenticated } = useAuthStore();

    if (!isAuthenticated) return <Redirect href={"../sign-in"} />

    return (
        <Tabs>
            <Tabs.Screen
                name="index"
                options={ {
                    title: "Home",
                    tabBarLabel: ({focused}) => <TabBarIcon />

                }}

        </Tabs>
    );
}


