// Recommendation Engine for Personalized Learning
class RecommendationEngine {
    constructor() {
        this.initialized = false;
        this.recommendationsDatabase = this.initializeRecommendationsDatabase();
        this.learningStyles = ['visual', 'auditory', 'kinesthetic', 'reading'];
        this.difficultyLevels = ['easy', 'medium', 'hard'];
    }

    // Initialize the recommendation engine
    init() {
        try {
            this.initialized = true;
            console.log('Recommendation Engine initialized successfully');
            return true;
        } catch (error) {
            console.error('Recommendation Engine initialization error:', error);
            return false;
        }
    }

    // Initialize the recommendations database
    initializeRecommendationsDatabase() {
        return {
            Mathematics: {
                easy: [
                    {
                        title: "Basic Arithmetic Review",
                        description: "Master fundamental arithmetic operations with step-by-step guidance and practice problems.",
                        type: "interactive_lesson",
                        duration: "30 minutes",
                        difficulty: "easy",
                        topics: ["Addition", "Subtraction", "Multiplication", "Division"],
                        learningStyle: "visual",
                        estimatedImprovement: 15
                    },
                    {
                        title: "Fraction Fundamentals",
                        description: "Learn to work with fractions through visual representations and practical examples.",
                        type: "video_tutorial",
                        duration: "25 minutes",
                        difficulty: "easy",
                        topics: ["Fractions", "Decimals", "Percentages"],
                        learningStyle: "visual",
                        estimatedImprovement: 12
                    },
                    {
                        title: "Number Patterns Practice",
                        description: "Identify and complete number sequences to strengthen pattern recognition skills.",
                        type: "practice_exercises",
                        duration: "20 minutes",
                        difficulty: "easy",
                        topics: ["Patterns", "Sequences", "Logic"],
                        learningStyle: "kinesthetic",
                        estimatedImprovement: 10
                    }
                ],
                medium: [
                    {
                        title: "Algebraic Expressions Mastery",
                        description: "Solve algebraic expressions and equations with confidence using proven techniques.",
                        type: "interactive_lesson",
                        duration: "45 minutes",
                        difficulty: "medium",
                        topics: ["Algebra", "Variables", "Equations"],
                        learningStyle: "reading",
                        estimatedImprovement: 20
                    },
                    {
                        title: "Geometry Problem Solving",
                        description: "Apply geometric principles to solve real-world problems and calculate areas, volumes.",
                        type: "problem_solving",
                        duration: "40 minutes",
                        difficulty: "medium",
                        topics: ["Geometry", "Area", "Volume", "Angles"],
                        learningStyle: "visual",
                        estimatedImprovement: 18
                    },
                    {
                        title: "Statistics and Data Analysis",
                        description: "Interpret charts, graphs, and statistical data to make informed conclusions.",
                        type: "data_analysis",
                        duration: "35 minutes",
                        difficulty: "medium",
                        topics: ["Statistics", "Graphs", "Data Interpretation"],
                        learningStyle: "visual",
                        estimatedImprovement: 16
                    }
                ],
                hard: [
                    {
                        title: "Advanced Calculus Concepts",
                        description: "Master derivatives, integrals, and limits through comprehensive problem-solving.",
                        type: "advanced_tutorial",
                        duration: "60 minutes",
                        difficulty: "hard",
                        topics: ["Calculus", "Derivatives", "Integrals"],
                        learningStyle: "reading",
                        estimatedImprovement: 25
                    },
                    {
                        title: "Complex Mathematical Proofs",
                        description: "Learn to construct and understand mathematical proofs using logical reasoning.",
                        type: "proof_workshop",
                        duration: "50 minutes",
                        difficulty: "hard",
                        topics: ["Proofs", "Logic", "Mathematical Reasoning"],
                        learningStyle: "reading",
                        estimatedImprovement: 22
                    }
                ]
            },
            Science: {
                easy: [
                    {
                        title: "Scientific Method Basics",
                        description: "Understand the fundamental steps of scientific inquiry and experimentation.",
                        type: "interactive_lesson",
                        duration: "30 minutes",
                        difficulty: "easy",
                        topics: ["Scientific Method", "Hypothesis", "Experiments"],
                        learningStyle: "visual",
                        estimatedImprovement: 14
                    },
                    {
                        title: "States of Matter Exploration",
                        description: "Discover the properties of solids, liquids, and gases through virtual experiments.",
                        type: "virtual_lab",
                        duration: "35 minutes",
                        difficulty: "easy",
                        topics: ["Matter", "States", "Properties"],
                        learningStyle: "kinesthetic",
                        estimatedImprovement: 13
                    },
                    {
                        title: "Basic Chemistry Concepts",
                        description: "Learn about atoms, molecules, and chemical reactions in an engaging way.",
                        type: "animated_lesson",
                        duration: "28 minutes",
                        difficulty: "easy",
                        topics: ["Atoms", "Molecules", "Chemical Reactions"],
                        learningStyle: "visual",
                        estimatedImprovement: 12
                    }
                ],
                medium: [
                    {
                        title: "Physics Forces and Motion",
                        description: "Explore Newton's laws and understand how forces affect motion in the real world.",
                        type: "simulation",
                        duration: "45 minutes",
                        difficulty: "medium",
                        topics: ["Physics", "Forces", "Motion", "Newton's Laws"],
                        learningStyle: "kinesthetic",
                        estimatedImprovement: 19
                    },
                    {
                        title: "Biological Systems Study",
                        description: "Examine how different biological systems work together in living organisms.",
                        type: "case_study",
                        duration: "40 minutes",
                        difficulty: "medium",
                        topics: ["Biology", "Systems", "Organisms"],
                        learningStyle: "reading",
                        estimatedImprovement: 17
                    },
                    {
                        title: "Environmental Science Project",
                        description: "Investigate environmental issues and propose solutions through research and analysis.",
                        type: "project_based",
                        duration: "50 minutes",
                        difficulty: "medium",
                        topics: ["Environment", "Ecology", "Conservation"],
                        learningStyle: "kinesthetic",
                        estimatedImprovement: 16
                    }
                ],
                hard: [
                    {
                        title: "Advanced Organic Chemistry",
                        description: "Master complex organic reactions and molecular structures through detailed analysis.",
                        type: "advanced_tutorial",
                        duration: "65 minutes",
                        difficulty: "hard",
                        topics: ["Organic Chemistry", "Reactions", "Molecular Structure"],
                        learningStyle: "reading",
                        estimatedImprovement: 24
                    },
                    {
                        title: "Quantum Physics Principles",
                        description: "Explore the fascinating world of quantum mechanics and its applications.",
                        type: "theoretical_study",
                        duration: "55 minutes",
                        difficulty: "hard",
                        topics: ["Quantum Physics", "Mechanics", "Theory"],
                        learningStyle: "reading",
                        estimatedImprovement: 21
                    }
                ]
            },
            English: {
                easy: [
                    {
                        title: "Grammar Fundamentals",
                        description: "Master basic grammar rules including parts of speech, sentence structure, and punctuation.",
                        type: "interactive_lesson",
                        duration: "25 minutes",
                        difficulty: "easy",
                        topics: ["Grammar", "Parts of Speech", "Punctuation"],
                        learningStyle: "reading",
                        estimatedImprovement: 15
                    },
                    {
                        title: "Vocabulary Building Workshop",
                        description: "Expand your vocabulary through context clues, word roots, and practical exercises.",
                        type: "vocabulary_game",
                        duration: "30 minutes",
                        difficulty: "easy",
                        topics: ["Vocabulary", "Word Roots", "Context Clues"],
                        learningStyle: "kinesthetic",
                        estimatedImprovement: 13
                    },
                    {
                        title: "Reading Comprehension Basics",
                        description: "Improve reading skills through guided practice with short passages and questions.",
                        type: "reading_practice",
                        duration: "35 minutes",
                        difficulty: "easy",
                        topics: ["Reading", "Comprehension", "Analysis"],
                        learningStyle: "reading",
                        estimatedImprovement: 14
                    }
                ],
                medium: [
                    {
                        title: "Essay Writing Techniques",
                        description: "Learn to structure compelling essays with clear thesis statements and supporting evidence.",
                        type: "writing_workshop",
                        duration: "45 minutes",
                        difficulty: "medium",
                        topics: ["Essay Writing", "Structure", "Arguments"],
                        learningStyle: "reading",
                        estimatedImprovement: 20
                    },
                    {
                        title: "Literary Analysis Skills",
                        description: "Analyze themes, characters, and literary devices in classic and contemporary works.",
                        type: "literature_study",
                        duration: "40 minutes",
                        difficulty: "medium",
                        topics: ["Literature", "Analysis", "Themes", "Characters"],
                        learningStyle: "reading",
                        estimatedImprovement: 18
                    },
                    {
                        title: "Advanced Grammar and Style",
                        description: "Refine your writing with advanced grammar concepts and stylistic techniques.",
                        type: "style_guide",
                        duration: "35 minutes",
                        difficulty: "medium",
                        topics: ["Advanced Grammar", "Style", "Writing Techniques"],
                        learningStyle: "reading",
                        estimatedImprovement: 17
                    }
                ],
                hard: [
                    {
                        title: "Critical Thinking and Argumentation",
                        description: "Develop sophisticated analytical skills for complex texts and arguments.",
                        type: "critical_analysis",
                        duration: "55 minutes",
                        difficulty: "hard",
                        topics: ["Critical Thinking", "Argumentation", "Analysis"],
                        learningStyle: "reading",
                        estimatedImprovement: 23
                    },
                    {
                        title: "Advanced Composition Workshop",
                        description: "Master advanced writing techniques for academic and professional contexts.",
                        type: "advanced_writing",
                        duration: "60 minutes",
                        difficulty: "hard",
                        topics: ["Advanced Writing", "Composition", "Academic Writing"],
                        learningStyle: "reading",
                        estimatedImprovement: 25
                    }
                ]
            },
            History: {
                easy: [
                    {
                        title: "Timeline Mastery",
                        description: "Organize historical events chronologically and understand cause-and-effect relationships.",
                        type: "timeline_activity",
                        duration: "30 minutes",
                        difficulty: "easy",
                        topics: ["Chronology", "Timeline", "Historical Events"],
                        learningStyle: "visual",
                        estimatedImprovement: 12
                    },
                    {
                        title: "Historical Figures Study",
                        description: "Learn about influential people in history and their contributions to society.",
                        type: "biography_study",
                        duration: "35 minutes",
                        difficulty: "easy",
                        topics: ["Historical Figures", "Biography", "Contributions"],
                        learningStyle: "reading",
                        estimatedImprovement: 14
                    },
                    {
                        title: "Ancient Civilizations Overview",
                        description: "Explore the rise and fall of ancient civilizations and their lasting impact.",
                        type: "civilization_tour",
                        duration: "40 minutes",
                        difficulty: "easy",
                        topics: ["Ancient History", "Civilizations", "Culture"],
                        learningStyle: "visual",
                        estimatedImprovement: 13
                    }
                ],
                medium: [
                    {
                        title: "World Wars Analysis",
                        description: "Examine the causes, events, and consequences of the major world wars.",
                        type: "historical_analysis",
                        duration: "50 minutes",
                        difficulty: "medium",
                        topics: ["World Wars", "Causes", "Consequences"],
                        learningStyle: "reading",
                        estimatedImprovement: 19
                    },
                    {
                        title: "Cultural Revolution Studies",
                        description: "Investigate major cultural and social movements throughout history.",
                        type: "movement_study",
                        duration: "45 minutes",
                        difficulty: "medium",
                        topics: ["Cultural Revolution", "Social Movements", "Change"],
                        learningStyle: "reading",
                        estimatedImprovement: 17
                    },
                    {
                        title: "Economic History Patterns",
                        description: "Understand how economic factors have shaped historical events and societies.",
                        type: "economic_analysis",
                        duration: "40 minutes",
                        difficulty: "medium",
                        topics: ["Economic History", "Trade", "Development"],
                        learningStyle: "reading",
                        estimatedImprovement: 16
                    }
                ],
                hard: [
                    {
                        title: "Historiography and Interpretation",
                        description: "Analyze how historical interpretations change over time and examine primary sources.",
                        type: "source_analysis",
                        duration: "60 minutes",
                        difficulty: "hard",
                        topics: ["Historiography", "Primary Sources", "Interpretation"],
                        learningStyle: "reading",
                        estimatedImprovement: 24
                    },
                    {
                        title: "Comparative Historical Analysis",
                        description: "Compare and contrast different historical periods, cultures, and civilizations.",
                        type: "comparative_study",
                        duration: "55 minutes",
                        difficulty: "hard",
                        topics: ["Comparative History", "Analysis", "Civilizations"],
                        learningStyle: "reading",
                        estimatedImprovement: 22
                    }
                ]
            }
        };
    }

    // Generate recommendations based on ML analysis
    generateRecommendations(mlAnalysis) {
        try {
            if (!mlAnalysis || !mlAnalysis.weaknessAnalysis) {
                console.warn('Invalid ML analysis data provided');
                return this.getDefaultRecommendations();
            }

            console.log('Generating recommendations based on ML analysis:', mlAnalysis);

            const recommendations = [];
            const performanceMetrics = mlAnalysis.performanceMetrics || {};
            const difficultyScores = mlAnalysis.difficultyScores || {};
            const prioritySubjects = mlAnalysis.weaknessAnalysis.prioritySubjects || [];

            // Generate recommendations for each subject based on weakness analysis
            Object.keys(performanceMetrics).forEach(subject => {
                const subjectRecommendations = this.generateSubjectRecommendations(
                    subject,
                    performanceMetrics[subject],
                    difficultyScores[subject],
                    mlAnalysis
                );
                recommendations.push(...subjectRecommendations);
            });

            // Sort recommendations by priority and effectiveness
            const sortedRecommendations = this.prioritizeRecommendations(recommendations, prioritySubjects);

            // Add personalization based on learning patterns
            const personalizedRecommendations = this.personalizeRecommendations(sortedRecommendations, mlAnalysis);

            console.log('Generated recommendations:', personalizedRecommendations);
            return personalizedRecommendations;

        } catch (error) {
            console.error('Error generating recommendations:', error);
            return this.getDefaultRecommendations();
        }
    }

    // Generate recommendations for a specific subject
    generateSubjectRecommendations(subject, metrics, difficultyScore, mlAnalysis) {
        const recommendations = [];
        
        if (!this.recommendationsDatabase[subject] || !metrics) {
            return recommendations;
        }

        const weaknessScore = metrics.weaknessScore || 0;
        const difficulty = difficultyScore?.difficulty || 'medium';
        
        // Get recommendations based on difficulty level
        const subjectRecommendations = this.recommendationsDatabase[subject][difficulty] || [];
        
        // Select top recommendations based on weakness score
        const numRecommendations = weaknessScore > 0.6 ? 3 : weaknessScore > 0.3 ? 2 : 1;
        const selectedRecommendations = subjectRecommendations.slice(0, numRecommendations);

        selectedRecommendations.forEach(rec => {
            const recommendation = {
                ...rec,
                subject,
                priority: this.calculateRecommendationPriority(weaknessScore, rec),
                personalizedReason: this.generatePersonalizedReason(subject, metrics, rec),
                expectedOutcome: this.generateExpectedOutcome(rec, weaknessScore),
                adaptiveFeatures: this.generateAdaptiveFeatures(metrics, rec)
            };

            recommendations.push(recommendation);
        });

        return recommendations;
    }

    // Calculate recommendation priority
    calculateRecommendationPriority(weaknessScore, recommendation) {
        let priority = 'medium';
        
        if (weaknessScore > 0.6) {
            priority = 'high';
        } else if (weaknessScore < 0.3) {
            priority = 'low';
        }

        // Adjust based on estimated improvement
        if (recommendation.estimatedImprovement > 20) {
            priority = priority === 'low' ? 'medium' : 'high';
        }

        return priority;
    }

    // Generate personalized reason for recommendation
    generatePersonalizedReason(subject, metrics, recommendation) {
        const accuracy = Math.round(metrics.accuracy * 100);
        const primaryIssue = this.identifyPrimaryIssue(metrics);
        
        let reason = `Based on your ${accuracy}% accuracy in ${subject}, `;
        
        switch (primaryIssue) {
            case 'accuracy':
                reason += `this ${recommendation.type.replace('_', ' ')} will help improve your understanding of core concepts.`;
                break;
            case 'efficiency':
                reason += `this focused practice will help you solve problems more quickly and efficiently.`;
                break;
            case 'consistency':
                reason += `regular practice with this material will help stabilize your performance.`;
                break;
            default:
                reason += `this comprehensive review will strengthen your overall skills.`;
        }

        return reason;
    }

    // Generate expected outcome
    generateExpectedOutcome(recommendation, weaknessScore) {
        const baseImprovement = recommendation.estimatedImprovement || 10;
        const adjustedImprovement = Math.round(baseImprovement * (1 + weaknessScore));
        
        return {
            accuracyImprovement: `${adjustedImprovement}%`,
            timeToSeeResults: weaknessScore > 0.6 ? '1-2 weeks' : '3-5 days',
            confidenceBoost: weaknessScore > 0.5 ? 'High' : 'Medium',
            skillsGained: recommendation.topics || []
        };
    }

    // Generate adaptive features
    generateAdaptiveFeatures(metrics, recommendation) {
        const features = [];
        
        if (metrics.accuracy < 0.5) {
            features.push('Extra practice problems');
            features.push('Step-by-step explanations');
        }
        
        if (metrics.efficiency < 0.5) {
            features.push('Time management tips');
            features.push('Quick solution methods');
        }
        
        if (metrics.consistency < 0.5) {
            features.push('Regular progress tracking');
            features.push('Spaced repetition reminders');
        }

        // Add learning style adaptations
        switch (recommendation.learningStyle) {
            case 'visual':
                features.push('Interactive diagrams and charts');
                break;
            case 'auditory':
                features.push('Audio explanations and discussions');
                break;
            case 'kinesthetic':
                features.push('Hands-on activities and simulations');
                break;
            case 'reading':
                features.push('Detailed written explanations');
                break;
        }

        return features;
    }

    // Prioritize recommendations based on ML analysis
    prioritizeRecommendations(recommendations, prioritySubjects) {
        const priorityMap = { high: 3, medium: 2, low: 1 };
        const subjectPriorityMap = {};
        
        // Create subject priority mapping
        prioritySubjects.forEach((item, index) => {
            subjectPriorityMap[item.subject] = 3 - index; // Higher priority for earlier subjects
        });

        return recommendations.sort((a, b) => {
            // First sort by recommendation priority
            const priorityDiff = priorityMap[b.priority] - priorityMap[a.priority];
            if (priorityDiff !== 0) return priorityDiff;
            
            // Then by subject priority
            const subjectPriorityA = subjectPriorityMap[a.subject] || 0;
            const subjectPriorityB = subjectPriorityMap[b.subject] || 0;
            const subjectDiff = subjectPriorityB - subjectPriorityA;
            if (subjectDiff !== 0) return subjectDiff;
            
            // Finally by estimated improvement
            return b.estimatedImprovement - a.estimatedImprovement;
        });
    }

    // Personalize recommendations based on learning patterns
    personalizeRecommendations(recommendations, mlAnalysis) {
        const learningVelocity = mlAnalysis.learningVelocity || {};
        const overallProgress = mlAnalysis.overallProgress || 0;

        return recommendations.map(rec => {
            const subjectVelocity = learningVelocity.subjectVelocities?.[rec.subject] || 'moderate';
            
            // Adjust duration based on learning velocity
            let adjustedDuration = rec.duration;
            if (subjectVelocity === 'fast') {
                adjustedDuration = this.adjustDuration(rec.duration, 0.8); // 20% less time
            } else if (subjectVelocity === 'slow') {
                adjustedDuration = this.adjustDuration(rec.duration, 1.3); // 30% more time
            }

            // Add motivational elements based on overall progress
            let motivationalNote = '';
            if (overallProgress < 40) {
                motivationalNote = 'Every step forward counts! You\'re building a strong foundation.';
            } else if (overallProgress < 70) {
                motivationalNote = 'Great progress! Keep up the momentum with focused practice.';
            } else {
                motivationalNote = 'Excellent work! Fine-tune your skills with advanced challenges.';
            }

            return {
                ...rec,
                duration: adjustedDuration,
                motivationalNote,
                personalizedTips: this.generatePersonalizedTips(rec, subjectVelocity),
                adaptiveSchedule: this.generateAdaptiveSchedule(rec, subjectVelocity)
            };
        });
    }

    // Adjust duration string
    adjustDuration(duration, multiplier) {
        const match = duration.match(/(\d+)/);
        if (match) {
            const originalMinutes = parseInt(match[1]);
            const adjustedMinutes = Math.round(originalMinutes * multiplier);
            return duration.replace(/\d+/, adjustedMinutes.toString());
        }
        return duration;
    }

    // Generate personalized tips
    generatePersonalizedTips(recommendation, velocity) {
        const tips = [];
        
        switch (velocity) {
            case 'fast':
                tips.push('Challenge yourself with bonus questions');
                tips.push('Try to explain concepts to others');
                tips.push('Look for connections to other subjects');
                break;
            case 'slow':
                tips.push('Take breaks every 15 minutes');
                tips.push('Review previous lessons before starting');
                tips.push('Don\'t hesitate to repeat difficult sections');
                break;
            default:
                tips.push('Set small, achievable goals');
                tips.push('Track your progress regularly');
                tips.push('Celebrate your improvements');
        }

        // Add subject-specific tips
        switch (recommendation.subject) {
            case 'Mathematics':
                tips.push('Practice problems daily, even if just for 10 minutes');
                break;
            case 'Science':
                tips.push('Connect concepts to real-world examples');
                break;
            case 'English':
                tips.push('Read diverse materials to expand vocabulary');
                break;
            case 'History':
                tips.push('Create mental timelines to remember sequences');
                break;
        }

        return tips.slice(0, 3); // Return top 3 tips
    }

    // Generate adaptive schedule
    generateAdaptiveSchedule(recommendation, velocity) {
        const baseSchedule = {
            sessionsPerWeek: 3,
            sessionDuration: recommendation.duration,
            reviewFrequency: 'weekly'
        };

        switch (velocity) {
            case 'fast':
                return {
                    ...baseSchedule,
                    sessionsPerWeek: 2,
                    reviewFrequency: 'bi-weekly',
                    advancedChallenges: true
                };
            case 'slow':
                return {
                    ...baseSchedule,
                    sessionsPerWeek: 4,
                    reviewFrequency: 'daily',
                    reinforcementActivities: true
                };
            default:
                return baseSchedule;
        }
    }

    // Identify primary issue from metrics
    identifyPrimaryIssue(metrics) {
        if (metrics.accuracy < 0.5) return 'accuracy';
        if (metrics.efficiency < 0.5) return 'efficiency';
        if (metrics.consistency < 0.5) return 'consistency';
        return 'general';
    }

    // Get default recommendations for error cases
    getDefaultRecommendations() {
        return [
            {
                title: "Study Skills Assessment",
                description: "Complete a comprehensive assessment to identify your learning strengths and areas for improvement.",
                type: "assessment",
                duration: "20 minutes",
                difficulty: "easy",
                subject: "General",
                priority: "high",
                topics: ["Study Skills", "Learning Assessment"],
                learningStyle: "reading",
                estimatedImprovement: 10,
                personalizedReason: "Start with a baseline assessment to create a personalized learning plan.",
                expectedOutcome: {
                    accuracyImprovement: "10%",
                    timeToSeeResults: "Immediate",
                    confidenceBoost: "Medium",
                    skillsGained: ["Self-awareness", "Study Planning"]
                },
                motivationalNote: "Understanding your learning style is the first step to academic success!"
            }
        ];
    }

    // Render recommendations in the UI
    renderRecommendations(recommendations, containerId = 'recommendationsGrid') {
        try {
            const container = document.getElementById(containerId);
            if (!container) {
                console.error('Recommendations container not found');
                return;
            }

            if (!recommendations || recommendations.length === 0) {
                container.innerHTML = '<p class="no-recommendations">No recommendations available. Complete some assessments to get personalized suggestions.</p>';
                return;
            }

            const recommendationsHTML = recommendations.map(rec => this.createRecommendationCard(rec)).join('');
            container.innerHTML = recommendationsHTML;

            // Add event listeners for recommendation cards
            this.addRecommendationEventListeners();

        } catch (error) {
            console.error('Error rendering recommendations:', error);
        }
    }

    // Create HTML for a recommendation card
    createRecommendationCard(recommendation) {
        const subjectClass = `subject-${recommendation.subject.toLowerCase()}`;
        const difficultyClass = `difficulty-${recommendation.difficulty}`;
        const priorityClass = `priority-${recommendation.priority}`;

        return `
            <div class="recommendation-card ${priorityClass}" data-subject="${recommendation.subject}" data-difficulty="${recommendation.difficulty}">
                <div class="recommendation-header">
                    <div class="subject-icon ${subjectClass}">
                        ${recommendation.subject.charAt(0)}
                    </div>
                    <div class="recommendation-info">
                        <h3>${recommendation.title}</h3>
                        <div class="recommendation-meta">
                            <span class="duration">${recommendation.duration}</span>
                            <span class="difficulty ${difficultyClass}">${recommendation.difficulty}</span>
                        </div>
                    </div>
                </div>
                
                <p class="recommendation-description">${recommendation.description}</p>
                
                <div class="recommendation-reason">
                    <strong>Why this helps:</strong> ${recommendation.personalizedReason}
                </div>
                
                <div class="expected-outcome">
                    <div class="outcome-item">
                        <span class="outcome-label">Expected Improvement:</span>
                        <span class="outcome-value">${recommendation.expectedOutcome.accuracyImprovement}</span>
                    </div>
                    <div class="outcome-item">
                        <span class="outcome-label">Time to Results:</span>
                        <span class="outcome-value">${recommendation.expectedOutcome.timeToSeeResults}</span>
                    </div>
                </div>
                
                ${recommendation.motivationalNote ? `<div class="motivational-note">${recommendation.motivationalNote}</div>` : ''}
                
                <div class="recommendation-actions">
                    <button class="btn btn-start" onclick="startRecommendation('${recommendation.subject}', '${recommendation.title}')">
                        Start Learning
                    </button>
                    <button class="btn btn-secondary" onclick="viewRecommendationDetails('${recommendation.subject}', '${recommendation.title}')">
                        View Details
                    </button>
                </div>
            </div>
        `;
    }

    // Add event listeners for recommendation interactions
    addRecommendationEventListeners() {
        // Add any additional event listeners for recommendation cards
        const cards = document.querySelectorAll('.recommendation-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-4px)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });
    }

    // Get recommendation statistics
    getRecommendationStats(recommendations) {
        if (!recommendations || recommendations.length === 0) {
            return { total: 0, bySubject: {}, byDifficulty: {}, byPriority: {} };
        }

        const stats = {
            total: recommendations.length,
            bySubject: {},
            byDifficulty: {},
            byPriority: {}
        };

        recommendations.forEach(rec => {
            // Count by subject
            stats.bySubject[rec.subject] = (stats.bySubject[rec.subject] || 0) + 1;
            
            // Count by difficulty
            stats.byDifficulty[rec.difficulty] = (stats.byDifficulty[rec.difficulty] || 0) + 1;
            
            // Count by priority
            stats.byPriority[rec.priority] = (stats.byPriority[rec.priority] || 0) + 1;
        });

        return stats;
    }
}

// Global functions for recommendation interactions
window.startRecommendation = function(subject, title) {
    console.log(`Starting recommendation: ${title} for ${subject}`);
    
    // Show loading state
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
        loadingOverlay.classList.add('show');
    }
    
    // Simulate starting a learning session
    setTimeout(() => {
        if (loadingOverlay) {
            loadingOverlay.classList.remove('show');
        }
        
        // Show success message
        if (window.firebaseManager) {
            window.firebaseManager.showSuccess(`Started learning session: ${title}`);
        }
        
        // In a real implementation, this would redirect to the learning module
        console.log(`Learning session started for ${subject}: ${title}`);
    }, 2000);
};

window.viewRecommendationDetails = function(subject, title) {
    console.log(`Viewing details for: ${title} in ${subject}`);
    
    // Show detailed information about the recommendation
    const modal = document.createElement('div');
    modal.className = 'recommendation-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${title}</h3>
                <button class="modal-close" onclick="closeRecommendationModal()">&times;</button>
            </div>
            <div class="modal-body">
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Description:</strong> Detailed information about this learning recommendation would be displayed here.</p>
                <p><strong>Learning Objectives:</strong></p>
                <ul>
                    <li>Master key concepts in ${subject}</li>
                    <li>Improve problem-solving skills</li>
                    <li>Build confidence through practice</li>
                </ul>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" onclick="startRecommendation('${subject}', '${title}'); closeRecommendationModal();">Start Now</button>
                <button class="btn btn-secondary" onclick="closeRecommendationModal()">Close</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add modal styles if not already present
    if (!document.querySelector('#modal-styles')) {
        const styles = document.createElement('style');
        styles.id = 'modal-styles';
        styles.textContent = `
            .recommendation-modal {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
            }
            .modal-content {
                background: white;
                border-radius: 16px;
                max-width: 500px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
            }
            .modal-header {
                padding: 1.5rem;
                border-bottom: 1px solid #e5e7eb;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .modal-close {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: #6b7280;
            }
            .modal-body {
                padding: 1.5rem;
            }
            .modal-footer {
                padding: 1.5rem;
                border-top: 1px solid #e5e7eb;
                display: flex;
                gap: 1rem;
                justify-content: flex-end;
            }
        `;
        document.head.appendChild(styles);
    }
};

window.closeRecommendationModal = function() {
    const modal = document.querySelector('.recommendation-modal');
    if (modal) {
        modal.remove();
    }
};

// Create global recommendation engine instance
window.recommendationEngine = new RecommendationEngine();

// Initialize recommendation engine when the script loads
document.addEventListener('DOMContentLoaded', () => {
    window.recommendationEngine.init();
});
