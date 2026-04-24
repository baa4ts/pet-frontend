import { Cliente } from '@/configuracion/Cliente'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { User, Envelope, ShieldCheck, SignOut, Television, House, SquaresFour } from '@phosphor-icons/react'
import { useNavigate } from 'react-router'

const Perfil = () => {
    const { data: session } = Cliente.useSession()
    const navigate = useNavigate()

    const tienePermisos = session?.user.permisos && session.user.permisos !== ''

    const cerrarSesion = async () => {
        await Cliente.signOut()
        navigate('/autenticacion/login')
    }

    return (
        <section className='w-full h-full flex items-center justify-center p-6'>
            <Card className='w-full max-w-2xl'>
                <CardHeader className='pb-0'>

                    {/* Avatar e identificacion */}
                    <div className='flex items-center gap-4'>
                        <div className='w-14 h-14 bg-muted flex items-center justify-center border border-border'>
                            <User className='w-6 h-6 text-muted-foreground' />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <h2 className='text-lg font-semibold leading-none'>
                                {session?.user.name ?? '—'}
                            </h2>
                            <Badge variant='secondary' className='w-fit text-xs'>
                                {session?.user.role ?? 'usuario'}
                            </Badge>
                        </div>
                    </div>

                </CardHeader>

                <CardContent className='flex flex-col gap-4 pt-6'>
                    <Separator />

                    {/* Datos */}
                    <div className='flex flex-col gap-3'>
                        <div className='flex items-center gap-3 text-sm'>
                            <Envelope className='w-4 h-4 text-muted-foreground shrink-0' />
                            <span className='text-muted-foreground'>Email</span>
                            <span className='ml-auto font-medium truncate'>
                                {session?.user.email ?? '—'}
                            </span>
                        </div>

                        <div className='flex items-center gap-3 text-sm'>
                            <ShieldCheck className='w-4 h-4 text-muted-foreground shrink-0' />
                            <span className='text-muted-foreground'>Permisos</span>
                            <span className='ml-auto font-medium truncate'>
                                {session?.user.permisos || 'Sin permisos'}
                            </span>
                        </div>
                    </div>

                    <Separator />

                    {/* Botones en horizontal */}
                    <div className='flex gap-2'>
                        <Button variant='outline' className='flex-1' onClick={() => navigate('/')}>
                            <House className='w-4 h-4' />
                            Inicio
                        </Button>

                        <Button variant='outline' className='flex-1' onClick={() => navigate('/tv')}>
                            <Television className='w-4 h-4' />
                            TV
                        </Button>

                        {tienePermisos && (
                            <Button variant='outline' className='flex-1' onClick={() => navigate('/dashboard')}>
                                <SquaresFour className='w-4 h-4' />
                                Dashboard
                            </Button>
                        )}

                        <Button variant='destructive' className='flex-1' onClick={cerrarSesion}>
                            <SignOut className='w-4 h-4' />
                            Cerrar sesion
                        </Button>
                    </div>

                </CardContent>
            </Card>
        </section>
    )
}

export default Perfil