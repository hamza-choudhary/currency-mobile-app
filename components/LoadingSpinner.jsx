import { colors } from '@/constants/colors'
import { ActivityIndicator } from 'react-native'

export function LoadingSpinner({ isLoading = false, size = 'small', color }) {
	if (!isLoading) {
		return null
	}

	return <ActivityIndicator size={size} color={color ?? colors.primary} />
}
