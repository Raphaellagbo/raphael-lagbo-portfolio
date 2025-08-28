// Main Application Controller
class MLLearningApp {
    constructor() {
        this.currentUser = null;
        this.currentView = 'login';
        this.studentData = null;
        this.mlAnalysis = null;
        this.recommendations = null;
        this.initialized = false;
    }

    // Initialize the application
    async init() {
        try {
            console.log('Initializing ML Learning Application...');
            
            // Wait for all modules to be ready
            await this.waitForModules();
            
            // Set up event listeners
            this.setupEventListeners();
            
            // Set up authentication state listener
            this.setupAuthStateListener();
            
            this.initialized = true;
            console.log('ML Learning Application initialized successfully');
            
        } catch (error) {
            console.error('Error initializing application:', error);
            this.showError('Failed to initialize application. Please refresh the page.');
        }
    }

    // Wait for all required modules to be loaded
    async waitForModules() {
        const maxWaitTime = 10000; // 10 seconds
        const checkInterval = 100; // 100ms
        let waitTime = 0;

        return new Promise((resolve, reject) => {
            const checkModules = () => {
                if (window.firebaseManager && 
                    window.mlAnalyzer && 
                    window.recommendationEngine &&
                    window.firebaseManager.initialized &&
                    window.mlAnalyzer.initialized &&
                    window.recommendationEngine.initialized) {
                    resolve();
                } else if (waitTime >= maxWaitTime) {
                    reject(new Error('Modules failed to load within timeout'));
                } else {
                    waitTime += checkInterval;
                    setTimeout(checkModules, checkInterval);
                }
            };
            checkModules();
        });
    }

    // Set up event listeners
    setupEventListeners() {
        // Login form submission
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleEmailLogin(e));
        }

        // Google sign-in button
        const googleSignInBtn = document.getElementById('googleSignIn');
        if (googleSignInBtn) {
            googleSignInBtn.addEventListener('click', () => this.handleGoogleLogin());
        }

        // Demo login button
        const demoLoginBtn = document.getElementById('demoLogin');
        if (demoLoginBtn) {
            demoLoginBtn.addEventListener('click', () => this.handleDemoLogin());
        }

        // Logout button
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.handleLogout());
        }

        // Navigation buttons
        const navButtons = document.querySelectorAll('.nav-btn:not(.logout-btn)');
        navButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleNavigation(e));
        });
    }

    // Set up authentication state listener
    setupAuthStateListener() {
        window.authStateChanged = (user) => {
            this.currentUser = user;
            if (user) {
                this.onUserSignedIn(user);
            } else {
                this.onUserSignedOut();
            }
        };
    }

    // Handle email/password login
    async handleEmailLogin(event) {
        event.preventDefault();
        
        try {
            this.showLoading(true);
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            if (!email || !password) {
                throw new Error('Please enter both email and password');
            }
            
            await window.firebaseManager.signInWithEmail(email, password);
            
        } catch (error) {
            console.error('Email login error:', error);
            this.showError(error.message || 'Failed to sign in with email');
        } finally {
            this.showLoading(false);
        }
    }

    // Handle Google login
    async handleGoogleLogin() {
        try {
            this.showLoading(true);
            await window.firebaseManager.signInWithGoogle();
        } catch (error) {
            console.error('Google login error:', error);
            // Error is already handled in firebaseManager
        } finally {
            this.showLoading(false);
        }
    }

    // Handle demo login
    async handleDemoLogin() {
        try {
            this.showLoading(true);
            await window.firebaseManager.demoLogin();
        } catch (error) {
            console.error('Demo login error:', error);
            this.showError('Failed to start demo mode');
        } finally {
            this.showLoading(false);
        }
    }

    // Handle logout
    async handleLogout() {
        try {
            this.showLoading(true);
            await window.firebaseManager.signOut();
        } catch (error) {
            console.error('Logout error:', error);
            this.showError('Failed to sign out');
        } finally {
            this.showLoading(false);
        }
    }

    // Handle navigation between views
    handleNavigation(event) {
        const section = event.target.getAttribute('data-section');
        if (section) {
            this.switchView(section);
            
            // Update active navigation button
            document.querySelectorAll('.nav-btn:not(.logout-btn)').forEach(btn => {
                btn.classList.remove('active');
            });
            event.target.classList.add('active');
        }
    }

    // Called when user signs in
    async onUserSignedIn(user) {
        try {
            console.log('User signed in:', user);
            
            // Show dashboard and hide login
            this.showDashboard();
            
            // Update user interface
            this.updateUserInterface(user);
            
            // Load and analyze student data
            await this.loadAndAnalyzeStudentData(user);
            
        } catch (error) {
            console.error('Error handling user sign in:', error);
            this.showError('Failed to load user data');
        }
    }

    // Called when user signs out
    onUserSignedOut() {
        console.log('User signed out');
        
        // Reset application state
        this.currentUser = null;
        this.studentData = null;
        this.mlAnalysis = null;
        this.recommendations = null;
        
        // Show login and hide dashboard
        this.showLogin();
        
        // Clear user interface
        this.clearUserInterface();
    }

    // Load and analyze student performance data
    async loadAndAnalyzeStudentData(user) {
        try {
            this.showLoading(true, 'Analyzing your performance data...');
            
            // Load student performance data
            this.studentData = await window.firebaseManager.getStudentPerformance(user.uid);
            
            if (!this.studentData) {
                console.log('No performance data found, generating sample data...');
                // For demo purposes, we'll use the data that was already generated
                this.studentData = await window.firebaseManager.getStudentPerformance(user.uid);
            }
            
            if (this.studentData) {
                // Perform ML analysis
                this.mlAnalysis = window.mlAnalyzer.analyzeWeakness(this.studentData);
                
                // Generate recommendations
                this.recommendations = window.recommendationEngine.generateRecommendations(this.mlAnalysis);
                
                // Update dashboard with analysis results
                this.updateDashboard();
                
                // Update recommendations view
                this.updateRecommendationsView();
                
                console.log('Student data analysis completed:', {
                    studentData: this.studentData,
                    mlAnalysis: this.mlAnalysis,
                    recommendations: this.recommendations
                });
            } else {
                this.showError('No performance data available. Complete some assessments to get personalized recommendations.');
            }
            
        } catch (error) {
            console.error('Error loading and analyzing student data:', error);
            this.showError('Failed to analyze performance data');
        } finally {
            this.showLoading(false);
        }
    }

    // Update user interface with user information
    updateUserInterface(user) {
        // Update user name displays
        const userNameElements = document.querySelectorAll('#userName, #profileName');
        userNameElements.forEach(element => {
            if (element) {
                element.textContent = user.displayName || 'Student';
            }
        });

        // Update profile email
        const profileEmail = document.getElementById('profileEmail');
        if (profileEmail) {
            profileEmail.textContent = user.email || 'student@example.com';
        }

        // Update profile initials
        const profileInitials = document.getElementById('profileInitials');
        if (profileInitials) {
            const name = user.displayName || 'Student';
            const initials = name.split(' ').map(n => n.charAt(0)).join('').substring(0, 2);
            profileInitials.textContent = initials;
        }

        // Show navigation
        const navigation = document.getElementById('navigation');
        if (navigation) {
            navigation.style.display = 'flex';
        }
    }

    // Clear user interface
    clearUserInterface() {
        // Hide navigation
        const navigation = document.getElementById('navigation');
        if (navigation) {
            navigation.style.display = 'none';
        }

        // Clear form fields
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.reset();
        }
    }

    // Update dashboard with analysis results
    updateDashboard() {
        if (!this.mlAnalysis) return;

        try {
            // Update overall progress
            this.updateOverallProgress(this.mlAnalysis.overallProgress);
            
            // Update subjects count
            this.updateSubjectsCount();
            
            // Update recommendations count
            this.updateRecommendationsCount();
            
            // Update weakness analysis chart
            this.updateWeaknessChart();
            
        } catch (error) {
            console.error('Error updating dashboard:', error);
        }
    }

    // Update overall progress display
    updateOverallProgress(progress) {
        const progressElement = document.getElementById('overallProgress');
        const progressText = document.querySelector('#overallProgress .progress-text');
        
        if (progressElement && progressText) {
            const percentage = Math.max(0, Math.min(100, progress || 0));
            const degrees = (percentage / 100) * 360;
            
            progressElement.style.background = `conic-gradient(#3b82f6 ${degrees}deg, #e5e7eb ${degrees}deg)`;
            progressText.textContent = `${percentage}%`;
        }
    }

    // Update subjects count
    updateSubjectsCount() {
        const subjectsCount = document.getElementById('subjectsCount');
        if (subjectsCount && this.studentData) {
            const count = Object.keys(this.studentData).length;
            subjectsCount.textContent = count;
        }
    }

    // Update recommendations count
    updateRecommendationsCount() {
        const recommendationsCount = document.getElementById('recommendationsCount');
        if (recommendationsCount && this.recommendations) {
            recommendationsCount.textContent = this.recommendations.length;
        }
    }

    // Update weakness analysis chart
    updateWeaknessChart() {
        const chartContainer = document.getElementById('analysisChart');
        if (!chartContainer || !this.mlAnalysis || !this.mlAnalysis.performanceMetrics) {
            return;
        }

        const performanceMetrics = this.mlAnalysis.performanceMetrics;
        const subjects = Object.keys(performanceMetrics);

        if (subjects.length === 0) {
            chartContainer.innerHTML = '<p class="loading">No performance data available</p>';
            return;
        }

        // Create weakness bars
        const barsHTML = subjects.map(subject => {
            const metrics = performanceMetrics[subject];
            const weaknessScore = metrics.weaknessScore || 0;
            const weaknessPercentage = Math.round(weaknessScore * 100);
            const strengthPercentage = 100 - weaknessPercentage;

            return `
                <div class="weakness-item">
                    <div class="weakness-label">
                        <span>${subject}</span>
                        <span>${strengthPercentage}% Mastery</span>
                    </div>
                    <div class="weakness-bar">
                        <div class="weakness-fill" style="width: ${strengthPercentage}%"></div>
                    </div>
                </div>
            `;
        }).join('');

        chartContainer.innerHTML = `<div class="weakness-bars">${barsHTML}</div>`;
    }

    // Update recommendations view
    updateRecommendationsView() {
        if (this.recommendations) {
            window.recommendationEngine.renderRecommendations(this.recommendations);
        }
    }

    // Switch between different views
    switchView(viewName) {
        // Hide all views
        const views = ['dashboardView', 'profileView', 'recommendationsView'];
        views.forEach(view => {
            const element = document.getElementById(view);
            if (element) {
                element.style.display = 'none';
            }
        });

        // Show selected view
        const selectedView = document.getElementById(`${viewName}View`);
        if (selectedView) {
            selectedView.style.display = 'block';
            this.currentView = viewName;
        }

        // Update profile stats when switching to profile view
        if (viewName === 'profile') {
            this.updateProfileStats();
        }
    }

    // Update profile statistics
    updateProfileStats() {
        if (!this.mlAnalysis || !this.studentData) return;

        try {
            // Calculate learning streak (simulated)
            const learningStreak = document.getElementById('learningStreak');
            if (learningStreak) {
                const streak = Math.floor(Math.random() * 30) + 1;
                learningStreak.textContent = `${streak} days`;
            }

            // Calculate total study time (simulated)
            const studyTime = document.getElementById('studyTime');
            if (studyTime) {
                const totalQuestions = Object.values(this.studentData)
                    .reduce((sum, subject) => sum + (subject.totalQuestions || 0), 0);
                const estimatedHours = Math.round(totalQuestions * 2 / 60); // 2 minutes per question
                studyTime.textContent = `${estimatedHours} hours`;
            }

            // Calculate completed lessons (simulated)
            const completedLessons = document.getElementById('completedLessons');
            if (completedLessons) {
                const totalCorrect = Object.values(this.studentData)
                    .reduce((sum, subject) => sum + (subject.correctAnswers || 0), 0);
                const lessons = Math.floor(totalCorrect / 10); // 10 correct answers = 1 lesson
                completedLessons.textContent = lessons;
            }

        } catch (error) {
            console.error('Error updating profile stats:', error);
        }
    }

    // Show dashboard section
    showDashboard() {
        const loginSection = document.getElementById('loginSection');
        const dashboardSection = document.getElementById('dashboardSection');
        
        if (loginSection) {
            loginSection.style.display = 'none';
        }
        
        if (dashboardSection) {
            dashboardSection.style.display = 'block';
        }

        // Show dashboard view by default
        this.switchView('dashboard');
    }

    // Show login section
    showLogin() {
        const loginSection = document.getElementById('loginSection');
        const dashboardSection = document.getElementById('dashboardSection');
        
        if (loginSection) {
            loginSection.style.display = 'block';
        }
        
        if (dashboardSection) {
            dashboardSection.style.display = 'none';
        }
    }

    // Show/hide loading overlay
    showLoading(show, message = 'Processing your data...') {
        const loadingOverlay = document.getElementById('loadingOverlay');
        if (loadingOverlay) {
            if (show) {
                const loadingText = loadingOverlay.querySelector('p');
                if (loadingText) {
                    loadingText.textContent = message;
                }
                loadingOverlay.classList.add('show');
            } else {
                loadingOverlay.classList.remove('show');
            }
        }
    }

    // Show error message
    showError(message) {
        if (window.firebaseManager) {
            window.firebaseManager.showError(message);
        } else {
            console.error('Error:', message);
            alert(message); // Fallback
        }
    }

    // Show success message
    showSuccess(message) {
        if (window.firebaseManager) {
            window.firebaseManager.showSuccess(message);
        } else {
            console.log('Success:', message);
        }
    }

    // Get current application state
    getState() {
        return {
            currentUser: this.currentUser,
            currentView: this.currentView,
            studentData: this.studentData,
            mlAnalysis: this.mlAnalysis,
            recommendations: this.recommendations,
            initialized: this.initialized
        };
    }

    // Refresh data and analysis
    async refreshData() {
        if (this.currentUser) {
            await this.loadAndAnalyzeStudentData(this.currentUser);
        }
    }
}

// Create global application instance
window.mlLearningApp = new MLLearningApp();

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    try {
        await window.mlLearningApp.init();
    } catch (error) {
        console.error('Failed to initialize application:', error);
    }
});

// Global utility functions
window.refreshAnalysis = function() {
    if (window.mlLearningApp) {
        window.mlLearningApp.refreshData();
    }
};

window.exportData = function() {
    if (window.mlLearningApp) {
        const state = window.mlLearningApp.getState();
        const dataStr = JSON.stringify(state, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = 'learning-analysis.json';
        link.click();
    }
};
