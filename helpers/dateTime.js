export function formatDateTime(dateString) {
	const date = new Date(dateString)

	const options = {
		weekday: 'short',
		day: 'numeric',
		month: 'short',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		hour12: false,
		timeZoneName: 'short',
	}

	const formattedDate = date.toLocaleString('en-US', options)
	return formattedDate.replace(',', '')
}
