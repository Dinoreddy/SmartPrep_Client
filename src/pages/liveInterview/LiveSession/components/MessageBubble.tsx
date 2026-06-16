import React from "react";

interface MessageBubbleProps {
  role: "ai" | "user";
  text: string;
  isTyping?: boolean;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  role,
  text,
  isTyping = false,
}) => {
  const isAI = role === "ai";

  if (isAI) {
    return (
      <div className="w-full flex justify-start animate-fade-in-up">
        <div className="flex gap-4 max-w-2xl group">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
            <span className="material-symbols-outlined text-primary text-xl">
              smart_toy
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-primary ml-1">
              SmartPrep AI
            </span>
            <div className="bg-white p-5 rounded-2xl rounded-tl-sm shadow-sm ring-1 ring-slate-900/5">
              <p className="text-slate-800 text-lg leading-relaxed">
                {text}
                {isTyping && (
                  <span className="inline-block w-1.5 h-4 ml-1 bg-primary animate-pulse align-middle"></span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-end animate-fade-in-up delay-100">
      <div className="flex flex-row-reverse gap-4 max-w-2xl group">
        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center shrink-0 mt-1 overflow-hidden">
          {/* using a placeholder avatar icon since user image might not be available */}
          <span className="material-symbols-outlined text-slate-500">
            person
          </span>
        </div>
        <div className="flex flex-col gap-1 items-end">
          <span className="text-sm font-medium text-slate-500 mr-1">You</span>
          <div className="bg-primary text-white p-5 rounded-2xl rounded-tr-sm shadow-md shadow-primary/20">
            <p className="text-lg leading-relaxed font-light">{text}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
