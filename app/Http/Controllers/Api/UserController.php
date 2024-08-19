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
            'name' => 'required|string|max:255',
            'mobile_number' => 'required|string|min:10|max:15',
            'dob' => 'required|date_format:Y-m-d',
            'gender' => 'required|string|in:F,M,O|max:1',
            'aadhar_number' => 'required|string|min:12|max:12',
            'pancard_number' => 'required|string|min:10|max:10',
            'alternate_mobile_number' => 'nullable|string|min:10|max:15',
            'address' => 'required|string|min:4|max:255',
            'pin_code'=>'required|numeric|min:4',
        ]);

        $user = User::findOrFail($id);
        $user->update($validatedData);
        $user->message = 'Profile updated successfully';
        return $this->sendResponse($user->load('file'));
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
                $user->file_id = $this->uploadFile($request->file('profile_image'),'profile_images',$user->file_id);
            }

            $user->save();

            return $this->sendResponse(['message' => 'Profile updated successfully', 'user' => $user->load('file')]);
        } catch (\Throwable $th) {
            //throw $th;
            return $this->sendError([$th->getMessage()]);
        }
    }
    public function addCustomerBankDetail(Request $request)
    {
        $request->validate([
            'bank_name'=>'required|min:3',
            'bank_branch_name'=>'required|min:3',
            'bank_ifc_code'=>'required|min:3',
            'bank_account_no'=>'required|min:6',
        ]);

        try {
            //code...
            $user = auth()->user();
            $user->bank_name = $request->bank_name;
            $user->bank_branch_name = $request->bank_branch_name;
            $user->bank_ifc_code = $request->bank_ifc_code;
            $user->bank_account_no = $request->bank_account_no;

            $user->save();

            return $this->sendResponse(['message' => 'Profile updated successfully', 'user' => $user->load('file')]);
        } catch (\Throwable $th) {
            //throw $th;
            return $this->sendError([$th->getMessage()]);
        }
    }
}
