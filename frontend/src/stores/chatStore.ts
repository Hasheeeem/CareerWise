import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface Message {
  id: string
  content: string
  sender_type: 'user' | 'assistant'
  created_at: string
  metadata?: any
}

interface ChatState {
  messages: Message[]
  currentConversationId: string | null
  isLoading: boolean
  isTyping: boolean
  
  // Actions
  addMessage: (message: Message) => void
  setMessages: (messages: Message[]) => void
  setCurrentConversation: (id: string) => void
  setLoading: (loading: boolean) => void
  setTyping: (typing: boolean) => void
  clearMessages: () => void
}

export const useChatStore = create<ChatState>()(
  devtools(
    persist(
      (set, get) => ({
        messages: [],
        currentConversationId: null,
        isLoading: false,
        isTyping: false,
        
        addMessage: (message) =>
          set((state) => ({
            messages: [...state.messages, message]
          })),
        
        setMessages: (messages) => set({ messages }),
        
        setCurrentConversation: (id) =>
          set({ currentConversationId: id }),
        
        setLoading: (loading) => set({ isLoading: loading }),
        
        setTyping: (typing) => set({ isTyping: typing }),
        
        clearMessages: () => set({ messages: [] }),
      }),
      {
        name: 'chat-storage',
        partialize: (state) => ({
          currentConversationId: state.currentConversationId
        })
      }
    )
  )
)