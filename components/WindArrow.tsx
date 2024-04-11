import React from "react"
import { View } from "react-native"
import { Icon } from "react-native-paper"

type WindArrowProps = {
    direction?: string
}

const WindArrow: React.FC<WindArrowProps> = ({direction}) => {
    return(
        <View style={{ transform: [{ rotate: `${direction}deg` }] }}>
            <Icon size={30} source='arrow-down-bold-outline' />
        </View>
    )
}

export default WindArrow