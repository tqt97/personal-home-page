import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useRef } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Tasks', href: '/tasks' },
    { title: 'Categories', href: '/categories' },
    { title: 'Create', href: '/categories/create' },
];

type CreateCategoryForm = {
    name?: string;
};

export default function Create() {
    const categoryName = useRef<HTMLInputElement>(null);

    const { data, setData, errors, post, reset, processing } = useForm<Required<CreateCategoryForm>>({
        name: '',
    });

    const createCategory: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('categories.store'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            },
            onError: (errors) => {
                if (errors.name) {
                    reset('name');
                    categoryName.current?.focus();
                }
            },
        });
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Category" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <form onSubmit={createCategory} className="space-y-6">
                    <Card>
                        <CardContent className="grid grid-cols-1 gap-4 space-y-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name *</Label>

                                <Input
                                    id="name"
                                    ref={categoryName}
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="mt-1 block w-full"
                                />

                                <InputError message={errors.name} />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button disabled={processing}>Create Category</Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </AppLayout>
    );
}
