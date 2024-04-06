/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

/** Sensor data object with additional readings for official sensors */
export type AdditionalSensorData = {
  __typename?: 'AdditionalSensorData';
  /** Sensor ID */
  _id: Scalars['ID']['output'];
  /** Air quality index (AQI) China standard */
  aqicn: Scalars['String']['output'];
  /** Air quality index (AQI) US standard */
  aqius: Scalars['String']['output'];
  /** Nitrogen dioxide concentration */
  azotDioksid?: Maybe<Scalars['String']['output']>;
  /** Nitrogen monoxide concentration */
  azotMonogksid?: Maybe<Scalars['String']['output']>;
  /** Benzene concentration */
  benzen?: Maybe<Scalars['String']['output']>;
  /** Weather condition at sensor */
  condition: Scalars['String']['output'];
  /** Sensor contributor */
  contributor: Scalars['String']['output'];
  /** Sensor display name */
  displayName: Scalars['String']['output'];
  /** Sensor display name latin */
  displayNameLatin: Scalars['String']['output'];
  /** Ethylbenzene concentration */
  etilBenzen?: Maybe<Scalars['String']['output']>;
  /** Sensor humidity */
  humidity: Scalars['String']['output'];
  /** Sensor latitude */
  latitude: Scalars['String']['output'];
  /** Sensor longitude */
  longitude: Scalars['String']['output'];
  /** Metaxylene concentration */
  mpKsilen?: Maybe<Scalars['String']['output']>;
  /** Sensor name */
  name: Scalars['String']['output'];
  /** Orthoxylene concentration */
  oKsilen?: Maybe<Scalars['String']['output']>;
  /** Nitrogen oxides concentration */
  oksidiAzota?: Maybe<Scalars['String']['output']>;
  /** Sensor path */
  path: Scalars['String']['output'];
  /** Air quality index PM1 size particles concentration (AQI) China standard */
  pm1_aqicn: Scalars['String']['output'];
  /** Air quality index PM1 size particles concentration (AQI) US standard */
  pm1_aqius: Scalars['String']['output'];
  /** PM1 size particles concentration */
  pm1_conc: Scalars['String']['output'];
  /** Air quality index PM10 size particles concentration (AQI) China standard */
  pm10_aqicn: Scalars['String']['output'];
  /** Air quality index PM10 size particles concentration (AQI) US standard */
  pm10_aqius: Scalars['String']['output'];
  /** PM10 size particles concentration */
  pm10_conc: Scalars['String']['output'];
  /** Air quality index PM2.5 size particles concentration (AQI) China standard */
  pm25_aqicn: Scalars['String']['output'];
  /** Air quality index PM2.5 size particles concentration (AQI) US standard */
  pm25_aqius: Scalars['String']['output'];
  /** PM2.5 size particles concentration */
  pm25_conc: Scalars['String']['output'];
  /** Sensor air pressure */
  pressure: Scalars['String']['output'];
  /** Low atmospheric ozone concentration */
  prizemniOzon?: Maybe<Scalars['String']['output']>;
  /** Sensor region */
  region: Scalars['String']['output'];
  /** Sulfur oxides concentration */
  sumporDioksid?: Maybe<Scalars['String']['output']>;
  /** Temperature at sensor */
  temperature: Scalars['String']['output'];
  /** Time of sensors last reading */
  time: Scalars['String']['output'];
  /** Toluene concentration */
  toulen?: Maybe<Scalars['String']['output']>;
  /** Carbon monoxide concentration */
  ugljenMonogksid?: Maybe<Scalars['String']['output']>;
  /** Wind direction at sensor */
  wind_direction: Scalars['String']['output'];
  /** Wind speed at sensor */
  wind_speed: Scalars['String']['output'];
};

/** Response object for a single sensor for a daily chart */
export type DailyChartResponse = {
  __typename?: 'DailyChartResponse';
  /** Response HTTP code */
  code: Scalars['Int']['output'];
  /** Response data */
  dailyData?: Maybe<Array<Maybe<SensorDataListItem>>>;
  /** Response message */
  message: Scalars['String']['output'];
  /** Boolean representing if the request was successful */
  success: Scalars['Boolean']['output'];
};

/** Response object for a single sensor on a per day basis */
export type DailyDataResponse = {
  __typename?: 'DailyDataResponse';
  /** Response HTTP code */
  code: Scalars['Int']['output'];
  /** Response data */
  dailyData?: Maybe<Array<Maybe<SensorDataListItem>>>;
  /** Response message */
  message: Scalars['String']['output'];
  /** Boolean representing if the request was successful */
  success: Scalars['Boolean']['output'];
};

/** Response data with count */
export type DataWithCount = {
  __typename?: 'DataWithCount';
  /** Response data count */
  count?: Maybe<Scalars['Int']['output']>;
  /** Response data */
  data?: Maybe<Array<Maybe<SensorDataListItem>>>;
};

/** Response object for a single sensor on a per hour basis */
export type HourlyDataResponse = {
  __typename?: 'HourlyDataResponse';
  /** Response HTTP code */
  code: Scalars['Int']['output'];
  /** Response data */
  hourlyData?: Maybe<DataWithCount>;
  /** Response message */
  message: Scalars['String']['output'];
  /** Boolean representing if the request was successful */
  success: Scalars['Boolean']['output'];
};

export type Query = {
  __typename?: 'Query';
  /** Get all sensors in the database */
  getAllSensors: Array<SensorName>;
  /** Get all sensors in the database on a per day basis */
  getAllSensorsPerDay: Array<SensorAverageData>;
  /** Get all sensors in the database on a per hour basis */
  getAllSensorsPerHour: Array<SensorAverageData>;
  /** Get latest data for all sensors in the database */
  getLatestData: Array<AdditionalSensorData>;
  /** Get data for a specific sensor for a daily chart */
  getSingleSensorDailyChart?: Maybe<DailyChartResponse>;
  /** Get data for a specific sensor on a per day basis */
  getSingleSensorDataPerDay?: Maybe<DailyDataResponse>;
  /** Get data for a specific sensor on a per hour basis */
  getSingleSensorDataPerHour?: Maybe<HourlyDataResponse>;
  /** Get data for a specific sensor for a radar */
  getSingleSensorRadarData?: Maybe<RadarDataResponse>;
};


export type QueryGetSingleSensorDailyChartArgs = {
  sensorName: Scalars['String']['input'];
};


export type QueryGetSingleSensorDataPerDayArgs = {
  sensorName: Scalars['String']['input'];
  timePeriod: Scalars['String']['input'];
};


export type QueryGetSingleSensorDataPerHourArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  sensorName: Scalars['String']['input'];
  timePeriod: Scalars['String']['input'];
};


export type QueryGetSingleSensorRadarDataArgs = {
  sensorName: Scalars['String']['input'];
  timePeriod: Scalars['String']['input'];
};

/** Response object for a single sensor for a radar */
export type RadarDataResponse = {
  __typename?: 'RadarDataResponse';
  /** Response HTTP code */
  code: Scalars['Int']['output'];
  /** Response message */
  message: Scalars['String']['output'];
  /** Response data */
  radarData?: Maybe<DataWithCount>;
  /** Boolean representing if the request was successful */
  success: Scalars['Boolean']['output'];
};

/** Sensor data object with average readings */
export type SensorAverageData = {
  __typename?: 'SensorAverageData';
  /** Sensor ID */
  _id: Scalars['ID']['output'];
  /** Average air quality index (AQI) China standard */
  aqicn: Scalars['String']['output'];
  /** Average air quality index (AQI) US standard */
  aqius: Scalars['String']['output'];
  /** Average humidity at sensor */
  humidity: Scalars['String']['output'];
  /** Average air quality index PM1 size particles concentration (AQI) US standard */
  pm1_aqius: Scalars['String']['output'];
  /** Average air quality index PM1 size particles concentration (AQI) */
  pm1_conc: Scalars['String']['output'];
  /** Average air quality index PM10 size particles concentration (AQI) China standard */
  pm10_aqicn: Scalars['String']['output'];
  /** Average air quality index PM10 size particles concentration (AQI) US standard */
  pm10_aqius: Scalars['String']['output'];
  /** Average air quality index PM10 size particles concentration (AQI) */
  pm10_conc: Scalars['String']['output'];
  /** Average air quality index PM2.5 size particles concentration (AQI) China standard */
  pm25_aqicn: Scalars['String']['output'];
  /** Average air quality index PM2.5 size particles concentration (AQI) US standard */
  pm25_aqius: Scalars['String']['output'];
  /** Average air quality index PM2.5 size particles concentration (AQI) */
  pm25_conc: Scalars['String']['output'];
  /** Average pressure at sensor */
  pressure: Scalars['String']['output'];
  /** Average temperature at sensor */
  temperature: Scalars['String']['output'];
  /** Data timestamp */
  time: Scalars['String']['output'];
  /** Average wind direction at sensor */
  wind_direction: Scalars['String']['output'];
  /** Average wind speed at sensor */
  wind_speed: Scalars['String']['output'];
};

/** Sensor data object with readings */
export type SensorData = {
  __typename?: 'SensorData';
  /** Sensor ID */
  _id: Scalars['ID']['output'];
  /** Air quality index (AQI) China standard */
  aqicn: Scalars['String']['output'];
  /** Air quality index (AQI) US standard */
  aqius: Scalars['String']['output'];
  /** Weather condition at sensor */
  condition: Scalars['String']['output'];
  /** Sensor contributor */
  contributor: Scalars['String']['output'];
  /** Sensor display name */
  displayName: Scalars['String']['output'];
  /** Sensor display name latin */
  displayNameLatin: Scalars['String']['output'];
  /** Sensor humidity */
  humidity: Scalars['String']['output'];
  /** Sensor latitude */
  latitude: Scalars['String']['output'];
  /** Sensor longitude */
  longitude: Scalars['String']['output'];
  /** Sensor name */
  name: Scalars['String']['output'];
  /** Sensor path */
  path: Scalars['String']['output'];
  /** Air quality index PM1 size particles concentration (AQI) China standard */
  pm1_aqicn: Scalars['String']['output'];
  /** Air quality index PM1 size particles concentration (AQI) US standard */
  pm1_aqius: Scalars['String']['output'];
  /** PM1 size particles concentration */
  pm1_conc: Scalars['String']['output'];
  /** Air quality index PM10 size particles concentration (AQI) China standard */
  pm10_aqicn: Scalars['String']['output'];
  /** Air quality index PM10 size particles concentration (AQI) US standard */
  pm10_aqius: Scalars['String']['output'];
  /** PM10 size particles concentration */
  pm10_conc: Scalars['String']['output'];
  /** Air quality index PM2.5 size particles concentration (AQI) China standard */
  pm25_aqicn: Scalars['String']['output'];
  /** Air quality index PM2.5 size particles concentration (AQI) US standard */
  pm25_aqius: Scalars['String']['output'];
  /** PM2.5 size particles concentration */
  pm25_conc: Scalars['String']['output'];
  /** Sensor air pressure */
  pressure: Scalars['String']['output'];
  /** Sensor region */
  region: Scalars['String']['output'];
  /** Temperature at sensor */
  temperature: Scalars['String']['output'];
  /** Time of sensors last reading */
  time: Scalars['String']['output'];
  /** Wind direction at sensor */
  wind_direction: Scalars['String']['output'];
  /** Wind speed at sensor */
  wind_speed: Scalars['String']['output'];
};

/** Sensor data object with readings in a list */
export type SensorDataListItem = {
  __typename?: 'SensorDataListItem';
  /** Sensor ID */
  _id: Scalars['ID']['output'];
  /** Air quality index (AQI) China standard */
  aqicn: Scalars['String']['output'];
  /** Air quality index (AQI) US standard */
  aqius: Scalars['String']['output'];
  /** Weather condition at sensor */
  condition: Scalars['String']['output'];
  /** Sensor display name */
  displayName: Scalars['String']['output'];
  /** Sensor latitude */
  latitude: Scalars['String']['output'];
  /** Sensor longitude */
  longitude: Scalars['String']['output'];
  /** Sensor name */
  name: Scalars['String']['output'];
  /** Air quality index PM1 size particles concentration (AQI) China standard */
  pm1_aqicn: Scalars['String']['output'];
  /** Air quality index PM1 size particles concentration (AQI) US standard */
  pm1_aqius: Scalars['String']['output'];
  /** PM1 size particles concentration */
  pm1_conc: Scalars['String']['output'];
  /** Air quality index PM10 size particles concentration (AQI) China standard */
  pm10_aqicn: Scalars['String']['output'];
  /** Air quality index PM10 size particles concentration (AQI) US standard */
  pm10_aqius: Scalars['String']['output'];
  /** PM10 size particles concentration */
  pm10_conc: Scalars['String']['output'];
  /** Air quality index PM2.5 size particles concentration (AQI) China standard */
  pm25_aqicn: Scalars['String']['output'];
  /** Air quality index PM2.5 size particles concentration (AQI) US standard */
  pm25_aqius: Scalars['String']['output'];
  /** PM2.5 size particles concentration */
  pm25_conc: Scalars['String']['output'];
  /** Sensor air pressure */
  pressure: Scalars['String']['output'];
  /** Temperature at sensor */
  temperature: Scalars['String']['output'];
  /** Time of sensors last reading */
  time: Scalars['String']['output'];
  /** Wind direction at sensor */
  wind_direction: Scalars['String']['output'];
  /** Wind speed at sensor */
  wind_speed: Scalars['String']['output'];
};

/** Simple sensor data object without readings */
export type SensorName = {
  __typename?: 'SensorName';
  /** Sensor ID */
  _id: Scalars['ID']['output'];
  /** Sensor contributor */
  contributor: Scalars['String']['output'];
  /** Sensor display name */
  displayName: Scalars['String']['output'];
  /** Sensor display name in Latin */
  displayNameLatin: Scalars['String']['output'];
  /** Sensor name */
  name: Scalars['String']['output'];
  /** Sensor region */
  region: Scalars['String']['output'];
  /** Sensor type */
  sensorType: Scalars['String']['output'];
};
