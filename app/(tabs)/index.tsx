import { FETCH_INTERVAL } from '@/constants/general'
import { useAutoFetchCurrencies } from '@/hooks/useAutoFetchCurrencies'
import { globalStyles as gs } from '@/styles/globalStyles'
import Icon from '@expo/vector-icons/FontAwesome5'
import { useMemo, useState } from 'react'
import {
	FlatList,
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'
import { Currency } from './components/Currency'

export default function HomeScreen() {
	const { currencies, isError, isLoading, lastUpdated } =
		useAutoFetchCurrencies({ intervalTime: FETCH_INTERVAL * 50 })

	const [sortOrder, setSortOrder] = useState('asc')

	const sortedCurrencies = useMemo(() => {
		if (!currencies) return []
		return [...currencies].sort((a, b) =>
			sortOrder === 'asc' ? a.rate - b.rate : b.rate - a.rate
		)
	}, [currencies, sortOrder])

	const toggleSort = () => {
		setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'))
	}

	return (
		<SafeAreaView style={styles.screen}>
			<View style={styles.container}>
				<View>
					<Text style={gs.labelLarge}>Last Updated</Text>
					<Text style={gs.bodyLarge}>{lastUpdated}</Text>
				</View>
				<View style={styles.options}>
					<Text style={gs.titleLarge}>Currencies</Text>
					<TouchableOpacity style={styles.button} onPress={toggleSort}>
						<Icon
							name={
								sortOrder === 'asc'
									? 'sort-amount-down-alt'
									: 'sort-amount-up-alt'
							}
							size={20}
							color="black"
						/>
						<Text style={gs.defaultText}>{sortOrder}</Text>
					</TouchableOpacity>
				</View>
				<FlatList
					data={sortedCurrencies}
					keyExtractor={(item) => item.code}
					renderItem={({ item }) => <Currency item={item} />}
					style={styles.listContainer}
					showsVerticalScrollIndicator={false}
				/>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	screen: { backgroundColor: '#e8ecf5', flex: 1 },
	container: { flex: 1, paddingHorizontal: 10, paddingVertical: 20, gap: 10 },
	options: {
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'row',
	},
	button: {
		flexDirection: 'row',
		gap: 6,
		alignItems: 'center',
		borderRadius: 50,
		borderColor: '#000',
		borderWidth: 1,
		paddingVertical: 8,
		paddingHorizontal: 12,
	},
	listContainer: { backgroundColor: '#fff', borderRadius: 10, flex: 1 },
})
