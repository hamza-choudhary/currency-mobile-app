import { API_URL, STORAGE_KEY } from '@/constants/general'
import { MESSAGES } from '@/constants/messages'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { create } from 'zustand'

export const useCurrencyStore = create((set) => ({
	currencies: [],
	isLoading: false,
	error: null,
	isError: false,
	lastUpdated: null,

	fetchCurrencies: async () => {
		set({ isLoading: true, isError: false })
		try {
			const response = await axios.get(API_URL)
			const currencies = Object.values(response.data)
			await AsyncStorage.setItem(
				STORAGE_KEY,
				JSON.stringify({ currencies, lastUpdated: new Date().toISOString() })
			)
			set({
				currencies,
				isLoading: false,
				isError: false,
				lastUpdated: new Date().toISOString(),
			})
		} catch (error) {
			set({ error: error || MESSAGES.API_ERROR, isLoading: false })
		}
	},

	loadStoredData: async () => {
		try {
			const storedData = await AsyncStorage.getItem(STORAGE_KEY)
			if (storedData.length > 1) {
				const { currencies, lastUpdated } = JSON.parse(storedData)
				set({ currencies, lastUpdated })
			}
		} catch (error) {
			set({ error: error || MESSAGES.STORAGE_ERROR })
		}
	},
}))
