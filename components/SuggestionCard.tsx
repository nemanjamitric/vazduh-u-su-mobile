import React from "react"
import { Title } from "react-native-paper"
import DashboardCard from "./DashboardCard"
import { Image, StyleSheet, Text, View } from "react-native"

const dobarSlika = require(`../assets/descriptive/Dobar.jpg`);
const prihvatljivSlika = require(`../assets/descriptive/Prihvatljiv.jpg`);
const srednjiSlika = require(`../assets/descriptive/Osetljiv.jpg`);
const losSlika = require(`../assets/descriptive/Nezdrav.jpg`);
const veomaLosSlika = require(`../assets/descriptive/VeomaLos.jpeg`);
const izuzetnoLosSlika = require(`../assets/descriptive/Opasan.jpg`);


const suggestionArray = [
    {title: 'Dobar', image: dobarSlika, 'explanation': "Vazduh je čist i kvalitetan. Nema rizika za zdravlje ljudi.", suggestion: "Uživajte u vremenu napolju i aktivnostima na otvorenom bez ograničenja. Ovo je idealno vreme za sportske aktivnosti ili rekreaciju."},
    {title: 'Prihvatljiv', image: prihvatljivSlika, 'explanation': "Kvalitet vazduha je prihvatljiv, ali može biti blago zagađen. Osobe sa osetljivim disajnim organima mogu osetiti blage simptome..", suggestion: "Osobe sa respiratornim problemima trebalo bi da ograniče produžene boravke napolju, posebno tokom fizičkih aktivnosti. Ostali ljudi mogu nastaviti sa svojim uobičajenim aktivnostima, ali trebalo bi da budu svesni blagog rizika."},
    {title: 'Srednji', image: srednjiSlika, 'explanation': "Kvalitet vazduha postaje nezdrav za osetljive grupe, kao što su deca, starije osobe i osobe sa respiratornim oboljenjima. Ostali ljudi mogu osetiti manje smetnje", suggestion: "Osobe iz osetljivih grupa trebalo bi da izbegavaju produžene boravke napolju, dok bi ostali ljudi trebalo da smanje intenzitet fizičkih aktivnosti na otvorenom.."},
    {title: 'Loš', image: losSlika, 'explanation': "Kvalitet vazduha postaje nezdrav za sve. Svi ljudi mogu osetiti značajne smetnje, a osetljive grupe mogu iskusiti ozbiljnije zdravstvene probleme.", suggestion: "Svi ljudi, posebno osetljive grupe, trebalo bi da izbegavaju bilo kakve aktivnosti na otvorenom. Korišćenje maski za lice može pomoći u zaštiti od zagađenja."},
    {title: 'Veoma Loš', image: veomaLosSlika, 'explanation': "Kvalitet vazduha postaje veoma nezdrav za sve. Svi ljudi mogu iskusiti ozbiljne zdravstvene probleme.", suggestion: "Svi ljudi, bez obzira na osetljivost, trebalo bi da izbegavaju boravak napolju i smanje sve fizičke aktivnosti na minimum. Korišćenje kvalitetnih maski za lice i zatvaranje prozora može pomoći u zaštiti od zagađenja."},
    {title: 'Izuzetno Loš', image: izuzetnoLosSlika, 'explanation': "Kvalitet vazduha je opasan za sve. Izlaganje ovakvim uslovima može izazvati ozbiljne zdravstvene probleme, čak i kod kratkotrajnog boravka napolju.", suggestion: "Svi ljudi bi trebalo da ostanu u zatvorenom prostoru i izbegavaju bilo kakav boravak napolju. Korišćenje visokokvalitetnih maski za lice je neophodno ako je potrebno napustiti zatvoreni prostor. Ovo je kritično vreme za javno zdravlje i trebalo bi preduzeti sve mere opreza kako bi se smanjila izloženost zagađenju."},
];

const SuggestionCard = ({colorParameter, title}) => {
    const suggestionData = suggestionArray.find(suggestion => suggestion.title === title);
    return(
        <DashboardCard colorParameter={colorParameter}>
        <Title style={styles.cardTitle}>{suggestionData.title} Kvalitet Vazduha</Title>
        <View style={{flexDirection: 'row'}}>
          <Image source={suggestionData.image} style={{width: '35%', height: 250, resizeMode: 'cover', borderRadius: 8}} />
          <View style={{flex: 1, paddingLeft: 10}}>
            <Text style={styles.cardText}>Šta to znači</Text>
            <Text style={styles.cardTextLight}>Vazduh je čist i kvalitetan. Nema rizika za zdravlje ljudi.</Text>
            <Text style={styles.cardText}>Preporuke</Text>
            <Text style={styles.cardTextLight}>Uživajte u vremenu napolju i aktivnostima na otvorenom bez ograničenja. Ovo je idealno vreme za sportske aktivnosti ili rekreaciju.</Text>
          </View>
        </View>
      </DashboardCard>
    )
}

const styles = StyleSheet.create({
  cardTitle: {
    fontSize: 18,
    lineHeight: 20,
    fontFamily: 'Medium',
  },
  cardText: {
    fontSize: 16,
    fontFamily: 'Regular'
  },
  cardTextLight: {
    fontSize: 16,
    fontFamily: 'Light',
    marginBottom: 16
  },
})

export default SuggestionCard;