/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  User as FirebaseUser 
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "./lib/firebase";
import { motion } from "motion/react";
import { GraduationCap } from "lucide-react";

// Types
import { StudentProfile } from "./types";

// Components
import Landing from "./components/Landing";
import Onboarding from "./components/Onboarding";
import Home from "./pages/Home";

/**
 * File: /src/App.tsx
 * 
 * Root Component for GyanGuru AI Tutor.
 * Manages:
 * 1. Global Authentication State (Firebase Auth)
 * 2. Student Profile Initialization & Persistence (Cloud Firestore)
 * 3. Application Routing (Landing -> Onboarding -> Home)
 */

export default function App() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);

  /**
   * Listen for Authentication State changes.
   * On Login: Fetch the student profile from Firestore.
   */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (activeUser) => {
      setUser(activeUser);
      
      if (activeUser) {
        try {
          const docRef = doc(db, "users", activeUser.uid);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            setProfile(docSnap.data() as StudentProfile);
          } else {
            // Profile doesn't exist yet, user will go to Onboarding
            setProfile(null);
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
          setProfile(null);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  /**
   * Handle Google Sign-In
   */
  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };

  /**
   * Handle Logout
   */
  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  /**
   * Finalize Onboarding and save profile to Firestore
   */
  const completeOnboarding = async (onboardingData: Partial<StudentProfile>) => {
    if (!user) return;

    const newProfile: StudentProfile = {
      userId: user.uid,
      classLevel: onboardingData.classLevel || "Class 10",
      preferredLanguage: onboardingData.preferredLanguage || "English",
      learningStyle: onboardingData.learningStyle || "Analogy",
      points: 0,
      xp: 0,
      level: 1,
      streak: 0,
      totalLessonsCompleted: 0,
      badges: [],
      mistakeHistory: [],
      weakAreas: [],
      onboardingComplete: true,
      lastActiveAt: new Date().toISOString()
    };

    try {
      await setDoc(doc(db, "users", user.uid), newProfile);
      setProfile(newProfile);
    } catch (error) {
      console.error("Error saving profile:", error);
      setProfile(newProfile); // Fallback local update
    }
  };

  /**
   * Update profile state globally and sync with database
   */
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

  /**
   * Global Loading State
   */
  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-zinc-50">
        <div className="relative">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-24 h-24 border-4 border-blue-600 border-t-transparent rounded-full shadow-2xl shadow-blue-100"
          />
          <GraduationCap className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 text-blue-600" />
        </div>
        <p className="mt-8 text-zinc-400 font-black text-xs uppercase tracking-[0.4em] animate-pulse">
           Academy System Powering up...
        </p>
      </div>
    );
  }

  /**
   * 1. Public View: Landing Page
   */
  if (!user) {
    return <Landing onSignIn={handleSignIn} />;
  }

  /**
   * 2. Protected View: Onboarding (Class/Mode Selection)
   */
  if (!profile || !profile.onboardingComplete) {
    return (
      <Onboarding 
        user={user} 
        onComplete={completeOnboarding} 
      />
    );
  }

  /**
   * 3. Main Application View: Home (Dashboard / Learn / Homework)
   */
  return (
    <Home 
      profile={profile} 
      onUpdateProfile={updateProfile} 
      onSignOut={handleSignOut}
      user={{
        uid: user.uid,
        email: user.email || "",
        displayName: user.displayName || "Scholar",
        photoURL: user.photoURL || undefined
      }}
    />
  );
}
