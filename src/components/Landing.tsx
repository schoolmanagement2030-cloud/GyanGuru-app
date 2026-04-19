<motion.h1 
     initial={{ opacity: 0, y: 20 }}
     animate={{ opacity: 1, y: 0 }}
     className="text-7xl md:text-8xl font-display font-black leading-[1.05] tracking-tight text-zinc-900"
   >
     Your Personal <span className="text-blue-600 italic">Super</span> Teacher.
   </motion.h1>

   <motion.p 
     initial={{ opacity: 0, y: 20 }}
     animate={{ opacity: 1, y: 0 }}
     transition={{ delay: 0.1 }}
     className="text-xl text-zinc-500 max-w-xl leading-relaxed font-medium"
   >
     Master any subject from Class 1 to 12. Using NCERT mapping, GyanGuru teaches you via conversation, voice, and notebook analysis until your understanding is 100%.
   </motion.p>

   <motion.div 
     initial={{ opacity: 0, y: 40 }}
     animate={{ opacity: 1, y: 0 }}
     transition={{ delay: 0.2 }}
     className="flex flex-col sm:flex-row gap-6"
   >
     <InteractButton 
       onClick={onSignIn}
       className="px-12 py-6 bg-blue-600 text-white rounded-[2rem] text-xl font-bold hover:scale-105 active:scale-95 transition-all shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] flex items-center gap-4 group"
     >
       Start Free Study <ArrowRight className="group-hover:translate-x-2 transition-transform" />
     </InteractButton>
     <InteractButton className="px-10 py-6 bg-zinc-50 text-zinc-500 rounded-[2rem] text-xl font-bold hover:bg-zinc-100 transition-all flex items-center gap-4">
       <Play className="w-6 h-6 fill-current text-zinc-400" /> Watch Demo
     </InteractButton>
   </motion.div>

   <div className="pt-10 flex gap-8 items-center grayscale opacity-40">
     <div className="flex items-center gap-2 font-black text-sm uppercase tracking-tighter">
        <CheckCircle className="w-4 h-4" /> NCERT Aligned
     </div>
     <div className="flex items-center gap-2 font-black text-sm uppercase tracking-tighter">
        <CheckCircle className="w-4 h-4" /> CBSE/ICSE Ready
     </div>
   </div>
 </section>

 <motion.div 
   initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
   animate={{ opacity: 1, scale: 1, rotate: -2 }}
   className="relative hidden lg:block"
 >
   <div className="absolute inset-0 bg-blue-600 rounded-[4rem] blur-[120px] opacity-10 animate-pulse" />
   <img 
     src="https://picsum.photos/seed/tutoring/1200/1200" 
     className="w-full h-auto rounded-[4rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] border-[16px] border-white relative z-10"
     alt="Study Visualization"
   />
   <div className="absolute -bottom-10 -right-10 bg-white p-8 rounded-[3rem] shadow-2xl z-20 border border-zinc-100 flex items-center gap-6 animate-bounce">
      <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center text-white text-3xl font-bold italic">
        98%
      </div>
      <div>
         <p className="font-black text-zinc-400 uppercase text-[10px] tracking-widest">Mastery Rate</p>
         <p className="font-serif italic font-black text-xl">Top Quality AI Tutoring</p>
      </div>
   </div>
 </motion.div>
