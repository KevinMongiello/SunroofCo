import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./ChatBox.css";
import { Bot, MessageCircle, Send, X } from "lucide-react";
import type { ChatBoxMessage } from "./types";

interface ChatBoxProps {
  messages: ChatBoxMessage[];
  sendMessage: (msg: string) => void;
}

export const ChatBox = ({ messages, sendMessage }: ChatBoxProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const widgetRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      const target = e.target as Node;
      if (!widgetRef.current?.contains(target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerdown", onPointerDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [isOpen]);

  useEffect(() => {
    messagesRef.current?.scrollTo({
      top: messagesRef.current.scrollHeight,
      behavior: 'smooth'
    });
  },[messages])

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const text = data.get("user-input") as string;
    if (!text.trim()) return;

    // send to backend
    sendMessage(text);
    form.reset();
  };

  return createPortal(
    <div className="chat-widget" ref={widgetRef}>
      {isOpen && (
        <section className="chatbox">
          <header className="chatbox__header">
            <div className="chatbox__title">
              <Bot size={20} />
              <h2>AI Assistant</h2>
            </div>
            <button
              type="button"
              className="chatbox__close"
              onClick={() => setIsOpen(false)}
            >
              <X size={18} />
            </button>
          </header>
          <div className="chatbox__messages" ref={messagesRef}>
            {messages.map((message) => (
              <div
                className={`chatbox__message chatbox__message--${message.role}`}
                id={message.id}
              >
                {message.content}
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="chatbox__form">
            <input name="user-input" placeholder="Ask AI a question..." />
            <button type="submit" className="chatbox__send">
              <Send size={18} />
            </button>
          </form>
        </section>
      )}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="chat-toggle"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>,
    document.body
  );
};
