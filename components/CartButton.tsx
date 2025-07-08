import {View, Text, Image, TouchableOpacity} from 'react-native'
import React from 'react'
import {images} from "@/constants";

const CartButton = () => {
    const totalItems=10;
    return (
        <TouchableOpacity>
            <Image source={images.bag} className="size-4" resizeMode="contain"/>

            {
                totalItems > 0 && (
                    <View className="cart-badge">
                        <Text className="small-bold text-white">{totalItems}</Text>
                    </View>
                )
            }


            <Text>CartButton</Text>
        </TouchableOpacity>
    )
}
export default CartButton
