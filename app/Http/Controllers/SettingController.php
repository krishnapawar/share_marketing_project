<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingController extends Controller
{
    public function index()
    {
        $settings = Setting::whereIn('key',['qrCode','bankDatail'])->get();
        return Inertia::render('Settings/Index', [
            'settings' => $settings
        ]);
    }

    // public function create()
    // {
    //     return Inertia::render('Settings/Create');
    // }

    // public function store(Request $request)
    // {
    //     $request->validate([
    //         'key' => 'required|unique:settings|max:255',
    //         'value' => 'required',
    //         'description' => 'nullable',
    //     ]);

    //     Setting::create($request->all());

    //     return redirect()->route('settings.index')->with('success', 'Setting created successfully.');
    // }

    // public function edit(Setting $setting)
    // {
    //     return Inertia::render('Settings/Edit', [
    //         'setting' => $setting
    //     ]);
    // }

    public function update(Request $request, Setting $setting)
    {
        $request->validate([
            'key' => 'required|max:255|unique:settings,key,' . $setting->id,
            'value' => 'required',
            'description' => 'nullable',
        ]);

        if($request->key == 'qrCode'){
            // Delete the old profile image if it exists
            if ($request->value && file_exists(public_path($request->key.'/'. $setting->value))) {
                unlink(public_path($request->key.'/'. $setting->value));
            }
            // Store the new profile image
            $image = $request->file('value');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $image->move(public_path('profile_images'), $imageName);
            $setting->value = $imageName;
            $setting->key = $request->key;
            $setting->save();
        }else{
            $setting->update($request->all());
        }

        return redirect()->route('settings.index')->with('success', 'Setting updated successfully.');
    }
}
