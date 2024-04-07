import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'
import { AdditionalSensorData } from '../types/__generated__/graphql'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface LocationState {
    location?: AdditionalSensorData
    setLocation: (by: AdditionalSensorData) => void
    removeLocation: () => void
}

export const useLocationStore = create<LocationState>()(
    devtools(
        persist(
            (set) => ({
                location: null,
                setLocation: (newLocation) => set({ location: newLocation }),
                removeLocation: () => set({ location: null }),
            }),
            { 
                name: 'locationStore',
                storage: createJSONStorage(() => AsyncStorage), 
            },
        ),
    ),
)