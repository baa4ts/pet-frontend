export const formatearFecha = (fecha: string): string => {
    const date = new Date(fecha)

    return date.toLocaleDateString('es-UY', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    })
}