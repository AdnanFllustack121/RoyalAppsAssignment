<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use GuzzleHttp\Client;
use App\Models\AccessToken;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/get/access_token', function (Request $request) {
    $body = $request->all();
    $client = new Client();

    try {
        $email = $body["email"];
        $password = $body["password"];

        $response = $client->request('POST', 'https://candidate-testing.api.royal-apps.io/api/v2/token', [
            'json' => [
                'email' => $email,
                'password' => $password,
            ],
            'headers' => [
                'Content-Type' => 'application/json',
            ]
        ]);

        if ($response->getStatusCode() == 200) {
            $data = json_decode($response->getBody());

            // $user = AccessToken::where('user_email', $data->user->email)->first();

            // if ($user) {
            //     AccessToken::where('user_email', $data->user->email)->update(['access_token_id' => $data->id, 'token_key' => $data->token_key]);
            // } else {
            //     $token = new AccessToken;
            //     $token->access_token_id = $data->id;
            //     $token->token_key = $data->token_key;
            //     $token->user_email = $data->user->email;
            //     $token->save();
            // }
         
            return ["success" => true, "data" => $data->token_key];
        }

    } catch (\Throwable $e) {
        throw $e;
    }
});

Route::post("/get/authors", function (Request $request) {
    $body = $request->all();
    $client = new Client();

    try {
        $response = $client->request('GET', 'https://candidate-testing.api.royal-apps.io/api/v2/authors', [
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => 'Bearer ' . $body["token"]
            ]
        ]);

        $data = json_decode($response->getBody());

        return ["success" => true, "data" => $data];
    } catch (\Throwable $e) {
        throw $e;
    }
});