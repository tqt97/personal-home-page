import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Task } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { format } from 'date-fns';
import { FormEventHandler, useRef } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Tasks', href: '/tasks' },
    { title: 'Edit', href: '' },
];

type EditTaskForm = {
    name: string;
    is_completed: boolean;
    due_date: string;
};

export default function Edit({ task }: { task: Task }) {
    const taskName = useRef<HTMLInputElement>(null);

    const { data, setData, errors, put, reset, processing } = useForm<EditTaskForm>({
        name: task.name,
        is_completed: task.is_completed,
        due_date: task.due_date ?? '',
    });

    const editTask: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('tasks.update', task.id), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            },
            onError: (errors) => {
                if (errors.name) {
                    reset('name');
                    taskName.current?.focus();
                }
            },
        });
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Task" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <form onSubmit={editTask} className="space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Task Name</Label>

                        <Input
                            id="name"
                            ref={taskName}
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="mt-1 block w-full"
                        />

                        <InputError message={errors.name} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="is_completed">Completed?</Label>

                        {/* <Checkbox checked={data.is_completed} onCheckedChange={() => setData('is_completed', !data.is_completed)} /> */}
                        <Switch checked={data.is_completed} onCheckedChange={() => setData('is_completed', !data.is_completed)} />

                        <InputError message={errors.is_completed} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="name">Due Date</Label>

                        <Input
                            id="due_date"
                            value={data.due_date ? format(data.due_date, 'yyyy-MM-dd') : ''}
                            onChange={(e) => setData('due_date', format(new Date(e.target.value), 'yyyy-MM-dd'))}
                            className="mt-1 block w-full"
                            type="date"
                        />

                        <InputError message={errors.due_date} />
                    </div>

                    <div className="flex items-center gap-4">
                        <Button disabled={processing}>Update Task</Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
