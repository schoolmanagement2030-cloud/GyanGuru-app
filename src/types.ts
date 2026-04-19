{/* Animated Scanning Line */}
    {isReady && (
      <motion.div 
        animate={{ top: ["0%", "100%", "0%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 right-0 h-1 bg-cyan-400/50 shadow-[0_0_15px_cyan] z-10 pointer-events-none"
      />
    )}

    {/* Viewfinder Overlay */}
    <div className="absolute inset-0 border-[40px] border-black/40 pointer-events-none flex items-center justify-center">
       <div className="w-full h-full border-2 border-white/20 rounded-2xl relative">
          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-xl" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-xl" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-xl" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-xl" />
       </div>
    </div>

    <InteractButton 
      onClick={onClose}
      className="absolute top-6 right-6 p-4 bg-white/10 hover:bg-white/20 text-white rounded-full z-20 backdrop-blur-md"
    >
      <X className="w-6 h-6" />
    </InteractButton>
  </div>

  <div className="mt-12 flex flex-col items-center gap-8 w-full max-w-md">
    <p className="text-white/60 text-xs font-black uppercase tracking-[0.4em] flex items-center gap-2">
       <Sparkles className="w-4 h-4 text-amber-400" /> Align book text with the frame
    </p>

    <div className="flex items-center gap-10">
      <label className="p-5 bg-white/5 hover:bg-white/10 text-white/40 rounded-full cursor-pointer transition-colors border border-white/5">
        <ImageIcon className="w-8 h-8" />
        <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
      </label>

      <InteractButton 
        onClick={handleCapture}
        disabled={!isReady}
        className="w-24 h-24 bg-white rounded-full flex items-center justify-center border-[8px] border-white/20 shadow-2xl hover:scale-105 active:scale-95 transition-all p-0"
      >
         <div className="w-16 h-16 rounded-full border-4 border-zinc-900" />
      </InteractButton>

      <InteractButton 
        onClick={() => window.location.reload()}
        className="p-5 bg-white/5 text-white/40 rounded-full hover:bg-white/10"
      >
        <RotateCcw className="w-8 h-8" />
      </InteractButton>
    </div>
  </div>
  
  <canvas ref={canvasRef} className="hidden" />
</motion.div>
