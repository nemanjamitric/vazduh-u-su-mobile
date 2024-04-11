import React from "react";
import { View, Text, ActivityIndicator, StyleSheet, Dimensions } from "react-native";
import { Icon, useTheme } from "react-native-paper";

const QueryResult = ({ loading, error, data, children }) => {
    const theme = useTheme();
    if (error) {
      return( 
      <View style={styles.container}>
        <Icon source={'emoticon-sad-outline'} size={Dimensions.get('window').width / 3} color={theme.colors.primary} />
        <Text style={styles.messageText}>Došlo je do greške prilikom prikazivanja sadržaja.</Text>
      </View>);
    }
    if (loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    if (!data) {
      return(
        <View style={styles.container}>
          <Icon source={'emoticon-sad-outline'} size={Dimensions.get('window').width / 3} color={theme.colors.primary} />
          <Text style={styles.messageText}>Nothing to show...</Text>
        </View>);
    }
    if (data) {
      return children;
    }
  };

  const styles = StyleSheet.create({
    container: { 
      flex: 1, 
      alignItems: "center", 
      justifyContent: "center"
    },
    messageText: {
      fontSize: 20,
      fontFamily: 'Light',
      textAlign: 'center',
      width: '80%'
    }
  })

  export default QueryResult;