import React from "react"
import { StyleSheet, ViewStyle } from "react-native"
import { getClosestKey } from "../functions/commonFunctions"
import { qualityColorVals80 } from "../functions/meteoTransform"
import { BlurView } from "expo-blur"

interface Props {
    children: string | JSX.Element | JSX.Element[],
    colorParameter: number,
    style?: ViewStyle
}

const DashboardCard: React.FC<Props> = ({colorParameter, children, style}) => {
    return(
        <BlurView intensity={90} style={[styles.cardStyle, {backgroundColor: getClosestKey(qualityColorVals80, colorParameter)}, style]}>
            {children}
        </BlurView>
    )
}

const styles = StyleSheet.create({
    cardStyle: {
        borderRadius: 16,
        overflow: 'hidden',
        padding: 12,
        borderWidth: 1,
        borderColor: 'white',
        marginBottom: 12
    }
})

export default DashboardCard