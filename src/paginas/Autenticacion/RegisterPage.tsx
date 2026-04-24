import { useForm } from '@tanstack/react-form'
import { CircleNotch } from '@phosphor-icons/react'
import { Link } from 'react-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { signUp } from '@/configuracion/Cliente'

import { useNavigate } from 'react-router'

const RegisterPage = () => {
    const navigate = useNavigate()

    const form = useForm({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        },
        onSubmit: async ({ value }) => {
            await signUp.email({
                name: value.name,
                email: value.email,
                password: value.password,
            },
                {
                    onSuccess: () => {
                        navigate('/perfil')
                    },
                    onError: (ctx) => {
                        alert(ctx.error.message)
                    },
                }
            )
        },
    })
    return (
        <section className='w-full h-full flex items-center justify-center'>
            <Card className='w-90'>
                <CardHeader>
                    <CardTitle className='text-center'>Registrarse</CardTitle>
                </CardHeader>
                <CardContent>

                    {/* Handle del formulario */}
                    <form
                        onSubmit={(e) => {
                            e.preventDefault()
                            form.handleSubmit()
                        }}
                        className='flex flex-col gap-4'
                    >

                        {/* Campo para el nombre */}
                        <form.Field name='name'>
                            {(field) => (
                                <div className='flex flex-col gap-1.5'>
                                    <Label htmlFor={field.name}>Nombre</Label>
                                    <Input
                                        id={field.name}
                                        type='text'
                                        placeholder='Juan Perez'
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        onBlur={field.handleBlur}
                                    />
                                    {field.state.meta.errors.length > 0 && (
                                        <p className='text-sm text-destructive'>
                                            {field.state.meta.errors[0]}
                                        </p>
                                    )}
                                </div>
                            )}
                        </form.Field>

                        {/* Campo para el email */}
                        <form.Field name='email'>
                            {(field) => (
                                <div className='flex flex-col gap-1.5'>
                                    <Label htmlFor={field.name}>Email</Label>
                                    <Input
                                        id={field.name}
                                        type='email'
                                        placeholder='correo@ejemplo.com'
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        onBlur={field.handleBlur}
                                    />
                                    {field.state.meta.errors.length > 0 && (
                                        <p className='text-sm text-destructive'>
                                            {field.state.meta.errors[0]}
                                        </p>
                                    )}
                                </div>
                            )}
                        </form.Field>

                        {/* Campo para la password */}
                        <form.Field name='password'>
                            {(field) => (
                                <div className='flex flex-col gap-1.5'>
                                    <Label htmlFor={field.name}>Contraseña</Label>
                                    <Input
                                        id={field.name}
                                        type='password'
                                        placeholder='••••••••'
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        onBlur={field.handleBlur}
                                    />
                                    {field.state.meta.errors.length > 0 && (
                                        <p className='text-sm text-destructive'>
                                            {field.state.meta.errors[0]}
                                        </p>
                                    )}
                                </div>
                            )}
                        </form.Field>

                        <form.Subscribe selector={(state) => state.isSubmitting}>
                            {(isSubmitting) => (
                                <Button type='submit' disabled={isSubmitting} className='w-full'>
                                    {isSubmitting
                                        ? <CircleNotch className='animate-spin' size={18} />
                                        : 'Registrarse'
                                    }
                                </Button>
                            )}
                        </form.Subscribe>

                        {/* Aviso de si tiene cuenta */}
                        <p className='text-sm text-center text-muted-foreground'>
                            ¿Ya tenes cuenta?{' '}
                            <Link
                                to='/autenticacion/login'
                                className='text-foreground underline underline-offset-4 hover:text-primary'
                            >
                                Inicia sesion
                            </Link>
                        </p>

                    </form>
                </CardContent>
            </Card>
        </section>
    )
}

export default RegisterPage