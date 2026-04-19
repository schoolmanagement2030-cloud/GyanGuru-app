<motion.aside 
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        exit={{ x: -300 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed inset-y-0 left-0 w-72 border-r border-blue-100 flex flex-col bg-white z-50 shadow-2xl"
      >
        <div className="p-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="font-display font-bold text-2xl tracking-tight text-blue-900 italic">GyanGuru</span>
          </div>
          <InteractButton onClick={onClose} className="p-2 hover:bg-blue-50 rounded-full lg:hidden">
            <X className="w-5 h-5 text-zinc-400" />
          </InteractButton>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => (
            <InteractButton
              key={item.id}
              onClick={() => {
                onViewChange(item.id);
                onClose();
              }}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-[1.5rem] transition-all relative overflow-hidden group ${
                currentView === item.id 
                  ? "bg-blue-600 text-white shadow-xl shadow-blue-100" 
                  : "text-zinc-400 hover:bg-blue-50 hover:text-blue-600"
              }`}
            >
              <item.icon className={`w-5 h-5 ${currentView === item.id ? "animate-pulse" : "group-hover:scale-110 transition-transform"}`} />
              <span className="font-bold text-sm tracking-wide">{item.label}</span>
              {currentView === item.id && (
                <motion.div 
                  layoutId="active-pill"
                  className="absolute right-2 w-1.5 h-1.5 bg-white rounded-full"
                />
              )}
            </InteractButton>
          ))}
        </nav>

        {/* Profile & Upsell Section */}
        <div className="p-6">
          <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-[2rem] border border-blue-100 mb-6 relative overflow-hidden group">
            <div className="relative z-10 flex items-center gap-4 mb-4">
              <img 
                src={user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} 
                className="w-12 h-12 rounded-2xl border-2 border-white shadow-md group-hover:rotate-3 transition-transform" 
                alt="User Avatar"
                referrerPolicy="no-referrer"
              />
              <div className="overflow-hidden">
                <p className="text-sm font-black text-blue-900 truncate">{user.displayName || "Scholar"}</p>
                <p className="text-[10px] text-blue-400 font-bold uppercase truncate">{user.email}</p>
              </div>
            </div>
            <InteractButton 
              onClick={onSignOut}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-zinc-400 hover:text-red-500 hover:bg-red-50 transition-all text-[10px] font-black uppercase tracking-widest rounded-xl bg-white/50 border border-white"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </InteractButton>
            <div className="absolute -right-6 -bottom-6 opacity-5 rotate-12">
               <Star className="w-24 h-24 text-blue-600" />
            </div>
          </div>
          
          <p className="text-[9px] text-center text-zinc-300 font-bold uppercase tracking-[0.4em]">v1.0.0 Production</p>
        </div>
      </motion.aside>
    </>
  )}
</AnimatePresence>
