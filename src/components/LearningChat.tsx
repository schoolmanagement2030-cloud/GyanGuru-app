<div className="flex-1 space-y-4">
              {msg.imageUrl && (
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="relative rounded-2xl overflow-hidden border-4 border-white shadow-2xl max-w-sm mb-4"
                >
                  <img 
                    src={msg.imageUrl} 
                    alt="Academic Attachment" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 right-2 px-2 py-1 bg-black/40 backdrop-blur-md rounded text-[9px] text-white font-bold uppercase tracking-widest">
                    Study Photo
                  </div>
                </motion.div>
              )}
              
              <div className="markdown-body">
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
            </div>
          </div>

          {msg.role === 'model' && (
            <div className="mt-6 pt-4 border-t border-zinc-50 flex items-center justify-between">
               <div className="flex items-center gap-2">
                  <Sparkles className="w-3 h-3 text-blue-400" />
                  <span className="text-[9px] font-black uppercase text-zinc-300 tracking-widest">Narrated by Kore AI</span>
               </div>
               <InteractButton 
                onClick={() => onSpeak(msg.content)}
                className="p-3 bg-zinc-50 hover:bg-zinc-100 text-zinc-400 hover:text-blue-600 rounded-full transition-all border border-zinc-100"
              >
                <Volume2 className="w-4 h-4" />
              </InteractButton>
            </div>
          )}
        </div>
      </motion.div>
    ))}
  </AnimatePresence>

  {isTyping && (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex justify-start"
    >
      <div className="chat-bubble-model py-4 px-6">
        <div className="flex gap-2 items-center">
           <BrainCircuit className="w-4 h-4 text-blue-600 animate-pulse" />
           <div className="flex gap-1.5">
              <span className="w-1.5 h-1.5 bg-blue-200 rounded-full animate-bounce" />
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:0.4s]" />
           </div>
        </div>
      </div>
    </motion.div>
  )}
  
  {/* Spacer to allow scrolling past the floating input */}
  <div className="h-24" />
</div>
