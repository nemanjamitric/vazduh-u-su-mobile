import { DataObject, District } from '../interfaces/interfaces';

export const filterUniqueObjectsByName = (data: DataObject[]): DataObject[] => {
  const uniqueObjects: { [key: string]: DataObject } = {};

  for (const obj of data) {
    if (!(obj.name in uniqueObjects) || obj.time_stamp > uniqueObjects[obj.name].time_stamp) {
      uniqueObjects[obj.name] = obj;
    }
  }

  return Object.values(uniqueObjects);
};

export const getLowestKey = (map, givenValue = 0) => {
  let result = null;
  for (const [key, value] of map.entries()) {
    if (key < givenValue) {
      result = value;
      break;
    }
  }

  return result;
};

export const getClosestKey = <K, V>(map: Map<K, V>, givenValue: number = 0): V | null => {
  let result: V | null = null;
  const differenceArray: number[] = [];
  for (const [key] of map.entries()) {
    const numericKey = Number(key);

    const difference = givenValue - numericKey;
    if (difference >= 0) {
      differenceArray.push(difference);
    }
  }
  const smallestDifference = Math.min(...differenceArray);

  const rightKey = givenValue - smallestDifference;

  result = map.get(rightKey);

  return result;
};

export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const earthRadius = 6371; // Radius of the Earth in kilometers

  const degToRad = (degrees: number) => (degrees * Math.PI) / 180;

  const dLat = degToRad(lat2 - lat1);
  const dLon = degToRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degToRad(lat1)) * Math.cos(degToRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadius * c;
};

export const findClosestDistrict = (data: District, dataArray: DataObject[]): DataObject | null => {
  let closestData: DataObject | null = null;
  let closestDistance = Infinity;

  for (const dataObj of dataArray) {
    const lat1 = data.latitude;
    const lon1 = data.longitude;
    const lat2 = parseFloat(dataObj.latitude);
    const lon2 = parseFloat(dataObj.longitude);

    const distance = calculateDistance(lat1, lon1, lat2, lon2);

    if (distance < closestDistance) {
      closestDistance = distance;
      closestData = dataObj;
    }
  }

  return closestData;
};

export const weatherIconNow = weatherData => {
  return weatherData.current_weather ? weatherData.current_weather.weathercode : 0;
};
