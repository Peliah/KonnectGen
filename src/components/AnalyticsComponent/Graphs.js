import { StyleSheet, Text, View, Button } from 'react-native'
import React, {useState} from 'react'
import { data } from './Data'
import { LineChart } from 'react-native-chart-kit';

const Graphs = () => {
  const [showEnergyConsumption, setShowEnergyConsumption] = useState(true);
  const [filter, setFilter] = useState('All');

  // const currentDate = new Date();
  // Filter data based on what to display (energy consumption or fuel usage)
  const dataToDisplay = showEnergyConsumption
    ? data.UsageAnalytics.UsageData.map((entry) => entry.EnergyConsumed)
    : data.UsageAnalytics.UsageData.map((entry) => entry.FuelUsedLiters);

  const labels = data.UsageAnalytics.UsageData.map((entry) => entry.Timestamp);


  // Filter data by week, month, or year
  // Function to filter data based on the selected filter
// Function to filter data based on the selected filter

const filterWeek = () =>{
  const currentDate = new Date();
    const oneWeekAgo = new Date(currentDate);
    oneWeekAgo.setDate(currentDate.getDate() - 7);

    // Filter data for the week
    return data.UsageAnalytics.UsageData.filter((entry) => {
      const entryDate = new Date(entry.Timestamp);
      return entryDate >= oneWeekAgo && entryDate <= currentDate;
    });
}
const filterData = () => {
  if (filter === 'Week') {
    const currentDate = new Date();
    const oneWeekAgo = new Date(currentDate);
    oneWeekAgo.setDate(currentDate.getDate() - 7);

    // Filter data for the week
    return data.UsageAnalytics.UsageData.filter((entry) => {
      const entryDate = new Date(entry.Timestamp);
      return entryDate >= oneWeekAgo && entryDate <= currentDate;
    });
  } else if (filter === 'Month') {
    const currentDate = new Date();
    const oneMonthAgo = new Date(currentDate);
    oneMonthAgo.setMonth(currentDate.getMonth() - 1);

    // Filter data for the month
    return data.UsageAnalytics.UsageData.filter((entry) => {
      const entryDate = new Date(entry.Timestamp);
      return entryDate >= oneMonthAgo && entryDate <= currentDate;
    });
  } else if (filter === 'Year') {
    const currentDate = new Date();
    const oneYearAgo = new Date(currentDate);
    oneYearAgo.setFullYear(currentDate.getFullYear() - 1);

    // Filter data for the year
    return data.UsageAnalytics.UsageData.filter((entry) => {
      const entryDate = new Date(entry.Timestamp);
      return entryDate >= oneYearAgo && entryDate <= currentDate;
    });
  } else {
    // No filter, show all data
    return data.UsageAnalytics.UsageData;
  }

};

const filteredData = filterData();



  return (
    <View>
      <Text>Generator Usage Analytics</Text>
      <Button
        title={showEnergyConsumption ? 'Show Fuel Usage' : 'Show Energy Consumption'}
        onPress={() => setShowEnergyConsumption(!showEnergyConsumption)}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <Button title="Week" onPress={() => filterWeek()} />
        <Button title="Month" onPress={() => setFilter('Month')} />
        <Button title="Year" onPress={() => setFilter('Year')} />
        <Button title="All" onPress={() => setFilter('All')} />
      </View>
      <LineChart
        data={{
          labels,
          datasets: [{ data: dataToDisplay }],
        }}
        width={2000}
        height={250}
        yAxisLabel={showEnergyConsumption ? 'kWh' : 'Liters'}
        chartConfig={{
          backgroundColor: 'white',
          backgroundGradientFrom: 'white',
          backgroundGradientTo: 'white',
          decimalPlaces: 2,
          color: () => (showEnergyConsumption ? 'green' : 'blue'),
          
        }}
        bezier
        style={{ marginVertical: 8 }}
        withHorizontalLines={false}
        
/>
    </View>
  );
};

export default Graphs

const styles = StyleSheet.create({})