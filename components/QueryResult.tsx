import React from "react";
import { View, Text, ActivityIndicator } from "react-native";

const QueryResult = ({ loading, error, data, children }) => {
    if (error) {
      return <Text>ERROR: {error.message}</Text>;
    }
    if (loading) {
      return (
        <View>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    if (!data) {
      return <Text>Nothing to show...</Text>;
    }
    if (data) {
      return children;
    }
  };

  export default QueryResult;