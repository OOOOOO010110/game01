import React, { useState, useEffect } from 'react';
import { Gift } from 'lucide-react';

const FinalReward: React.FC = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [showGift, setShowGift] = useState(false);
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowMessage(true), 1000);
    setTimeout(() => setShowGift(true), 2000);
  }, []);

  const handleGiftClick = () => {
    setShowCard(true);
  };

  return (
    <div className="text-center space-y-6">
      <h2 className="text-3xl font-bold text-purple-700">恭喜你！</h2>
      {showMessage && (
        <p className="text-xl animate-fade-in">
          你已经完成了所有任务，解锁了你的生日惊喜！
        </p>
      )}
      {showGift && (
        <div className="animate-bounce cursor-pointer" onClick={handleGiftClick}>
          <Gift className="w-24 h-24 mx-auto text-pink-500" />
          <p className="text-2xl font-bold mt-4">点击打开你的礼物！</p>
        </div>
      )}
      {showCard && (
        <div className="animate-fade-in bg-pink-100 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-purple-700 mb-4">生日贺卡</h3>
          <p className="text-xl">王沁怡，祝你生日快乐！</p>
        </div>
      )}
      <div className="mt-8">
        <div className="animate-confetti">🎉</div>
        <div className="animate-confetti delay-100">🎈</div>
        <div className="animate-confetti delay-200">🎁</div>
        <div className="animate-confetti delay-300">🎊</div>
      </div>
    </div>
  );
};

export default FinalReward;

import React, { useState, useEffect } from 'react';

interface PuzzleTaskProps {
  onComplete: () => void;
}

const PuzzleTask: React.FC<PuzzleTaskProps> = ({ onComplete }) => {
  const [pieces, setPieces] = useState<number[]>([]);
  const [solved, setSolved] = useState(false);

  const cakeImageUrl = "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=600&q=80";

  useEffect(() => {
    setPieces(shuffleArray([0, 1, 2, 3, 4, 5, 6, 7, 8]));
  }, []);

  const shuffleArray = (array: number[]) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetIndex: number) => {
    e.preventDefault();
    const sourceIndex = parseInt(e.dataTransfer.getData('text/plain'));
    const newPieces = [...pieces];
    [newPieces[sourceIndex], newPieces[targetIndex]] = [newPieces[targetIndex], newPieces[sourceIndex]];
    setPieces(newPieces);

    if (newPieces.every((piece, index) => piece === index)) {
      setSolved(true);
      setTimeout(onComplete, 1500);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-purple-700">拼图时间！</h2>
      <p className="text-lg">拖放拼图块来完成生日蛋糕图片！</p>
      <div className="grid grid-cols-3 gap-1 max-w-sm mx-auto">
        {pieces.map((piece, index) => (
          <div
            key={index}
            className="border-2 border-dashed border-purple-300 rounded-lg p-1 aspect-square"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
          <div
  className="w-full h-full bg-cover bg-no-repeat cursor-move"
  style={{
    backgroundImage: `url(${cakeImageUrl})`,
    backgroundPosition: `${(piece % 3) * -100}% ${(Math.floor(piece / 3)) * -100}%`,
    backgroundSize: "300%"
  }}
  draggable
  onDragStart={(e) => handleDragStart(e, index)}
/>
        ))}
      </div>
      {solved && (
        <p className="text-lg font-bold text-green-500">
          恭喜！你已经完成了拼图！
        </p>
      )}
    </div>
  );
};

export default PuzzleTask;

import React, { useState } from 'react';

interface RiddleTaskProps {
  onComplete: () => void;
}

const RiddleTask: React.FC<RiddleTaskProps> = ({ onComplete }) => {
  const [currentRiddle, setCurrentRiddle] = useState(0);
  const [feedback, setFeedback] = useState('');

  const riddles = [
    {
      question: "我年轻时高大，年老时矮小。我是什么？",
      options: ["人", "树", "蜡烛", "山"],
      correctAnswer: "蜡烛"
    },
    {
      question: "有键盘没有锁，有空间进不去。我是什么？",
      options: ["房子", "键盘", "汽车", "手机"],
      correctAnswer: "键盘"
    },
    {
      question: "越擦越湿的是什么？",
      options: ["海绵", "毛巾", "吹风机", "洗碗机"],
      correctAnswer: "毛巾"
    }
  ];

  const handleAnswer = (answer: string) => {
    if (answer === riddles[currentRiddle].correctAnswer) {
      setFeedback('正确！太棒了！');
      setTimeout(() => {
        if (currentRiddle < riddles.length - 1) {
          setCurrentRiddle(currentRiddle + 1);
          setFeedback('');
        } else {
          onComplete();
        }
      }, 1500);
    } else {
      setFeedback('哎呀！再试一次！');
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-purple-700">谜语时间！</h2>
      <p className="text-lg">{riddles[currentRiddle].question}</p>
      <div className="grid grid-cols-2 gap-4">
        {riddles[currentRiddle].options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option)}
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            {option}
          </button>
        ))}
      </div>
      {feedback && (
        <p className={`text-lg font-bold ${feedback.includes('正确') ? 'text-green-500' : 'text-red-500'}`}>
          {feedback}
        </p>
      )}
    </div>
  );
};

export default RiddleTask;

import React, { useState } from 'react';

interface SpotDifferencesTaskProps {
  onComplete: () => void;
}

const SpotDifferencesTask: React.FC<SpotDifferencesTaskProps> = ({ onComplete }) => {
  const [differences, setDifferences] = useState<number[]>([]);
  const totalDifferences = 5;

  const handleClick = (index: number) => {
    if (!differences.includes(index)) {
      const newDifferences = [...differences, index];
      setDifferences(newDifferences);
      if (newDifferences.length === totalDifferences) {
        setTimeout(onComplete, 1500);
      }
    }
  };

  const imageUrl = "https://source.unsplash.com/random/400x300?girl,dancing,night,playground,illustration";

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-purple-700">找不同！</h2>
      <p className="text-lg">在这两张图片中找出5处不同！</p>
      <div className="grid grid-cols-2 gap-4">
        <div className="relative">
          <img
            src={imageUrl}
            alt="原始场景"
            className="w-full h-auto rounded-lg"
          />
          {[...Array(totalDifferences)].map((_, index) => (
            <div
              key={index}
              className={`absolute w-8 h-8 rounded-full border-2 border-red-500 cursor-pointer ${
                differences.includes(index) ? 'bg-red-200 bg-opacity-50' : ''
              }`}
              style={{
                top: `${20 + index * 15}%`,
                left: `${20 + index * 15}%`,
              }}
              onClick={() => handleClick(index)}
            ></div>
          ))}
        </div>
        <img
          src={imageUrl}
          alt="修改后的场景"
          className="w-full h-auto rounded-lg"
        />
      </div>
      <p className="text-lg font-bold">
        已找到的不同: {differences.length} / {totalDifferences}
      </p>
      {differences.length === totalDifferences && (
        <p className="text-lg font-bold text-green-500">
          太棒了！你已经找到了所有的不同！
        </p>
      )}
    </div>
  );
};

export default SpotDifferencesTask;

import React, { useState, useEffect } from 'react';
import { Gift, Puzzle, Search, MessageCircle, Share2 } from 'lucide-react';
import RiddleTask from './components/RiddleTask';
import PuzzleTask from './components/PuzzleTask';
import SpotDifferencesTask from './components/SpotDifferencesTask';
import FinalReward from './components/FinalReward';

const App: React.FC = () => {
  const [currentTask, setCurrentTask] = useState(0);
  const [completedTasks, setCompletedTasks] = useState([false, false, false]);
  const [showQRCode, setShowQRCode] = useState(false);

  const tasks = [
    { name: '谜语', icon: <MessageCircle className="w-6 h-6" /> },
    { name: '拼图', icon: <Puzzle className="w-6 h-6" /> },
    { name: '找不同', icon: <Search className="w-6 h-6" /> },
  ];

  const handleTaskComplete = (taskIndex: number) => {
    const newCompletedTasks = [...completedTasks];
    newCompletedTasks[taskIndex] = true;
    setCompletedTasks(newCompletedTasks);
    if (taskIndex < 2) {
      setCurrentTask(taskIndex + 1);
    }
  };

  const allTasksCompleted = completedTasks.every(task => task);

  const handleShare = () => {
    setShowQRCode(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 to-purple-300 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-purple-800 mb-8 animate-bounce">生日寻宝游戏</h1>
      
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
        {!allTasksCompleted ? (
          <>
            <div className="flex justify-center mb-6">
              {tasks.map((task, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-center mx-4 ${
                    completedTasks[index] ? 'text-green-500' : index === currentTask ? 'text-blue-500' : 'text-gray-400'
                  }`}
                >
                  {task.icon}
                  <span className="text-sm mt-1">{task.name}</span>
                </div>
              ))}
            </div>
            
            {currentTask === 0 && <RiddleTask onComplete={() => handleTaskComplete(0)} />}
            {currentTask === 1 && <PuzzleTask onComplete={() => handleTaskComplete(1)} />}
            {currentTask === 2 && <SpotDifferencesTask onComplete={() => handleTaskComplete(2)} />}
          </>
        ) : (
          <FinalReward />
        )}
      </div>

      <button
        onClick={handleShare}
        className="mt-4 bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded flex items-center"
      >
        <Share2 className="w-5 h-5 mr-2" />
        分享游戏
      </button>

      {showQRCode && (
        <div className="mt-4 bg-white p-4 rounded-lg shadow-lg">
          <h3 className="text-lg font-bold mb-2">扫描二维码分享游戏</h3>
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(window.location.href)}`}
            alt="分享二维码"
            className="mx-auto"
          />
        </div>
      )}
    </div>
  );
};

export default App;

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
