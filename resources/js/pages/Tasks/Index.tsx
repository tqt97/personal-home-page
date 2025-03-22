import { TablePagination } from '@/components/table-pagination';
import { Button, buttonVariants } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Category, FlashProp, type BreadcrumbItem, type PaginatedResponse, type Task } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { format } from 'date-fns';
import { useEffect } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Tasks', href: '/tasks' },
];

export default function Index({
    tasks,
    categories,
    selectedCategories,
}: {
    tasks: PaginatedResponse<Task>;
    categories: Category[];
    selectedCategories: string[] | null;
}) {
    const { flash } = usePage<FlashProp>().props;

    const deleteTask = (task: Task) => {
        if (confirm('Are you sure?')) {
            router.delete(route('tasks.destroy', { task }));
            toast.success('Task deleted successfully');
        }
    };

    const selectCategory = (id: string) => {
        const selected = selectedCategories?.includes(id)
            ? selectedCategories?.filter((category) => category !== id)
            : [...(selectedCategories || []), id];
        router.visit('/tasks', { data: { categories: selected } });
    };

    // useEffect() to show flash message
    useEffect(() => {
        if (flash?.message) {
            toast.success(flash.message);
        }
    }, [flash]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tasks List" />
            <div className="p-4">
                {/* <Link className={buttonVariants({ variant: 'outline' })} href="/tasks/create">
                    Create Task
                </Link> */}
                <div className={'flex flex-row gap-x-4'}>
                    <Link className={buttonVariants({ variant: 'default' })} href="/tasks/create">
                        Create Task
                    </Link>
                    <Link className={buttonVariants({ variant: 'outline' })} href="/categories">
                        Manage Task Categories
                    </Link>
                </div>
                <div className="mt-4 flex flex-row flex-wrap justify-end gap-x-2">
                    {categories.map((category: Category) => (
                        <Button
                            className="cursor-pointer"
                            variant={selectedCategories?.includes(category.id.toString()) ? 'default' : 'outline'}
                            key={category.id}
                            onClick={() => selectCategory(category.id.toString())}
                        >
                            <span className="text-xs">
                                {category.name} ({category.tasks_count})
                            </span>
                        </Button>
                    ))}
                </div>
                <Table className={'mt-4 rounded-xl border'}>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Task</TableHead>
                            <TableHead>File</TableHead>
                            <TableHead className="w-[100px]">Categories</TableHead>
                            <TableHead className="w-[100px]">Status</TableHead>
                            <TableHead className="w-[100px]">Due Date</TableHead>
                            <TableHead className="w-[150px] text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tasks.data.map((task) => (
                            <TableRow key={task.id}>
                                <TableCell>{task.name}</TableCell>
                                <TableCell>
                                    {!task.mediaFile ? (
                                        ''
                                    ) : (
                                        <a href={task.mediaFile.original_url} target="_blank">
                                            <img src={task.mediaFile.original_url} className={'h-8 w-8'} />
                                        </a>
                                    )}
                                </TableCell>
                                <TableCell className={'flex flex-row gap-x-2'}>
                                    {task.categories?.map((category: Category) => (
                                        <span key={category.id} className="rounded-full bg-gray-200 px-2 py-1 text-xs">
                                            {category.name}
                                        </span>
                                    ))}
                                </TableCell>
                                <TableCell className={task.is_completed ? 'text-green-600' : 'text-red-700'}>
                                    {task.is_completed ? 'Completed' : 'In Progress'}
                                </TableCell>
                                <TableCell>{task.due_date ? format(task.due_date, 'PPP') : ''}</TableCell>
                                <TableCell className="flex flex-row gap-x-2 text-right">
                                    <Link className={buttonVariants({ variant: 'default' })} href={`/tasks/${task.id}/edit`}>
                                        Edit
                                    </Link>
                                    <Button variant={'destructive'} className={'cursor-pointer'} onClick={() => deleteTask(task)}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination resource={tasks} />
            </div>
        </AppLayout>
    );
}
