import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Category } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useRef } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Tasks', href: '/tasks' },
    { title: 'Categories', href: '/categories' },
    { title: 'Edit', href: '' },
];

type EditCategoryForm = {
    name: string;
};

export default function Edit({ category }: { category: Category }) {
    const categoryName = useRef<HTMLInputElement>(null);

    const { data, setData, errors, put, reset, processing } = useForm<Required<EditCategoryForm>>({
        name: category.name,
    });

    const createCategory: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('categories.update', category.id), {
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
            <Head title="Edit Category" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <form onSubmit={createCategory} className="space-y-6">
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

                    <div className="flex items-center gap-4">
                        <Button disabled={processing}>Update</Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
