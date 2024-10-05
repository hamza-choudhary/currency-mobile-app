import { Currency } from '@/components/Currency'
import { colors } from '@/constants/colors'
import { FETCH_INTERVAL } from '@/constants/general'
import { formatDateTime } from '@/helpers/dateTime'
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

	//TODO: handle errors and loading state

	return (
		<SafeAreaView style={styles.screen}>
			<View style={styles.container}>
				<View>
					<Text style={gs.labelLarge}>Last Updated</Text>
					<Text style={[gs.bodyLarge, { color: colors.textLight }]}>
						{formatDateTime(lastUpdated)}
					</Text>
				</View>
				<View style={styles.options}>
					<Text style={[gs.titleLarge, { color: colors.primary }]}>
						Currencies
					</Text>
					<TouchableOpacity style={styles.button} onPress={toggleSort}>
						<Icon
							name={
								sortOrder === 'asc'
									? 'sort-amount-down-alt'
									: 'sort-amount-up-alt'
							}
							size={20}
							color={colors.primary}
						/>
						<Text style={[gs.defaultText, styles.buttonText]}>{sortOrder}</Text>
					</TouchableOpacity>
				</View>
				<View style={[styles.shadow, gs.flex1]}>
					<FlatList
						data={sortedCurrencies}
						keyExtractor={(item) => item.code}
						renderItem={({ item }) => <Currency item={item} />}
						style={styles.listContainer}
						showsVerticalScrollIndicator={false}
					/>
				</View>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	screen: { backgroundColor: colors.primary, flex: 1 },
	container: {
		flex: 1,
		paddingHorizontal: 10,
		paddingVertical: 20,
		gap: 10,
		backgroundColor: colors.background,
	},
	options: {
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'row',
	},
	button: {
		flexDirection: 'row',
		gap: 6,
		alignItems: 'center',
		borderRadius: 10,
		borderColor: colors.primary,
		borderWidth: 1,
		paddingVertical: 8,
		paddingHorizontal: 12,
	},
	buttonText: { textTransform: 'capitalize', color: colors.primary },
	listContainer: { backgroundColor: colors.white, borderRadius: 10, flex: 1 },
	shadow: {
		shadowColor: 'black',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.3,
		shadowRadius: 2,
		elevation: 14,
	},
})
