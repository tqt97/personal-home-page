<?php

use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\TaskController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

Route::resource('tasks', TaskController::class);
Route::resource('categories', CategoryController::class);
Route::get('dashboard', function () {
    return Inertia::render('dashboard');
})->name('dashboard');
Route::get('dashboard', DashboardController::class)->name('dashboard');
