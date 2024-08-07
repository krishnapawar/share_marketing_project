<?php

use App\Http\Controllers\{
    ProfileController,
    SettingController,
    CustomerController,
    OrderController,
    TransactionController,
};

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\{Wallet,User};

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    $user = auth()->user();
    $wallets = Wallet::get();


    $total_balance = $wallets->sum('balance');
    $profit = $wallets->sum('profit');
    $loss = $wallets->sum('loss');
    $withdra = $wallets->sum('withdrawal');
    $loan = $wallets->sum('loan');

    return Inertia::render('Dashboard',[
        'total_balance' => round($total_balance, 2, 0),
        'profit' => round($profit, 2, 0),
        'loss' => round($loss, 2, 0),
        'withdrawal' => round($withdra, 2, 0),
        'loan' => round($loan, 2, 0),
        'totatUser'=> User::where('role','0')->count(),
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::resource('settings', SettingController::class);
    Route::resource('/customers', CustomerController::class);
    Route::resource('/orders', OrderController::class);
    Route::resource('/transactions', TransactionController::class);
    Route::post('/updateSetting/{id}', [SettingController::class, 'updateSetting'])->name('updateSetting');
});

require __DIR__.'/auth.php';
