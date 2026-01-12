'use client';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import z from 'zod';
import { PasswordInput } from '@/components/password-input';

const formSchema = z.object({
    email: z.string().nonempty("E-mail é obrigatório").email("E-mail inválido"),
    password: z.string().min(6, "Senha deve conter no mínimo 6 caracteres"),
})

type FormValues = z.input<typeof formSchema>;

export function SignIn() {
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
    })

    function handleSubmit(values: FormValues){
        console.log(values)
    }

    return (
        <div className='space-y-8 flex flex-col items-center lg:pt-53 max-w-md pt-26'>
            <Image
                src='/logo.svg'
                alt="Logo Goold"
                width={57}
                height={57}
            />
            <h1 className='font-semibold text-black text-[1.75rem] leading-12.5 '>Login Admin</h1>
            
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-3.75 bg-white p-7.5 rounded-md border-solid  border lg:w-md">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>E-mail</FormLabel>
                                <FormControl>
                                    <Input 
                                        type="email" 
                                        {...field} 
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Senha de acesso</FormLabel>
                                <FormControl>
                                    <PasswordInput 
                                        {...field} 
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button 
                        className='mt-1.25'
                    >
                        Acessar conta
                    </Button>
                </form>
            </Form>
        </div>
    )
}