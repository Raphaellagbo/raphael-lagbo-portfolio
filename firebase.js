// Firebase Configuration and Initialization
class FirebaseManager {
    constructor() {
        this.app = null;
        this.auth = null;
        this.database = null;
        this.currentUser = null;
        this.initialized = false;
    }

    // Initialize Firebase with the provided configuration
    init() {
        try {
            // Firebase configuration using the provided URL and API key
            const firebaseConfig = {
                apiKey: "ImeVBHTF8NLh9v5XlMFH7CnMq3SoBVLnMXUwMvV3",
                authDomain: "m-learning-acbfc.firebaseapp.com",
                databaseURL: "https://m-learning-acbfc-default-rtdb.firebaseio.com",
                projectId: "m-learning-acbfc",
                storageBucket: "m-learning-acbfc.appspot.com",
                messagingSenderId: "123456789",
                appId: "1:123456789:web:abcdef123456"
            };

            // Initialize Firebase
            this.app = firebase.initializeApp(firebaseConfig);
            this.auth = firebase.auth();
            this.database = firebase.database();
            
            // Set up authentication state listener
            this.auth.onAuthStateChanged((user) => {
                this.currentUser = user;
                if (window.authStateChanged) {
                    window.authStateChanged(user);
                }
            });

            this.initialized = true;
            console.log('Firebase initialized successfully');
            return true;
        } catch (error) {
            console.error('Firebase initialization error:', error);
            this.showError('Failed to initialize Firebase. Please check your connection.');
            return false;
        }
    }

    // Google Sign-In
    async signInWithGoogle() {
        try {
            if (!this.initialized) {
                throw new Error('Firebase not initialized');
            }

            const provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope('email');
            provider.addScope('profile');

            const result = await this.auth.signInWithPopup(provider);
            const user = result.user;

            // Store user data in database
            await this.storeUserData(user);
            
            this.showSuccess('Successfully signed in with Google!');
            return user;
        } catch (error) {
            console.error('Google sign-in error:', error);
            if (error.code === 'auth/popup-closed-by-user') {
                this.showError('Sign-in cancelled by user');
            } else if (error.code === 'auth/popup-blocked') {
                this.showError('Popup blocked. Please allow popups for this site.');
            } else {
                this.showError('Failed to sign in with Google. Please try again.');
            }
            throw error;
        }
    }

    // Email/Password Sign-In
    async signInWithEmail(email, password) {
        try {
            if (!this.initialized) {
                throw new Error('Firebase not initialized');
            }

            const result = await this.auth.signInWithEmailAndPassword(email, password);
            const user = result.user;

            await this.storeUserData(user);
            this.showSuccess('Successfully signed in!');
            return user;
        } catch (error) {
            console.error('Email sign-in error:', error);
            let errorMessage = 'Failed to sign in. Please try again.';
            
            switch (error.code) {
                case 'auth/user-not-found':
                    errorMessage = 'No account found with this email.';
                    break;
                case 'auth/wrong-password':
                    errorMessage = 'Incorrect password.';
                    break;
                case 'auth/invalid-email':
                    errorMessage = 'Invalid email address.';
                    break;
                case 'auth/too-many-requests':
                    errorMessage = 'Too many failed attempts. Please try again later.';
                    break;
            }
            
            this.showError(errorMessage);
            throw error;
        }
    }

    // Demo Login (creates a demo user session)
    async demoLogin() {
        try {
            // Create a demo user object
            const demoUser = {
                uid: 'demo-user-123',
                email: 'demo@example.com',
                displayName: 'Demo Student',
                photoURL: null,
                isDemo: true
            };

            // Set demo user as current user
            this.currentUser = demoUser;
            
            // Generate demo performance data
            await this.generateDemoData(demoUser.uid);
            
            // Trigger auth state change
            if (window.authStateChanged) {
                window.authStateChanged(demoUser);
            }

            this.showSuccess('Demo mode activated!');
            return demoUser;
        } catch (error) {
            console.error('Demo login error:', error);
            this.showError('Failed to start demo mode.');
            throw error;
        }
    }

    // Sign Out
    async signOut() {
        try {
            if (this.currentUser && this.currentUser.isDemo) {
                // Handle demo user logout
                this.currentUser = null;
                if (window.authStateChanged) {
                    window.authStateChanged(null);
                }
            } else if (this.auth) {
                await this.auth.signOut();
            }
            
            this.showSuccess('Successfully signed out!');
        } catch (error) {
            console.error('Sign out error:', error);
            this.showError('Failed to sign out.');
            throw error;
        }
    }

    // Store user data in database
    async storeUserData(user) {
        try {
            if (!user || user.isDemo) return;

            const userData = {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName || 'Student',
                photoURL: user.photoURL || null,
                lastLogin: firebase.database.ServerValue.TIMESTAMP,
                createdAt: firebase.database.ServerValue.TIMESTAMP
            };

            await this.database.ref(`users/${user.uid}`).update(userData);
            
            // Initialize user performance data if it doesn't exist
            const performanceRef = this.database.ref(`performance/${user.uid}`);
            const snapshot = await performanceRef.once('value');
            
            if (!snapshot.exists()) {
                await this.generateInitialPerformanceData(user.uid);
            }
        } catch (error) {
            console.error('Error storing user data:', error);
        }
    }

    // Generate initial performance data for new users
    async generateInitialPerformanceData(userId) {
        try {
            const subjects = ['Mathematics', 'Science', 'English', 'History', 'Geography'];
            const performanceData = {};

            subjects.forEach(subject => {
                performanceData[subject] = {
                    totalQuestions: Math.floor(Math.random() * 50) + 20,
                    correctAnswers: Math.floor(Math.random() * 30) + 10,
                    averageTime: Math.floor(Math.random() * 120) + 30,
                    lastUpdated: firebase.database.ServerValue.TIMESTAMP,
                    weaknessAreas: this.generateWeaknessAreas(subject)
                };
            });

            await this.database.ref(`performance/${userId}`).set(performanceData);
        } catch (error) {
            console.error('Error generating initial performance data:', error);
        }
    }

    // Generate demo data for demo user
    async generateDemoData(userId) {
        try {
            const demoData = {
                Mathematics: {
                    totalQuestions: 45,
                    correctAnswers: 28,
                    averageTime: 85,
                    lastUpdated: Date.now(),
                    weaknessAreas: ['Algebra', 'Geometry', 'Statistics']
                },
                Science: {
                    totalQuestions: 38,
                    correctAnswers: 32,
                    averageTime: 72,
                    lastUpdated: Date.now(),
                    weaknessAreas: ['Physics', 'Chemistry']
                },
                English: {
                    totalQuestions: 42,
                    correctAnswers: 35,
                    averageTime: 65,
                    lastUpdated: Date.now(),
                    weaknessAreas: ['Grammar', 'Vocabulary']
                },
                History: {
                    totalQuestions: 35,
                    correctAnswers: 22,
                    averageTime: 95,
                    lastUpdated: Date.now(),
                    weaknessAreas: ['World Wars', 'Ancient History', 'Modern History']
                }
            };

            // Store in local storage for demo mode
            localStorage.setItem(`demo_performance_${userId}`, JSON.stringify(demoData));
        } catch (error) {
            console.error('Error generating demo data:', error);
        }
    }

    // Generate weakness areas for a subject
    generateWeaknessAreas(subject) {
        const weaknessMap = {
            'Mathematics': ['Algebra', 'Geometry', 'Calculus', 'Statistics', 'Trigonometry'],
            'Science': ['Physics', 'Chemistry', 'Biology', 'Earth Science'],
            'English': ['Grammar', 'Vocabulary', 'Reading Comprehension', 'Writing'],
            'History': ['Ancient History', 'Modern History', 'World Wars', 'Cultural History'],
            'Geography': ['Physical Geography', 'Human Geography', 'Climate', 'Cartography']
        };

        const areas = weaknessMap[subject] || ['General Concepts'];
        const numAreas = Math.floor(Math.random() * 3) + 1;
        return areas.slice(0, numAreas);
    }

    // Get student performance data
    async getStudentPerformance(userId) {
        try {
            if (!userId) {
                throw new Error('User ID is required');
            }

            // Handle demo user
            if (this.currentUser && this.currentUser.isDemo) {
                const demoData = localStorage.getItem(`demo_performance_${userId}`);
                return demoData ? JSON.parse(demoData) : null;
            }

            // Handle real user
            if (!this.initialized) {
                throw new Error('Firebase not initialized');
            }

            const snapshot = await this.database.ref(`performance/${userId}`).once('value');
            return snapshot.val();
        } catch (error) {
            console.error('Error fetching student performance:', error);
            this.showError('Failed to load performance data.');
            throw error;
        }
    }

    // Update student performance data
    async updateStudentPerformance(userId, performanceData) {
        try {
            if (!userId || !performanceData) {
                throw new Error('User ID and performance data are required');
            }

            // Handle demo user
            if (this.currentUser && this.currentUser.isDemo) {
                localStorage.setItem(`demo_performance_${userId}`, JSON.stringify(performanceData));
                return;
            }

            // Handle real user
            if (!this.initialized) {
                throw new Error('Firebase not initialized');
            }

            await this.database.ref(`performance/${userId}`).update(performanceData);
        } catch (error) {
            console.error('Error updating student performance:', error);
            this.showError('Failed to update performance data.');
            throw error;
        }
    }

    // Utility methods for notifications
    showError(message) {
        this.showNotification(message, 'error');
    }

    showSuccess(message) {
        this.showNotification(message, 'success');
    }

    showInfo(message) {
        this.showNotification(message, 'info');
    }

    showNotification(message, type = 'info') {
        const notification = document.getElementById('notification');
        if (notification) {
            notification.textContent = message;
            notification.className = `notification ${type} show`;
            
            setTimeout(() => {
                notification.classList.remove('show');
            }, 4000);
        }
    }

    // Get current user
    getCurrentUser() {
        return this.currentUser;
    }

    // Check if user is authenticated
    isAuthenticated() {
        return this.currentUser !== null;
    }
}

// Create global Firebase manager instance
window.firebaseManager = new FirebaseManager();

// Initialize Firebase when the script loads
document.addEventListener('DOMContentLoaded', () => {
    window.firebaseManager.init();
});
