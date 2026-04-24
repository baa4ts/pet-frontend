import { useForm } from '@tanstack/react-form'
import { CircleNotch } from '@phosphor-icons/react'
import { Link, useNavigate } from 'react-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Cliente } from '@/configuracion/Cliente'
import { Checkbox } from '@/components/ui/checkbox'

const LoginPage = () => {
    const navigate = useNavigate()

    const form = useForm({
        defaultValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        onSubmit: async ({ value }) => {
            await Cliente.signIn.email({
                email: value.email,
                password: value.password,
                rememberMe: value.rememberMe,
            },
                // Docs
                // https://better-auth.com/docs/basic-usage#sign-in
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
                    <CardTitle className='text-center'>Iniciar sesion</CardTitle>
                </CardHeader>
                <CardContent>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault()
                            form.handleSubmit()
                        }}
                        className='flex flex-col gap-4'
                    >

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

                        {/* Checkbox para extender la session*/}
                        <form.Field name='rememberMe'>
                            {(field) => (
                                <div className='flex items-center gap-2'>
                                    <Checkbox
                                        id={field.name}
                                        checked={field.state.value}
                                        onCheckedChange={(checked) => field.handleChange(!!checked)}
                                    />
                                    <Label htmlFor={field.name} className='font-normal cursor-pointer'>
                                        Recordarme
                                    </Label>
                                </div>
                            )}
                        </form.Field>

                        <form.Subscribe selector={(state) => state.isSubmitting}>
                            {(isSubmitting) => (
                                <Button type='submit' disabled={isSubmitting} className='w-full'>
                                    {isSubmitting
                                        ? <CircleNotch className='animate-spin' size={18} />
                                        : 'Iniciar sesion'
                                    }
                                </Button>
                            )}
                        </form.Subscribe>

                        {/* Aviso de si tiene cuenta */}
                        <p className='text-sm text-center text-muted-foreground'>
                            ¿No tenes cuenta?{' '}
                            <Link
                                to='/autenticacion/register'
                                className='text-foreground underline underline-offset-4 hover:text-primary'
                            >
                                Registrate
                            </Link>
                        </p>

                    </form>
                </CardContent>
            </Card>
        </section>
    )
}

export default LoginPage