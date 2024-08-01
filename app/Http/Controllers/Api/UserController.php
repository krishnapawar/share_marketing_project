<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    // Display a listing of the resource.
    public function index(Request $request)
    {
        return $request->user();
    }

    // Update the specified resource in storage.
    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'user_id' => 'required|numeric|max:1',
            'name' => 'required|string|max:255',
            'mobile_number' => 'required|string|min:10|max:15',
            'dob' => 'required|date_format:d-m-Y',
            'gender' => 'required|string|in:F,M,O|max:1',
            'aadhar_number' => 'required|string|min:12|max:12',
            'pancard_number' => 'required|string|min:10|max:10',
            'alternate_mobile_number' => 'nullable|string|min:10|max:15',
            'address' => 'required|string|min:4|max:255',
            'pin_code'=>'required|numeric|min:4|max:8',
        ]);

        $user = User::findOrFail($id);
        $user->update($validatedData);

        return $this->sendResponse([
            'user' => $user,
            'message' => 'Profile updated successfully'
        ]);
    }


    // Remove the specified resource from storage.
    public function destroy($id)
    {
        User::destroy($id);

        return $this->sendResponse([
            'message' => 'Profile deleted successfully'
        ]);
    }

    public function updateProfile(Request $request)
    {
        $request->validate([
            'profile_image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        try {
            //code...
            $user = auth()->user();

            if ($request->hasFile('profile_image')) {
                // Delete the old profile image if it exists
                if ($user->profile_image && file_exists(public_path('profile_images/' . $user->profile_image))) {
                    unlink(public_path('profile_images/' . $user->profile_image));
                }
                // Store the new profile image
                $image = $request->file('profile_image');
                $imageName = time() . '_' . $image->getClientOriginalName();
                $image->move(public_path('profile_images'), $imageName);
                $user->profile_image = $imageName;
            }

            $user->save();

            return $this->sendResponse(['message' => 'Profile updated successfully', 'user' => $user]);
        } catch (\Throwable $th) {
            //throw $th;
            return $this->sendError([$th->getMessage()]);
        }
    }
}
