import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, AlertCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function QnASearch() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! I am the SOTL Transformer Oil Standards Expert. I can answer questions about specifications, test methods, maintenance limits, and technical differences between Mineral Oil, Synthetic Ester, and Natural Ester fluids. How can I help you today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input.trim() };
    const newMessages = [...messages, userMessage];
    
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) {
        let errMessage = `Error ${response.status}: ${response.statusText}`;
        try {
          const errData = await response.json();
          if (errData && errData.error) errMessage += ` - ${errData.error}`;
        } catch(e) {
          try {
            const errText = await response.text();
            errMessage += ` - ${errText.substring(0, 100)}`;
          } catch(e2) {}
        }
        throw new Error(errMessage);
      }

      const data = await response.json();
      
      setMessages([...newMessages, { role: 'assistant', content: data.text }]);
    } catch (err) {
      console.error('Chat error:', err);
      setError(err.message);
      // Remove the user's message if it failed, so they can try again
      setMessages(messages);
      setInput(userMessage.content);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="qna-page" style={{ height: 'calc(100vh - 100px)', display: 'flex', flexDirection: 'column', maxWidth: '1000px', margin: '0 auto' }}>
      <div className="page-header" style={{ textAlign: 'center', marginBottom: '20px', flexShrink: 0 }}>
        <h2>SOTL Standards Expert</h2>
        <p>AI-Powered Chat Assistant for Transformer Fluids</p>
      </div>

      <div style={{ flexGrow: 1, backgroundColor: '#fff', borderRadius: '12px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.04)' }}>
        
        {/* Chat History Area */}
        <div style={{ flexGrow: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {messages.map((msg, idx) => (
            <div key={idx} style={{ display: 'flex', gap: '16px', flexDirection: msg.role === 'user' ? 'row-reverse' : 'row' }}>
              
              <div style={{ 
                width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                backgroundColor: msg.role === 'user' ? 'var(--sdo-astm)' : 'var(--sdo-iec)',
                color: 'white'
              }}>
                {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
              </div>

              <div style={{ 
                maxWidth: '80%', padding: '16px', borderRadius: '12px',
                backgroundColor: msg.role === 'user' ? '#f0f4f8' : '#fff',
                border: msg.role === 'user' ? 'none' : '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                boxShadow: msg.role === 'user' ? 'none' : '0 2px 8px rgba(0,0,0,0.02)'
              }} className="markdown-body">
                {msg.role === 'user' ? (
                  <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{msg.content}</p>
                ) : (
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {msg.content}
                  </ReactMarkdown>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div style={{ display: 'flex', gap: '16px', flexDirection: 'row' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, backgroundColor: 'var(--sdo-iec)', color: 'white' }}>
                <Bot size={20} />
              </div>
              <div style={{ padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)', backgroundColor: '#fff', display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-muted)' }}>
                <Loader2 className="animate-spin" size={18} />
                <span>Scanning standards database...</span>
              </div>
            </div>
          )}

          {error && (
            <div style={{ padding: '16px', backgroundColor: '#fee2e2', color: '#b91c1c', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '12px', margin: '0 auto' }}>
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div style={{ padding: '16px 24px', backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '12px' }}>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about BDV, Acidity, Ester differences, etc..."
              disabled={isLoading}
              style={{ flexGrow: 1, padding: '14px 20px', borderRadius: '24px', border: '1px solid var(--border-color)', fontSize: '1rem', outline: 'none' }}
            />
            <button 
              type="submit" 
              disabled={isLoading || !input.trim()}
              style={{ 
                backgroundColor: input.trim() && !isLoading ? 'var(--sdo-iec)' : 'var(--border-color)', 
                color: 'white', border: 'none', borderRadius: '24px', padding: '0 24px', cursor: input.trim() && !isLoading ? 'pointer' : 'not-allowed',
                display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 500, transition: 'background-color 0.2s'
              }}
            >
              <Send size={18} />
              <span>Send</span>
            </button>
          </form>
          <div style={{ textAlign: 'center', marginTop: '12px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            AI Assistant powered by Google Gemini 1.5 Flash. Engineering answers are generated from SOTL's trusted database.
          </div>
        </div>

      </div>
    </div>
  );
}
