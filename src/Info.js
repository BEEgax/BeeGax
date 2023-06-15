import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  LineChart,
} from "react-native-chart-kit";
import BeescaAPI from './BeescaAPI';
import { ScrollView } from 'react-native-gesture-handler';

const HiveInfo = ({route, navigation}) => {
  const {buttonID} = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('HiveSettings', {buttonID: buttonID})}>
          <View style={styles.iconContainer}>
          <Icon name="cog" size={30} color="#fff" />
          </View>
        </TouchableOpacity>
      ),
    });
  }, [navigation, buttonID]);

  const hive = BeescaAPI.hives.find((value) => value.id==buttonID);
  console.log(hive);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{hive.name}</Text>
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
  <ScrollView>
      <View style={styles.chartContainer}>
      <Text style={styles.chartText}>Hive Weight Chart</Text>
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
        yAxisSuffix="kg"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#55a16b",
          backgroundGradientFrom: "#55a16b",
          backgroundGradientTo: "#55a16b",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "5",
            strokeWidth: "2",
            stroke: "#55a16b"
          }
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
      </View>
      <Text style={styles.chartText}>Hive Temperatures Chart</Text>
      <LineChart
        data={{
          labels: tempLabel,
          datasets: [
            {
              data: tempData
            }
          ]
        }}
        width={Dimensions.get("window").width} // from react-native
        height={220}
        // yAxisLabel="$"
        yAxisSuffix="°C"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#55a16b",
          backgroundGradientFrom: "#55a16b",
          backgroundGradientTo: "#55a16b",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
            margin: 100, // Add margin
            padding: 100, // Add padding
          },
          propsForDots: {
            r: "5",
            strokeWidth: "2",
            stroke: "#55a16b"
          }
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />

      <Text style={styles.chartText}>Hive Humidities Chart</Text>
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
        yAxisSuffix="%"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#315e6b",
          backgroundGradientFrom: "#55a16b",
          backgroundGradientTo: "#55a16b",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "5",
            strokeWidth: "2",
            stroke: "#55a16b"
          }
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />
    </ScrollView>
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
    marginBottom: 50,
    color: "#55a16b",
  },
  chartContainer: {
    // margin: 10,
    // padding: 10,
  },
  text: {
    marginTop: 30,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 10,
  },
  chartText: {
    fontSize: 17,
    // fontWeight: 'bold',
    color: '#333333',
    textAlign: 'left',
    marginBottom: 0,
    padding: 0,
    marginTop: 20,
    marginLeft: 12,
  },
  iconContainer: {
    paddingRight: 10,
  },

});

export default HiveInfo;
