import { globalStyles as gs } from '@/styles/globalStyles'
import { StyleSheet, Text, View } from 'react-native'

export function Currency({ item }) {
	const { name, code, rate, date } = item
	return (
		<View style={styles.container}>
			<View style={gs.flexRow}>
				<View style={gs.flex1}>
					<Text style={gs.labelMedium}>Name</Text>
					<Text style={gs.bodyLarge}>{`${name} (${code})`}</Text>
				</View>
				<View style={styles.rate}>
					<Text style={gs.labelMedium}>Rate</Text>
					<Text style={gs.bodyLarge}>{rate.toFixed(4)}</Text>
				</View>
			</View>
			<View style={gs.flexRow}>
				<View style={gs.flex1}>
					<Text style={gs.labelMedium}>Date</Text>
					<Text style={gs.bodyMedium}>{date}</Text>
				</View>
			</View>
			<View style={styles.hr} />
		</View>
	)
}

const styles = StyleSheet.create({
	rate: { flex: 0.5 },
	container: { padding: 10, gap: 10 },
	hr: { borderBottomWidth: 1, borderBottomColor: '#e8ecf5' },
})
