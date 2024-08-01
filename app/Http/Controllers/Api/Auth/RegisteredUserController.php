<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'mobile_number' => 'required|string|min:10|max:15',
            'dob' => 'required|string|date_format:Y-m-d|max:55',
            'gender' => 'required|string|in:F,M,O|max:6',
            'aadhar_number' => 'required|string|min:10|max:15',
            'pancard_number' => 'required|string|min:10|max:15',
            'alternate_moble_number' => 'nullable|string|min:10|max:15',
            'address' => 'required|string|min:4|max:255',
            'pin_code'=>'required|numeric|min:4|max:8',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'mobile_number' => $request->mobile_number,
            'dob' => $request->dob,
            'gender' => $request->gender,
            'aadhar_number' => $request->aadhar_number,
            'pancard_number' => $request->pancard_number,
            'alternate_moble_number' => $request->alternate_moble_number ?? null,
            'address' => $request->address,
            'pin_code'=>$request->pin_code,
        ]);

        event(new Registered($user));

        Auth::login($user);

        $token = $user->createToken('auth_token')->plainTextToken;

        return $this->sendResponse([
            'access_token' => $token,
            'user' => $user,
            'message'=> 'Register successful'
        ]);
    }
}
