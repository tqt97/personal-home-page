import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useRef } from 'react';

type CreateTaskForm = {
    name?: string;
};

export default function Create() {
    const taskName = useRef<HTMLInputElement>(null);
    const { data, setData, errors, post, reset, processing } = useForm<Required<CreateTaskForm>>({
        name: '',
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
        <AppLayout>
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

                    <div className="flex items-center gap-4">
                        <Button disabled={processing}>Create Task</Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
