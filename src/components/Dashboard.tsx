{/* 1. Gamification Stats Header */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    <motion.div 
       initial={{ opacity: 0, y: 20 }}
       animate={{ opacity: 1, y: 0 }}
       className="bg-white p-6 rounded-[2.5rem] border border-zinc-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow"
    >
      <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center">
        <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
      </div>
      <div>
        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Global Rank</p>
        <p className="text-xl font-bold text-blue-900">{profile.points} Points</p>
      </div>
    </motion.div>

    <motion.div 
       initial={{ opacity: 0, y: 20 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ delay: 0.1 }}
       className="bg-white p-6 rounded-[2.5rem] border border-zinc-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow"
    >
      <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
        <Trophy className="w-6 h-6 text-blue-600" />
      </div>
      <div>
        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Current Level</p>
        <p className="text-xl font-bold text-blue-900">Level {profile.level}</p>
      </div>
    </motion.div>

    <motion.div 
       initial={{ opacity: 0, y: 20 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ delay: 0.2 }}
       className="bg-white p-6 rounded-[2.5rem] border border-zinc-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow"
    >
      <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center">
        <Flame className="w-6 h-6 text-orange-500 fill-orange-500" />
      </div>
      <div>
        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Study Streak</p>
        <p className="text-xl font-bold text-blue-900">{profile.streak} Days</p>
      </div>
    </motion.div>
  </div>

  {/* 2. Main Performance Chart Section */}
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
    <div className="lg:col-span-2 bg-white border border-zinc-100 rounded-[3rem] p-8 shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl font-serif italic font-bold text-zinc-900">Weekly Performance</h3>
          <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mt-1">Academy Growth Trend</p>
        </div>
        <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full border border-green-100">
           <TrendingUp className="w-4 h-4 text-green-600" />
           <span className="text-xs font-bold text-green-700">+12% Mastery</span>
        </div>
      </div>

      {/* CHART FIX: Parent container with fixed height requirement */}
      <div style={{ width: "100%", height: "300px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={MOCK_PERFORMANCE}>
            <defs>
              <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
            <Tooltip 
              contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 10px 30px -5px rgb(0 0 0 / 0.1)', padding: '15px' }}
            />
            <Area 
              type="monotone" 
              dataKey="score" 
              stroke="#2563eb" 
              strokeWidth={4} 
              fillOpacity={1} 
              fill="url(#colorScore)" 
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>

    {/* 3. Action Center */}
    <div className="bg-zinc-900 rounded-[3rem] p-10 text-white relative overflow-hidden flex flex-col justify-between shadow-2xl">
      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6">
          <Sparkles className="w-3 h-3 text-amber-400" /> Pro Tutor Active
        </div>
        <h2 className="text-4xl font-bold mb-6 font-serif italic leading-tight">Master your {profile.classLevel} syllabus.</h2>
        <p className="text-zinc-400 font-medium mb-12">I have prepared 5 new lessons based on your weak topics from yesterday.</p>
      </div>
      
      <div className="space-y-4 relative z-10">
        <button 
          onClick={() => onStartLesson()}
          className="w-full flex items-center justify-center gap-3 bg-white text-zinc-900 px-8 py-4 rounded-3xl font-bold hover:bg-zinc-100 transition-all text-sm h-14"
        >
          <Play className="w-5 h-5 fill-current" />
          Start Study Mode
        </button>
        <button 
          onClick={() => onStartLesson('homework-check')}
          className="w-full flex items-center justify-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-3xl font-bold hover:bg-blue-500 transition-all text-sm h-14 border-b-4 border-blue-800"
        >
          <Camera className="w-5 h-5" />
          Check Homework
        </button>
      </div>

      {/* Background Decorations */}
      <div className="absolute -right-20 -top-20 w-80 h-80 bg-blue-500/20 rounded-full blur-[100px]" />
      <div className="absolute right-6 bottom-40 opacity-5 -rotate-12 pointer-events-none">
        <GraduationCap className="w-64 h-64" />
      </div>
    </div>
  </div>

  {/* 4. Topic Breakdown Grid (Strong vs Weak) */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    
    {/* Strong Topics - Green UI */}
    <section className="bg-green-50/50 border border-green-100 rounded-[3rem] p-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center shadow-inner">
          <CheckCircle2 className="w-6 h-6 text-green-600" />
        </div>
        <div>
          <h3 className="text-xl font-serif italic font-bold text-green-900">Strong Topics</h3>
          <p className="text-[10px] text-green-500 font-bold uppercase tracking-widest">Mastery Level: High</p>
        </div>
      </div>

      <div className="space-y-4">
        {MOCK_STRONG_TOPICS.map((topic) => (
          <motion.div 
            key={topic.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-5 rounded-3xl shadow-sm border border-green-50 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center font-bold text-green-600 text-xs">
                {topic.subjectId.charAt(0)}
              </div>
              <div>
                <h4 className="font-bold text-zinc-900">{topic.topicName}</h4>
                <p className="text-[10px] font-bold text-zinc-400 uppercase">{topic.subjectId} • {topic.bookName}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-black text-green-600">{topic.averageScore}%</p>
              <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-tighter">Certified</p>
            </div>
          </motion.div>
        ))}
        <button className="w-full py-4 text-xs font-black uppercase text-green-600 tracking-widest hover:bg-green-100/50 rounded-2xl transition-colors">
          Manage Mastery
        </button>
      </div>
    </section>

    {/* Weak Topics - Amber UI */}
    <section className="bg-amber-50/50 border border-amber-100 rounded-[3rem] p-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center shadow-inner">
          <AlertTriangle className="w-6 h-6 text-amber-600" />
        </div>
        <div>
          <h3 className="text-xl font-serif italic font-bold text-amber-900">Focus Required</h3>
          <p className="text-[10px] text-amber-500 font-bold uppercase tracking-widest">Mastery Level: Improving</p>
        </div>
      </div>

      <div className="space-y-4">
        {MOCK_WEAK_TOPICS.map((topic) => (
          <motion.div 
            key={topic.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-5 rounded-3xl shadow-sm border border-amber-50 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center font-bold text-amber-600 text-xs text-center leading-none">
                {topic.subjectId.charAt(0)}
              </div>
              <div>
                <h4 className="font-bold text-zinc-900">{topic.topicName}</h4>
                <p className="text-[10px] font-bold text-zinc-400 uppercase">{topic.subjectId} • {topic.bookName}</p>
              </div>
            </div>
            <button 
              onClick={() => onStartLesson(topic.id)}
              className="px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-700 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
            >
              Brush Up
            </button>
          </motion.div>
        ))}
        <div className="bg-amber-100/30 p-4 rounded-3xl border border-dashed border-amber-200 text-center">
          <p className="text-[10px] font-bold text-amber-600 italic">"Mistakes are the portals of discovery." – James Joyce</p>
        </div>
      </div>
    </section>

  </div>

  {/* 5. Revision Feed / Recent Activity */}
  <div className="bg-white border border-zinc-100 rounded-[3rem] p-10 shadow-sm">
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-3">
         <History className="w-6 h-6 text-blue-600" />
         <h3 className="text-2xl font-serif italic font-bold">Recent Academy History</h3>
      </div>
      <p className="text-blue-600 font-bold text-xs uppercase tracking-widest cursor-pointer hover:underline">Full History</p>
    </div>
    
    <div className="space-y-6">
      <div className="flex items-start gap-6 pb-6 border-b border-zinc-50 relative">
         <div className="absolute left-3 top-10 bottom-0 w-px bg-zinc-100" />
         <div className="w-6 h-6 rounded-full bg-blue-100 border-4 border-white z-10 shadow-sm" />
         <div className="flex-1">
            <p className="text-[10px] font-bold text-zinc-400 uppercase">Today • 10:45 AM</p>
            <h4 className="font-bold text-zinc-900">Finished "Cell Biology" Part 1</h4>
            <p className="text-sm text-zinc-500 mt-1">Gained 45 Mastery Points and completed 3 concept tests.</p>
         </div>
         <ArrowRight className="w-5 h-5 text-zinc-300" />
      </div>

      <div className="flex items-start gap-6">
         <div className="w-6 h-6 rounded-full bg-zinc-100 border-4 border-white z-10 shadow-sm" />
         <div className="flex-1">
            <p className="text-[10px] font-bold text-zinc-400 uppercase">Yesterday • 4:20 PM</p>
            <h4 className="font-bold text-zinc-900">Homework Checked: Algebraic Expressions</h4>
            <p className="text-sm text-zinc-500 mt-1">Identified 2 minor calculation gaps in polynomial addition.</p>
         </div>
         <ArrowRight className="w-5 h-5 text-zinc-300" />
      </div>
    </div>
  </div>

</div>
