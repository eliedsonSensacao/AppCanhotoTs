export const date_diff = (data1: string, data2: string) => {
    try {
        const [datePart1] = data1.split(' ');
        const [datePart2] = data2.split(' ');

        const [dia1, mes1, ano1] = datePart1.split('-').map(Number);
        const [dia2, mes2, ano2] = datePart2.split('-').map(Number);

        // Criar objetos Date (note que os meses em JavaScript começam do 0)

        const fullAno1 = ano1 < 100 ? 2000 + ano1 : ano1;
        const fullAno2 = ano2 < 100 ? 2000 + ano2 : ano2;

        const date1 = new Date(fullAno1, mes1 - 1, dia1);
        const date2 = new Date(fullAno2, mes2 - 1, dia2);

        // Calcular a diferença em milissegundos
        const diferencaMs = Math.abs(date1.getTime() - date2.getTime());

        // Converter milissegundos para dias
        return Math.ceil(diferencaMs / (1000 * 60 * 60 * 24));
    } catch (err: any) {
        throw new Error(err.message)
    }
}