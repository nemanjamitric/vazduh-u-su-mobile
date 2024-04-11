import React from "react"
import { Dimensions, Image, StyleSheet } from "react-native"

const {width, height} = Dimensions.get('window');

const picturesObject = Object.freeze({
    'day': {
        "Dobar": require('../assets/backgrounds/DobarDanBG.jpeg'),
        "Prihvatljiv": require('../assets/backgrounds/PrihvatljivDanBG.jpeg'),
        "Srednji": require('../assets/backgrounds/SrednjiDanBG.jpeg'),
        "Loš": require('../assets/backgrounds/LosDanBG.jpeg'),
        "Veoma Loš": require('../assets/backgrounds/VeomaLosDanBG.jpeg'),
        "Izuzetno Loš": require('../assets/backgrounds/IzuzetnoLosDanBG.jpeg'),
    },
    night: {
        "Dobar": require('../assets/backgrounds/DobarNocBG.jpeg'),
        "Prihvatljiv": require('../assets/backgrounds/PrihvatljivNocBG.jpeg'),
        "Srednji": require('../assets/backgrounds/SrednjiNocBG.jpeg'),
        "Loš": require('../assets/backgrounds/LosNocBG.jpeg'),
        "Veoma Loš": require('../assets/backgrounds/VeomaLosNocBG.jpeg'),
        "Izuzetno Loš": require('../assets/backgrounds/IzuzetnoLosNocBG.jpeg'),
    }
})

const getTimeOfDay = (): string => {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    if (hours >= 6 && hours < 18) {
        return 'day';
    } else {
        return 'night';
    }
}

const BackgroundImage = ({pictureParameter}) => {
    const timeOfDay = getTimeOfDay();
    return(
      <Image style={styles.background} source={picturesObject[timeOfDay][pictureParameter]} />
    )
}

const styles = StyleSheet.create({ 
  background: {
    position: 'absolute',
    width: width,
    height: height,
  },
})

export default BackgroundImage;