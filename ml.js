// ML-Powered Student Weakness Analysis Module
class MLAnalyzer {
    constructor() {
        this.initialized = false;
        this.subjectWeights = {
            'Mathematics': 1.2,
            'Science': 1.1,
            'English': 1.0,
            'History': 0.9,
            'Geography': 0.8
        };
        this.difficultyThresholds = {
            easy: 0.8,
            medium: 0.6,
            hard: 0.4
        };
    }

    // Initialize the ML analyzer
    init() {
        try {
            this.initialized = true;
            console.log('ML Analyzer initialized successfully');
            return true;
        } catch (error) {
            console.error('ML Analyzer initialization error:', error);
            return false;
        }
    }

    // Main analysis function - analyzes student performance data
    analyzeWeakness(studentData) {
        try {
            if (!studentData || typeof studentData !== 'object') {
                throw new Error('Invalid student data provided');
            }

            console.log('Starting ML analysis for student data:', studentData);

            // Step 1: Calculate basic performance metrics
            const performanceMetrics = this.calculatePerformanceMetrics(studentData);

            // Step 2: Identify weakness patterns
            const weaknessPatterns = this.identifyWeaknessPatterns(performanceMetrics);

            // Step 3: Calculate subject difficulty scores
            const difficultyScores = this.calculateDifficultyScores(performanceMetrics);

            // Step 4: Generate learning velocity analysis
            const learningVelocity = this.analyzeLearningVelocity(studentData);

            // Step 5: Create comprehensive weakness analysis
            const weaknessAnalysis = this.generateWeaknessAnalysis(
                performanceMetrics,
                weaknessPatterns,
                difficultyScores,
                learningVelocity
            );

            // Step 6: Calculate overall progress score
            const overallProgress = this.calculateOverallProgress(performanceMetrics);

            const result = {
                performanceMetrics,
                weaknessPatterns,
                difficultyScores,
                learningVelocity,
                weaknessAnalysis,
                overallProgress,
                timestamp: Date.now(),
                analysisVersion: '1.0'
            };

            console.log('ML Analysis completed:', result);
            return result;

        } catch (error) {
            console.error('Error in ML analysis:', error);
            return this.getDefaultAnalysis();
        }
    }

    // Calculate basic performance metrics for each subject
    calculatePerformanceMetrics(studentData) {
        const metrics = {};

        Object.keys(studentData).forEach(subject => {
            const data = studentData[subject];
            
            if (!data.totalQuestions || !data.correctAnswers) {
                metrics[subject] = this.getDefaultSubjectMetrics();
                return;
            }

            const accuracy = data.correctAnswers / data.totalQuestions;
            const efficiency = this.calculateEfficiency(data.averageTime, accuracy);
            const consistency = this.calculateConsistency(data);
            const improvement = this.calculateImprovement(data);

            metrics[subject] = {
                accuracy: Math.round(accuracy * 100) / 100,
                efficiency: Math.round(efficiency * 100) / 100,
                consistency: Math.round(consistency * 100) / 100,
                improvement: Math.round(improvement * 100) / 100,
                totalQuestions: data.totalQuestions,
                correctAnswers: data.correctAnswers,
                averageTime: data.averageTime,
                weaknessScore: this.calculateWeaknessScore(accuracy, efficiency, consistency),
                subjectWeight: this.subjectWeights[subject] || 1.0
            };
        });

        return metrics;
    }

    // Calculate efficiency based on time and accuracy
    calculateEfficiency(averageTime, accuracy) {
        if (!averageTime || averageTime <= 0) return 0.5;
        
        // Optimal time range: 30-90 seconds per question
        const optimalTime = 60;
        const timeEfficiency = Math.max(0, 1 - Math.abs(averageTime - optimalTime) / optimalTime);
        
        // Combine time efficiency with accuracy
        return (timeEfficiency * 0.4) + (accuracy * 0.6);
    }

    // Calculate consistency (simulated based on available data)
    calculateConsistency(data) {
        // Simulate consistency based on total questions and accuracy
        const baseConsistency = data.correctAnswers / data.totalQuestions;
        const questionVariance = Math.min(data.totalQuestions / 50, 1); // More questions = more consistent
        
        return (baseConsistency * 0.7) + (questionVariance * 0.3);
    }

    // Calculate improvement trend (simulated)
    calculateImprovement(data) {
        // Simulate improvement based on performance metrics
        const accuracy = data.correctAnswers / data.totalQuestions;
        const timeBonus = data.averageTime < 90 ? 0.1 : 0;
        
        return Math.min(accuracy + timeBonus + (Math.random() * 0.2 - 0.1), 1);
    }

    // Calculate weakness score (higher score = more weakness)
    calculateWeaknessScore(accuracy, efficiency, consistency) {
        const weightedScore = (accuracy * 0.5) + (efficiency * 0.3) + (consistency * 0.2);
        return Math.round((1 - weightedScore) * 100) / 100; // Invert so higher = more weakness
    }

    // Identify patterns in student weaknesses
    identifyWeaknessPatterns(performanceMetrics) {
        const patterns = {
            criticalSubjects: [],
            moderateWeaknesses: [],
            strengths: [],
            overallTrend: 'stable'
        };

        Object.keys(performanceMetrics).forEach(subject => {
            const metrics = performanceMetrics[subject];
            const weaknessScore = metrics.weaknessScore;

            if (weaknessScore > 0.6) {
                patterns.criticalSubjects.push({
                    subject,
                    weaknessScore,
                    primaryIssue: this.identifyPrimaryIssue(metrics)
                });
            } else if (weaknessScore > 0.3) {
                patterns.moderateWeaknesses.push({
                    subject,
                    weaknessScore,
                    primaryIssue: this.identifyPrimaryIssue(metrics)
                });
            } else {
                patterns.strengths.push({
                    subject,
                    strengthScore: 1 - weaknessScore
                });
            }
        });

        // Determine overall trend
        const avgWeakness = Object.values(performanceMetrics)
            .reduce((sum, metrics) => sum + metrics.weaknessScore, 0) / 
            Object.keys(performanceMetrics).length;

        if (avgWeakness > 0.5) {
            patterns.overallTrend = 'declining';
        } else if (avgWeakness < 0.3) {
            patterns.overallTrend = 'improving';
        }

        return patterns;
    }

    // Identify the primary issue for a subject
    identifyPrimaryIssue(metrics) {
        if (metrics.accuracy < 0.5) return 'accuracy';
        if (metrics.efficiency < 0.5) return 'efficiency';
        if (metrics.consistency < 0.5) return 'consistency';
        return 'general';
    }

    // Calculate difficulty scores for recommendations
    calculateDifficultyScores(performanceMetrics) {
        const scores = {};

        Object.keys(performanceMetrics).forEach(subject => {
            const metrics = performanceMetrics[subject];
            const weaknessScore = metrics.weaknessScore;

            let difficulty;
            if (weaknessScore > 0.6) {
                difficulty = 'easy';
            } else if (weaknessScore > 0.3) {
                difficulty = 'medium';
            } else {
                difficulty = 'hard';
            }

            scores[subject] = {
                difficulty,
                confidenceLevel: this.calculateConfidenceLevel(metrics),
                recommendedIntensity: this.calculateRecommendedIntensity(weaknessScore)
            };
        });

        return scores;
    }

    // Calculate confidence level in the analysis
    calculateConfidenceLevel(metrics) {
        const dataQuality = Math.min(metrics.totalQuestions / 20, 1); // More questions = higher confidence
        const consistencyFactor = metrics.consistency;
        
        return Math.round(((dataQuality * 0.6) + (consistencyFactor * 0.4)) * 100);
    }

    // Calculate recommended study intensity
    calculateRecommendedIntensity(weaknessScore) {
        if (weaknessScore > 0.7) return 'high';
        if (weaknessScore > 0.4) return 'medium';
        return 'low';
    }

    // Analyze learning velocity (rate of improvement)
    analyzeLearningVelocity(studentData) {
        const velocity = {
            overallVelocity: 'moderate',
            subjectVelocities: {},
            predictedImprovement: {}
        };

        Object.keys(studentData).forEach(subject => {
            const data = studentData[subject];
            const accuracy = data.correctAnswers / data.totalQuestions;
            
            // Simulate velocity based on current performance
            let subjectVelocity;
            if (accuracy > 0.8) {
                subjectVelocity = 'slow'; // Already performing well
            } else if (accuracy > 0.5) {
                subjectVelocity = 'moderate';
            } else {
                subjectVelocity = 'fast'; // Lots of room for improvement
            }

            velocity.subjectVelocities[subject] = subjectVelocity;
            
            // Predict improvement over next 30 days
            const baseImprovement = (1 - accuracy) * 0.3; // 30% of remaining potential
            velocity.predictedImprovement[subject] = Math.round((accuracy + baseImprovement) * 100);
        });

        return velocity;
    }

    // Generate comprehensive weakness analysis
    generateWeaknessAnalysis(performanceMetrics, weaknessPatterns, difficultyScores, learningVelocity) {
        const analysis = {
            summary: this.generateAnalysisSummary(weaknessPatterns),
            recommendations: this.generateAnalysisRecommendations(performanceMetrics, difficultyScores),
            prioritySubjects: this.identifyPrioritySubjects(performanceMetrics, weaknessPatterns),
            studyPlan: this.generateStudyPlan(performanceMetrics, learningVelocity)
        };

        return analysis;
    }

    // Generate analysis summary
    generateAnalysisSummary(weaknessPatterns) {
        const criticalCount = weaknessPatterns.criticalSubjects.length;
        const moderateCount = weaknessPatterns.moderateWeaknesses.length;
        const strengthCount = weaknessPatterns.strengths.length;

        let summary = '';
        if (criticalCount > 0) {
            summary = `You have ${criticalCount} subject(s) that need immediate attention. `;
        }
        if (moderateCount > 0) {
            summary += `${moderateCount} subject(s) show moderate weakness areas. `;
        }
        if (strengthCount > 0) {
            summary += `You're performing well in ${strengthCount} subject(s).`;
        }

        return summary || 'Your performance is balanced across all subjects.';
    }

    // Generate analysis-based recommendations
    generateAnalysisRecommendations(performanceMetrics, difficultyScores) {
        const recommendations = [];

        Object.keys(performanceMetrics).forEach(subject => {
            const metrics = performanceMetrics[subject];
            const difficulty = difficultyScores[subject];

            if (metrics.weaknessScore > 0.4) {
                recommendations.push({
                    subject,
                    type: 'improvement',
                    priority: metrics.weaknessScore > 0.6 ? 'high' : 'medium',
                    focus: this.identifyPrimaryIssue(metrics),
                    estimatedTime: this.estimateStudyTime(metrics.weaknessScore)
                });
            }
        });

        return recommendations.sort((a, b) => {
            const priorityOrder = { high: 3, medium: 2, low: 1 };
            return priorityOrder[b.priority] - priorityOrder[a.priority];
        });
    }

    // Identify priority subjects for focused study
    identifyPrioritySubjects(performanceMetrics, weaknessPatterns) {
        const priorities = [];

        // Add critical subjects first
        weaknessPatterns.criticalSubjects.forEach(item => {
            priorities.push({
                subject: item.subject,
                priority: 'critical',
                reason: 'Low performance requires immediate attention',
                weeklyHours: 6
            });
        });

        // Add moderate weaknesses
        weaknessPatterns.moderateWeaknesses.forEach(item => {
            priorities.push({
                subject: item.subject,
                priority: 'moderate',
                reason: 'Room for improvement with focused practice',
                weeklyHours: 4
            });
        });

        return priorities.slice(0, 3); // Top 3 priorities
    }

    // Generate personalized study plan
    generateStudyPlan(performanceMetrics, learningVelocity) {
        const plan = {
            dailySchedule: {},
            weeklyGoals: {},
            monthlyTargets: {}
        };

        Object.keys(performanceMetrics).forEach(subject => {
            const metrics = performanceMetrics[subject];
            const velocity = learningVelocity.subjectVelocities[subject];

            // Daily recommendations
            if (metrics.weaknessScore > 0.5) {
                plan.dailySchedule[subject] = {
                    minutes: 30,
                    activities: ['Practice problems', 'Review concepts', 'Take quiz']
                };
            } else if (metrics.weaknessScore > 0.3) {
                plan.dailySchedule[subject] = {
                    minutes: 20,
                    activities: ['Practice problems', 'Review notes']
                };
            }

            // Weekly goals
            const currentAccuracy = metrics.accuracy * 100;
            const targetImprovement = velocity === 'fast' ? 15 : velocity === 'moderate' ? 10 : 5;
            
            plan.weeklyGoals[subject] = {
                targetAccuracy: Math.min(currentAccuracy + targetImprovement, 95),
                practiceQuestions: Math.ceil(metrics.weaknessScore * 50),
                focusAreas: this.getFocusAreas(subject, metrics)
            };
        });

        return plan;
    }

    // Get focus areas for a subject
    getFocusAreas(subject, metrics) {
        const focusMap = {
            'Mathematics': ['Algebra', 'Geometry', 'Statistics', 'Problem Solving'],
            'Science': ['Physics', 'Chemistry', 'Biology', 'Scientific Method'],
            'English': ['Grammar', 'Vocabulary', 'Reading Comprehension', 'Writing'],
            'History': ['Timeline Events', 'Cause and Effect', 'Historical Analysis'],
            'Geography': ['Physical Features', 'Climate Patterns', 'Human Geography']
        };

        const areas = focusMap[subject] || ['General Concepts'];
        const numAreas = metrics.weaknessScore > 0.6 ? 3 : metrics.weaknessScore > 0.3 ? 2 : 1;
        
        return areas.slice(0, numAreas);
    }

    // Estimate study time needed
    estimateStudyTime(weaknessScore) {
        if (weaknessScore > 0.7) return '45-60 minutes daily';
        if (weaknessScore > 0.4) return '30-45 minutes daily';
        return '15-30 minutes daily';
    }

    // Calculate overall progress percentage
    calculateOverallProgress(performanceMetrics) {
        const subjects = Object.keys(performanceMetrics);
        if (subjects.length === 0) return 0;

        const totalWeightedScore = subjects.reduce((sum, subject) => {
            const metrics = performanceMetrics[subject];
            const subjectScore = (1 - metrics.weaknessScore) * metrics.subjectWeight;
            return sum + subjectScore;
        }, 0);

        const totalWeight = subjects.reduce((sum, subject) => {
            return sum + (this.subjectWeights[subject] || 1.0);
        }, 0);

        return Math.round((totalWeightedScore / totalWeight) * 100);
    }

    // Get default analysis for error cases
    getDefaultAnalysis() {
        return {
            performanceMetrics: {},
            weaknessPatterns: {
                criticalSubjects: [],
                moderateWeaknesses: [],
                strengths: [],
                overallTrend: 'stable'
            },
            difficultyScores: {},
            learningVelocity: {
                overallVelocity: 'moderate',
                subjectVelocities: {},
                predictedImprovement: {}
            },
            weaknessAnalysis: {
                summary: 'Unable to analyze performance data. Please ensure you have completed some assessments.',
                recommendations: [],
                prioritySubjects: [],
                studyPlan: { dailySchedule: {}, weeklyGoals: {}, monthlyTargets: {} }
            },
            overallProgress: 0,
            timestamp: Date.now(),
            analysisVersion: '1.0'
        };
    }

    // Get default subject metrics
    getDefaultSubjectMetrics() {
        return {
            accuracy: 0,
            efficiency: 0,
            consistency: 0,
            improvement: 0,
            totalQuestions: 0,
            correctAnswers: 0,
            averageTime: 0,
            weaknessScore: 1.0,
            subjectWeight: 1.0
        };
    }

    // Validate input data
    validateStudentData(studentData) {
        if (!studentData || typeof studentData !== 'object') {
            return false;
        }

        // Check if at least one subject has valid data
        return Object.keys(studentData).some(subject => {
            const data = studentData[subject];
            return data && 
                   typeof data.totalQuestions === 'number' && 
                   typeof data.correctAnswers === 'number' &&
                   data.totalQuestions > 0;
        });
    }
}

// Create global ML analyzer instance
window.mlAnalyzer = new MLAnalyzer();

// Initialize ML analyzer when the script loads
document.addEventListener('DOMContentLoaded', () => {
    window.mlAnalyzer.init();
});
