import { FETCH_INTERVAL } from '@/constants/general'
import { useAutoFetchCurrencies } from '@/hooks/useAutoFetchCurrencies'
import { useCurrencyStore } from '@/store/currencyStore'
import { useEffect } from 'react'
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'

export default function HomeScreen() {
	const { currencies, isError, isLoading, lastUpdated } =
		useAutoFetchCurrencies({ intervalTime: FETCH_INTERVAL })

	return (
		<SafeAreaView>
			<Text style={{ fontSize: 20 }}>Last updated: {lastUpdated}</Text>
			<FlatList
				data={currencies}
				keyExtractor={(item) => item.code}
				renderItem={({ item }) => <Currency item={item} />}
			/>
		</SafeAreaView>
	)
}

function Currency({ item }: { item: any }) {
	const { inverseRate, code, rate, date, name } = item
	return (
		<View style={{ backgroundColor: '#ccc', marginVertical: 8 }}>
			<Text style={{ color: '#000' }}>{name}</Text>
			<Text style={{ color: '#000' }}>{code}</Text>
			<Text style={{ color: '#000' }}>{rate}</Text>
			<Text style={{ color: '#000' }}>{inverseRate}</Text>
			<Text style={{ color: '#000' }}>{date}</Text>
		</View>
	)
}

const styles = StyleSheet.create({})
