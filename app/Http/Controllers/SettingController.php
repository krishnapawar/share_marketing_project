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
            'settings' => $settings->load('file')
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

    public function updateSetting(Request $request)
    {
        $request->validate([
            // 'key' => 'required|max:255|unique:settings,key,' . $setting->id,
            'value' => 'required',
            'description' => 'nullable',
        ]);
        $setting = Setting::find($request->id);
        if($request->key == 'qrCode'){
            // Store the new profile image
            $image = $request->file('value');

            $setting->file_id = $this->uploadFile($image,$request->key,$setting->file_id);
        } else {
            $setting->value = $request->value;
        }

        $setting->description = $request->description;
        // $setting->key = $request->key;
        $setting->save();

        return redirect()->route('settings.index')->with('success', 'Setting updated successfully.');
    }

}
