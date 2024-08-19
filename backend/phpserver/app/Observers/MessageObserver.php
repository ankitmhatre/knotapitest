<?php

namespace App\Observers;

use App\Models\MessageBlock;

class MessageObserver
{
    /**
     * Handle the MessageBlock "created" event.
     */
    public function created(MessageBlock $messageBlock): void
    {
        //
    }

    /**
     * Handle the MessageBlock "updated" event.
     */
    public function updated(MessageBlock $messageBlock): void
    {
        //
    }

    /**
     * Handle the MessageBlock "deleted" event.
     */
    public function deleted(MessageBlock $messageBlock): void
    {
        //
    }

    /**
     * Handle the MessageBlock "restored" event.
     */
    public function restored(MessageBlock $messageBlock): void
    {
        //
    }

    /**
     * Handle the MessageBlock "force deleted" event.
     */
    public function forceDeleted(MessageBlock $messageBlock): void
    {
        //
    }
}
