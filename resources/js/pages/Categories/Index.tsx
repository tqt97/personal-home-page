import { TablePagination } from '@/components/table-pagination';
import { Button, buttonVariants } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { FlashProp, type BreadcrumbItem, type Category, type PaginatedResponse } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Tasks', href: '/tasks' },
    { title: 'Categories', href: '/categories' },
];

export default function Index({ categories }: { categories: PaginatedResponse<Category> }) {
    const { flash } = usePage<FlashProp>().props;
    const deleteCategory = (category: Category) => {
        if (category.tasks_count === 0) {
            if (confirm('Are you sure you want to delete this task category?')) {
                router.delete(route('categories.destroy', category.id));
                toast.success('Task Category deleted successfully');
            }
        } else {
            if (
                confirm(
                    'This category has tasks assigned to it. Are you sure you want to delete it? This will also delete all the tasks assigned to this category.',
                )
            ) {
                router.delete(route('categories.destroy', category.id));
                toast.success('Category deleted successfully');
            }
        }
    };

    useEffect(() => {
        if (flash?.message) {
            toast.success(flash.message);
        }
    }, [flash]);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Category List" />
            <div className="p-4">
                <div className={'flex flex-row gap-x-4'}>
                    <Link className={buttonVariants({ variant: 'default' })} href="/categories/create">
                        Create Category
                    </Link>
                </div>
                <Table className={'mt-4'}>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead className="w-[100px]">Assigned Tasks</TableHead>
                            <TableHead className="w-[150px] text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {categories.data.map((category: Category) => (
                            <TableRow key={category.id}>
                                <TableCell>{category.name}</TableCell>
                                <TableCell>{category.tasks_count}</TableCell>
                                <TableCell className="flex flex-row gap-x-2 text-right">
                                    <Link className={buttonVariants({ variant: 'default' })} href={`/categories/${category.id}/edit`}>
                                        Edit
                                    </Link>
                                    <Button variant={'destructive'} className={'cursor-pointer'} onClick={() => deleteCategory(category)}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination resource={categories} />
            </div>
        </AppLayout>
    );
}
