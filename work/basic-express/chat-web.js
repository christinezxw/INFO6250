const chatWeb = {
  chatPage: function(chat) {
    // Fill in anything below!
    return `
      <!doctype html>
      <html>
        <head>
          <title>Chat</title>
          <link rel="stylesheet" href="/css/chat.css" />
        </head>
        <body>
          <div id="chat-app">
            <div class="display-panel">
              ${chatWeb.getUserList(chat)}
              ${chatWeb.getMessageList(chat)}
            </div>
            ${chatWeb.getOutgoing(chat)}
          </div>
        </body>
      </html>
  `;
  },

  getMessageList: function(chat) {
    return `<ol class="messages">` +
    Object.values(chat.messages).map( message => `
      <li>
        <div class="message">
          <span class="sender">${message.sender}</span>
          <p class="message-text">${message.text}</p>
        </div>
      </li>
    `).join('') +
      `</ol>`;
  },
  getUserList: function(chat) {
    return `<ul class="users">` +
    Object.values(chat.users).map( user => `
      <li>
        <div class="user">
          <span class="username">${user}</span>
        </div>
      </li>
    `).join('') +
    `</ul>`;
  },
  getOutgoing: function() {
    return `
      <div class="outgoing">
        <form action="/chat" method="POST">
          <input name="text" value="" placeholder="Enter message to send"/>
          <input type="hidden" name="username" value="Bao">
          <button type="submit">Send</button>
        </form>
      </div>
    `;
  }
};
module.exports = chatWeb;
