import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import moment from 'moment';

const GraphScreen = () => {
  const initialData = {
    fuel: [],
    temperature: [],
    currentOutput: [],
    batteryVoltage: [],
  };

  const [data, setData] = useState(initialData);

  const updateData = () => {
    const newData = { ...data };
    const now = moment().format('HH:mm:ss');

    // Update each metric with random values within your specified ranges
    newData.fuel.push({ x: now, y: Math.random() * (7 - 2) + 2 });
    newData.temperature.push({ x: now, y: Math.random() * (90 - 80) + 80 });
    newData.currentOutput.push({ x: now, y: Math.random() * (230 - 220) + 220 });
    newData.batteryVoltage.push({ x: now, y: Math.random() * (12 - 10) + 10 });

    // Limit data to the last N points to prevent the graph from growing indefinitely
    const maxDataPoints = 50;
    if (newData.fuel.length > maxDataPoints) {
      newData.fuel.shift();
      newData.temperature.shift();
      newData.currentOutput.shift();
      newData.batteryVoltage.shift();
    }

    setData(newData);
  };

  useEffect(() => {
    const intervalId = setInterval(updateData, 5000); // Update every 5 seconds

    return () => {
      clearInterval(intervalId); // Clear interval on unmount
    };
  }, []);

  return (
    <View>
      <LineChart
        data={{
          labels: data.fuel.map((point) => point.x),
          datasets: [
            {
              data: data.fuel,
              color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // Customize line color
              strokeWidth: 2,
            },
            {
              data: data.temperature,
              color: (opacity = 1) => `rgba(0, 128, 0, ${opacity})`,
              strokeWidth: 2,
            },
            {
              data: data.currentOutput,
              color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
              strokeWidth: 2,
            },
            {
              data: data.batteryVoltage,
              color: (opacity = 1) => `rgba(255, 165, 0, ${opacity})`,
              strokeWidth: 2,
            },
          ],
        }}
        width={"100%"}
        height={"50%"}
        yAxisSuffix="" // Customize y-axis label
        yAxisInterval={1} // Customize y-axis interval
        chartConfig={{
          backgroundColor: 'white',
          backgroundGradientFrom: 'white',
          backgroundGradientTo: 'white',
          decimalPlaces: 2, // Number of decimal places for y-values
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Customize axis and label colors
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        bezier // Use bezier curve for smooth lines
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

export default GraphScreen;
