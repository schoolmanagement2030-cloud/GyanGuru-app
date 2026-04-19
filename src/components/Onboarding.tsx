{step === 2 && (
        <div className="space-y-10">
          <div className="w-16 h-16 bg-purple-600 rounded-[1.5rem] flex items-center justify-center shadow-xl shadow-purple-200">
            <Languages className="w-10 h-10 text-white" />
          </div>
          <div className="space-y-4">
            <h2 className="text-5xl font-display font-black leading-tight">Prefer <span className="text-purple-600">Language</span>?</h2>
            <p className="text-zinc-400 font-medium">I can teach you in several native languages.</p>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {["English", "Hindi", "Hinglish"].map(lang => (
              <InteractButton
                key={lang}
                onClick={() => setData({ ...data, preferredLanguage: lang })}
                className={`p-6 rounded-3xl border-2 font-bold text-lg text-left px-8 flex justify-between items-center transition-all ${
                  data.preferredLanguage === lang ? "bg-purple-600 text-white border-purple-600 shadow-xl" : "bg-white border-zinc-100 text-zinc-500 hover:border-purple-200"
                }`}
              >
                {lang}
                <div className={`w-3 h-3 rounded-full ${data.preferredLanguage === lang ? "bg-white" : "bg-zinc-100"}`} />
              </InteractButton>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <InteractButton onClick={() => setStep(1)} className="py-6 bg-zinc-100 text-zinc-500 rounded-3xl font-bold">Back</InteractButton>
            <InteractButton onClick={() => onComplete(data)} className="py-6 bg-zinc-900 text-white rounded-3xl font-bold flex items-center justify-center gap-4">
               Finish <Sparkles className="w-5 h-5" />
            </InteractButton>
          </div>
        </div>
      )}
    </motion.div>
  </AnimatePresence>
</div>
