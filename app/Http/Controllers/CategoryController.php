<?php

namespace App\Http\Controllers;

use App\Models\{Category,OrderDetail};
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Get all categories and pass to the view
        $categories = Category::with(['file'])->paginate(10);

        // Return Inertia view with data
        return Inertia::render('Categories/Index', [
            'categories' => $categories
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Return the form for creating a new category
        return Inertia::render('Categories/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'nullable|numeric|min:0', // Validation for price
            'media' => 'nullable|file|image|max:2048', // Validation for image upload
        ]);

        $category = new Category($request->only('name','price','description'));

        // Handle image upload

        $category->save();
        if($request->file('media'))
        {
            $category->media = $this->uploadFile($request->file('media'),'media',$category->media);
            $category->save();
        }

        return redirect()->route('categories.index')->with('success', 'Category created successfully.');
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        // Find the category by ID
        $category = Category::findOrFail($id);

        // Return Inertia view with category data
        return Inertia::render('Categories/Edit', [
            'category' => $category
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'nullable|numeric|min:0', // Validation for price
            'media' => 'nullable|file|image|max:2048', // Add validation for the image
        ]);

        $category = Category::findOrFail($id);
        
        // Handle image upload
        $category->update($request->only('name','price','description'));

        if($request->file('media'))
        {
            $category->media = $this->uploadFile($request->file('media'),'media',$category->media);
            $category->save();
        }

        return redirect()->route('categories.index')->with('success', 'Category updated successfully.');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        // Find the category and delete it
        $category = Category::findOrFail($id);
        $category->delete();

        // Redirect back with success message
        return redirect()->route('categories.index')->with('success', 'Category deleted successfully.');
    }

    public function ginninFilerWorks()
    {
        // Get all categories and pass to the view
        $categories = Category::with(['file'])->latest('id')->get();

        // Return Inertia view with data
        return Inertia::render('frontEnd/order/index', [
            'categories' => $categories
        ]);
    }

    public function ginninFilerWorkStore(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255', // Name validation
            'phone' => 'required|string|max:15', // Phone number validation
            'address' => 'required|string|max:255', // Address validation
            // 'area_code' => 'nullable|string|max:10', // Area code validation
            // 'table' => 'nullable|integer|min:1', // Table number validation
            'items' => 'required|array', // Items array validation
            'items.*.totalPrice' => 'required|numeric|min:0', // Validation for totalPrice in each item
            'grandTotal' => 'required|numeric|min:0', // Grand total validation
            'time' => 'required', // Time validation in HH:MM:SS format
        ]);
        $data= $request->all();
        // dd($data);
        OrderDetail::create([
            "items"=>collect($data)
        ]);
        if(!empty(auth()->user())){
            return redirect()->route('orderDetails.index')->with(['success' => 'Your order was placed successfully. We will contact you shortly.']);
        }
        return back()->with(['success' => 'Your order was placed successfully. We will contact you shortly.']);

    }
}
