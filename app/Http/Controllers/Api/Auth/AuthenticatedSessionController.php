<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Validation\ValidationException;

class AuthenticatedSessionController extends Controller
{
    /**
     * Handle an incoming authentication request.
     */
    public function store(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        if (!Auth::attempt($request->only('email', 'password'))) {
            $this->sendError([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $user = Auth::user();
        if($user->role != 1 && $user->status !='actived' ) 
        {
            if(auth()->user()->status == 'cancelled'){
                return response()->json(['message' => 'Your account has been Dispproved by Admin'], 403);
            }
            if(auth()->user()->status == 'pending'){
                return response()->json(['message' => 'Your account is pending for approval by Admin'],403);
            }
        }
        $token = $user->createToken('auth_token')->plainTextToken;

        return $this->sendResponse([
            'access_token' => $token,
            'user' => $user->load('file'),
            'message'=> 'Login successful'
        ]);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return $this->sendResponse([
            'message'=> 'Logout successful'
        ]);
    }
}
