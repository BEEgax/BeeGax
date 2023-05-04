import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  LineChart,
} from "react-native-chart-kit";
import { Svg, RNSVGSvgAndroid } from 'react-native-svg';
import BeescaAPI from './BeescaAPI';

const HiveInfo = ({route, navigation}) => {
  const {buttonID} = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('HiveSettings', {buttonID: buttonID})}>
          <Icon name="cog" size={30} color="#fff" />
        </TouchableOpacity>
      ),
    });
  }, [navigation, buttonID]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{buttonID}</Text>
      <Chart buttonID={buttonID}></Chart>
    </View>
  );
}

const Chart = ({buttonID}) => {
  const [weightLabel, setWeightLabel] = useState([0]);
  const [tempLabel, setTempLabel] = useState([0]);
  const [humLabel, setHumLabel] = useState([0]);
  const [weightData, setWeightData] = useState([0]); 
  const [tempData, setTempData] = useState([0]);
  const [humData, setHumData] = useState([0]);

  useEffect(() => {
    BeescaAPI.setMeasurements(buttonID).then(() => {
      setWeightLabel(BeescaAPI.timeWeight);
      setTempLabel(BeescaAPI.timeTemp);
      setHumLabel(BeescaAPI.timeHum);
      setWeightData(BeescaAPI.weights);
      setTempData(BeescaAPI.temperatures)
      setHumData(BeescaAPI.humidities)
    });
  }, []);

 return(
  <View>
      <Text>Hive Weight Chart</Text>
      <LineChart
        data={{
          labels: weightLabel,
          datasets: [
            {
              data: weightData
            }
          ]
        }}
        width={Dimensions.get("window").width} // from react-native
        height={220}
        // yAxisLabel="$"
        yAxisSuffix=" kg"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#315e6b",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "5",
            strokeWidth: "2",
            stroke: "#315e6b"
          }
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />
      <Text>Hive Temperatures Chart</Text>
      <LineChart
        data={{
          labels: tempData,
          datasets: [
            {
              data: tempData
            }
          ]
        }}
        width={Dimensions.get("window").width} // from react-native
        height={220}
        // yAxisLabel="$"
        yAxisSuffix=" kg"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#315e6b",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "5",
            strokeWidth: "2",
            stroke: "#315e6b"
          }
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />

      <Text>Hive Humidities Chart</Text>
      <LineChart
        data={{
          labels: humLabel,
          datasets: [
            {
              data: humData
            }
          ]
        }}
        width={Dimensions.get("window").width} // from react-native
        height={220}
        // yAxisLabel="$"
        yAxisSuffix=" kg"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#315e6b",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "5",
            strokeWidth: "2",
            stroke: "#315e6b"
          }
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />

    </View>
 )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    marginBottom: 10,
  },
});

export default HiveInfo;
