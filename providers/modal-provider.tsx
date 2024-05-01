"use client";

import { useEffect, useState } from "react";

// import { SelectChatModal } from "@/components/modals/select-chat-modal";
export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <>{/* <SelectChatModal /> */}</>;
};
