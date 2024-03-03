'use client';

import React from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, } from './ui/dialog';
import { Button } from './ui/button';
import { ImSpinner2 } from 'react-icons/im';
import { BsFileEarmarkPlus } from 'react-icons/bs'
import { Form, FormField, FormItem, FormLabel, FormMessage, FormControl } from './ui/form';
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { toast } from './ui/use-toast';
import { formSchema, formSchemaType } from '@/schemas/form';
import { CreateForm } from '@/actions/forms';
import { useRouter } from 'next/navigation';


function CreateFormBtn() {
    const router = useRouter();
    const form = useForm<formSchemaType>({
        resolver: zodResolver(formSchema),
    });

    async function onSubmit(values: formSchemaType) {
        try {
            const formID = await CreateForm(values);
            toast({
                title: 'Success',
                description: 'Form created successfully',
            });
            router.push(`/builder/${formID}`);
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to create form',
                variant: 'destructive',
            })
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={'outline'} className='group border border-primary/20 h-[190px] items-center justify-center flex flex-col hover:border-primary hover:cursor-pointer border-dashed gap-4 bg-background'>
                    <BsFileEarmarkPlus className='h-8 w-8 text-muted-foreground group-hover:text-primary' />
                    <p className="font-bold text-xl text-muted-foreground group-hover:text-primary">
                        Create new form
                    </p>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Form</DialogTitle>
                    <DialogDescription>
                        Create a new form to start collecting responses
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input type="text" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='description'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea rows={5} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
                <DialogFooter>
                    <Button disabled={form.formState.isSubmitting} className='w-full mt-4' onClick={form.handleSubmit(onSubmit)}>
                        {form.formState.isSubmitting ? <ImSpinner2 className='animate-spin' /> : <span>Save</span>}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default CreateFormBtn;