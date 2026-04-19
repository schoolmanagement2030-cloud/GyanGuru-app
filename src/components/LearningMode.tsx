const newLesson: LessonProgress = {
  userId: profile.userId,
  subjectId: selectedSubject.id,
  bookName: selectedBook.name,
  lessonName: topicName,
  topicId: topicName.toLowerCase().replace(/\s/g, "-"),
  topicName,
  status: "teaching",
  currentConceptIndex: 0,
  understandingConfirmed: false,
  explanationProvided: false,
  teachingStyle: "analogy",
  mode: "learning",
  history: [
    { 
      role: "model", 
      content: `Pranam Teacher! I'm GyanGuru. I'm excited to teach you **${topicName}** from your **${selectedBook.name}** book today. Let's start with a simple hook!`,
      type: "motivation"
    }
  ],
  updatedAt: new Date().toISOString()
};

setIsTyping(true);
setErrorStatus(null);
try {
  const response = await generateTeacherResponse(profile, newLesson, "Let's start the academic session.");
  
  newLesson.history.push({ 
    role: "model", 
    content: response.text || "Let's begin with the first concept.",
    type: "explanation"
  });
  
  // Auto-voice the response
  if (response.text) speakText(response.text);
  if (response.emotionDetected) setEmotion(response.emotionDetected);

  const docRef = await addDoc(collection(db, "lessons"), newLesson);
  setActiveLesson({ ...newLesson, id: docRef.id });
} catch (err) {
  setErrorStatus("Connection error. The School System is busy. Please try again.");
} finally {
  setIsTyping(false);
}
