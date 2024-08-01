<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    public function index()
    {
        $customers = User::where('role','<>',1)->latest('id')->paginate(10); // Adjust the pagination count as needed
        return Inertia::render('Customers/CustomerList', [
            'customers' => $customers,
        ]);
    }

    public function edit($id)
    {
        $customer = User::findOrFail($id);
        return Inertia::render('Customers/EditCustomer', [
            'customer' => $customer,
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'mobile_number' => 'required|min:10|max:14',
            'address' => 'required',
            'gender' => 'nullable|in:F,M,O',
            'aadhar_number'=> 'required|min:10|max:14',
            'pancard_number'=> 'required|min:10|max:14',
            'alternate_moble_numbe'=> 'nullable|min:10|max:14',
            'dob'=> 'nullable|date_format:Y-m-d',
        ]);
        try {
            $customer = User::findOrFail($id);
            $customer->update($request->all());
            return redirect()->route('customers.index')->with('message', 'Customer updated successfully.');
        } catch (\Throwable $th) {
            //throw $th;
            return redirect()->back()->withError('message', 'Failed to update customer.');
        }
        
    }

    public function destroy($id)
    {
        $customer = User::where('role','<>',1)->findOrFail($id);
        $customer->delete();
        return redirect()->route('customers.index')->with('message', 'Customer deleted successfully.');
    }
}
