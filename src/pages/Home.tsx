<main className="flex-1 relative overflow-y-auto pt-16">
    {/* Global Academy Header */}
    <div className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-blue-100 flex items-center px-6 z-30 backdrop-blur-md">
      <InteractButton 
        onClick={() => setIsSidebarOpen(true)}
        className="p-2 -ml-2 hover:bg-blue-50 rounded-full transition-colors"
      >
        <Menu className="w-6 h-6 text-blue-600" />
      </InteractButton>
      <div className="flex items-center gap-3 ml-4">
        <GraduationCap className="w-8 h-8 text-blue-600" />
        <span className="font-display font-bold text-xl tracking-tight text-blue-900">GyanGuru</span>
      </div>
    </div>

    <AnimatePresence mode="wait">
      {/* Dashboard View: Performance Tracking & Recommendations */}
      {currentView === "dashboard" && (
        <motion.div
          key="dashboard"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, y: -10 }}
          className="h-full"
        >
          <Dashboard profile={profile} onStartLesson={handleStartLesson} />
        </motion.div>
      )}

      {/* Learning View: Book-wise Structured Teaching */}
      {currentView === "learn" && (
        <motion.div
          key="learn"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="h-full"
        >
          <LearningMode 
            profile={profile} 
            initialLesson={activeLesson} 
            onUpdateProfile={onUpdateProfile}
            onSwitchToHomework={() => switchModes("homework")}
          />
        </motion.div>
      )}

      {/* Homework View: Step-by-Step Notebook Auditing */}
      {currentView === "homework" && (
        <motion.div
          key="homework"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="h-full"
        >
          <HomeworkMode 
            profile={profile} 
            initialLesson={activeLesson} 
            onUpdateProfile={onUpdateProfile}
            onSwitchToLearning={() => switchModes("learn")}
          />
        </motion.div>
      )}

      {/* Settings View: Account Personalization */}
      {currentView === "settings" && (
        <div className="p-8 max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-500">
          <h1 className="text-3xl font-bold mb-8 italic font-serif text-zinc-900 border-b pb-4">Profile Settings</h1>
          <div className="bg-white rounded-[2.5rem] p-10 border border-zinc-200 shadow-xl shadow-zinc-100">
            <div className="space-y-8">
              <div className="flex items-center justify-between p-6 bg-zinc-50 rounded-3xl border border-zinc-100">
                <div>
                  <label className="block text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Academic Grade</label>
                  <p className="font-black text-xl text-blue-900">{profile.classLevel}</p>
                </div>
                <GraduationCap className="w-8 h-8 text-blue-100" />
              </div>
              
              <div className="flex items-center justify-between p-6 bg-zinc-50 rounded-3xl border border-zinc-100">
                <div>
                  <label className="block text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Native Language</label>
                  <p className="font-black text-xl text-blue-900">{profile.preferredLanguage}</p>
                </div>
                <SettingsIcon className="w-8 h-8 text-blue-100" />
              </div>
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>
  </main>
</div>
