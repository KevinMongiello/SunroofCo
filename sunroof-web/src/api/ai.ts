import { requestText } from "./requests";

const AI_PATH = '/ai';

export function sendChat(message: string) {
  return requestText(AI_PATH, {
    method: "POST",
    body: JSON.stringify({ message }),
  });
}