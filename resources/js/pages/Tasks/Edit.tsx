import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Category, type Task } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';

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
    media?: string;
    categories: string[];
};

export default function Edit({ task, categories }: { task: Task; categories: Category[] }) {
    const taskName = useRef<HTMLInputElement>(null);

    const { data, setData, errors, reset, processing, progress } = useForm<EditTaskForm>({
        name: task.name,
        is_completed: task.is_completed,
        due_date: task.due_date ?? '',
        media: '',
        categories: task.categories.map((category) => category.id.toString()),
    });

    const editTask: FormEventHandler = (e) => {
        e.preventDefault();

        router.post(
            route('tasks.update', task.id),
            { ...data, _method: 'PUT' },
            {
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
            },
        );
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
                        <Label htmlFor="due_date">Due Date</Label>

                        <Input
                            id="due_date"
                            value={data.due_date ? format(data.due_date, 'yyyy-MM-dd') : ''}
                            onChange={(e) => setData('due_date', format(new Date(e.target.value), 'yyyy-MM-dd'))}
                            className="mt-1 block w-full"
                            type="date"
                        />

                        <InputError message={errors.due_date} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="categories">Categories</Label>

                        <ToggleGroup
                            id="categories"
                            type="multiple"
                            variant={'outline'}
                            size={'lg'}
                            value={data.categories}
                            onValueChange={(value) => setData('categories', value)}
                        >
                            {categories.map((category) => (
                                <ToggleGroupItem key={category.id} value={category.id.toString()}>
                                    {category.name}
                                </ToggleGroupItem>
                            ))}
                        </ToggleGroup>

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

                        {!task.mediaFile ? (
                            ''
                        ) : (
                            <a href={task.mediaFile.original_url} target="_blank" className="mx-auto my-4">
                                <img src={task.mediaFile.original_url} className={'h-32 w-32'} />
                            </a>
                        )}
                    </div>

                    <div className="flex items-center gap-4">
                        <Button disabled={processing}>Update Task</Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
