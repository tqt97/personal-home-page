import { Button, buttonVariants } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Task } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { toast } from 'sonner';

export default function Index({ tasks }: { tasks: Task[] }) {
    const deleteTask = (task: Task) => {
        if (confirm('Are you sure?')) {
            router.delete(route('tasks.destroy', { task }));
            toast.success('Task deleted successfully');
        }
    };
    return (
        <AppLayout>
            <Head title="Tasks List" />
            <div className="p-4">
                <Link className={buttonVariants({ variant: 'outline' })} href="/tasks/create">
                    Create Task
                </Link>
                <Table className={'mt-4 rounded-xl border'}>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Task</TableHead>
                            <TableHead className="w-[100px]">Status</TableHead>
                            <TableHead className="w-[150px] text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tasks.map((task) => (
                            <TableRow key={task.id}>
                                <TableCell>{task.name}</TableCell>
                                <TableCell className={task.is_completed ? 'text-green-600' : 'text-red-700'}>
                                    {task.is_completed ? 'Completed' : 'In Progress'}
                                </TableCell>
                                <TableCell className="flex flex-row gap-x-2 text-right">
                                    <Button variant={'destructive'} className={'cursor-pointer'} onClick={() => deleteTask(task)}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    );
}
