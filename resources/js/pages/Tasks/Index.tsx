import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Task } from '@/types';
import { Head } from '@inertiajs/react';

export default function Index({ tasks }: { tasks: Task[] }) {
    return (
        <AppLayout>
            <Head title="Tasks List" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Table className={'mt-4'}>
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
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    );
}
