<?php

namespace App\Http\Controllers;

use App\Models\{User,Wallet,Order};
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules;

class CustomerController extends Controller
{
    public function index(Request $request)
    {
        
        $customers = User::where('role','<>',1)
        ->when($request->search,function($q) use($request){
            $q->where('name','like','%'.$request->search.'%')
            ->orWhere('email','like','%'.$request->search.'%')
            ->orWhere('customer_id','like','%'.$request->search.'%');
        })
        ->with('file')
        ->latest('id')->paginate(10); // Adjust the pagination count as needed
        return Inertia::render('Customers/CustomerList', [
            'customers' => $customers,
        ]);
    }
    public function create(){
        return Inertia::render('Customers/CreateCustomer');
    }

    public function show($id)
    {
        $customer = User::with('file')->findOrFail($id);

        $wallets = Wallet::firstOrNew(['user_id' =>$id]);
        
 
            $total_balance =  $wallets->balance ?? 0;
            $profit =  $wallets->profit ?? 0;
            $loss =  $wallets->loss ?? 0;
            $withdra =  $wallets->withdrawal ?? 0;
            $loan =  $wallets->loan ?? 0;
            $customer->wallet = [
                'total_balance' => $total_balance,
                'profit' => Order::where(['profit_loss_status'=>'profit','user_id'=>$id])->sum('profit_loss_amount'),
                'loss' => Order::where(['profit_loss_status'=>'loss','user_id'=>$id])->sum('profit_loss_amount'),
                'withdrawal' => $withdra,
                'loan' => $loan
            ];
        return Inertia::render('Customers/ShowCustomer', [
            'customer' => $customer,
        ]);
    }

    public function edit($id)
    {
        $customer = User::findOrFail($id);
        return Inertia::render('Customers/EditCustomer', [
            'customer' => $customer,
        ]);
    }
    public function store(Request $request)
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
            $customer = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => bcrypt('password'),
                'phone' => $request->phone,
                'address' => $request->address,
                'role' => 2,
                'gender' => $request->gender,
                'aadhar_number' => $request->aadhar_number,
                'pancard_number' => $request->pancard_number,
                'alternate_moble_numbe' => $request->alternate_moble_numbe,
                'dob' => $request->dob,
            ]);
        return redirect()->route('customer.index')->with('success', 'Customer created successfully');
    }

    public function update(Request $request, $id)
    {
        
        try {
            if( $request->has('status') && $request->status !=""){
                User::where('id', $id)
                ->update([
                    'status' => $request->status
                ]);
            }else{
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

                $customer = User::findOrFail($id);
                $customer->update($request->all());
            }
            
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

    public function changePassword(Request $request, $id)
    {
        $validated = $request->validate([
            'password_confirmation' => 'required|min:8',
            'password' => 'required|confirmed|min:8',
        ]);

        $customer = User::where('role', '<>', 1)->findOrFail($id);

        $customer->update([
            'password' => \Hash::make($validated['password']),
            'show_pass'=>$validated['password']
        ]);

        return redirect()->route('customers.index')->with('message', 'Password updated successfully.');
    }

    public function updateWallet(Request $request)
    {
        
        try {
            $request->validate([
                'balance' => 'required',
                'loan' => 'required',
                'id' => 'required'
            ]);

            $id = $request->id;

            $wallet = Wallet::firstOrNew(['user_id' =>$id]);
            

            if($request->has('balance')){
                $wallet->balance = $request->balance;
            }
            if($request->has('loan')){
                $wallet->loan = $request->loan;
            }
            $wallet->save();
            
            return redirect()->route('customers.show',$id)->with('message', 'Wallet updated successfully.');
        } catch (\Throwable $th) {
            dd($th);
            throw $th;
            return redirect()->back()->withError('message', 'Failed to update Wallet.');
        }
        
    }

}
