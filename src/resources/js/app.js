// import './bootstrap';

// document.addEventListener('DOMContentLoaded', function() {
//   const chatRoomId = document.querySelector('meta[name="chat-room-id"]').content; // チャットルームIDをmetaタグから取得
//   const messagesIndexUrl = document.querySelector('meta[name="messages-index-url"]').content; // メッセージURLをmetaタグから取得

//   fetch(`/api/chatroom-info/${chatRoomId}`)
//       .then(response => response.json())
//       .then(data => {
//           // 取得したデータを利用
//           console.log(data.chatRoomId); // チャットルームID
//           console.log(data.messagesIndexUrl); // メッセージ一覧URL
//       })
//       .catch(error => {
//           console.error('Error fetching chatroom info:', error);
//       });
// });

// // フラッシュメッセージを自動削除
// document.addEventListener('DOMContentLoaded', () => {
//   const flashMessage = document.querySelector('[role="alert"]');
//   if (flashMessage) {
//     setTimeout(() => {
//       flashMessage.remove();
//     }, 3000); // 3秒後に削除
//   }
// });

// // メッセージの操作
// document.getElementById('message-form').addEventListener('submit', async (event) => {
//   event.preventDefault();
//   const formData = new FormData(event.target);

//   const url = window.Laravel.route?.message?.store;
//   const csrfToken = window.Laravel.csrfToken;

//   if (!url || !csrfToken) {
//     console.error("URL or CSRF token is missing.");
//     return;
//   }

//   try {
//     const response = await fetch(url, {
//       method: 'POST',
//       headers: {
//         'X-CSRF-TOKEN': csrfToken
//       },
//       body: formData
//     });

//     if (response.ok) {
//       const data = await response.json();
//       // メッセージを表示
//       const messagesDiv = document.getElementById('messages');
//       const newMessage = document.createElement('div');
//       newMessage.innerHTML = `<p>${data.nickname}</p><p>${data.message}</p>`;
//       messagesDiv.appendChild(newMessage);

//       // 送信したメッセージを削除
//       document.getElementById('message').value = '';
//       messagesDiv.scrollTop = messagesDiv.scrollHeight;
//     } else {
//       console.error('Failed to send message:', response.statusText);
//     }
//   } catch (e) {
//     console.error(e);
//     alert('エラーが発生しました');
//   }
// });

// // メッセージをロードする関数
// async function loadMessages() {
//   const url = window.Laravel.route?.messages?.index;
//   const chatRoomId = window.Laravel.chatRoomId;

//   if (!url || !chatRoomId) {
//     console.error("URL or chatRoomId is missing.");
//     return;
//   }

//   try {
//     const response = await fetch(`${url}/${chatRoomId}`);

//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }

//     const data = await response.json();
//     const messageDiv = document.querySelector('#messages'); // メッセージ表示エリアを取得
//     if (!messageDiv) {
//       console.error('Message container not found');
//       return;
//     }

//     messageDiv.innerHTML = ''; // メッセージエリアをクリア

//     data.forEach(message => {
//       const newMessage = document.createElement('div'); // メッセージ要素を作成
//       newMessage.classList.add(message.nickname === '自分' ? 'my-message' : 'other-message'); // メッセージの表示位置を切り替え

//       // メッセージ内容を設定
//       newMessage.innerHTML = `
//         <div class="message-nickname">${message.nickname}</div>
//         <div class="message-content">${message.content}</div>
//       `;

//       // メッセージ要素を追加
//       messageDiv.appendChild(newMessage);
//     });

//     // メッセージエリアをスクロール
//     messageDiv.scrollTop = messageDiv.scrollHeight;
//   } catch (error) {
//     console.error('Failed to load messages:', error);
//   }
// }

// // 初回ロード
// loadMessages();

// // 3秒ごとにメッセージを更新
// setInterval(loadMessages, 3000);
