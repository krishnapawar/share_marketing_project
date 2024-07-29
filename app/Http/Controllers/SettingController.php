<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingController extends Controller
{
    public function index()
    {
        $settings = Setting::all();
        return Inertia::render('Settings/Index', [
            'settings' => $settings
        ]);
    }

    public function create()
    {
        return Inertia::render('Settings/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'key' => 'required|unique:settings|max:255',
            'value' => 'required',
            'description' => 'nullable',
        ]);

        Setting::create($request->all());

        return redirect()->route('settings.index')->with('success', 'Setting created successfully.');
    }

    public function edit(Setting $setting)
    {
        return Inertia::render('Settings/Edit', [
            'setting' => $setting
        ]);
    }

    public function update(Request $request, Setting $setting)
    {
        $request->validate([
            'key' => 'required|max:255|unique:settings,key,' . $setting->id,
            'value' => 'required',
            'description' => 'nullable',
        ]);

        $setting->update($request->all());

        return redirect()->route('settings.index')->with('success', 'Setting updated successfully.');
    }

    public function destroy(Setting $setting)
    {
        $setting->delete();

        return redirect()->route('settings.index')->with('success', 'Setting deleted successfully.');
    }
}
