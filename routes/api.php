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
         
            return ["success" => true, "data" => $data];
        }

    } catch (\Throwable $e) {
        throw $e;
    }
});

Route::post("/get/authors", function (Request $request) {
    $body = $request->all();
    $client = new Client();

    try {
        $response = $client->request('GET', 'https://candidate-testing.api.royal-apps.io/api/v2/authors?limit=99', [
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

Route::post("/get/author", function (Request $request) {
    $body = $request->all();
    $client = new Client();

    try {
        $response = $client->request('GET', 'https://candidate-testing.api.royal-apps.io/api/v2/authors/' . $body["author_id"], [
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

Route::post("/create/book", function (Request $request) {
    $body = $request->all();
    $client = new Client();

    try {
        $response = $client->request('POST', 'https://candidate-testing.api.royal-apps.io/api/v2/books', [
            'json' => [
                "author" => ["id" => $body["author_id"]],
                "title" => $body["title"],
                "release_date" => $body["date"],
                "description" => $body["description"],
                "isbn" => "test isbn",
                "format" => "test format",
                "number_of_pages" => $body["pages"]
            ],
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

Route::post("/create/author", function (Request $request) {
    $body = $request->all();
    $client = new Client();

    try {
        $response = $client->request('POST', 'https://candidate-testing.api.royal-apps.io/api/v2/authors', [
            'json' => [
                "first_name" => $body["first_name"],
                "last_name" => $body["last_name"],
                "birthday" => $body["birthday"],
                "biography" => "biography",
                "gender" => $body["gender"],
                "place_of_birth" => $body["place"]
            ],
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

Route::post("/delete/book", function (Request $request) {
    $body = $request->all();
    $client = new Client();

    try {
        $response = $client->request('DELETE', 'https://candidate-testing.api.royal-apps.io/api/v2/books/' . $body["book_id"], [
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

Route::post("/delete/author", function (Request $request) {
    $body = $request->all();
    $client = new Client();

    try {
        $response = $client->request('DELETE', 'https://candidate-testing.api.royal-apps.io/api/v2/authors/' . $body["author_id"], [
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