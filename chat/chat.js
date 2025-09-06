const messagesDiv = document.getElementById('messages');
const chatForm = document.getElementById('chat-form');
const usernameInput = document.getElementById('username');
const messageInput = document.getElementById('message');
const imageInput = document.getElementById('image');

// Simple chat messages array (replace with realtime DB for production)
const messages = [];

function renderMessages() {
  messagesDiv.innerHTML = '';
  messages.forEach(msg => {
    const div = document.createElement('div');
    div.textContent = `${msg.username}: ${msg.text || ''}`;
    if (msg.imageUrl) {
      const img = document.createElement('img');
      img.src = msg.imageUrl;
      img.className = 'chat-img';
      div.appendChild(img);
    }
    messagesDiv.appendChild(div);
  });
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

chatForm.addEventListener('submit', async e => {
  e.preventDefault();
  const username = usernameInput.value.trim();
  const text = messageInput.value.trim();
  const imageFile = imageInput.files[0];
  let imageUrl = null;

  if (imageFile) {
    if (imageFile.size > 2 * 1024 * 1024) {
      alert("Resim 2MB'dan büyük olamaz!");
      return;
    }
    // Upload to Cloudinary unsigned (secure enough for demo/public chat)
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', 'ml_default'); // default unsigned preset
    const res = await fetch('https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload', {
      method: 'POST',
      body: formData
    });
    const data = await res.json();
    imageUrl = data.secure_url;
  }

  messages.push({ username, text, imageUrl });
  renderMessages();
  messageInput.value = '';
  imageInput.value = '';
});
