<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Task\StoreCategoryRequest;
use App\Http\Requests\Admin\Task\UpdateCategoryRequest;
use App\Models\Category;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index()
    {
        return Inertia::render('Categories/Index', [
            'categories' => Category::query()
                ->withCount('tasks')
                ->orderBy('created_at', 'DESC')
                ->paginate(10),
        ]);
    }

    public function create()
    {
        return Inertia::render('Categories/Create');
    }

    public function store(StoreCategoryRequest $request)
    {
        Category::create($request->validated());

        return to_route('categories.index')->with('message', 'Create category successfully');
    }

    public function edit(Category $category)
    {
        return Inertia::render('Categories/Edit', [
            'category' => $category,
        ]);
    }

    public function update(UpdateCategoryRequest $request, Category $category)
    {
        $category->update($request->validated());

        return to_route('categories.index')->with('message', 'Update category successfully');
    }

    public function destroy(Category $category)
    {
        if ($category->tasks()->count() > 0) {
            $category->tasks()->detach();
        }

        $category->delete();

        return to_route('categories.index');
    }
}
