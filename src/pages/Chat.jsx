import React, { useState, useEffect, useRef } from 'react';
import { Send, Search, Phone, Video, MoreVertical, Smile, Paperclip, Image, Check, CheckCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import io from 'socket.io-client';
import toast from 'react-hot-toast';

export default function Chat() {
  const { user } = useAuth();
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [chats, setChats] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [typing, setTyping] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState(new Set());
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initialize socket connection
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    newSocket.emit('user_connected', user.id);

    newSocket.on('user_online', (userId) => {
      setOnlineUsers(prev => new Set([...prev, userId]));
    });

    newSocket.on('user_offline', (userId) => {
      setOnlineUsers(prev => {
        const newSet = new Set(prev);
        newSet.delete(userId);
        return newSet;
      });
    });

    newSocket.on('receive_message', (messageData) => {
      setMessages(prev => [...prev, messageData]);
      // Update chat list with new message
      fetchChats();
    });

    newSocket.on('user_typing', ({ userId, chatId }) => {
      if (selectedChat && selectedChat._id === chatId) {
        setTyping(true);
        setTimeout(() => setTyping(false), 3000);
      }
    });

    return () => {
      newSocket.disconnect();
    };
  }, [user.id, selectedChat]);

  useEffect(() => {
    fetchChats();
    fetchContacts();
  }, []);

  useEffect(() => {
    if (selectedChat) {
      fetchMessages(selectedChat._id);
      if (socket) {
        socket.emit('join_chat', selectedChat._id);
      }
    }
  }, [selectedChat, socket]);

  const fetchChats = async () => {
    try {
      const response = await axios.get('/chat');
      setChats(response.data);
    } catch (error) {
      console.error('Error fetching chats:', error);
    }
  };

  const fetchContacts = async () => {
    try {
      const response = await axios.get('/chat/contacts');
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const fetchMessages = async (chatId) => {
    try {
      const response = await axios.get(`/chat/${chatId}/messages`);
      setMessages(response.data);
      // Mark messages as read
      await axios.put(`/chat/${chatId}/read`);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const createOrSelectChat = async (contactId) => {
    try {
      const response = await axios.post('/chat/create', { participantId: contactId });
      setSelectedChat(response.data);
      fetchChats(); // Refresh chat list
    } catch (error) {
      console.error('Error creating chat:', error);
      toast.error('Failed to start chat');
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim() || !selectedChat) return;

    try {
      const response = await axios.post(`/chat/${selectedChat._id}/messages`, {
        content: message,
        messageType: 'text'
      });

      const newMessage = response.data;
      setMessages(prev => [...prev, newMessage]);
      setMessage('');

      // Emit message through socket
      if (socket) {
        socket.emit('send_message', {
          ...newMessage,
          chatId: selectedChat._id
        });
      }

      fetchChats(); // Update chat list
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    }
  };

  const handleTyping = () => {
    if (socket && selectedChat) {
      socket.emit('typing', {
        userId: user.id,
        chatId: selectedChat._id
      });
    }
  };

  const filteredChats = chats.filter(chat => {
    const otherParticipant = chat.participants.find(p => p._id !== user.id);
    return otherParticipant?.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !chats.some(chat => chat.participants.some(p => p._id === contact._id))
  );

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const isOnline = (userId) => onlineUsers.has(userId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden" style={{ height: 'calc(100vh - 12rem)' }}>
        <div className="flex h-full">
          {/* Chat List Sidebar */}
          <div className="w-1/3 border-r border-gray-200 flex flex-col bg-pink-50">
            {/* Header */}
            <div className="p-6 border-b border-pink-200 bg-gradient-to-r from-pink-500 to-rose-400 text-white">
              <h2 className="text-xl font-bold mb-4">Messages</h2>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-pink-200" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent bg-white/20 text-white placeholder-pink-200"
                />
              </div>
            </div>

            {/* Chat List */}
            <div className="flex-1 overflow-y-auto">
              {/* Existing Chats */}
              {filteredChats.map((chat) => {
                const otherParticipant = chat.participants.find(p => p._id !== user.id);
                const unreadCount = chat.messages?.filter(m => !m.isRead && m.sender !== user.id).length || 0;
                
                return (
                  <div
                    key={chat._id}
                    onClick={() => setSelectedChat(chat)}
                    className={`p-4 border-b border-pink-100 cursor-pointer hover:bg-pink-100 transition-colors ${
                      selectedChat?._id === chat._id ? 'bg-pink-200 border-pink-300' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <img
                          src={otherParticipant?.avatar}
                          alt={otherParticipant?.name}
                          className="h-12 w-12 rounded-full object-cover"
                        />
                        {isOnline(otherParticipant?._id) && (
                          <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-400 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-semibold text-gray-900 truncate">
                            {otherParticipant?.name}
                          </h3>
                          <span className="text-xs text-gray-500">
                            {chat.lastMessage?.timestamp && formatTime(chat.lastMessage.timestamp)}
                          </span>
                        </div>
                        <p className="text-xs text-pink-600 mb-1 capitalize">{otherParticipant?.role}</p>
                        <p className="text-sm text-gray-700 truncate">
                          {chat.lastMessage?.content || 'Start a conversation'}
                        </p>
                      </div>
                      {unreadCount > 0 && (
                        <div className="bg-pink-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {unreadCount}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Available Contacts */}
              {filteredContacts.length > 0 && (
                <>
                  <div className="p-4 bg-pink-100 border-b border-pink-200">
                    <h3 className="text-sm font-semibold text-pink-800">Start New Chat</h3>
                  </div>
                  {filteredContacts.map((contact) => (
                    <div
                      key={contact._id}
                      onClick={() => createOrSelectChat(contact._id)}
                      className="p-4 border-b border-pink-100 cursor-pointer hover:bg-pink-100 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <img
                            src={contact.avatar}
                            alt={contact.name}
                            className="h-12 w-12 rounded-full object-cover"
                          />
                          {isOnline(contact._id) && (
                            <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-400 border-2 border-white rounded-full"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-gray-900 truncate">{contact.name}</h3>
                          <p className="text-xs text-pink-600 capitalize">{contact.role}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {selectedChat ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-pink-500 to-rose-400 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {(() => {
                        const otherParticipant = selectedChat.participants.find(p => p._id !== user.id);
                        return (
                          <>
                            <div className="relative">
                              <img
                                src={otherParticipant?.avatar}
                                alt={otherParticipant?.name}
                                className="h-10 w-10 rounded-full object-cover"
                              />
                              {isOnline(otherParticipant?._id) && (
                                <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-400 border-2 border-white rounded-full"></div>
                              )}
                            </div>
                            <div>
                              <h3 className="font-semibold">{otherParticipant?.name}</h3>
                              <p className="text-sm text-pink-100 capitalize">
                                {isOnline(otherParticipant?._id) ? 'Online' : 'Offline'} • {otherParticipant?.role}
                              </p>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-pink-100 hover:text-white hover:bg-pink-600 rounded-full transition-colors">
                        <Phone className="h-5 w-5" />
                      </button>
                      <button className="p-2 text-pink-100 hover:text-white hover:bg-pink-600 rounded-full transition-colors">
                        <Video className="h-5 w-5" />
                      </button>
                      <button className="p-2 text-pink-100 hover:text-white hover:bg-pink-600 rounded-full transition-colors">
                        <MoreVertical className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-pink-25">
                  {messages.map((msg) => (
                    <div
                      key={msg._id}
                      className={`flex ${msg.sender._id === user.id ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className="flex items-end space-x-2 max-w-xs lg:max-w-md">
                        {msg.sender._id !== user.id && (
                          <img
                            src={msg.sender.avatar}
                            alt={msg.sender.name}
                            className="h-6 w-6 rounded-full object-cover"
                          />
                        )}
                        <div
                          className={`px-4 py-2 rounded-2xl ${
                            msg.sender._id === user.id
                              ? 'bg-gradient-to-r from-pink-500 to-rose-400 text-white rounded-br-sm'
                              : 'bg-white text-gray-900 border border-pink-200 rounded-bl-sm'
                          }`}
                        >
                          <p className="text-sm">{msg.content}</p>
                          <div className={`flex items-center justify-end mt-1 space-x-1 ${
                            msg.sender._id === user.id ? 'text-pink-100' : 'text-gray-500'
                          }`}>
                            <span className="text-xs">
                              {formatTime(msg.createdAt)}
                            </span>
                            {msg.sender._id === user.id && (
                              <div className="text-xs">
                                {msg.isRead ? <CheckCheck className="h-3 w-3" /> : <Check className="h-3 w-3" />}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {typing && (
                    <div className="flex justify-start">
                      <div className="bg-white border border-pink-200 px-4 py-2 rounded-2xl rounded-bl-sm">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200 bg-white">
                  <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                    <button
                      type="button"
                      className="p-2 text-gray-400 hover:text-pink-600 hover:bg-pink-50 rounded-full transition-colors"
                    >
                      <Paperclip className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      className="p-2 text-gray-400 hover:text-pink-600 hover:bg-pink-50 rounded-full transition-colors"
                    >
                      <Image className="h-5 w-5" />
                    </button>
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={message}
                        onChange={(e) => {
                          setMessage(e.target.value);
                          handleTyping();
                        }}
                        placeholder="Type a message..."
                        className="w-full pl-4 pr-12 py-3 border border-pink-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-3 text-gray-400 hover:text-pink-600 transition-colors"
                      >
                        <Smile className="h-5 w-5" />
                      </button>
                    </div>
                    <button
                      type="submit"
                      disabled={!message.trim()}
                      className="p-3 bg-gradient-to-r from-pink-500 to-rose-400 text-white rounded-full hover:from-pink-600 hover:to-rose-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      <Send className="h-5 w-5" />
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center bg-pink-25">
                <div className="text-center text-gray-500">
                  <div className="bg-gradient-to-br from-pink-100 to-rose-100 rounded-full p-8 mb-4 inline-block">
                    <Send className="h-12 w-12 text-pink-500" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
                  <p>Choose a chat from the sidebar to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}