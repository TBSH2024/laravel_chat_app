document.addEventListener('DOMContentLoaded', () => {
  const chatRoomId = document.querySelector('meta[name="chat-room-id"]')?.content;
  const messagesIndexUrl = document.querySelector('meta[name="messages-index-url"]')?.content;
  const messageForm = document.getElementById('message-form');
  const messagesDiv = document.getElementById('messages');
  const actionUrl = document.querySelector('meta[name="message-store-url"]')?.content;

  if (!chatRoomId || !messagesIndexUrl || !messageForm || !messagesDiv || !actionUrl) {
      console.error("必要な要素またはデータが見つかりません。");
      return;
  }

  messageForm.setAttribute('action', actionUrl);

  // メッセージ送信
  messageForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const formData = new FormData(messageForm);

      try {
          const response = await fetch(actionUrl, {
              method: 'POST',
              headers: {
                  'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
              },
              body: formData
          });

          if (!response.ok) {
              throw new Error('メッセージ送信に失敗しました');
          }

          const message = await response.json();
          appendMessage(message, true); // messagesDivを渡さず、単純化
          messageForm.reset();
      } catch (error) {
          console.error('メッセージ送信エラー:', error);
      }
  });

  // メッセージ一覧をロード
  async function loadMessages() {
      try {
          const response = await fetch(messagesIndexUrl);
          if (!response.ok) {
              throw new Error('メッセージの読み込みに失敗しました');
          }

          const messages = await response.json();
          messagesDiv.innerHTML = ''; // メッセージエリアをクリア

          messages.forEach((message) => {
              const isMyMessage = message.user_id === window.Laravel.currentUserId;
              appendMessage(message, isMyMessage);
          });

          messagesDiv.scrollTop = messagesDiv.scrollHeight;
      } catch (error) {
          console.error('メッセージ読み込みエラー:', error);
      }
  }

  // メッセージを表示する関数
  function appendMessage(message, isMyMessage) {
      const messageElement = document.createElement('div');
      messageElement.classList.add('flex', isMyMessage ? 'justify-end' : 'justify-start');

      const messageContent = document.createElement('div');
      messageContent.classList.add(
          isMyMessage ? 'bg-blue-200' : 'bg-gray-300', 
          'text-black', 
          'p-2', 
          'rounded-lg', 
          'w-1/2'
      );

      const nicknameElement = document.createElement('div');
      nicknameElement.classList.add(isMyMessage ? 'text-right' : 'text-left');
      nicknameElement.textContent = `ニックネーム: ${message.nickname}`;

      const messageTextElement = document.createElement('div');
      messageTextElement.textContent = message.message;

      const timestampElement = document.createElement('div');
      timestampElement.classList.add('text-xs', 'text-gray-500', 'mt-1');
      const date = new Date(message.created_at);
      timestampElement.textContent = formatDate(date);

      messageContent.appendChild(nicknameElement);
      messageContent.appendChild(messageTextElement);
      messageContent.appendChild(timestampElement);
      messageElement.appendChild(messageContent);

      messagesDiv.appendChild(messageElement);
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }

  function formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      return date.toLocaleDateString('ja-JP', options);
  }

  // 初回メッセージロードと自動更新の設定
  loadMessages();
//   setInterval(loadMessages, 5000);
});
