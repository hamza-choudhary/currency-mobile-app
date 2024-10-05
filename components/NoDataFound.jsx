import { colors } from '@/constants/colors'
import { globalStyles as gs } from '@/styles/globalStyles'
import { StyleSheet, Text, View } from 'react-native'

export function NoDataFound() {
	return (
		<View style={styles.container}>
			<Text style={[gs.bodyLarge, { color: colors.primary }]}>
				No Data Found.
			</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: { padding: 10, flex: 1 },
	hr: { borderBottomWidth: 1, borderBottomColor: colors.secondaryLight },
})
