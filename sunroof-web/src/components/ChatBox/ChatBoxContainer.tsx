import { useEffect, useState } from "react";
import { ChatBox } from "./ChatBox";
import { ChatBoxMessageRoles } from "../../types/chat";
import type { ChatBoxMessage } from "../../types/chat";
import { sendChat } from "../../api/ai";

const defaultMsg = {
  id: "123",
  role: ChatBoxMessageRoles.NOTIFICATION,
  content:
    'Hi there, what can I help you with? You can say something like "Which projects are currently active?" or "Summarize the next 3 upcoming scheduled tickets"',
};

export const ChatBoxContainer = () => {
  const [messages, setMessages] = useState<ChatBoxMessage[]>([defaultMsg]);
  const [isLoading, setIsLoading] = useState(false);

  const addMessage = (message: Omit<ChatBoxMessage, "id">) => {
    const idPrefix =
      message.role === ChatBoxMessageRoles.LOADING ? "loading-" : "";
    setMessages(msgs => [
      ...msgs,
      {
        ...message,
        id: `${idPrefix}${crypto.randomUUID()}`,
      },
    ]);
  };

  useEffect(() => {
    if (isLoading) {
      addMessage({
        role: ChatBoxMessageRoles.LOADING,
        content: "loading",
      });
    } else {
      setMessages(msgs => msgs.filter(msg => !msg.id.startsWith('loading')))
    }
  }, [isLoading]);

  const createUserMessage = async (msg: string) => {
    setIsLoading(true);
    addMessage({
      role: ChatBoxMessageRoles.USER,
      content: msg,
    });
    try {
      const reply = await sendChat(msg);
      addMessage({
        role: ChatBoxMessageRoles.ASSISTANT,
        content: reply,
      });
    } catch (err) {
      console.error(err);
      addMessage({
        role: ChatBoxMessageRoles.ERROR,
        content: 'AI Assistant unavailable, please try again later.'
      })
    } finally {
      setIsLoading(false);
    }
  };

  return <ChatBox sendMessage={createUserMessage} messages={messages} />;
};
