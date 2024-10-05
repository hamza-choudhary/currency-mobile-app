import { colors } from '@/constants/colors'
import { MESSAGES } from '@/constants/messages'
import { useCurrencyStore } from '@/store/currencyStore'
import { globalStyles as gs } from '@/styles/globalStyles'
import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import {
	ActivityIndicator,
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'

export function ErrorContainer({ message = '' }) {
	const messageValue = message || MESSAGES.API_ERROR

	const { isLoading, fetchCurrencies } = useCurrencyStore((state) => state)

	return (
		<SafeAreaView style={gs.flex1}>
			<View style={styles.container}>
				<Icon name="emoticon-sad-outline" size={200} color={colors.primary} />
				<Text
					style={[gs.titleLarge, styles.textCenter]}
					variant="headlineSmall"
				>
					Sorry, something went wrong
				</Text>
				<Text style={styles.textCenter} variant="bodyLarge">
					{messageValue}
				</Text>
				<View style={gs.flexRow}>
					<TouchableOpacity style={styles.button} onPress={fetchCurrencies}>
						<Text style={[gs.bodyMedium, styles.buttonText]}>Try Again</Text>
						{isLoading && (
							<ActivityIndicator size="small" color={colors.white} />
						)}
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20,
	},
	button: {
		marginTop: 10,
		backgroundColor: colors.primary,
		paddingVertical: 10,
		paddingHorizontal: 15,
		borderRadius: 8,
		alignItems: 'center',
		gap: 10,
		flexDirection: 'row',
	},
	buttonText: { color: colors.white, fontWeight: '500' },
	textCenter: { textAlign: 'center' },
})
