import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { format } from 'date-fns';
import { FormEventHandler, useRef } from 'react';

type CreateTaskForm = {
    name?: string;
    due_date?: string;
    media?: string;
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Tasks', href: '/tasks' },
    { title: 'Create', href: '/tasks' },
];

export default function Create() {
    const taskName = useRef<HTMLInputElement>(null);
    const { data, setData, errors, post, reset, processing, progress } = useForm<Required<CreateTaskForm>>({
        name: '',
        due_date: '',
        media: '',
    });

    const createTask: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('tasks.store'), {
            forceFormData: true,
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
            <Head title="Create Task" />
            <div className="border p-4">
                <form onSubmit={createTask} className="space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Task Name *</Label>

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
                        <Label htmlFor="name">Due Date</Label>

                        <Input
                            id="due_date"
                            value={data.due_date}
                            onChange={(e) => setData('due_date', format(new Date(e.target.value), 'yyyy-MM-dd'))}
                            className="mt-1 block w-full"
                            type="date"
                        />

                        <InputError message={errors.due_date} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="media">Media</Label>

                        <Input id="media" onChange={(e) => setData('media', e.target.files[0])} className="mt-1 block w-full" type="file" />

                        {progress && (
                            <progress value={progress.percentage} max="100">
                                {progress.percentage}%
                            </progress>
                        )}

                        <InputError message={errors.media} />
                    </div>

                    <div className="flex items-center gap-4">
                        <Button disabled={processing}>Create Task</Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
