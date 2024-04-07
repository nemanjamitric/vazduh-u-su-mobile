import { AdditionalSensorData } from "../types/__generated__/graphql";

export interface DataObject {
    __v: number;
    _id: string;
    air_pressure: number;
    cron_job_timestamp: string;
    humidity: number;
    latitude: string;
    longitude: string;
    name: string;
    particular_matter_1: number;
    particular_matter_10: {
      _id: string;
      aqi_us_ranking: number;
      concentration: number;
    };
    particular_matter_25: {
      _id: string;
      aqi_us_ranking: number;
      concentration: number;
    };
    temperature: number;
    time_stamp: string;
  }
  
  export interface NavigationHeaderProps {
    hideHome?: boolean;
  }
  
  export interface LoadingAnimationProps {
    loading: boolean;
  }
  
  export interface District {
    __v: number;
    _id: string;
    latitude: number;
    longitude: number;
    name: string;
  }
  
  export interface WeatherData {
    current_weather: {
      is_day: number;
      temperature: number;
      time: string;
      weathercode: number;
      winddirection: number;
      windspeed: number;
    };
    daily: {
      precipitation_probability_max: number[];
      temperature_2m_max: number[];
      temperature_2m_min: number[];
      time: string[];
      weathercode: number[];
      windspeed_10m_max: number[];
    };
    daily_units: {
      precipitation_probability_max: string;
      temperature_2m_max: string;
      temperature_2m_min: string;
      time: string;
      weathercode: string;
      windspeed_10m_max: string;
    };
    elevation: number;
    generationtime_ms: number;
    hourly: {
      relativehumidity_2m: number[];
      temperature_2m: number[];
      time: string[];
      weathercode: number[];
      winddirection_10m: number[];
      windspeed_10m: number[];
    };
    hourly_units: {
      relativehumidity_2m: string;
      temperature_2m: string;
      time: string;
      weathercode: string;
      winddirection_10m: string;
      windspeed_10m: string;
    };
    latitude: number;
    longitude: number;
    timezone: string;
    timezone_abbreviation: string;
    utc_offset_seconds: number;
  }
  
  export interface MapDataQueryProps {
    getLatestData?: AdditionalSensorData[];
  }