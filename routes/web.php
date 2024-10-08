<?php

use App\Http\Controllers\{
    ProfileController,
    SettingController,
    CustomerController,
    OrderController,
    TransactionController,
    LoanRequestController
};

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\{Wallet,User,Order};

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
    $profit = Order::where(['profit_loss_status'=>'profit'])->sum('profit_loss_amount');
    $loss = Order::where(['profit_loss_status'=>'loss'])->sum('profit_loss_amount');
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

Route::middleware(['auth','role:1'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::resource('settings', SettingController::class);
    Route::resource('/customers', CustomerController::class);
    Route::post('/changePassword/{id}', [CustomerController::class,'changePassword'])->name('changePassword');
    Route::post('/updateWallet', [CustomerController::class,'updateWallet'])->name('updateWallet');
    Route::resource('/orders', OrderController::class);
    Route::post('/orders/orderSell', [OrderController::class,'orderSell'])->name('orderSell');
    Route::resource('/transactions', TransactionController::class);
    Route::post('/transactions/updateStatus', [TransactionController::class, 'updateStatus'])->name('transactions.updateStatus');
    Route::post('/updateSetting/{id}', [SettingController::class, 'updateSetting'])->name('updateSetting');
    Route::resource('/loanRequest', LoanRequestController::class);
});

require __DIR__.'/auth.php';
