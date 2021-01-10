export const truncateText = (
	content: string | undefined,
	truncateLength = 0
): string | null => {
	if (content === undefined) return null;
	if (content.length <= truncateLength || truncateLength === 0) return content;
	const truncatedText = content.slice(0, truncateLength).trim();
	const ellipsis = "...";
	const outputText = truncatedText + ellipsis;
	return outputText;
};
