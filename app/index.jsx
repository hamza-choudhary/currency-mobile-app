import { Currency } from '@/components/Currency'
import { ErrorContainer } from '@/components/ErrorContainer'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { NoDataFound } from '@/components/NoDataFound'
import { colors } from '@/constants/colors'
import { FETCH_INTERVAL } from '@/constants/general'
import { MESSAGES } from '@/constants/messages'
import { formatDateTime } from '@/helpers/dateTime'
import { useAutoFetchCurrencies } from '@/hooks/useAutoFetchCurrencies'
import { globalStyles as gs } from '@/styles/globalStyles'
import Icon from '@expo/vector-icons/FontAwesome5'
import { useMemo, useState } from 'react'
import {
	FlatList,
	StatusBar,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function HomeScreen() {
	const { currencies, isError, isLoading, lastUpdated } =
		useAutoFetchCurrencies({ intervalTime: FETCH_INTERVAL })

	const [sortOrder, setSortOrder] = useState('asc')

	const data = useMemo(() => {
		if (!currencies) return []
		return [...currencies].sort((a, b) =>
			sortOrder === 'asc' ? a.rate - b.rate : b.rate - a.rate
		)
	}, [currencies, sortOrder])

	const toggleSort = () => {
		setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'))
	}

	if (!isLoading && isError) {
		return <ErrorContainer message={MESSAGES.INTERNET_ERROR} />
	}

	return (
		<SafeAreaView style={styles.screen}>
			<StatusBar barStyle="light-content" />
			<View style={styles.container}>
				<View>
					<Text style={gs.labelLarge}>Last Updated</Text>
					<Text style={[gs.bodyLarge, { color: colors.textLight }]}>
						{formatDateTime(lastUpdated) || 'N/A'}
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
						data={data}
						keyExtractor={(item) => item.code}
						renderItem={({ item }) => <Currency item={item} />}
						style={data.length > 0 && styles.listContainer}
						showsVerticalScrollIndicator={false}
						ListHeaderComponent={
							data.length === 0 && <LoadingSpinner isLoading={isLoading} />
						}
						ListEmptyComponent={!isLoading && <NoDataFound />}
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
	listContainer: { backgroundColor: colors.white, flex: 1, borderRadius: 10 },
	shadow: {
		shadowColor: 'black',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 2,
		elevation: 5,
		backgroundColor: colors.white,
		borderRadius: 10,
	},
})
