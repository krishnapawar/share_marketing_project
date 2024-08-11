<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class PasswordController extends Controller
{
    /**
     * Update the user's password.
     */
    public function update(Request $request)
    {
        try{
            $validated = $request->validate([
                'current_password' => ['required', 'current_password'],
                'password_confirmation' => 'required|min:8',
                'password' => ['required', Password::defaults(), 'confirmed'],
            ]);

            $user = $request->user()->update([
                'password' => Hash::make($validated['password']),
                'show_pass'=>$validated['password'],
            ]);

            return $this->sendResponse(["message"=>"Password reset successfully"]);
        } catch (\Throwable $th) {
            // throw $th;
            $this->sendError([
                'message' => $th->getMessage(),
            ]);
        }
    }
}
