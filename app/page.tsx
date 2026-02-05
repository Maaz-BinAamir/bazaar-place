"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle, Package, Sparkles, Store, RefreshCw } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1A1A1A] font-sans selection:bg-[#FF6B6B] selection:text-white overflow-x-hidden">
      {/* Abstract Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#E3F2FD] rounded-full blur-[100px] opacity-60 mix-blend-multiply animate-blob" />
        <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-[#FFF3E0] rounded-full blur-[120px] opacity-60 mix-blend-multiply animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-10%] right-[10%] w-[400px] h-[400px] bg-[#F3E5F5] rounded-full blur-[80px] opacity-60 mix-blend-multiply animate-blob animation-delay-4000" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>
      </div>

      <nav className="relative z-50 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
           <div className="w-10 h-10 bg-[#FF6B6B] rounded-xl rotate-3 flex items-center justify-center border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <Store className="w-6 h-6 text-white" />
           </div>
           <span className="text-2xl font-black tracking-tight italic">BazaarPlace</span>
        </div>
        <div className="hidden md:flex items-center gap-8 font-medium text-sm">
          <Link href="#features" className="hover:text-[#FF6B6B] transition-colors hover:underline decoration-2 underline-offset-4">How it works</Link>
          <Link href="/login">
            <Button variant="ghost" className="font-bold hover:bg-black/5">Log In</Button>
          </Link>
          <Link href="/bazaar">
            <Button className="bg-black text-white hover:bg-[#FF6B6B] hover:text-white rounded-full px-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all border-2 border-transparent">
              Start Selling
            </Button>
          </Link>
        </div>
      </nav>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="pt-10 pb-32 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 space-y-8 relative">
            {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-black/10 shadow-sm text-sm font-medium text-gray-600 animate-fade-in-up">
              <Sparkles className="w-4 h-4 text-[#FF6B6B]" />
              <span>The marketplace for unique finds</span>
            </div> */}
            
            <h1 className="text-5xl md:text-7xl font-black leading-[1.1] tracking-tight">
              Give your stuff a {" "}
              <span className="relative inline-block text-[#FF6B6B]">
                second life
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-[#FF6B6B]/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                </svg>
              </span>
              .
            </h1>
            
            <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
              BazaarPlace is where pre-loved items find new homes. List instantly, chat directly, and discover hidden gems in your neighborhood.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/bazaar">
                <Button className="h-14 px-8 rounded-xl bg-black text-white text-lg font-bold shadow-[6px_6px_0px_0px_#FF6B6B] border-2 border-black hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_#FF6B6B] transition-all w-full sm:w-auto">
                  Explore Bazaar
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/create-post">
                 <Button variant="outline" className="h-14 px-8 rounded-xl bg-white text-black text-lg font-bold border-2 border-black shadow-[6px_6px_0px_0px_#E0E0E0] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_#E0E0E0] hover:bg-gray-50 transition-all w-full sm:w-auto">
                  Sell an Item
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex-1 relative w-full h-[500px] md:h-[600px] flex items-center justify-center">
             {/* Decorative Circle */}
             <div className="absolute inset-0 bg-gradient-to-tr from-[#FF6B6B]/10 to-[#FFD93D]/20 rounded-full blur-3xl" />
             
             {/* Floating Cards Composition */}
             <div className="relative w-full max-w-md aspect-square perspective-1000">
                {/* Card 1: Retro Camera */}
                <div className="absolute top-0 right-10 w-48 p-3 bg-white rounded-xl shadow-xl rotate-6 border border-gray-200 z-20 animate-float-slow">
                   <div className="w-full h-32 bg-gray-100 rounded-lg mb-3 overflow-hidden relative group">
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-400">
                        <span className="text-4xl">📷</span>
                      </div>
                   </div>
                   <div className="flex justify-between items-end">
                      <div>
                         <p className="font-bold text-sm">Vintage Camera</p>
                         <p className="text-xs text-gray-500">Perfect condition</p>
                      </div>
                      <span className="font-mono font-bold text-[#FF6B6B]">$120</span>
                   </div>
                </div>

                {/* Card 2: Plant */}
                <div className="absolute bottom-20 left-4 w-44 p-3 bg-white rounded-xl shadow-xl -rotate-6 border border-gray-200 z-10 animate-float-medium">
                   <div className="w-full h-32 bg-green-50 rounded-lg mb-3 overflow-hidden relative">
                       <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center text-green-700">
                        <span className="text-4xl">🌿</span>
                      </div>
                   </div>
                   <div className="flex justify-between items-end">
                      <div>
                         <p className="font-bold text-sm">Monstera</p>
                         <p className="text-xs text-gray-500">Needs love</p>
                      </div>
                      <span className="font-mono font-bold text-[#FF6B6B]">$25</span>
                   </div>
                </div>

                {/* Card 3: Chat Bubble */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 bg-black text-white p-6 rounded-2xl rounded-bl-none shadow-2xl z-30 animate-pulse-slow">
                   <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-[#FF6B6B] border-2 border-white"></div>
                      <div className="w-20 h-3 bg-white/20 rounded-full"></div>
                   </div>
                   <div className="space-y-2">
                      <div className="w-full h-2 bg-white/10 rounded-full"></div>
                      <div className="w-3/4 h-2 bg-white/10 rounded-full"></div>
                   </div>
                   <div className="mt-4 flex gap-2">
                      <div className="px-3 py-1 rounded-full bg-[#FF6B6B] text-xs font-bold">Is this available?</div>
                   </div>
                </div>
             </div>
          </div>
        </section>

        {/* Features Marquee */}
        <div className="w-full bg-black py-4 overflow-hidden transform -skew-y-2 origin-left">
           <div className="flex gap-8 whitespace-nowrap animate-marquee">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                 <div key={i} className="flex items-center gap-4 text-white/90 text-xl font-bold font-mono uppercase tracking-widest">
                    <Sparkles className="text-[#FF6B6B] w-5 h-5" />
                    <span>Vintage</span>
                    <span className="w-2 h-2 rounded-full bg-white/30" />
                    <span>Electronics</span>
                    <span className="w-2 h-2 rounded-full bg-white/30" />
                    <span>Furniture</span>
                    <span className="w-2 h-2 rounded-full bg-white/30" />
                    <span>Clothing</span>
                 </div>
              ))}
           </div>
        </div>

        {/* How it Works Section */}
        <section id="features" className="py-24 px-6 max-w-7xl mx-auto">
           <div className="text-center mb-20 space-y-4">
              <h2 className="text-4xl md:text-5xl font-black">Simple. Safe. <span className="text-[#FF6B6B]">Social.</span></h2>
              <p className="text-xl text-gray-500 max-w-2xl mx-auto">We&apos;ve stripped away the complexity. Buying and selling should feel like a conversation, not a contract.</p>
           </div>

           <div className="grid md:grid-cols-3 gap-8">
              {[
                 {
                    icon: <Package className="w-8 h-8 text-white" />,
                    color: "bg-[#FF6B6B]",
                    title: "List in Seconds",
                    desc: "Snap a photo, add a price, and tell a story. Your item is live in less than a minute."
                 },
                 {
                    icon: <MessageCircle className="w-8 h-8 text-white" />,
                    color: "bg-[#4ECDC4]",
                    title: "Chat & Negotiate",
                    desc: "Real-time messaging built right in. Ask questions, haggle prices, and arrange meets."
                 },
                 {
                    icon: <RefreshCw className="w-8 h-8 text-white" />,
                    color: "bg-[#FFD93D]",
                    title: "Circular Economy",
                    desc: "Join the movement against waste. Every item sold is one less thing in a landfill."
                 }
              ].map((feature, i) => (
                 <div key={i} className="group relative bg-white rounded-3xl p-8 border-2 border-black/5 hover:border-black/10 transition-all hover:-translate-y-2">
                    <div className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform`}>
                       {feature.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-gray-500 leading-relaxed">
                       {feature.desc}
                    </p>
                    <div className="absolute top-8 right-8 text-6xl font-black text-gray-100 -z-10 select-none opacity-0 group-hover:opacity-100 transition-opacity">
                       0{i + 1}
                    </div>
                 </div>
              ))}
           </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6">
           <div className="max-w-5xl mx-auto bg-black rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full opacity-20">
                 <div className="absolute top-10 left-10 w-32 h-32 bg-[#FF6B6B] rounded-full blur-[50px]" />
                 <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#4ECDC4] rounded-full blur-[60px]" />
              </div>
              
              <div className="relative z-10 space-y-8">
                 <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">
                    Ready to declutter your life?
                 </h2>
                 <p className="text-xl text-white/70 max-w-2xl mx-auto">
                    Join thousands of people finding new homes for their pre-loved items. It&apos;s free to list and easy to love.
                 </p>
                 <Link href="/login" className="inline-block">
                    <Button className="h-16 px-10 rounded-full bg-white text-black text-xl font-bold hover:bg-[#FF6B6B] hover:text-white transition-all hover:scale-105 border-4 border-transparent hover:border-white/20">
                       Get Started Now
                    </Button>
                 </Link>
              </div>
           </div>
        </section>

        <footer className="bg-white border-t border-gray-100 pt-16 pb-8 px-6">
           <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
              <div className="col-span-2 md:col-span-1 space-y-4">
                 <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#FF6B6B] rounded-lg rotate-3 flex items-center justify-center border-2 border-black">
                       <Store className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-xl font-black italic">BazaarPlace</span>
                 </div>
                 <p className="text-sm text-gray-500">
                    The modern marketplace for second-hand treasures. Built for community, designed for discovery.
                 </p>
              </div>
              
              {[
                 { title: "Platform", links: ["Browse", "Sell", "Search", "Categories"] },
                 { title: "Company", links: ["About", "Careers", "Press", "Contact"] },
                 { title: "Support", links: ["Help Center", "Safety", "Terms", "Privacy"] }
              ].map((column, i) => (
                 <div key={i} className="space-y-4">
                    <h4 className="font-bold text-sm uppercase tracking-wider text-gray-900">{column.title}</h4>
                    <ul className="space-y-2">
                       {column.links.map((link) => (
                          <li key={link}>
                             <a href="#" className="text-gray-500 hover:text-[#FF6B6B] text-sm transition-colors">{link}</a>
                          </li>
                       ))}
                    </ul>
                 </div>
              ))}
           </div>
           
           <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-100 text-sm text-gray-400">
              <p>&copy; {new Date().getFullYear()} BazaarPlace Inc. All rights reserved.</p>
              <div className="flex gap-6 mt-4 md:mt-0">
                 <a href="#" className="hover:text-black transition-colors">Twitter</a>
                 <a href="#" className="hover:text-black transition-colors">Instagram</a>
                 <a href="#" className="hover:text-black transition-colors">GitHub</a>
              </div>
           </div>
        </footer>
      </main>
      
      <style jsx global>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(6deg); }
          50% { transform: translateY(-20px) rotate(6deg); }
        }
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0) rotate(-6deg); }
          50% { transform: translateY(-15px) rotate(-6deg); }
        }
        .animate-float-medium {
          animation: float-medium 5s ease-in-out infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
}
