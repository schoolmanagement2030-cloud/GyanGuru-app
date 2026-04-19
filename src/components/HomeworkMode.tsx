const userMsg: Message = { 
  role: "user", 
  content, 
  imageUrl: overrideImage 
};

const updatedHistory = [...activeLesson.history, userMsg];
setActiveLesson({ ...activeLesson, history: updatedHistory });
setInputText("");
setIsTyping(true);

try {
  const response = await generateTeacherResponse(
    profile, 
    { ...activeLesson, mode: 'homework' }, 
    content, 
    overrideImage
  );
  
  const modelMsg: Message = { 
    role: "model", 
    content: response.text || "Let's check your steps again." 
  };
  
  const finalLesson = { 
    ...activeLesson, 
    history: [...updatedHistory, modelMsg], 
    mode: 'homework' as const, 
    updatedAt: new Date().toISOString() 
  };

  if (response.text) speakText(response.text);
  
  await updateDoc(doc(db, "lessons", activeLesson.id!), finalLesson as any);
  setActiveLesson(finalLesson as any);
} catch (e) {
  console.error("Homework Service Error:", e);
} finally {
  setIsTyping(false);
}
