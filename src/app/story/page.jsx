"use client";
import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  Star,
  Crown,
  Gem,
  Sparkles,
  ArrowRight,
  User,
  Lock,
  Play,
} from "lucide-react";

const AVGalcheVault = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveSection((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const tiers = [
    {
      name: "Vault Elan Privé",
      threshold: "₹17,000",
      icon: <Star className="w-12 h-12" />,
      subtitle: "The Beginning of Elegance",
      description:
        "Step into a world where every purchase is an investment in your style legacy.",
      benefits: [
        "Priority customer service",
        "Exclusive member-only previews",
        "Birthday special offers",
        "Complimentary gift wrapping",
      ],
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    },
    {
      name: "Vault Prestige",
      threshold: "₹50,000",
      icon: <Crown className="w-12 h-12" />,
      subtitle: "Elevated Beyond Ordinary",
      description:
        "Where discerning taste meets unparalleled service in the realm of haute couture.",
      benefits: [
        "Early access to new collections",
        "Personal styling consultation",
        "Exclusive seasonal lookbooks",
        "VIP event invitations",
      ],
      image:
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    },
    {
      name: "Vault Elite",
      threshold: "₹1,00,000",
      icon: <Gem className="w-12 h-12" />,
      subtitle: "Bespoke Luxury Redefined",
      description:
        "An exclusive sanctuary where fashion transcends into art, crafted uniquely for you.",
      benefits: [
        "Bespoke tailoring services",
        "Private shopping appointments",
        "Limited edition access",
        "Complimentary alterations",
      ],
      image:
        "https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    },
    {
      name: "Vault Apex",
      threshold: "₹2,50,000",
      icon: <Sparkles className="w-12 h-12" />,
      subtitle: "The Pinnacle of Prestige",
      description:
        "Reserved for the connoisseurs who understand that true luxury knows no bounds.",
      benefits: [
        "Personal concierge service",
        "Custom design consultations",
        "Exclusive global collections",
        "Lifetime premium support",
      ],
      image:
        "https://images.unsplash.com/photo-1509631179647-0177331693ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=2088&q=80",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Cinematic Hero */}
      <div className="relative h-screen overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
          }}
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={`text-center text-white z-20 max-w-6xl mx-auto px-8 transition-all duration-3000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-32"
            }`}
          >
            <div className="mb-6">
              <div className="text-sm font-light tracking-[0.3em] text-amber-300 mb-4">
                AV GALCHE PRESENTS
              </div>
              <h1 className="text-8xl md:text-9xl font-thin mb-8 leading-none">
                The <span className="font-extralight italic">GaLche's</span>
                <br />
                <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent">
                  VAULT
                </span>
              </h1>
            </div>

            <p className="text-2xl md:text-3xl font-extralight mb-12 max-w-4xl mx-auto leading-relaxed opacity-90">
              A Sanctuary of Privilege and Prestige
            </p>

            <div className="flex items-center justify-center space-x-8 mb-16">
              <div className="w-24 h-px bg-amber-300"></div>
              <div className="text-sm font-light tracking-widest">
                EXCLUSIVE MEMBERSHIP
              </div>
              <div className="w-24 h-px bg-amber-300"></div>
            </div>

            <button className="group bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-30 text-white px-12 py-6 text-lg font-light tracking-wider hover:bg-white hover:text-black transition-all duration-700 flex items-center mx-auto">
              DISCOVER YOUR TIER
              <ArrowRight className="w-5 h-5 ml-4 group-hover:translate-x-2 transition-transform duration-500" />
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white opacity-60" />
        </div>
      </div>

      {/* Philosophy Section */}
      <section className="py-32 px-8 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-6xl md:text-7xl font-thin mb-12 leading-tight">
            At AV GaLche, we believe in
            <span className="italic text-amber-300"> celebrating</span>
            <br />
            our most cherished patrons
          </h2>
          <p className="text-xl font-light leading-relaxed opacity-80 max-w-3xl mx-auto">
            This is more than a loyalty program—it's your gateway to a world of
            elevated experiences and bespoke benefits. Each tier represents a
            new chapter in your journey of sophisticated luxury.
          </p>
        </div>
      </section>

      {/* Elan Privé Introduction - Left Image, Right Text */}
      <section className="min-h-screen flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 min-h-screen">
          <div className="relative overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center transform hover:scale-105 transition-transform duration-[3000ms]"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
          </div>

          <div className="flex items-center justify-center p-16 lg:p-24 bg-gray-50">
            <div className="max-w-lg">
              <div className="mb-8">
                <div className="text-sm font-light tracking-[0.2em] text-gray-500 mb-4">
                  BEGIN YOUR JOURNEY
                </div>
                <h3 className="text-5xl md:text-6xl font-thin mb-6 leading-tight">
                  Elan <span className="italic text-amber-600">Privé</span>
                </h3>
                <div className="w-16 h-px bg-amber-600 mb-8"></div>
              </div>

              <p className="text-xl font-light mb-8 leading-relaxed text-gray-700">
                Unlock the first tier with a lifetime shopping value of just
                <span className="font-medium text-amber-600"> ₹17,000</span>.
                Once you cross this threshold, you step into a realm reserved
                for connoisseurs of style and sophistication.
              </p>

              <div className="space-y-4 mb-12">
                {[
                  "Priority customer service",
                  "Exclusive member previews",
                  "Birthday special offers",
                  "Complimentary gift wrapping",
                ].map((benefit, idx) => (
                  <div key={idx} className="flex items-center">
                    <div className="w-2 h-2 bg-amber-600 rounded-full mr-4"></div>
                    <span className="text-gray-600 font-light">{benefit}</span>
                  </div>
                ))}
              </div>

              <button className="border border-black text-black px-8 py-4 text-sm font-light tracking-wider hover:bg-black hover:text-white transition-all duration-500">
                LEARN MORE
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Four Vaults Statement - Right Image, Left Text */}
      <section className="min-h-screen flex items-center bg-black text-white">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 min-h-screen">
          <div className="flex items-center justify-center p-16 lg:p-24">
            <div className="max-w-lg">
              <div className="mb-8">
                <div className="text-sm font-light tracking-[0.2em] text-amber-300 mb-4">
                  THE COLLECTION
                </div>
                <h3 className="text-6xl md:text-7xl font-thin mb-6 leading-tight">
                  Four Vaults.
                  <br />
                  <span className="italic text-amber-300">Infinite</span>
                  <br />
                  Privileges.
                </h3>
                <div className="w-16 h-px bg-amber-300 mb-8"></div>
              </div>

              <p className="text-xl font-light mb-12 leading-relaxed opacity-90">
                As you ascend through the Vaults, each tier unveils a new layer
                of luxury, offering curated rewards, early access to
                collections, personalized styling, and more.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-12">
                {["Elan Privé", "Prestige", "Elite", "Apex"].map(
                  (tier, idx) => (
                    <div
                      key={idx}
                      className="text-center p-4 border border-gray-700 hover:border-amber-300 transition-colors duration-500 cursor-pointer"
                    >
                      <div className="text-sm font-light text-amber-300">
                        {tier}
                      </div>
                    </div>
                  )
                )}
              </div>

              <button className="bg-amber-300 text-black px-8 py-4 text-sm font-medium tracking-wider hover:bg-amber-400 transition-colors duration-300">
                EXPLORE ALL TIERS
              </button>
            </div>
          </div>

          <div className="relative overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center transform hover:scale-105 transition-transform duration-[3000ms]"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-l from-black/30 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Tier Showcase - Alternating Layout */}
      {tiers.map((tier, index) => (
        <section
          key={index}
          className="min-h-screen flex items-center bg-white"
        >
          <div
            className={`w-full grid grid-cols-1 lg:grid-cols-2 min-h-screen ${
              index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
            }`}
          >
            <div
              className={`relative overflow-hidden ${
                index % 2 === 1 ? "lg:col-start-2" : ""
              }`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transform hover:scale-105 transition-transform duration-[3000ms]"
                style={{ backgroundImage: `url('${tier.image}')` }}
              />
              <div
                className={`absolute inset-0 ${
                  index % 2 === 0
                    ? "bg-gradient-to-r from-black/20 to-transparent"
                    : "bg-gradient-to-l from-black/20 to-transparent"
                }`}
              ></div>

              {/* Floating tier indicator */}
              <div className="absolute top-8 left-8 bg-white bg-opacity-90 backdrop-blur-sm p-4 rounded">
                <div className="text-amber-600 mb-2">{tier.icon}</div>
                <div className="text-sm font-light text-black">{tier.name}</div>
              </div>
            </div>

            <div
              className={`flex items-center justify-center p-16 lg:p-24 ${
                index % 2 === 1 ? "lg:col-start-1" : ""
              } ${index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}`}
            >
              <div className="max-w-lg">
                <div className="mb-8">
                  <div className="text-sm font-light tracking-[0.2em] text-gray-500 mb-4">
                    {tier.subtitle.toUpperCase()}
                  </div>
                  <h3 className="text-5xl md:text-6xl font-thin mb-6 leading-tight text-black">
                    {tier.name.split(" ")[1]}{" "}
                    <span className="italic text-amber-600">
                      {tier.name.split(" ")[2] || tier.name.split(" ")[1]}
                    </span>
                  </h3>
                  <div className="flex items-center mb-8">
                    <div className="w-16 h-px bg-amber-600 mr-4"></div>
                    <span className="text-2xl font-light text-amber-600">
                      {tier.threshold}
                    </span>
                  </div>
                </div>

                <p className="text-xl font-light mb-8 leading-relaxed text-gray-700">
                  {tier.description}
                </p>

                <div className="space-y-4 mb-12">
                  {tier.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center">
                      <div className="w-2 h-2 bg-amber-600 rounded-full mr-4"></div>
                      <span className="text-gray-600 font-light">
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>

                <button className="group border border-amber-600 text-amber-600 px-8 py-4 text-sm font-light tracking-wider hover:bg-amber-600 hover:text-white transition-all duration-500 flex items-center">
                  UNLOCK THIS TIER
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Membership CTA - Left Image, Right Text */}
      <section className="min-h-screen flex items-center bg-black text-white">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 min-h-screen">
          <div className="relative overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center transform hover:scale-105 transition-transform duration-[3000ms]"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1509631179647-0177331693ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=2088&q=80')`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
          </div>

          <div className="flex items-center justify-center p-16 lg:p-24">
            <div className="max-w-lg">
              <div className="mb-8">
                <div className="text-sm font-light tracking-[0.2em] text-amber-300 mb-4">
                  JOIN THE ELITE
                </div>
                <h3 className="text-6xl md:text-7xl font-thin mb-6 leading-tight">
                  Not a Member Yet?
                  <br />
                  <span className="italic text-amber-300">
                    Let's Change That.
                  </span>
                </h3>
                <div className="w-16 h-px bg-amber-300 mb-8"></div>
              </div>

              <p className="text-xl font-light mb-12 leading-relaxed opacity-90">
                Review your past orders, calculate your lifetime spend, and see
                how close you are to unlocking the Vault. You're likely just a
                few steps away from entering a world where fashion meets
                privilege.
              </p>

              <div className="space-y-6">
                <button className="w-full bg-amber-300 text-black px-8 py-6 text-lg font-medium tracking-wider hover:bg-amber-400 transition-all duration-300 flex items-center justify-center group">
                  <User className="w-5 h-5 mr-3" />
                  SIGN IN TO YOUR ACCOUNT
                  <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                </button>

                <button className="w-full border border-amber-300 text-amber-300 px-8 py-6 text-lg font-light tracking-wider hover:bg-amber-300 hover:text-black transition-all duration-500 flex items-center justify-center group">
                  <Lock className="w-5 h-5 mr-3" />
                  CALCULATE MY TIER
                  <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-8 bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <div className="text-3xl font-thin tracking-[0.3em] text-black mb-2">
              AV GALCHE
            </div>
            <div className="text-sm font-light text-gray-500 tracking-wider">
              EST. LUXURY REDEFINED
            </div>
          </div>
          <p className="text-gray-600 font-light max-w-2xl mx-auto">
            Where luxury meets exclusivity. Your journey to sophisticated style
            begins here.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AVGalcheVault;
