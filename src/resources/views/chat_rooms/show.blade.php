@extends('layouts.app')

@section('title')
    チャットアプリ - {{ $chatRoom->name }}
@endsection

@section('content')
<div class="bg-gray-100 h-screen flex flex-col max-w-4xl mx-auto">
    <!-- 上部ヘッダー -->
    <div class="bg-blue-500 p-4 text-white flex items-center">
        <h2 class="text-xl font-bold truncate max-w-xs">ルーム名: {{ $chatRoom->name }}</h2>
    </div>
    <!-- メッセージ表示エリア -->
    <div class="flex-1 overflow-y-auto p-4">
        <div class="flex flex-col space-y-2" id="messages">
            <!-- メッセージのサンプル -->
        </div>
    </div>
    <!-- 送信フォーム -->
    <form action="{{ route('message.store') }}" method="POST" id="message-form" class="p-6 flex flex-col gap-4 bg-white border border-gray-300">
        @csrf
        <input type="hidden" name="chat_room_id" value="{{ $chatRoom->id }}" />
        <div class="flex flex-col">
            <label for="nickname" class="text-gray-700 font-medium">ニックネーム</label>
            <input type="text" name="nickname" id="nickname" placeholder="ニックネームを入力してください" required maxlength="8" class="py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div class="flex flex-col">
            <label for="message" class="text-gray-700 font-medium">メッセージ</label>
            <textarea name="message" id="message" rows="3" placeholder="テキストを入力してください" required class="py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
        </div>
        <button type="submit" class="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 focus:outline-none">送信する</button>
    </form>
</div>
<!-- 必要なmetaタグ -->
<meta name="chat-room-id" content="{{ $chatRoom->id }}">
<meta name="messages-index-url" content="{{ route('messages.index', $chatRoom->id) }}">
<meta name="message-store-url" content="{{ route('message.store') }}">
<!-- 現在のユーザーIDをJavaScriptに渡す -->
<script>
    window.Laravel = {
        currentUserId: "{{ Auth::id() }}"
    };
</script>

@endsection
