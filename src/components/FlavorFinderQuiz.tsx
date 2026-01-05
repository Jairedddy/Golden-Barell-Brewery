import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Share2, Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  findMatchingBeers, 
  getRecommendedPairing, 
  getTasteProfileDescription,
  answersToProfile,
  type BeerProfile 
} from '@/lib/flavor-engine';

interface FlavorFinderQuizProps {
  onComplete?: (beers: BeerProfile[]) => void;
  onClose?: () => void;
}

const QUIZ_STEPS = [
  {
    id: 1,
    question: 'How bitter do you like your beer?',
    description: 'From smooth and mild to bold and hoppy',
    key: 'bitterness' as const,
    labels: ['Smooth & Mild', 'Moderate', 'Bold & Bitter'],
  },
  {
    id: 2,
    question: 'How sweet do you prefer?',
    description: 'From dry and crisp to rich and sweet',
    key: 'sweetness' as const,
    labels: ['Dry & Crisp', 'Balanced', 'Rich & Sweet'],
  },
  {
    id: 3,
    question: 'Do you prefer light or dark beers?',
    description: 'From light and crisp to dark and roasted',
    key: 'roast' as const,
    labels: ['Light & Crisp', 'Medium', 'Dark & Roasted'],
  },
  {
    id: 4,
    question: 'How much do you enjoy citrus and fruit notes?',
    description: 'From malty and earthy to bright and citrusy',
    key: 'citrus' as const,
    labels: ['Malty & Earthy', 'Balanced', 'Bright & Citrusy'],
  },
];

const FlavorFinderQuiz: React.FC<FlavorFinderQuizProps> = ({ onComplete, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    bitterness: 5,
    sweetness: 5,
    roast: 5,
    citrus: 5,
  });
  const [results, setResults] = useState<BeerProfile[] | null>(null);
  const [showShareCard, setShowShareCard] = useState(false);

  const handleSliderChange = (key: keyof typeof answers, value: number[]) => {
    setAnswers(prev => ({
      ...prev,
      [key]: value[0],
    }));
  };

  const nextStep = () => {
    if (currentStep < QUIZ_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Calculate results
      const profile = answersToProfile(answers);
      const matchingBeers = findMatchingBeers(profile);
      setResults(matchingBeers);
      if (onComplete) {
        onComplete(matchingBeers);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleShare = async () => {
    if (!results) return;

    const profile = answersToProfile(answers);
    const topBeer = results[0];
    const description = getTasteProfileDescription(profile);
    const pairing = getRecommendedPairing(topBeer);

    const shareText = `🍺 My Flavor Profile: ${description}\n\nTop Match: ${topBeer.name}\nPerfect Pairing: ${pairing}\n\nFind your perfect beer at Golden Barrel!`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Golden Barrel Flavor Profile',
          text: shareText,
        });
      } catch (err) {
        // User cancelled or error occurred
        console.log('Share cancelled');
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(shareText);
      setShowShareCard(true);
      setTimeout(() => setShowShareCard(false), 2000);
    }
  };

  const scrollToMenu = () => {
    const element = document.querySelector('#menu');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (onClose) {
      setTimeout(() => onClose(), 500);
    }
  };

  if (results) {
    const profile = answersToProfile(answers);
    const topBeer = results[0];
    const pairing = getRecommendedPairing(topBeer);
    const description = getTasteProfileDescription(profile);

    return (
      <div className="w-full max-w-4xl mx-auto space-y-6">
        {/* Results Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="flex items-center justify-center space-x-2">
            <Sparkles className="h-8 w-8 text-primary" />
            <h2 className="text-3xl font-display font-bold text-foreground">Your Perfect Matches</h2>
          </div>
          <p className="text-muted-foreground">
            Based on your taste profile: <span className="font-semibold text-primary">{description}</span>
          </p>
        </motion.div>

        {/* Top 3 Beers */}
        <div className="grid md:grid-cols-3 gap-6">
          {results.map((beer, index) => (
            <motion.div
              key={beer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="brew-card h-full">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-1">{beer.name}</CardTitle>
                      <CardDescription className="text-xs text-primary font-medium">
                        {beer.style} • {beer.abv}
                      </CardDescription>
                    </div>
                    {index === 0 && (
                      <div className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-semibold">
                        #1 Match
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {beer.description}
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <span className="text-lg font-semibold text-primary">{beer.price}</span>
                    {index === 0 && (
                      <span className="text-xs text-muted-foreground">
                        Perfect with: {pairing}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Recommended Pairing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="brew-card bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Check className="h-5 w-5 text-primary" />
                <span>Recommended Pairing</span>
              </CardTitle>
              <CardDescription>
                Our chef recommends pairing {topBeer.name} with
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-display font-semibold text-foreground mb-4">
                {pairing}
              </p>
              <p className="text-sm text-muted-foreground">
                The {topBeer.style.toLowerCase()} complements the flavors perfectly, creating a harmonious dining experience.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            onClick={scrollToMenu}
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
          >
            View Full Menu
          </Button>
          <Button
            onClick={handleShare}
            size="lg"
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10 font-semibold"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share My Profile
          </Button>
          <Button
            onClick={() => {
              setResults(null);
              setCurrentStep(0);
              setAnswers({ bitterness: 5, sweetness: 5, roast: 5, citrus: 5 });
            }}
            size="lg"
            variant="ghost"
            className="text-muted-foreground hover:text-foreground"
          >
            Take Quiz Again
          </Button>
        </motion.div>

        {/* Share Success Toast */}
        <AnimatePresence>
          {showShareCard && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-6 right-6 bg-primary text-primary-foreground px-4 py-3 rounded-lg shadow-lg z-50"
            >
              <p className="text-sm font-medium">Copied to clipboard!</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  const currentQuestion = QUIZ_STEPS[currentStep];
  const progress = ((currentStep + 1) / QUIZ_STEPS.length) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Question {currentStep + 1} of {QUIZ_STEPS.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="brew-card">
            <CardHeader>
              <CardTitle className="text-2xl mb-2">{currentQuestion.question}</CardTitle>
              <CardDescription>{currentQuestion.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Slider
                  value={[answers[currentQuestion.key]]}
                  onValueChange={(value) => handleSliderChange(currentQuestion.key, value)}
                  min={0}
                  max={10}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{currentQuestion.labels[0]}</span>
                  <span className="text-primary font-semibold text-base">
                    {answers[currentQuestion.key]}
                  </span>
                  <span>{currentQuestion.labels[2]}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          onClick={prevStep}
          disabled={currentStep === 0}
          variant="outline"
          className="border-border"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <Button
          onClick={nextStep}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {currentStep === QUIZ_STEPS.length - 1 ? 'See Results' : 'Next'}
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default FlavorFinderQuiz;

