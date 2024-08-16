<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactsController;


Route::get('/', function () {
    return view('welcome');
});


Route::get('/contacts', [ContactsController::class, 'getContacts']);


Route::get('/contacts/{id}', [ContactsController::class, 'getSingleContact']);


Route::post('/contacts/create', [ContactsController::class, 'createContact']);



// In routes/api.php or routes/web.php
Route::delete('/contacts/{id}', [ContactsController::class, 'deleteContact']);



Route::put('/contacts/{id}', [ContactsController::class, 'updateContact']);
