import {View, Text, Image, TouchableOpacity} from 'react-native'
import React from 'react'
import {images} from "@/constants";
import {useCartStore} from "@/store/cart.store";

const CartButton = () => {
    const {getTotalItems} = useCartStore();
    const totalItems = getTotalItems();
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

        </TouchableOpacity>
    )
}
export default CartButton
