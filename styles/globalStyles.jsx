import { colors } from '@/constants/colors'
import { StyleSheet } from 'react-native'

const createFontStyle = (size, weight, letterSpacing, lineHeight) => {
	let fontFamily = 'PoppinsRegular'
	if (weight === '500') fontFamily = 'PoppinsMedium'
	if (weight === '600') fontFamily = 'PoppinsSemiBold'

	return {
		fontFamily,
		fontSize: size,
		letterSpacing,
		lineHeight,
	}
}

export const globalStyles = StyleSheet.create({
	flex1: { flex: 1 },
	flexRow: { flexDirection: 'row' },
	titleLarge: { ...createFontStyle(22, '500', 0, 28) },
	labelMedium: { ...createFontStyle(12, '500', 0.5, 16), color: colors.label },
	labelLarge: { ...createFontStyle(14, '500', 0.1, 20), color: colors.label },
	bodySmall: { ...createFontStyle(12, '400', 0.25, 20) },
	bodyMedium: { ...createFontStyle(14, '400', 0.25, 20) },
	bodyLarge: { ...createFontStyle(16, '400', 0.15, 24) },
	defaultText: {
		fontFamily: 'PoppinsRegular',
		fontWeight: '400',
		letterSpacing: 0,
		fontSize: 14,
	},
})
