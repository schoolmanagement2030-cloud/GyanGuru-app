// File: script.js

// Gemini AI API Key (User should paste their key here)
const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY";

document.addEventListener("DOMContentLoaded", () => {
    const splash = document.getElementById("splash-screen");
    const authUI = document.getElementById("auth-screen");
    const mainApp = document.getElementById("main-app");
    
    // 1. Splash Screen Timer
    setTimeout(() => {
        splash.style.display = "none";
        checkAuthState();
    }, 4000);

    // 2. Auth Check
    function checkAuthState() {
        auth.onAuthStateChanged(user => {
            if (user) {
                authUI.classList.add("hidden");
                mainApp.classList.remove("hidden");
                loadProfile(user.uid);
            } else {
                authUI.classList.remove("hidden");
                mainApp.classList.add("hidden");
            }
        });
    }

    // 3. Google Login
    document.getElementById("login-btn").onclick = async () => {
        if (!isConfigValid()) {
            alert("Error: Please set your Firebase Config in firebase.js first!");
            return;
        }
        try {
            await auth.signInWithPopup(googleProvider);
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    // 4. Load Profile from Firestore
    async function loadProfile(uid) {
        const doc = await db.collection("profiles").doc(uid).get();
        if (doc.exists) {
            const data = doc.data();
            document.getElementById("student-name-display").innerText = `Hi, ${data.name}! 👋`;
            document.getElementById("student-class-display").innerText = `Class: ${data.class}`;
            document.getElementById("student-points").innerText = data.points || 0;
            
            // Fill input fields in parent view
            document.getElementById("input-name").value = data.name;
            document.getElementById("input-class").value = data.class;
        } else {
            // New user, force parent view to setup
            switchView("Parent");
        }
    }

    // 5. Save Profile
    document.getElementById("save-profile-btn").onclick = async () => {
        const user = auth.currentUser;
        const name = document.getElementById("input-name").value;
        const sClass = document.getElementById("input-class").value;

        if (!name || !sClass) return alert("Bhai, Details toh bhar do!");

        await db.collection("profiles").doc(user.uid).set({
            name: name,
            class: sClass,
            points: 0,
            uid: user.uid
        }, { merge: true });

        alert("Profile Updated! Chalo ab padhte hain.");
        switchView("Student");
        loadProfile(user.uid);
    };

    // 6. View Switcher
    const studentView = document.getElementById("student-view");
    const parentView = document.getElementById("parent-view");
    const studentBtn = document.getElementById("view-student-btn");
    const parentBtn = document.getElementById("view-parent-btn");

    function switchView(view) {
        if (view === "Student") {
            studentView.classList.remove("hidden");
            parentView.classList.add("hidden");
            studentBtn.classList.add("active");
            parentBtn.classList.remove("active");
        } else {
            studentView.classList.add("hidden");
            parentView.classList.remove("hidden");
            studentBtn.classList.remove("active");
            parentBtn.classList.add("active");
        }
    }

    studentBtn.onclick = () => switchView("Student");
    parentBtn.onclick = () => switchView("Parent");

    // 7. AI Chat Logic (Gemini)
    const chatInput = document.getElementById("chat-input");
    const chatContainer = document.getElementById("chat-container");
    const sendBtn = document.getElementById("send-chat-btn");

    async function askAI() {
        const question = chatInput.value.trim();
        if (!question) return;

        // Add user message to UI
        appendMessage("Student", question);
        chatInput.value = "";

        if (GEMINI_API_KEY === "YOUR_GEMINI_API_KEY") {
            appendMessage("AI", "Error: Gemini API Key nahi mili. script.js mein apni key dalein.");
            return;
        }

        appendMessage("AI", "Soch rahi hoon... 🤔");

        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: `Answer in simple Hinglish like a friendly teacher: ${question}` }] }]
                })
            });
            const data = await response.json();
            const aiResponse = data.candidates[0].content.parts[0].text;
            
            // Remove 'thinking' message and add real one
            chatContainer.lastChild.remove();
            appendMessage("AI Guru", aiResponse);

            // Give some points for asking doubts
            updatePoints(5);

        } catch (error) {
            appendMessage("AI", "Server busy hai, thodi der baad try karo.");
        }
    }

    function appendMessage(sender, text) {
        const div = document.createElement("div");
        div.className = `p-4 rounded-2xl shadow-sm border-2 font-bold ${sender === 'Student' ? 'bg-indigo-50 border-indigo-100 ml-8 text-right' : 'bg-white border-purple-50 mr-8 text-left text-slate-700'}`;
        div.innerHTML = `<span class='text-[10px] block opacity-50 uppercase'>${sender}</span> ${text}`;
        chatContainer.appendChild(div);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    async function updatePoints(pts) {
        const user = auth.currentUser;
        if (!user) return;
        await db.collection("profiles").doc(user.uid).update({
            points: firebase.firestore.FieldValue.increment(pts)
        });
        loadProfile(user.uid);
    }

    sendBtn.onclick = askAI;
    chatInput.onkeypress = (e) => { if(e.key === 'Enter') askAI(); };
});
