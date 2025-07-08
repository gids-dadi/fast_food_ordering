import {View, Text, Alert} from 'react-native'
import {useState} from "react";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import {Link, router} from "expo-router";


const SignIn = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({
        email: "",
        password: ""
    })


    const submit =  async () => {
        if (!form.email || !form.password) {
          Alert.alert("Error", "Please fill all the fields");
        }

        setIsSubmitting(true);
        try {
        //     Call appwrite
            Alert.alert("Success", "You are logged in successfully");
            router.replace("/")
        } catch (error:any) {
            Alert.alert("Error", error.message);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <View className="bg-white gap-10  rounded-lg p-5 mt-5">
            <CustomInput
                placeholder="Enter Email"
                value={form.email}
                onChangeText={(text) => setForm((prev) => ({ ...prev, email: text }))}
                label="Email"
                keyboardType="email-address"
                />

            <CustomInput
                placeholder="Enter Password"
                value={form.password}
                onChangeText={(text) => setForm((prev) => ({...prev, password: text}))}
                label="Password"
                secureTextEntry={true}
                />

            <CustomButton
                title="Sign In"
                isLoading={isSubmitting}
                onPress={submit}
            />
            <View>
                <Text className="base-regular text-gray-100">
                    Don't have an account?{" "}
                </Text>
                <Link href="/sign-up" className="text-primary base-bold">
                    Sign Up
                </Link>
            </View>
        </View>
    )
}
export default SignIn
