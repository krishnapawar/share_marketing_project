<?php

namespace App\Http\Controllers;
use Illuminate\Validation\ValidationException;

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
}
