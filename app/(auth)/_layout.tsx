import {View, Text, KeyboardAvoidingView, Platform,Image, ScrollView, Dimensions, ImageBackground} from 'react-native'
import {Slot} from "expo-router";
import {images} from "@/constants";
// import {Image} from "expo-image"

const AuthLayout = () => {
    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <ScrollView className="bg-white h-full" keyboardShouldPersistTaps="handled">
                <View className="w-full relative" style={{height: Dimensions.get("screen").height / 2.25}}>
                    <ImageBackground source={images.loginGraphic} className="size-full rounded-b-lg" resizeMode="stretch"/>
                    <Image source={images.logo} className="self-center size-26 absolute -bottom-10 z-10"/>
                </View>
                <Slot />
            </ScrollView>
        </KeyboardAvoidingView>

    )
}
export default AuthLayout
