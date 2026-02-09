import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Head, Link, useForm } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { CustomTextarea } from '@/components/ui/custom-textarea';
import { Spinner } from '@/components/ui/spinner';
import { Button } from '@/components/ui/button';
import React from 'react';
import { route } from 'ziggy-js';
import InputError from '@/components/input-error';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Product',
        href: '/products/create',
    },
];

export default function ProductForm() {
const {data, setData, post, processing, errors, reset} = useForm({
    name: '',
    description: '',
    price: '',
    featured_image: null as File | null
});
const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post(route('products.store'), {
       onSuccess: () => console.log('Form Submitted'),
    });
console.log(data);

}
const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files && e.target.files.length > 0){
            setData('featured_image', e.target.files[0]);
        }
}
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Product Create" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                        <div className='ml-auto'>
                        <Link as='button' href='/products' className='bg-indigo-800 px-4 py-2 rounded-lg text-white text-md cursor-pointer hover:opacity-90'>Back to product</Link>
                        </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Create Product</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form
                            onSubmit={submit}
                            className="flex flex-col gap-4"
                            autoComplete="off"
                        >
                            <div className="grid gap-2">
                                <Label htmlFor="name">Product Name</Label>
                                <Input value={data.name} onChange={(e) => setData('name', e.target.value)} id="name" name="name" type="text" placeholder="Product Name" tabIndex={1} autoFocus />
                            <InputError message={errors.name} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="description">Product Name</Label>
                                <CustomTextarea
                                    value={data.description} onChange={(e) => setData('description', e.target.value)}
                                id='description'
                                name='description'
                                placeholder='Description'
                                rows={4}
                                tabIndex={2}
                                autoFocus
                                />
                                <InputError message={errors.description} />

                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="price">Product price</Label>
                                <Input value={data.price} onChange={(e) => setData('price', e.target.value)} id="price" name="price" type="text" placeholder="Product Price" tabIndex={3} autoFocus />
                                <InputError message={errors.price} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="featured_image">Featured Image</Label>
                                <Input onChange={handleFileUpload} id="featured_image" name="featured_image" type="file"tabIndex={4} autoFocus />
                                <InputError message={errors.featured_image} />
                            </div>
                            <Button
                                type="submit"
                                className="mt-4 w-fit cursor-pointer"
                                tabIndex={4}
                                data-test="login-button"
                            >
                                Save Product
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
