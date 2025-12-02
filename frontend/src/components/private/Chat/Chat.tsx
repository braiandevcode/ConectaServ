import { useState, useRef, useEffect } from 'react';
import { RiSendPlane2Line, RiUser3Line } from 'react-icons/ri';
import { FaSearch } from 'react-icons/fa';
import './Chat.css';
import type { iConversation } from '../../../interfaces/iConversation';

// SIMULACION
const mockiConversations: iConversation[] = [
  { id: 1, name: 'Alice', messages: [{ id: 1, text: 'Hola!', sender: 'other' }] },
  { id: 2, name: 'Bob', messages: [{ id: 1, text: '¿Qué tal?', sender: 'other' }] },
];

const Chat= () => {
  const [conversations, setiConversations] = useState<iConversation[]>(mockiConversations);
  const [activeiConversationId, setActiveiConversationId] = useState<number>(1);
  const [newMessage, setNewMessage] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const activeiConversation: iConversation | undefined = conversations.find(c => c.id === activeiConversationId);

  const handleSend = () => {
    if (!newMessage.trim() || !activeiConversation) return;

    const updatediConversations:iConversation[] = conversations.map(conversation => {
      if (conversation.id === activeiConversationId) {
        return {
          ...conversation,
          messages: [...conversation.messages, { id: Date.now(), text: newMessage, sender: 'me' }],
        } as iConversation;
      }
      return conversation;
    });

    setiConversations(updatediConversations);
    setNewMessage('');
  };

  //SCROLL ABAJO EN NUEVO MENSAJE
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeiConversation?.messages]);

  return (
    <div className="chat-container c-flex h-min-full">
      {/* CONVERSATIONS LIST */}
      <div className="chat-sidebar c-flex c-flex-column gap-1">
        <div className="chat-search c-flex c-flex-items-center gap-1">
          <FaSearch />
          <input
            type="text"
            placeholder="Buscar..."
            className="chat-search-input"
          />
        </div>
        <div className="chat-list c-flex c-flex-column gap-1">
          {conversations.map(c => (
            <div
              key={c.id}
              className={`chat-item c-flex c-flex-items-center gap-1 cursor-pointer ${
                c.id === activeiConversationId ? 'active' : ''
              }`}
              onClick={() => setActiveiConversationId(c.id)}
            >
              <RiUser3Line size={30} />
              <span>{c.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CHAT VENTANA */}
      <div className="chat-window c-flex c-flex-column">
        <div className="chat-messages c-flex c-flex-column gap-1">
          {activeiConversation?.messages.map(msg => (
            <div
              key={msg.id}
              className={`chat-message ${msg.sender === 'me' ? 'me' : 'other'}`}
            >
              {msg.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="chat-input c-flex c-flex-items-center gap-1">
          <input
            type="text"
            placeholder="Escribe un mensaje..."
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
          />
          <button className="btn-send cursor-pointer" onClick={handleSend}>
            <RiSendPlane2Line size={30} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
