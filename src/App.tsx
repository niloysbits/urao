import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, Navigation, Rocket, Wind, AlertTriangle, CheckCircle2, 
  Menu, Radar, CreditCard, Activity, HeartPulse, Landmark, 
  Coins, Star, X, Wallet, Trophy, Info, Flame, Award, 
  MessageSquareWarning, ShieldAlert, ThumbsUp, Bike, Truck, 
  ShoppingCart, BedDouble, GraduationCap, Heart, Smile
} from 'lucide-react';

// Funny vehicles with Icons instead of images
const vehicles = [
  {
    id: 'rickshaw',
    name: 'রকেট রিকশা',
    desc: 'উইড়া যাইবো, কিন্তু কই যাইবো গ্যারান্টি নাই।',
    price: '৫০০ দোয়া',
    icon: Bike,
    color: 'text-yellow-600',
    bg: 'bg-yellow-100',
    border: 'border-yellow-400',
  },
  {
    id: 'van',
    name: 'ভ্যানগাড়ি প্রো ম্যাক্স',
    desc: 'সবাইরে একসাথে উড়াইয়া দিমু। বসার সিট নাই, ঝুইলা যাইতে হইবো।',
    price: '২ টা গাইল',
    icon: Truck,
    color: 'text-blue-600',
    bg: 'bg-blue-100',
    border: 'border-blue-400',
  },
  {
    id: 'thela',
    name: 'ঠেলাগাড়ি টার্বো',
    desc: 'পিছন থেইকা এমন ধাক্কা দিমু, সোজা চান্দে গিয়া পড়বেন।',
    price: 'ফ্রি (শর্ত প্রযোজ্য)',
    icon: ShoppingCart,
    color: 'text-green-600',
    bg: 'bg-green-100',
    border: 'border-green-400',
  },
  {
    id: 'bed',
    name: 'উড়ন্ত খাট (VIP)',
    desc: 'ঘুমাইতে ঘুমাইতে উইড়া যান। বালিশ সাথে আনবেন।',
    price: '১টা কিডনি',
    icon: BedDouble,
    color: 'text-purple-600',
    bg: 'bg-purple-100',
    border: 'border-purple-400',
  }
];

const destinations = [
  'মঙ্গল গ্রহ (Mars)',
  'চান্দের দেশ (Moon)',
  "এক্স-এর বিয়া (Ex's Wedding)",
  'শশুর বাড়ি (In-laws)',
  'হিমালয়ের চূড়া (Himalayas)',
  'যেখানে দুই চোখ যায় (Anywhere)',
  'প্যারামুক্ত দুনিয়া (Stress-free World)'
];

const paymentMethods = [
  { id: 'chili', name: 'কাঁচামরিচ পে (Chili Pay)', desc: '১ কেজি কাঁচামরিচ (স্বর্ণের চেয়েও দামি)', icon: Flame, color: 'text-green-600', bg: 'bg-green-100', border: 'border-green-500' },
  { id: 'quota', name: 'কোটা পে (Quota Pay)', desc: 'মেধা লাগবো না, কোটা থাকলেই ফ্রি', icon: Award, color: 'text-blue-600', bg: 'bg-blue-100', border: 'border-blue-500' },
  { id: 'politics', name: 'পলিটিক্স পে (Politics Pay)', desc: '২টা জ্বালাময়ী ভাষণ দিয়া পেমেন্ট করুন', icon: MessageSquareWarning, color: 'text-purple-600', bg: 'bg-purple-100', border: 'border-purple-500' },
  { id: 'kidney', name: 'কিডনি পে (Kidney Pay)', desc: '১টা তাজা কিডনি (বাকি ১টা দিয়ে চলবেন)', icon: HeartPulse, color: 'text-red-600', bg: 'bg-red-100', border: 'border-red-500' },
  { id: 'land', name: 'বাবার জমি', desc: '২ কাঠা জমি (দলিল রেডি রাখেন)', icon: Landmark, color: 'text-amber-700', bg: 'bg-amber-100', border: 'border-amber-700' },
  { id: 'dua', name: 'দোয়া ও ভালোবাসা', desc: 'গরিবের আর কি বা আছে!', icon: Coins, color: 'text-yellow-600', bg: 'bg-yellow-100', border: 'border-yellow-500' },
];

const paymentWarnings = {
  chili: "১ কেজি কাঁচামরিচ দিচ্ছেন! শিওর তো? রাস্তায় ছিনতাইকারী ধরলে কিন্তু মরিচ নিয়া যাবে, গাড়ি রাইখা দিবে!",
  quota: "কোটা দিয়ে পেমেন্ট! ভাই, রাস্তায় কিন্তু সাধারণ ছাত্ররা আটকাইতে পারে। রিস্ক আপনার!",
  politics: "জ্বালাময়ী ভাষণ দিতে গিয়া গলা ভাইঙ্গা গেলে কোম্পানি দায়ী না। মাইক রেডি আছে তো?",
  kidney: "কিডনি তো দিচ্ছেন, কিন্তু পাইলট যদি আপনার লিভারও কাইটা রাইখা দেয়? অপারেশন থিয়েটার রেডি!",
  land: "বাবার জমি লেইখা দিচ্ছেন! বাসায় গেলে কিন্তু জুতা দিয়া পিটাইবো। স্ট্যাম্প পেপার রেডি?",
  dua: "খালি দোয়া দিয়া কি পেট ভরে? পাইলট কিন্তু রাস্তায় মাঝপথে নামাইয়া দিতে পারে!"
};

const trackingStatuses = [
  "পাইলট মফিজ বিড়ি ধরাইছে, একটু ওয়েট করেন...",
  "গাড়ি ম্যাপের বাইরে চইলা গেছে, পাইলট রাস্তা হারাইছে...",
  "আকাশে অনেক জ্যাম, মেঘের সিগন্যালে লাল বাতি...",
  "পাখির লগে ধাক্কা লাগার চান্স, পাইলট চিপা দিয়া টান দিসে...",
  "ইঞ্জিন দিয়া ধোঁয়া বাইর হইতাছে, দোয়া দরুদ পড়েন...",
  "গন্তব্যের কাছাকাছি, লাফ দেওয়ার লাইগা রেডি হন (প্যারাশুট নাই)..."
];

const pilots = [
  { name: 'মফিজ উদ্দিন', rating: '১.২', reviews: 'খুবই বাজে চালায়, কিন্তু উড়ায় ভালো', image: '👨🏽‍✈️' },
  { name: 'কুদ্দুস বয়াতী', rating: '৫.০', reviews: 'গান গাইতে গাইতে উড়ায়, সেই ফিল', image: '🦹🏽‍♂️' },
  { name: 'রকেট রফিক', rating: '৩.৫', reviews: 'মাঝে মাঝে রাস্তা ভুইলা যায়', image: '🦸🏽‍♂️' }
];

const ratingFeedback: Record<number, string> = {
  1: "জঘন্য! মইরা যাইতে নিছিলাম। 🤬",
  2: "কোনোরকমে জান নিয়া ফিরছি। 🤕",
  3: "মোটামুটি, আরেকটু জোরে ক্র্যাশ করতে পারতো। 🙄",
  4: "ভালোই, তবে কিডনিটা ব্যথা করতেছে। 😅",
  5: "অসাধারণ! আবার ক্র্যাশ করতে চাই। 🚀"
};

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [screen, setScreen] = useState<'booking' | 'searching' | 'arriving' | 'payment' | 'tracking' | 'success' | 'rating'>('booking');
  const [selectedVehicle, setSelectedVehicle] = useState(vehicles[0].id);
  const [destination, setDestination] = useState(destinations[0]);
  const [selectedPayment, setSelectedPayment] = useState(paymentMethods[0].id);
  const [trackingStep, setTrackingStep] = useState(0);
  const [assignedPilot, setAssignedPilot] = useState(pilots[0]);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showPaymentWarning, setShowPaymentWarning] = useState(false);
  const [rating, setRating] = useState(0);

  // Handle Searching Simulation
  useEffect(() => {
    if (screen === 'searching') {
      const timer = setTimeout(() => {
        setAssignedPilot(pilots[Math.floor(Math.random() * pilots.length)]);
        setScreen('arriving');
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [screen]);

  // Handle Arriving Simulation
  useEffect(() => {
    if (screen === 'arriving') {
      const timer = setTimeout(() => {
        setScreen('payment');
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [screen]);

  // Handle Tracking Simulation
  useEffect(() => {
    if (screen === 'tracking') {
      setTrackingStep(0);
      const interval = setInterval(() => {
        setTrackingStep(prev => {
          if (prev >= trackingStatuses.length - 1) {
            clearInterval(interval);
            setTimeout(() => setScreen('success'), 4000);
            return prev;
          }
          return prev + 1;
        });
      }, 5500);
      return () => clearInterval(interval);
    }
  }, [screen]);

  const reset = () => {
    setScreen('booking');
    setTrackingStep(0);
    setRating(0);
    setShowPaymentWarning(false);
  };

  const activeVehicle = vehicles.find(v => v.id === selectedVehicle) || vehicles[0];

  return (
    <AnimatePresence mode="wait">
      {showSplash ? (
        <motion.div
          key="splash"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="min-h-screen bg-white text-slate-800 flex flex-col items-center justify-center p-6 relative overflow-hidden z-50"
        >
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
          
          <div className="text-center z-10 max-w-sm w-full flex flex-col items-center">
            {/* Animated Logo */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, type: "spring", bounce: 0.5 }}
              className="mb-6 relative"
            >
              <motion.div 
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-28 h-28 bg-yellow-400 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-yellow-400/40 rotate-3"
              >
                <Rocket className="w-14 h-14 text-slate-900 -rotate-3" />
              </motion.div>
              {/* Decorative elements */}
              <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} className="absolute -top-4 -right-4 w-8 h-8 bg-blue-100 rounded-full -z-10"></motion.div>
              <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 3, repeat: Infinity }} className="absolute -bottom-2 -left-6 w-12 h-12 bg-red-100 rounded-full -z-10"></motion.div>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-4xl font-black text-slate-900 mb-2 tracking-tight"
            >
              উড়াও
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="w-full"
            >
              <p className="text-sm font-medium text-slate-500 mb-8 leading-relaxed px-4">
                <span className="text-slate-400 line-through mr-1">পাঠাও</span> তে জ্যামে বসে জীবন ত্যানা ত্যানা? 😩<br/>
                নিচে রাস্তা নাই, উপরে জ্যাম নাই! সোজা আসমানে উইড়া যান! 🚀
              </p>

              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 text-left mb-8 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-slate-200"></div>
                <h3 className="text-slate-800 font-black flex items-center gap-2 mb-5 text-sm uppercase tracking-wider">
                  <ShieldAlert className="w-4 h-4 text-slate-400" /> প্রাইভেসি পলিসি
                </h3>
                <ul className="text-sm text-slate-600 space-y-4 font-medium leading-relaxed">
                  <li className="flex gap-3 items-start">
                    <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">১</span> 
                    <span>হাত, পা বা কিডনি হারাইলে কর্তৃপক্ষ কোনোভাবেই দায়ী না।</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="w-5 h-5 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">২</span> 
                    <span>পাইলট মাঝ আকাশে ফেলে দিলে প্যারাসুট ছাড়াই ল্যান্ড করতে হবে।</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">৩</span> 
                    <span>ভাড়া নিয়ে ক্যাচাল করলে সোজা মঙ্গলে চালান করে দেওয়া হবে।</span>
                  </li>
                </ul>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowSplash(false)}
                className="w-full py-4 bg-slate-900 text-white font-bold text-base rounded-2xl shadow-xl shadow-slate-900/20 hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
              >
                সব মাইনা নিলাম <CheckCircle2 className="w-5 h-5 text-yellow-400" />
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="main-app"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="min-h-screen bg-slate-100 text-slate-800 font-sans selection:bg-yellow-300 relative overflow-hidden flex flex-col"
        >
          {/* Fake Map Background */}
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
               style={{
                 backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
                 backgroundSize: '20px 20px'
               }}>
          </div>

      {/* Profile Drawer */}
      <AnimatePresence>
        {isProfileOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsProfileOpen(false)}
              className="fixed inset-0 bg-slate-900/50 z-40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-80 bg-white shadow-2xl z-50 p-6 border-l border-slate-200 flex flex-col overflow-y-auto"
            >
              <button onClick={() => setIsProfileOpen(false)} className="absolute top-4 right-4 p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors">
                <X className="w-5 h-5 text-slate-600" />
              </button>
              
              <div className="text-center mt-8">
                <div className="w-24 h-24 mx-auto bg-yellow-100 rounded-full border-4 border-yellow-400 overflow-hidden mb-4 shadow-lg">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Niloy&backgroundColor=fef08a" alt="Al Imran Niloy" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <h2 className="text-xl font-black text-slate-800">Al Imran Niloy</h2>
                <p className="text-sm text-slate-500 font-medium">Chief Urao Officer (CUO)</p>
              </div>
              
              <div className="mt-8 space-y-4 flex-1">
                <div className="bg-red-50 p-4 rounded-2xl border border-red-100 flex items-center gap-4">
                  <Wallet className="w-8 h-8 text-red-500 shrink-0" />
                  <div>
                    <p className="text-xs text-red-600 font-bold">ইনকাম (Income)</p>
                    <p className="text-lg font-black text-red-700">-৫০০.০০ ৳</p>
                    <p className="text-[10px] text-red-500">ঋণের দায়ে পলাতক</p>
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 flex items-center gap-4">
                  <Trophy className="w-8 h-8 text-blue-500 shrink-0" />
                  <div>
                    <p className="text-xs text-blue-600 font-bold">মোট উড়াল (Total Flights)</p>
                    <p className="text-lg font-black text-blue-700">৪২০ টা</p>
                    <p className="text-[10px] text-blue-500">সবগুলা ক্র্যাশ করছে</p>
                  </div>
                </div>
                <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100 flex items-center gap-4">
                  <GraduationCap className="w-8 h-8 text-orange-500 shrink-0" />
                  <div>
                    <p className="text-xs text-orange-600 font-bold">শিক্ষাগত যোগ্যতা</p>
                    <p className="text-sm font-black text-orange-700">ফেসবুক ভার্সিটি (পিএইচডি)</p>
                  </div>
                </div>
                <div className="bg-teal-50 p-4 rounded-2xl border border-teal-100 flex items-center gap-4">
                  <Heart className="w-8 h-8 text-teal-500 shrink-0" />
                  <div>
                    <p className="text-xs text-teal-600 font-bold">ব্লাড গ্রুপ</p>
                    <p className="text-sm font-black text-teal-700">চা ও কফি (পজিটিভ)</p>
                  </div>
                </div>
                <div className="bg-pink-50 p-4 rounded-2xl border border-pink-100 flex items-center gap-4">
                  <Smile className="w-8 h-8 text-pink-500 shrink-0" />
                  <div>
                    <p className="text-xs text-pink-600 font-bold">পেশা ও শখ</p>
                    <p className="text-sm font-black text-pink-700">অন্যের পোস্টে হা হা দেওয়া</p>
                  </div>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center gap-4">
                  <Info className="w-8 h-8 text-slate-500 shrink-0" />
                  <div>
                    <p className="text-xs text-slate-600 font-bold">স্ট্যাটাস (Status)</p>
                    <p className="text-sm font-black text-slate-700">সিঙ্গেল, গরিব ও বেকার</p>
                  </div>
                </div>
              </div>

              <div className="text-center pb-4 pt-6 border-t border-slate-100 mt-6">
                <p className="text-xs text-slate-400 font-medium">Developed by</p>
                <p className="text-sm font-black text-slate-800">ডেভেলপার ভাই: Al Imran Niloy</p>
                <p className="text-[10px] text-slate-500 mt-1">(যিনি কোড করতে গিয়া নিজেই উইড়া গেছেন 🚀)</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Payment Warning Modal */}
      <AnimatePresence>
        {showPaymentWarning && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/60 z-50 backdrop-blur-sm flex items-center justify-center p-4"
            >
              <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 20 }} 
                animate={{ scale: 1, opacity: 1, y: 0 }} 
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-red-100 text-center relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-2 bg-red-500" />
                <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShieldAlert className="w-10 h-10 text-red-500" />
                </div>
                <h3 className="text-xl font-black text-slate-800 mb-2">সাবধান! শেষ ওয়ার্নিং!</h3>
                <p className="text-sm text-slate-600 mb-6 leading-relaxed font-medium">
                  {paymentWarnings[selectedPayment as keyof typeof paymentWarnings]}
                </p>
                <div className="space-y-3">
                  <button 
                    onClick={() => {
                      setShowPaymentWarning(false);
                      setScreen('tracking');
                    }}
                    className="w-full py-3.5 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-colors active:scale-95"
                  >
                    হ্যাঁ, আমি মরতে রাজি!
                  </button>
                  <button 
                    onClick={() => setShowPaymentWarning(false)}
                    className="w-full py-3.5 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors active:scale-95"
                  >
                    না ভাই, ভয় লাগতেছে
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md p-4 shadow-sm sticky top-0 z-20 border-b border-slate-200 shrink-0">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <Menu className="w-6 h-6 text-slate-600 cursor-pointer" onClick={() => setIsProfileOpen(true)} />
          <div className="flex items-center gap-2 cursor-pointer" onClick={reset}>
            <Rocket className="w-6 h-6 text-yellow-500" />
            <h1 className="text-2xl font-black tracking-tighter text-slate-900">উড়াও</h1>
          </div>
          <div 
            className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center cursor-pointer overflow-hidden border-2 border-white shadow-sm"
            onClick={() => setIsProfileOpen(true)}
          >
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Niloy&backgroundColor=e2e8f0" alt="User" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto w-full flex-1 relative z-10 flex flex-col">
        <AnimatePresence mode="wait">
          
          {/* SCREEN: BOOKING */}
          {screen === 'booking' && (
            <motion.div
              key="booking"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="p-4 pb-32 space-y-4"
            >
              <div className="text-center mb-6 mt-2 bg-white/60 p-4 rounded-2xl backdrop-blur-sm border border-white shadow-sm">
                <h2 className="text-lg font-bold text-slate-800">জীবনের প্যারা থেকে সোজা আসমানে!</h2>
                <p className="text-xs text-slate-500 mt-1">প্যারা নিবেন না, উইড়া যাবেন।</p>
              </div>

              {/* Location Card */}
              <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-200 space-y-5 relative overflow-hidden">
                <div className="absolute left-7 top-10 bottom-10 w-0.5 bg-slate-200"></div>
                
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center border-2 border-white shadow-sm shrink-0">
                    <div className="w-2 h-2 rounded-full bg-slate-800"></div>
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">কোথা থেকে উড়বেন?</p>
                    <div className="font-semibold text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100 text-sm">
                      প্যারাময় জীবন (Current Location)
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center border-2 border-white shadow-sm shrink-0">
                    <MapPin className="w-3 h-3 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">কই গিয়া পড়বেন?</p>
                    <div className="relative">
                      <select 
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="w-full font-semibold text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 appearance-none text-sm cursor-pointer"
                      >
                        {destinations.map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <div className="w-2 h-2 border-b-2 border-r-2 border-slate-400 transform rotate-45"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vehicle Selection */}
              <div>
                <h3 className="font-bold text-slate-700 mb-3 flex items-center gap-2 text-sm px-2">
                  <Wind className="w-4 h-4" /> কিসে উড়বেন?
                </h3>
                <div className="space-y-3">
                  {vehicles.map(v => (
                    <div 
                      key={v.id}
                      onClick={() => setSelectedVehicle(v.id)}
                      className={`p-4 rounded-3xl border-2 cursor-pointer transition-all ${
                        selectedVehicle === v.id 
                          ? `${v.bg} ${v.border} shadow-md scale-[1.02]` 
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-full flex items-center justify-center border-2 border-white shadow-sm shrink-0 bg-white ${v.color}`}>
                          <v.icon className="w-7 h-7" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="font-bold text-slate-800">{v.name}</h4>
                            <span className="text-[10px] font-bold bg-slate-800 text-white px-2 py-1 rounded-lg whitespace-nowrap">
                              ভাড়া: {v.price}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 leading-relaxed">{v.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-red-50 border border-red-100 p-4 rounded-2xl flex items-start gap-3 mt-4">
                <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <p className="text-xs text-red-800 leading-relaxed">
                  <strong>সতর্কতা:</strong> উড়াও অ্যাপ ব্যবহারের পর আপনার হাত-পা ভাইঙ্গা গেলে কর্তৃপক্ষ দায়ী নয়। নিজ দায়িত্বে উড়াল দিন।
                </p>
              </div>
            </motion.div>
          )}

          {/* SCREEN: SEARCHING */}
          {screen === 'searching' && (
            <motion.div
              key="searching"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="flex-1 flex flex-col items-center justify-center p-6 text-center"
            >
              <div className="relative w-48 h-48 flex items-center justify-center mb-12">
                <motion.div 
                  animate={{ scale: [1, 2, 2.5], opacity: [0.8, 0.3, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                  className="absolute inset-0 bg-yellow-400 rounded-full"
                />
                <motion.div 
                  animate={{ scale: [1, 1.5, 2], opacity: [0.8, 0.3, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
                  className="absolute inset-0 bg-yellow-400 rounded-full"
                />
                <div className="relative z-10 w-24 h-24 bg-white rounded-full shadow-xl flex items-center justify-center border-4 border-yellow-100">
                  <Radar className="w-12 h-12 text-yellow-500 animate-spin" style={{ animationDuration: '3s' }} />
                </div>
              </div>
              
              <h2 className="text-2xl font-black text-slate-800 mb-3">পাইলট খোঁজা হচ্ছে...</h2>
              <p className="text-slate-500 text-sm max-w-xs mx-auto">আপনার জন্য যোগ্য একজন পাগল খোঁজা হচ্ছে যে আপনাকে উড়াইতে পারবে।</p>
            </motion.div>
          )}

          {/* SCREEN: ARRIVING */}
          {screen === 'arriving' && (
            <motion.div
              key="arriving"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="flex-1 flex flex-col items-center justify-center p-8 text-center"
            >
              <h2 className="text-2xl font-black text-slate-800 mb-6">গাড়ি আসতেছে...</h2>
              <div className="relative w-full h-64 bg-slate-200 rounded-[3rem] overflow-hidden border-4 border-white shadow-inner">
                <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(#94a3b8 2px, transparent 2px)', backgroundSize: '20px 20px' }}></div>
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  animate={{ 
                    scale: [0.1, 2, 1],
                    rotate: [0, 1080, 0],
                    x: ['-300%', '100%', '0%'],
                    y: ['200%', '-100%', '0%']
                  }}
                  transition={{ duration: 2.5, ease: "backOut" }}
                >
                  <div className={`w-24 h-24 rounded-full flex items-center justify-center border-4 border-white shadow-2xl ${activeVehicle.bg} ${activeVehicle.color}`}>
                    <activeVehicle.icon className="w-12 h-12" />
                  </div>
                </motion.div>
              </div>
              <p className="mt-8 text-slate-600 font-medium bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                পাইলট <strong>{assignedPilot.name}</strong> আপনার লোকেশনে চইলা আসছে। রেডি হন!
              </p>
            </motion.div>
          )}

          {/* SCREEN: PAYMENT */}
          {screen === 'payment' && (
            <motion.div
              key="payment"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-4 pb-32 space-y-6"
            >
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 text-center relative overflow-hidden">
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-yellow-100 rounded-full opacity-50 blur-2xl"></div>
                <div className="text-6xl mb-4 relative z-10">{assignedPilot.image}</div>
                <h2 className="text-xl font-bold text-slate-800 relative z-10">পাইলট পাওয়া গেছে!</h2>
                <p className="text-lg font-black text-yellow-600 mt-1 relative z-10">{assignedPilot.name}</p>
                <div className="flex items-center justify-center gap-1 mt-2 mb-3 relative z-10">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold text-sm">{assignedPilot.rating}</span>
                </div>
                <p className="text-xs text-slate-500 italic bg-slate-50 p-2 rounded-lg relative z-10">"{assignedPilot.reviews}"</p>
              </div>

              <div>
                <h3 className="font-bold text-slate-700 mb-3 flex items-center gap-2 text-sm px-2">
                  <CreditCard className="w-4 h-4" /> পেমেন্ট মেথড সিলেক্ট করেন
                </h3>
                <div className="space-y-3">
                  {paymentMethods.map(method => (
                    <div 
                      key={method.id}
                      onClick={() => setSelectedPayment(method.id)}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-4 ${
                        selectedPayment === method.id 
                          ? `${method.border} ${method.bg} shadow-md scale-[1.02]` 
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0 ${method.color}`}>
                        <method.icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-slate-800">{method.name}</h4>
                        <p className="text-xs text-slate-500 mt-0.5 leading-tight">{method.desc}</p>
                      </div>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedPayment === method.id ? method.border : 'border-slate-300'
                      }`}>
                        {selectedPayment === method.id && <div className={`w-3 h-3 rounded-full ${method.color.replace('text-', 'bg-')}`} />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* SCREEN: TRACKING */}
          {screen === 'tracking' && (
            <motion.div
              key="tracking"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="flex-1 flex flex-col p-4 space-y-4"
            >
              <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden flex-1 flex flex-col relative">
                
                {/* Crazy Map Area */}
                <div className="flex-1 bg-slate-100 relative overflow-hidden flex items-center justify-center">
                  {/* Map Background Image */}
                  <div 
                    className="absolute inset-0 opacity-40" 
                    style={{ 
                      backgroundImage: 'url(https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80)', 
                      backgroundSize: 'cover', 
                      backgroundPosition: 'center' 
                    }}
                  />
                  
                  {/* Crazy Route Line */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" preserveAspectRatio="none">
                    <motion.path 
                      d="M 10,300 C 150,10 200,400 350,50 S 50,200 200,150" 
                      fill="none" 
                      stroke="#ef4444" 
                      strokeWidth="6" 
                      strokeDasharray="15,15" 
                      animate={{ strokeDashoffset: [0, -200] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.path 
                      d="M 300,10 C 50,150 400,200 50,350" 
                      fill="none" 
                      stroke="#3b82f6" 
                      strokeWidth="4" 
                      strokeDasharray="10,10" 
                      animate={{ strokeDashoffset: [0, 200] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />
                  </svg>

                  {/* Moving Vehicle (Crazy Animation) */}
                  <motion.div 
                    className="absolute z-10"
                    animate={{ 
                      left: ['10%', '80%', '20%', '90%', '50%'], 
                      top: ['80%', '20%', '10%', '90%', '50%'],
                      rotate: [0, 180, -90, 360, 720],
                      scale: [1, 1.5, 0.8, 1.2, 1]
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center border-4 border-white shadow-2xl ${activeVehicle.bg} ${activeVehicle.color}`}>
                      <activeVehicle.icon className="w-8 h-8" />
                    </div>
                  </motion.div>

                  {/* Clouds */}
                  <motion.div animate={{ x: [0, -100, 0] }} transition={{ duration: 8, repeat: Infinity }} className="absolute top-10 left-10 text-4xl opacity-80 filter drop-shadow-md">☁️</motion.div>
                  <motion.div animate={{ x: [0, 100, 0] }} transition={{ duration: 12, repeat: Infinity }} className="absolute top-32 right-10 text-5xl opacity-80 filter drop-shadow-md">☁️</motion.div>
                </div>

                {/* Status Box */}
                <div className="bg-white p-6 border-t border-slate-100 z-20 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-black text-lg flex items-center gap-2">
                      <Activity className="w-5 h-5 text-blue-500 animate-pulse" /> লাইভ ট্র্যাকিং
                    </h3>
                    <span className="text-xs font-bold bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                      উড়তাছে...
                    </span>
                  </div>
                  
                  <div className="bg-yellow-50 p-5 rounded-2xl border-2 border-yellow-300 min-h-[120px] flex items-center justify-center text-center shadow-inner relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-yellow-200">
                      <motion.div 
                        key={trackingStep}
                        className="h-full bg-red-500" 
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 5.5, ease: "linear" }}
                      />
                    </div>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={trackingStep}
                        initial={{ opacity: 0, scale: 0.8, y: 15 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 1.1, y: -15 }}
                        className="flex flex-col items-center gap-3 w-full"
                      >
                        <AlertTriangle className="w-7 h-7 text-red-500 animate-bounce" />
                        <p className="text-base font-black text-slate-800 leading-relaxed">
                          {trackingStatuses[trackingStep]}
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <div className="mt-4 flex gap-2">
                    {trackingStatuses.map((_, idx) => (
                      <div key={idx} className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${idx <= trackingStep ? 'bg-blue-500' : 'bg-slate-200'}`} />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* SCREEN: SUCCESS */}
          {screen === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 flex-1 flex flex-col items-center justify-center"
            >
              <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-slate-100 text-center space-y-6 w-full">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto relative">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                  >
                    <CheckCircle2 className="w-12 h-12 text-green-500" />
                  </motion.div>
                  <motion.div 
                    className="absolute inset-0 border-4 border-green-200 rounded-full"
                    animate={{ scale: [1, 1.2, 1], opacity: [1, 0, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-800 mb-2">উড়াল সম্পন্ন!</h2>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    আপনি সফলভাবে দুনিয়া থেকে গায়েব হয়েছেন। 
                    গন্তব্য <strong>{destination}</strong> এ আপনাকে স্বাগতম!
                  </p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-sm font-medium text-slate-700 italic">
                    "পেমেন্ট হিসেবে আপনার <strong>{paymentMethods.find(p => p.id === selectedPayment)?.name}</strong> কাইটা নেওয়া হইছে। ধন্যবাদ!"
                  </p>
                </div>
                
                <div className="pt-4 space-y-3">
                  <button 
                    onClick={() => setScreen('rating')}
                    className="w-full py-4 bg-yellow-400 text-slate-900 font-black rounded-2xl hover:bg-yellow-500 transition-colors active:scale-95 flex items-center justify-center gap-2"
                  >
                    পাইলটকে রেটিং দিন <ThumbsUp className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* SCREEN: RATING */}
          {screen === 'rating' && (
            <motion.div
              key="rating"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 flex-1 flex flex-col items-center justify-center"
            >
              <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-slate-100 text-center space-y-6 w-full">
                <div className="text-6xl mb-2">{assignedPilot.image}</div>
                <h2 className="text-2xl font-black text-slate-800">জার্নি কেমন ছিল?</h2>
                <p className="text-slate-500 text-sm">পাইলট <strong>{assignedPilot.name}</strong> কি ঠিকমতো ভয় দেখাইছে?</p>
                
                <div className="flex justify-center gap-2 py-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.button
                      key={star}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setRating(star)}
                      className="focus:outline-none"
                    >
                      <Star 
                        className={`w-10 h-10 transition-colors ${
                          rating >= star ? 'fill-yellow-400 text-yellow-400' : 'fill-slate-100 text-slate-300'
                        }`} 
                      />
                    </motion.button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  {rating > 0 ? (
                    <motion.div
                      key="feedback"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="space-y-6"
                    >
                      <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
                        <p className="font-bold text-yellow-800">{ratingFeedback[rating]}</p>
                      </div>
                      <button 
                        onClick={reset}
                        className="w-full py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-slate-800 transition-all active:scale-95"
                      >
                        সাবমিট করে পালান
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="placeholder"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="h-[104px] flex items-center justify-center"
                    >
                      <p className="text-slate-400 text-sm font-medium">রেটিং না দিলে দুনিয়ায় ফেরত যাওয়া নিষেধ!</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Floating Action Buttons based on screen */}
      <AnimatePresence>
        {screen === 'booking' && (
          <motion.div 
            initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-slate-100 via-slate-100 to-transparent pb-6 z-20"
          >
            <div className="max-w-md mx-auto">
              <button
                onClick={() => setScreen('searching')}
                className="w-full py-4 bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-black text-xl rounded-2xl shadow-lg shadow-yellow-400/30 transition-transform active:scale-95 flex items-center justify-center gap-2"
              >
                উড়াও! <Navigation className="w-6 h-6" />
              </button>
            </div>
          </motion.div>
        )}

        {screen === 'payment' && (
          <motion.div 
            initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-slate-100 via-slate-100 to-transparent pb-6 z-20"
          >
            <div className="max-w-md mx-auto">
              <button
                onClick={() => setShowPaymentWarning(true)}
                className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-black text-lg rounded-2xl shadow-lg shadow-slate-900/20 transition-transform active:scale-95 flex items-center justify-center gap-2"
              >
                পেমেন্ট কনফার্ম করুন <CheckCircle2 className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
