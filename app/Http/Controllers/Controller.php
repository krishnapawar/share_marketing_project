<?php

namespace App\Http\Controllers;
use Illuminate\Validation\ValidationException;
use App\Models\ProjectFile;

abstract class Controller
{
    //
    /**
     * success response method.
     *
     * @return \Illuminate\Http\Response
     */
    public function sendResponse($response=[],$code = 200)
    {
        $res = [
            'status' => true,
            'data' => $response,
        ];

        if (isset($response['access_token'])) {
            $res['token_type'] = 'Bearer';
        }

        if (isset($response['message'])) {
            $res['message'] = $response['message'];
        }

        return response()->json($res, $code);
    }
  
    /**
     * return error response.
     *
     * @return \Illuminate\Http\Response
     */
    public function sendError($response=[])
    {
        throw ValidationException::withMessages($response);
    }

    public function uploadFile($file,$dastination='',$id=null){
        try {
            // Check if the file is valid
            if (!$file || !$file->isValid()) {
                return $id;
            }
            $fileName = time().'.'.$file->getClientOriginalExtension();
            $originalName = $file->getClientOriginalName();
            $path = $file->store('public/'.$dastination);
            $mimeType = $file->getMimeType();
            $size = $file->getSize();
            $extension = $file->getClientOriginalExtension();
            $data = [
                'name' => $dastination."/".$fileName,
                'originalName' => $originalName,
                'path' => $path,
                'mimeType' => $mimeType,
                'size' => $size,
                'extension' => $extension,
            ];
            $file->storeAs('public/'.$dastination, $fileName);
            if($id && $id > 0){
                $fileData = ProjectFile::find($id);

                if ($fileData) {
                    // Check if the file exists and delete it
                    $existingFilePath = storage_path('app/public/' . $fileData->path);
                    if (file_exists($existingFilePath)) {
                        unlink($existingFilePath);
                    }

                    $fileData = $fileData->update($data);
                    return $id;
                }
                
            }
            $fileData = ProjectFile::create($data);
            return $fileData->id;
        } catch (\Throwable $th) {
            throw $th;
        }
    }

}
