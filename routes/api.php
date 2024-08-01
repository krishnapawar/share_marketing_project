<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Api\Auth\{
    AuthenticatedSessionController,
    RegisteredUserController
};
use App\Http\Controllers\Api\{
    UserController,
    OrderController,
    DashboardController,
    TransactionController
};


// Authentication routes
Route::post('/register', [RegisteredUserController::class, 'store']);
Route::post('/login', [AuthenticatedSessionController::class, 'store']);
Route::post('/forgot-password', [PasswordResetLinkController::class, 'store']);
Route::post('/reset-password', [NewPasswordController::class, 'store']);
Route::get('/verify-email/{id}/{hash}', [VerifyEmailController::class, '__invoke'])->middleware(['signed', 'throttle:6,1'])->name('verification.verify');
Route::post('/email/verification-notification', [EmailVerificationNotificationController::class, 'store'])->middleware(['throttle:6,1']);
Route::get('/email/verify', [EmailVerificationPromptController::class, '__invoke'])->middleware('auth')->name('verification.notice');
Route::post('/confirm-password', [ConfirmablePasswordController::class, 'store']);
Route::put('/user/password', [PasswordController::class, 'update']);


// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy']);
    Route::apiResource('/user', UserController::class)->only(['destroy', 'index', 'update']);
    Route::get('/dashboard', [DashboardController::class,'index']);
    Route::apiResource('/order', OrderController::class);
    Route::apiResource('/transaction', TransactionController::class)->only(['index', 'show']);
    Route::post('/add-fund', [TransactionController::class, 'store']);
    Route::post('/withdrawal', [TransactionController::class, 'withdrawal']);
    Route::get('/helpAndSuport', [DashboardController::class,'helpAndSuport']);
    Route::post('/updateProfile', [UserController::class, 'updateProfile']);
});