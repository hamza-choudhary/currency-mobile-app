import { useCurrencyStore } from '@/store/currencyStore'
import { useEffect } from 'react'

export function useAutoFetchCurrencies({ intervalTime = 10000 }) {
	const {
		currencies,
		isLoading,
		isError,
		lastUpdated,
		fetchCurrencies,
		loadStoredData,
	} = useCurrencyStore((state) => state)

	useEffect(() => {
		loadStoredData()
	}, [])

	useEffect(() => {
		const fetchInterval = setInterval(() => {
			fetchCurrencies()
		}, intervalTime)

		return () => clearInterval(fetchInterval)
	}, [intervalTime])

	return {
		currencies,
		isLoading,
		isError,
		lastUpdated,
	}
}
