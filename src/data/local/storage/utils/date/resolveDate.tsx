export const resolve_date = async () => {
    const timestamp = Date.now()

    const date = new Date(timestamp)
    const day = String(date.getDate()).padStart(2, '0');        // Dia (DD)
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mês (MM)
    const year = String(date.getFullYear()).slice(-2);
    const hours = String(date.getHours()).padStart(2, '0');  // Horas (HH)
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}-${month}-${year} ${hours}-${minutes}`
}