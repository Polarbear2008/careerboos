
import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/context/useLanguage";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import CareerTestHeader from "@/components/career-test/CareerTestHeader";
import CareerTestProgress from "@/components/career-test/CareerTestProgress";
import QuestionCard from "@/components/career-test/QuestionCard";
import SkillsAssessment from "@/components/career-test/SkillsAssessment";
import ResultsSection from "@/components/career-test/ResultsSection";
import { useToast } from "@/components/ui/use-toast";
import { motion, AnimatePresence } from "framer-motion";

type TestStage = "intro" | "skills" | "questions" | "results";

const CareerTest = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [stage, setStage] = useState<TestStage>("intro");
  const [progress, setProgress] = useState(0);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const questionsRef = useRef<HTMLDivElement>(null);
  
  const handleStartTest = () => {
    setStage("skills");
    toast({
      title: t("Let's begin your career assessment"),
      description: t("First, select skills you're interested in or have experience with"),
    });
  };

  const handleSkillsComplete = (skills: string[]) => {
    setSelectedSkills(skills);
    setStage("questions");
    setProgress(25);
    toast({
      title: t("Skills selected"),
      description: t("Now let's assess your experience level"),
    });
  };

  const handleQuestionSubmit = (questionId: string, rating: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: rating
    }));
    
    // Update progress based on questions answered
    const questionsCount = selectedSkills.length;
    const answeredCount = Object.keys(answers).length + 1;
    const progressValue = 25 + (answeredCount / questionsCount) * 70;
    setProgress(Math.min(progressValue, 95));
    
    // If all questions are answered, show results
    if (answeredCount >= questionsCount) {
      setTimeout(() => {
        setStage("results");
        setProgress(100);
        toast({
          title: t("Assessment completed"),
          description: t("Here are your personalized career recommendations"),
        });
      }, 500);
    }
  };

  // Scroll to questions when stage changes
  useEffect(() => {
    if (stage === "questions" && questionsRef.current) {
      setTimeout(() => {
        questionsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [stage]);

  const slideVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavBar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="page-container relative">
          <CareerTestProgress progress={progress} />
          
          <AnimatePresence mode="wait">
            {stage === "intro" && (
              <motion.div
                key="intro"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={slideVariants}
                transition={{ duration: 0.4 }}
              >
                <CareerTestHeader onStart={handleStartTest} />
              </motion.div>
            )}
            
            {stage === "skills" && (
              <motion.div
                key="skills"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={slideVariants}
                transition={{ duration: 0.4 }}
              >
                <SkillsAssessment onComplete={handleSkillsComplete} />
              </motion.div>
            )}
            
            {stage === "questions" && (
              <motion.div
                key="questions"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={slideVariants}
                transition={{ duration: 0.4 }}
                ref={questionsRef}
                className="space-y-8 mt-8"
              >
                <h2 className="text-2xl md:text-3xl font-display font-semibold text-center">
                  {t("Rate your experience level")}
                </h2>
                <p className="text-center text-muted-foreground max-w-2xl mx-auto">
                  {t("For each selected skill, indicate your proficiency level from novice to expert.")}
                </p>
                <div className="grid gap-6">
                  {selectedSkills.map((skill, index) => (
                    <QuestionCard
                      key={`${skill}-${index}`}
                      questionId={`${skill}-${index}`}
                      skill={skill}
                      onSubmit={handleQuestionSubmit}
                      isAnswered={!!answers[`${skill}-${index}`]}
                    />
                  ))}
                </div>
              </motion.div>
            )}
            
            {stage === "results" && (
              <motion.div
                key="results"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={slideVariants}
                transition={{ duration: 0.4 }}
              >
                <ResultsSection 
                  skills={selectedSkills} 
                  ratings={answers} 
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CareerTest;
