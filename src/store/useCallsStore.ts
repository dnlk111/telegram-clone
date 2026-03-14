import { create } from "zustand";

export type CallType = "voice" | "video";
export type CallDirection = "incoming" | "outgoing";
export type CallStatus = "completed" | "missed" | "declined";

export interface CallItem {
  id: string;
  userId: string;
  userName: string;
  type: CallType;
  direction: CallDirection;
  status: CallStatus;
  duration?: number;
  startedAt: number;
}

type CallsState = {
  calls: CallItem[];
  incomingCall: CallItem | null;
  setIncomingCall: (call: CallItem | null) => void;
  acceptCall: (id: string) => void;
  declineCall: (id: string) => void;
  addCompletedCall: (call: Omit<CallItem, "id" | "startedAt">) => void;
};

const now = Date.now();
const MOCK_CALLS: CallItem[] = [
  { id: "1", userId: "2", userName: "Alex", type: "voice", direction: "outgoing", status: "completed", duration: 120, startedAt: now - 3600000 },
  { id: "2", userId: "4", userName: "Kate", type: "video", direction: "incoming", status: "missed", startedAt: now - 86400000 },
  { id: "3", userId: "2", userName: "Alex", type: "voice", direction: "incoming", status: "completed", duration: 45, startedAt: now - 172800000 },
];

export const useCallsStore = create<CallsState>((set) => ({
  calls: MOCK_CALLS,
  incomingCall: null,

  setIncomingCall: (call) => set({ incomingCall: call }),

  acceptCall: (id) => {
    set((s) => {
      if (s.incomingCall?.id !== id) return s;
      return { incomingCall: null, calls: [{ ...s.incomingCall, status: "completed" as const }, ...s.calls] };
    });
  },

  declineCall: (id) => {
    set((s) => {
      if (s.incomingCall?.id !== id) return s;
      return { incomingCall: null, calls: [{ ...s.incomingCall, status: "declined" as const }, ...s.calls] };
    });
  },

  addCompletedCall: (call) =>
    set((s) => ({
      calls: [
        { ...call, id: `c_${Date.now()}`, startedAt: Date.now() },
        ...s.calls,
      ],
    })),
}));
