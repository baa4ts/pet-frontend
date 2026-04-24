export const tienePermiso = (permisos: string, permiso: string): boolean => {
    return permisos.split(",").filter(Boolean).includes(permiso)
}