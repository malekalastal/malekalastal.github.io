// أيقونة الدردشة وعرض/إخفاء النافذة
const icon = document.getElementById('mflf-icon');
const chat = document.getElementById('mflf-chat');
const closeBtn = document.getElementById('mflf-close');
const loginSection = document.getElementById('mflf-login');
const loginBtn = document.getElementById('mflf-login-btn');
const usernameInput = document.getElementById('mflf-username');
const messages = document.getElementById('mflf-messages');
const input = document.getElementById('mflf-input');

const friends = ["سامي","ليلى","خالد","هند","أحمد"];

icon.addEventListener('click', () => chat.style.display = 'flex');
closeBtn.addEventListener('click', () => chat.style.display = 'none');

// تسجيل الدخول الوهمي
loginBtn.addEventListener('click', () => {
  const name = usernameInput.value.trim();
  if(name){
    loginSection.style.display = 'none';
    messages.style.display = 'block';
    input.style.display = 'block';
    const welcome = document.createElement('div');
    welcome.className = 'mflf-msg mflf-friend';
    welcome.textContent = "مفلف: أهلاً " + name + "!";
    messages.appendChild(welcome);
  }
});

// إرسال الرسائل
input.addEventListener('keypress', function(e){
  if(e.key === 'Enter' && input.value.trim() !== ''){
    const userMsg = document.createElement('div');
    userMsg.className = 'mflf-msg mflf-user';
    userMsg.textContent = input.value;
    messages.appendChild(userMsg);

    setTimeout(() => {
      const friendMsg = document.createElement('div');
      friendMsg.className = 'mflf-msg mflf-friend';
      const friend = friends[Math.floor(Math.random()*friends.length)];
      const replies = [
        "هههه شفت رسالتك!",
        "ممتاز 👍",
        "😂😂 فهمتك",
        "أكيد، فكرة رائعة!",
        "واو!"
      ];
      friendMsg.textContent = friend + ": " + replies[Math.floor(Math.random()*replies.length)];
      messages.appendChild(friendMsg);
      messages.scrollTop = messages.scrollHeight;
    }, 1200);

    input.value = '';
    messages.scrollTop = messages.scrollHeight;
  }
});
