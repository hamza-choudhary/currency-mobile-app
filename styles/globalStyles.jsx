import { StyleSheet } from 'react-native'

const customFont = 'YourCustomFontName'

const createFontStyle = (size, weight, letterSpacing, lineHeight) => ({
	// fontFamily: customFont,
	fontSize: size,
	fontWeight: weight,
	letterSpacing,
	lineHeight,
})

export const globalStyles = StyleSheet.create({
	flex1: { flex: 1 },
	flexRow: { flexDirection: 'row' },
	titleLarge: createFontStyle(22, '500', 0, 28),
	labelMedium: createFontStyle(12, '500', 0.5, 16),
	labelLarge: createFontStyle(14, '600', 0.1, 20),
	bodyMedium: createFontStyle(14, '400', 0.25, 20),
	bodyLarge: createFontStyle(16, '400', 0.15, 24),
	defaultText: {
		fontFamily: customFont,
		fontWeight: '400',
		letterSpacing: 0,
		fontSize: 14,
	},
})
