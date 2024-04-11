import cloudyIcon from '../assets/weatherIcons/cloud.png';
import sunCloudIcon from '../assets/weatherIcons/cloudSunny.png';
import cloudierIcon from '../assets/weatherIcons/cloudier.png';
import foggyIcon from '../assets/weatherIcons/foggy.png';
import heavyRainIcon from '../assets/weatherIcons/heavyRain.png';
import rainIcon from '../assets/weatherIcons/rainy.png';
import snowIcon from '../assets/weatherIcons/snow.png';
import sunnyIcon from '../assets/weatherIcons/sunny.png';

export const deviceNameParams = new Map([
  ['ITSU2030 - Studio Present', 'studi'],
  ['IT Subotica 2030 - V. Nazora', 'naz'],
  ['ITSU2030 - Desanke Maksimovic', 'maks'],
]);

export const qualityText = new Map([
  [0, 'Dobar'],
  [51, 'Prihvatljiv'],
  [101, 'Srednji'],
  [151, 'Loš'],
  [201, 'Veoma Loš'],
  [301, 'Izuzetno Loš'],
]);

export const qualitySmiley = new Map([
  [0, '😊'],
  [51, '😊'],
  [101, '😟'],
  [151, '😟'],
  [201, '😷'],
  [301, '😷'],
]);

export const qualityColorVals = new Map([
  [0, 'rgba(156,216,78,0.15)'],
  [51, 'rgba(250,207,57,0.15)'],
  [101, 'rgba(249,144,73,0.15)'],
  [151, 'rgba(246,94,95,0.15)'],
  [201, 'rgba(160,112,182,0.15)'],
  [301, 'rgba(160,106,123,0.15)'],
]);

export const qualityColorVals50 = new Map([
  [0, 'rgba(156,216,78,0.5)'],
  [51, 'rgba(250,207,57,0.5)'],
  [101, 'rgba(249,144,73,0.5)'],
  [151, 'rgba(246,94,95,0.5)'],
  [201, 'rgba(160,112,182,0.5)'],
  [301, 'rgba(160,106,123,0.5)'],
]);

export const qualityColorVals80 = new Map([
  [0, 'rgba(156,216,78,0.8)'],
  [51, 'rgba(250,207,57,0.8)'],
  [101, 'rgba(249,144,73,0.8)'],
  [151, 'rgba(246,94,95,0.8)'],
  [201, 'rgba(160,112,182,0.8)'],
  [301, 'rgba(160,106,123,0.8)'],
]);

export const dayNames = new Map([
  ['Monday', 'Ponedeljak'],
  ['Tuesday', 'Utorak'],
  ['Wednesday', 'Sreda'],
  ['Thursday', 'Četvrtak'],
  ['Friday', 'Petak'],
  ['Saturday', 'Subota'],
  ['Sunday', 'Nedelja'],
]);

//weather descriptions
export const weatherMap = new Map([
  [0, 'Vedro nebo'],
  [1, 'Pretežno vedro'],
  [2, 'Delimično oblačno'],
  [3, 'Oblačno'],
  [45, 'Magla'],
  [48, 'Magla'],
  [51, 'Slaba kiša'],
  [53, 'Umerena kiša'],
  [55, 'Jaka kiša'],
  [56, 'Slaba ledena kiša'],
  [57, 'Jaka ledena kiša'],
  [61, 'Slab kišni pljusak'],
  [63, 'Umeren kišni pljusak'],
  [65, 'Jak kišni pljusak'],
  [66, 'Slab ledni pljusak'],
  [67, 'Jak ledni pljusak'],
  [71, 'Slab sneg'],
  [73, 'Umeren sneg'],
  [75, 'Jak sneg'],
  [77, 'Snežne pahulje'],
  [80, 'Slabi pljusak kiše'],
  [81, 'Umereni pljusak kiše'],
  [82, 'Jaki pljusak kiše'],
  [85, 'Slabi snežni pljusak'],
  [86, 'Jaki snežni pljusak'],
  [95, 'Nepogoda: Slaba ili umerena'],
  [96, 'Nepogoda sa slabim gradom'],
  [99, 'Nepogoda sa jakim gradom'],
]);

export function getWeatherIcon(weatherCode) {
  switch (weatherCode) {
    case 0:
      return sunnyIcon;
    case 1:
      return sunCloudIcon;
    case 2:
      return cloudyIcon;
    case 3:
      return cloudierIcon;
    case 45:
    case 48:
      return foggyIcon;
    case 51:
    case 53:
      return rainIcon;
    case 55:
    case 57:
      return heavyRainIcon;
    case 56:
    case 61:
    case 63:
    case 65:
    case 67:
    case 80:
    case 81:
      return rainIcon;
    case 66:
    case 71:
    case 73:
    case 75:
    case 77:
    case 85:
    case 86:
      return snowIcon;
    case 82:
    case 95:
    case 96:
    case 99:
      return heavyRainIcon;
    default:
      return sunnyIcon;
  }
}
