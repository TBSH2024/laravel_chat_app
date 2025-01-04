<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $table = 'chat_messages';
    protected $fillable =[
        'chat_room_id',
        'nickname',
        'message',
    ];

    public function chatRoom()
    {
        return $this->belongsTo(ChatRoom::class);
    }
}
