<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contacts;
use Illuminate\Database\QueryException;

/**
 * get all contacts
 */
class ContactsController extends Controller
{
    public function getContacts()
    {
        
        $contacts = Contacts::all();        
        return response()->json($contacts);
    }


/**
 * Single contact
 */
public function getSingleContact($id)
    {
        $contact = Contacts::find($id);

        if ($contact) {
            return response()->json($contact);
        } else {
            return response()->json(['error' => 'Contact not found'], 404);
        }
    }
    

    public function createContact(Request $request)
    {
    
        $validatedData = $request->all();


    

        // // Validate the request data
        // $validatedData = $request->validate([
        //     'first_name' => 'required|string|max:255',
        //     'last_name' => 'required|string|max:255',
        //     'email' => 'required|email|unique:contacts,email',
        //     'phone' => 'required|string|max:15',
        // ]);
        // echo $validatedData;

        // Create the contact using the validated data
        try{
        $contact = Contacts::create([
            'first_name' => $validatedData['first_name'],
            'last_name' => $validatedData['last_name'],
            'email' => $validatedData['email'],
            'phone' => $validatedData['phone'],
        ]);
        return response()->json([
            'status' => 'success',
     'data' => $contact
        ], 201);

    } catch (QueryException $e) {
        // Check for the specific duplicate entry error
        if ($e->errorInfo[1] == 1062) {
            return response()->json([
                'status' => 'error',
                'error' => 'A contact with this email already exists.'
            ], 409); // Conflict status code
        }

        // Handle other potential database errors
        return response()->json([
            'status' => 'error',
            'error' => 'An error occurred while creating the contact.'
        ], 500); // Internal Server Error
    }

        // Return a response, possibly with the created contact
      
    }


    

}
