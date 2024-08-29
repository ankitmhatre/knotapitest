<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contacts;
use Illuminate\Database\QueryException;
use App\Models\ContactHistory;
use App\Events\MessageBlock;

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
        // Fetch the contact
        $contact = Contacts::find($id);
    
        if (!$contact) {
            return response()->json(['error' => 'Contact not found'], 404);
        }
    
        // Fetch the history for this contact
        $history = ContactHistory::where('contact_id', $id)
            ->orderBy('timestamp', 'desc') // Optionally order by timestamp
            ->get();
    
        // Return contact and history in the response
        return response()->json([
            'contact' => $contact,
            'history' => $history
        ]);
    }
    
    
    public function createContact(Request $request)
    {
        $validatedData = $request->all();

       // sleep(20);
        
        try {
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
    }

    /**
     * Delete a contact
     */
    public function deleteContact($id)
    {
        try {
            $contact = Contacts::find($id);

            if ($contact) {
                $contact->delete();
                return response()->json([
                    'status' => 'success',
                    'message' => 'Contact deleted successfully.'
                ], 200);
            } else {
                return response()->json(['error' => 'Contact not found'], 404);
            }

        } catch (QueryException $e) {
            // Handle potential database errors
            return response()->json([
                'status' => 'error',
                'error' => 'An error occurred while deleting the contact.'
            ], 500); // Internal Server Error
        }
    }



    public function updateContact(Request $request, $id)
    {
        // Find the contact by ID
        $contact = Contacts::find($id);
    
        if (!$contact) {
            return response()->json(['error' => 'Contact not found'], 404);
        }
    
        // Prepare an array to store updated attributes
        $updatedAttributes = [];
    
        // Loop through each attribute in the request
        foreach ($request->all() as $key => $value) {
            // Check if the attribute has changed
            if ($contact->$key != $value) {
                $updatedAttributes[] = [
                    'contact_id' => $id, // Make sure to use 'id' instead of 'contact_id' here
                    'timestamp' => now(),
                    'attribute_changed' => $key,
                    'attribute_previous_value' => $contact->$key,
                    'attribute_update_value' => $value,
                ];
            }
        }
    
        // Update the contact with the new values
        $contact->update($request->all());
    
        // Insert records into contact_history only if there are changes
        if (!empty($updatedAttributes)) {
            ContactHistory::insert($updatedAttributes);
        }

        //TODO: Also send a websocket broadcast
        //  $message = "test-data";//["event"=>"my-event", "data"=>"test"];
        //  event(new MessageBlock($message));


        // Return the updated contact in the response
        return response()->json([
            'status' => 'success',
            'data' => $contact,
        ], 200);
    }
}


