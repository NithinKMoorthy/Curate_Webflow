'use client';
import React, { useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';

// ✅ Define types
type Source = {
  name: string;
  icon: string;
};

function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  const steps = [
    {
      title: 'Welcome to Curate',
      description: 'Discover a smarter way to consume content from across the web.'
    },
    {
      title: 'Connect Your Sources',
      description: 'Bring all your favorite platforms into one place.'
    },
    {
      title: 'Tell Us What You Like',
      description: 'Help us understand your interests for better recommendations.'
    },
    {
      title: 'Content, Simplified',
      description: 'Get the key points without the noise.'
    },
    {
      title: "You're All Set!",
      description: 'Your personalized feed is ready. Start exploring tailored content now.'
    }
  ];

  const sources: Source[] = [
    { name: 'Reddit', icon: '/api/placeholder/40/40' },
    { name: 'X (Twitter)', icon: '/api/placeholder/40/40' },
    { name: 'Medium', icon: '/api/placeholder/40/40' },
    { name: 'Podcasts', icon: '/api/placeholder/40/40' },
    { name: 'YouTube', icon: '/api/placeholder/40/40' },
    { name: 'RSS', icon: '/api/placeholder/40/40' }
  ];

  const topics = [
    'Technology', 'Business', 'Science', 'Health', 'Politics',
    'Sports', 'Entertainment', 'Design', 'Education',
    'Finance', 'Travel', 'Food'
  ];

  const features = [
    'Personalized summaries of the content you care about',
    'Save hours of reading and listening time',
    'Discover insights you might have missed'
  ];

  function toggleSource(name: string) {
    setSelectedSources(prev =>
      prev.includes(name) ? prev.filter(s => s !== name) : [...prev, name]
    );
  }

  function toggleTopic(topic: string) {
    setSelectedTopics(prev =>
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    );
  }

  function nextStep() {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  }

  function prevStep() {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  }

  function skipToEnd() {
    setCurrentStep(steps.length - 1);
  }

  function renderContent() {
    switch (currentStep) {
      case 0:
        return (
          <div className="text-center">
            <img src="/api/placeholder/300/200" alt="Welcome" className="mx-auto rounded-lg mb-6" />
            <h2 className="text-2xl font-bold mb-4">{steps[0].title}</h2>
            <p className="text-lg mb-6">{steps[0].description}</p>
            <div className="space-y-3 mb-8">
              {features.map((feature, i) => (
                <div key={i} className="flex items-center">
                  <Check size={18} className="text-indigo-600 mr-2" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 1:
        return (
          <div className="text-center">
            <img src="/api/placeholder/300/200" alt="Connect Sources" className="mx-auto rounded-lg mb-6" />
            <h2 className="text-2xl font-bold mb-4">{steps[1].title}</h2>
            <p className="text-lg mb-6">{steps[1].description}</p>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {sources.map((source: Source, i) => (
                <div
                  key={i}
                  onClick={() => toggleSource(source.name)}
                  className={`p-3 border-2 rounded-lg flex items-center cursor-pointer ${
                    selectedSources.includes(source.name)
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200'
                  }`}
                >
                  <img src={source.icon} alt={source.name} className="w-8 h-8 mr-3" />
                  <span>{source.name}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500">
              Selected {selectedSources.length} source(s)
            </p>
          </div>
        );

      case 2:
        return (
          <div className="text-center">
            <img src="/api/placeholder/300/200" alt="Topics" className="mx-auto rounded-lg mb-6" />
            <h2 className="text-2xl font-bold mb-4">{steps[2].title}</h2>
            <p className="text-lg mb-6">{steps[2].description}</p>
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {topics.map((topic, i) => (
                <button
                  key={i}
                  onClick={() => toggleTopic(topic)}
                  className={`px-4 py-2 rounded-full text-sm ${
                    selectedTopics.includes(topic)
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-500">
              Selected {selectedTopics.length} topic(s)
            </p>
          </div>
        );

      case 3:
        return (
          <div className="text-center">
            <img src="/api/placeholder/300/200" alt="Summarization" className="mx-auto rounded-lg mb-6" />
            <h2 className="text-2xl font-bold mb-4">{steps[3].title}</h2>
            <p className="text-lg mb-6">{steps[3].description}</p>
            <div className="bg-gray-100 rounded-lg p-4 mb-6">
              <p className="font-medium mb-3">Choose your preferred summary length:</p>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="radio" name="length" className="mr-2" defaultChecked />
                  <span>Short (2-3 min read)</span>
                </label>
                <label className="flex items-center">
                  <input type="radio" name="length" className="mr-2" />
                  <span>Medium (4-5 min read)</span>
                </label>
                <label className="flex items-center">
                  <input type="radio" name="length" className="mr-2" />
                  <span>Long (7-10 min read)</span>
                </label>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check size={32} className="text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-4">{steps[4].title}</h2>
            <p className="text-lg mb-6">{steps[4].description}</p>
            <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium flex items-center justify-center">
              <Link href="/dashboard/protected-home">Go to my feed</Link>
              <ArrowRight size={18} className="ml-2" />
            </button>
          </div>
        );

      default:
        return null;
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Progress bar */}
      <div className="bg-white p-4 border-b">
        <div className="max-w-md mx-auto">
          <div className="flex justify-between items-center">
            {steps.map((_, i) => (
              <React.Fragment key={i}>
                <div className={`w-4 h-4 rounded-full ${i <= currentStep ? 'bg-indigo-600' : 'bg-gray-300'}`}></div>
                {i < steps.length - 1 && (
                  <div className={`flex-1 h-1 ${i < currentStep ? 'bg-indigo-600' : 'bg-gray-300'}`}></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center p-4">
        <div className="max-w-md mx-auto w-full">
          {renderContent()}
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white p-4 border-t">
        <div className="max-w-md mx-auto flex justify-between">
          {currentStep < steps.length - 1 ? (
            <>
              {currentStep > 0 ? (
                <button className="px-4 py-2 text-gray-600" onClick={prevStep}>
                  Back
                </button>
              ) : (
                <div></div>
              )}
              <div>
                <button className="px-4 py-2 text-gray-500 mr-2" onClick={skipToEnd}>
                  Skip
                </button>
                <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg" onClick={nextStep}>
                  Next
                </button>
              </div>
            </>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OnboardingPage;
