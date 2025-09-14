function formatDate(date) {
    if (!date) return '';

    try {
        return new Intl.DateTimeFormat('pt-BR', {
            year: 'numeric', month: '2-digit', day: '2-digit',
            hour: '2-digit', minute: '2-digit', second: '2-digit',
            timeZone: 'America/Sao_Paulo'
        }).format(new Date(date));
    } catch (error) {
        console.debug('Error formatting date:', error);
        return '';
    }
}

export default formatDate;