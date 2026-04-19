// File: /src/services/profileService.ts

import { useEffect, useState } from "react";
import { doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase"; // make sure this file exists
import { User } from "firebase/auth";

// ✅ Type تعریف
export interface StudentProfile {
  userId: string;
  name: string;
  classLevel: string;
  preferredLanguage: string;
  learningStyle: string;
  points: number;
  level: number;
  streak: number;
  onboardingComplete: boolean;
  lastActiveAt: string;
}

// ✅ Custom Hook
export const useStudentProfile = (user: User | null) => {
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔥 1. REAL-TIME LISTENER
  useEffect(() => {
    if (!user) return;

    const unsubscribe = onSnapshot(doc(db, "users", user.uid), (docSnap) => {
      if (docSnap.exists()) {
        setProfile(docSnap.data() as StudentProfile);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  // 🔥 2. CREATE PROFILE (Onboarding)
  const createProfile = async (onboardingData: Partial<StudentProfile>) => {
    if (!user) return;

    const newProfile: StudentProfile = {
      userId: user.uid,
      name: user.displayName || "Scholar",
      classLevel: onboardingData.classLevel || "Class 10",
      preferredLanguage: onboardingData.preferredLanguage || "English",
      learningStyle: onboardingData.learningStyle || "Analogy",
      points: 0,
      level: 1,
      streak: 0,
      onboardingComplete: true,
      lastActiveAt: new Date().toISOString(),
    };

    try {
      await setDoc(doc(db, "users", user.uid), newProfile);
      setProfile(newProfile);
    } catch (error) {
      console.error("Error saving profile:", error);
      setProfile(newProfile); // fallback
    }
  };

  // 🔥 3. UPDATE PROFILE
  const updateProfile = async (updates: Partial<StudentProfile>) => {
    if (!user || !profile) return;

    const updatedProfile = { ...profile, ...updates };
    setProfile(updatedProfile);

    try {
      await updateDoc(doc(db, "users", user.uid), updates);
    } catch (error) {
      console.error("Database update failed:", error);
    }
  };

  return {
    profile,
    loading,
    createProfile,
    updateProfile,
  };
};
