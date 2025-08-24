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
import { IoIosArrowRoundDown } from "react-icons/io";
import { motion } from "framer-motion";
import TierModal from "../../components/TierModal";
import Link from "next/link";

export const metadata = {
  title: "The GaLche's Vault - Exclusive Membership | AV GaLche",
  description:
    "Explore GaLche’s Vault, AV GaLche's exclusive tiered membership program offering bespoke rewards, early access, personalized styling, and luxury experiences.",
  keywords: [
    "AV GaLche Vault",
    "luxury membership India",
    "exclusive fashion membership",
    "tiered loyalty program",
    "sophisticated rewards",
  ],
  openGraph: {
    title: "The GaLche's Vault - Exclusive Membership | AV GaLche",
    description:
      "Explore GaLche’s Vault, AV GaLche's exclusive tiered membership program with bespoke rewards and luxury experiences.",
    url: "https://www.avgalche.com/story",
    images: [
      {
        url: "https://plus.unsplash.com/premium_photo-1664288966231-b60fdf8d8607?q=80&w=870&auto=format&fit=crop",
        width: 870,
        height: 580,
        alt: "GaLche’s Vault Membership",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The GaLche's Vault - Exclusive Membership | AV GaLche",
    description:
      "Discover GaLche’s Vault, an exclusive tiered membership program offering unmatched luxury and rewards.",
    images: [
      "https://plus.unsplash.com/premium_photo-1664288966231-b60fdf8d8607?q=80&w=870&auto=format&fit=crop",
    ],
  },
};

const AVGalcheVault = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [isTierModalOpen, setIsTierModalOpen] = useState(false);
  const [expandedTiers, setExpandedTiers] = useState({});

  const toggleExpand = (index) => {
    setExpandedTiers((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveSection((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const tiers = [
    {
      name: "Elan Privé",
      threshold: "₹17,000",
      icon: <Star className="w-12 h-12" />,
      subtitle: "The Beginning of Elegance",
      description:
        "Step into a world where every purchase is an investment in your style legacy.",
      benefits: [
        "Enjoy 5% exclusive savings on every order.",
        "Receive a complimentary surprise gift as a token of appreciation for joining.",
        "Celebrate your birthday with a personalized luxury gift.",
        "Get early access to our Members-Only Journal, curated with style and stories.",
        "Be among the select few to receive one Vault-exclusive design released each year created only for our inner circle.",
        "Galche's Vault isn't just a Vault it's a statement.",
      ],
      image:
        "https://plus.unsplash.com/premium_photo-1677995700874-1d6a47693543?q=80&w=923&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Argent Privé",
      threshold: "₹63,000",
      icon: <Crown className="w-12 h-12" />,
      subtitle: "Elevated Beyond Ordinary",
      description:
        "Where discerning taste meets unparalleled service in the realm of haute couture.",
      benefits: [
        "Enjoy 7% exclusive savings on every order",
        "Celebrate your birthday with a personalized luxury gift, crafted just for you",
        "Unlock early access to our Members-Only Journal featuring curated style edits, behind-the-design stories, and exclusive styling videos",
        "Seamless 30-day returns in our signature luxury mailers",
        "Annual Vault Editions: Receive access to three exclusive designs released only for Vault members each year",
        "Step inside. Stay ahead. Belong to the Vault.",
      ],
      image:
        "https://plus.unsplash.com/premium_photo-1677995700883-30df169c7517?q=80&w=1223&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Apex Privé",
      threshold: "₹1,61,000",
      icon: <Gem className="w-12 h-12" />,
      subtitle: "Bespoke Luxury Redefined",
      description:
        "An exclusive sanctuary where fashion transcends into art, crafted uniquely for you.",
      benefits: [
        "7% Privileged Savings Enjoy exclusive members-only pricing on every order, tailored for our inner circle.",
        "Birthday Privilege Receive a personalized luxury gift, thoughtfully crafted to mark your special day.",
        "Effortless Returns, Elevated Enjoy a 45-day no-questions-asked return window, with complimentary return shipping in our signature luxury mailers.",
        "Annual Vault Editions Unlock access to five limited-edition designs each year created solely for Vault members, never reissued.",
        "Members Premium Journal Receive our private newsletter, featuring trend forecasts, behind-the-scenes stories, and spotlight moments from our Vault community.",
        "Anniversary Fabric Curation Each year, handpick your own fabric from a curated swatch library a personal expression of your style, designed by you.",
        "Philanthropy Match When you choose to give back, AV Galche amplifies your generosity by matching 50% of your contribution through curated charitable collaborations.",
        "Passion Show Invitations Enjoy two complimentary invitations each season to our intimate Passion Shows where emotion meets design in a curated experience.",
        "Style Time-Out Concierge Book your one-hour annual consultation with our Head Stylist for bespoke guidance, seasonal advice, and trend insights.",
        "Ephemeral Flash-Drops Access ultra-limited 48-hour capsules five-piece design drops available exclusively to Vault members, never repeated.",
      ],
      image:
        "https://plus.unsplash.com/premium_photo-1677995700946-f6ea044f5291?q=80&w=965&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Aurum Privé",
      threshold: "₹3,33,333",
      icon: <Sparkles className="w-12 h-12" />,
      subtitle: "The Pinnacle of Prestige",
      description:
        "Reserved for the connoisseurs who understand that true luxury knows no bounds.",
      benefits: [
        "10% Privileged Savings Exclusive members-only pricing on every order a gesture of appreciation for our inner circle.",
        "Bespoke Birthday Gift Choose between a custom-crafted birthday garment or a curated luxury gift box designed to celebrate you.",
        "60-Day Return Window Enjoy peace of mind with an extended, no-questions-asked return policy, enclosed in our signature premium packaging.",
        "Early-Bird Restock Alerts Be first in line receive early access notifications for Vault-favorite restocks and high-demand pieces.",
        "Members-Only Journal (Premium Access) Step inside our world through exclusive showroom tours, behind-the-scenes editorials, and trend briefings, curated only for Vault members.",
        "Vault-Only Designs Gain first access to 7-10 exclusive designs each year never released to the public.",
        "Anniversary Fabric Choice Select your own fabric from our curated swatch library once a year a personal touchpoint in your style journey.",
        "Philanthropy Match (100%) AV Galche matches 100% of your charitable contributions, with an annual impact report showing how your gift helped create change.",
        "Passion Show Invitations Enjoy four complimentary passes per season to our Passion Shows, including post-show designer Q&A sessions.",
        "Style Time-Out Concierge Access a one-hour annual session with our head stylist your personal guide to the season's expressions and silhouettes.",
        "Legacy Garment Registry Once a year, register one of your AV Galche pieces with a unique registry number and receive a leather-bound care booklet, creating a timeless heirloom.",
        "Ephemeral Flash-Drops Unlock access to exclusive 48-hour capsule drops of five ultra-limited designs never restocked, never replicated.",
      ],
      image:
        "https://plus.unsplash.com/premium_photo-1677995700893-348b83925e28?q=80&w=965&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "The GaLche's Vault - Membership Program",
            description:
              "Explore GaLche’s Vault, AV GaLche's exclusive tiered membership program offering bespoke rewards and luxury experiences.",
            url: "https://www.avgalche.com/story",
          }),
        }}
      />

      <div className="min-h-screen bg-white text-black">
        {/* Cinematic Hero */}
        <div className="relative min-h-screen overflow-hidden">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url('https://plus.unsplash.com/premium_photo-1664288966231-b60fdf8d8607?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
            }}
          />

          {/* Foreground Content */}
          <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 md:px-8">
            <div
              className={`text-center text-white z-20 max-w-6xl mx-auto transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-32"
              }`}
            >
              {/* Top Text */}
              <div className="mb-4 sm:mb-6 pt-6 sm:pt-10">
                <div className="text-xs mt-4  sm:text-sm font-light tracking-[0.2em] sm:tracking-[0.3em] text-white mb-4 ">
                  AV GALCHE PRESENTS
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl logo font-thin mb-4 sm:mb-8 sm:leading-[0.9]">
                  The <span className="font-extralight logo">GaLche's</span>
                  <br />
                  <span className="bg-gradient-to-r logo from-[#F5BA90] via-[#f3b385] to-[#d89a6e] bg-clip-text text-transparent">
                    Vault
                  </span>
                </h1>
              </div>

              {/* Subheading */}
              <h2 className="text-base sm:text-lg md:text-xl lg:text-3xl font-extralight mb-6 sm:mb-12 max-w-xs sm:max-w-lg md:max-w-4xl mx-auto leading-relaxed opacity-90">
                A Sanctuary of Privilege and Prestige
              </h2>

              {/* Divider */}
              <div className="flex items-center justify-center space-x-4 sm:space-x-8 mb-8 sm:mb-16">
                <div className="w-12 sm:w-24 h-px bg-[#F5BA90]"></div>
                <div className="text-xs sm:text-sm font-light tracking-widest">
                  EXCLUSIVE MEMBERSHIP
                </div>
                <div className="w-12 sm:w-24 h-px bg-[#F5BA90]"></div>
              </div>

              {/* Button used to calculate the tier in the backend code for later stage */}
              {/* <button
              onClick={() => setIsTierModalOpen(true)}
              className="group bg-opacity-10 backdrop-blur-md border border-white border-opacity-30 text-white px-6 sm:px-12 py-3 sm:py-4 text-sm sm:text-lg font-light tracking-wider hover:bg-white hover:text-black transition-all duration-700 flex items-center mx-auto"
            >
              <span>DISCOVER YOUR TIER</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 sm:ml-4 group-hover:translate-x-2 transition-transform duration-500" />
            </button> */}
              <div className="flex flex-col items-center mx-auto text-xs w-24">
                <span className=" text-white">Scroll Down</span>
                <span className="mt-2">
                  <IoIosArrowRoundDown className="animate-bounce text-white text-2xl sm:text-3xl" />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="hidden xl:block">
        <StoryHero />
      </div> */}

        {/* Philosophy Section */}
        <section className="py-6 sm:py-6 md:py-12 xl:py-32 px-4 sm:px-8  text-black">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            {/* Heading */}
            <motion.h2
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-thin mb-6 sm:mb-8 md:mb-12 leading-tight"
              variants={textVariants}
              custom={0}
            >
              At AV GaLche we believe in
              <span className="text-black/70"> celebrating</span>
              <br className="hidden sm:block" />
              our most cherished patrons
            </motion.h2>

            {/* Paragraph */}
            <motion.p
              className="text-base sm:text-lg md:text-xl font-light leading-relaxed opacity-80 max-w-2xl md:max-w-3xl mx-auto"
              variants={textVariants}
              custom={1}
            >
              This is more than a loyalty program—it's your gateway to a world
              of elevated experiences and bespoke benefits. Each tier represents
              a new chapter in your journey of sophisticated luxury.
            </motion.p>
          </motion.div>
        </section>

        {/* Become a member - Left Image, Right Text */}
        <section className="min-h-screen  flex items-center">
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 min-h-screen">
            {/* Left: Image */}
            <div className="flex items-center justify-center  p-6 sm:p-10">
              <div className="relative w-[90%] sm:w-[80%] lg:w-[70%] h-[80%] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1566708579566-03f9f6b02fdc?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.1.0"
                  alt="Membership"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-[3000ms]"
                />
                <div className="absolute inset-0 bg-black/20" />
              </div>
            </div>

            {/* Right: Text */}
            <div className="flex items-center justify-start p-6 sm:p-12 lg:py-24">
              <div className="max-w-lg">
                <div className="mb-8">
                  <div className="text-xs sm:text-sm font-light tracking-[0.25em] text-gray-500 mb-4">
                    BEGIN YOUR JOURNEY
                  </div>
                  <h3 className="text-4xl sm:text-5xl md:text-6xl font-thin mb-6 leading-tight">
                    Become a <span className="text-black/70">Member</span>
                  </h3>
                  <div className="w-16 sm:w-20 h-px bg-black/70 mb-8"></div>
                </div>

                <p className="text-base sm:text-lg md:text-xl font-light leading-relaxed text-gray-700 mb-8">
                  At AV GaLche, we believe in celebrating our most cherished
                  patrons. Introducing GaLche&apos;s Vault, an exclusive tiered
                  membership crafted for our inner circle. This is more than a
                  loyalty program—it&apos;s your gateway to a world of elevated
                  experiences and bespoke benefits.
                </p>

                <Link href="#">
                  <button className="relative text-black p-1 font-medium group">
                    <h2 className="text-sm sm:text-base md:text-lg">
                      Become a Member
                    </h2>
                    <span className="absolute left-0 bottom-0 h-[2px] w-1/4 bg-black transition-all duration-500 group-hover:w-full"></span>
                    <span className="absolute right-0 bottom-0 h-[2px] w-1/4 bg-black transition-all duration-500 group-hover:w-full"></span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Four Vaults Statement - Right Image, Left Text */}
        <section className="min-h-screen flex items-center bg-[#EBEBEB] text-black">
          <div className="w-full flex flex-col items-center px-6 sm:px-12 lg:px-24 py-20 text-center">
            {/* Top subtitle */}
            <div className="text-xs sm:text-sm font-light tracking-[0.3em] text-black/70 mb-6">
              THE COLLECTION
            </div>

            {/* Main headline */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-thin leading-tight mb-6 max-w-4xl">
              Four Vaults. Infinite Privileges.
            </h2>

            {/* Decorative divider */}
            <div className="w-20 h-px bg-black/70 mb-8"></div>

            {/* Description */}
            <p className="text-base sm:text-lg text-black/70 md:text-xl font-light mb-16 leading-relaxed opacity-90 max-w-3xl">
              As you ascend through the Vaults, each tier unveils a new layer of
              luxury — offering curated rewards, early access to collections,
              personalized styling, and exclusive experiences tailored just for
              you.
            </p>

            {/* Vault tiers grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-16 w-full max-w-4xl">
              {["Elan Privé", "Argent Privé", "Apex Privé", "Aurum Privé"].map(
                (tier, idx) => (
                  <div
                    key={tier}
                    className="group relative border border-gray-700 hover:border-black/65 transition-all duration-500 cursor-pointer p-6 flex flex-col items-center justify-center overflow-hidden"
                  >
                    {/* subtle hover glow */}
                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>

                    {/* Tier number / icon */}
                    <div className="text-3xl font-light text-black/70 mb-3">
                      {idx + 1}
                    </div>
                    <div className="text-sm sm:text-base font-light tracking-wide">
                      {tier}
                    </div>
                  </div>
                )
              )}
            </div>

            {/* CTA Button */}
            <div className="flex flex-col items-center sm:mr-12 md:mr-24 text-xs w-24">
              <span className=" text-black/70">Scroll Down</span>
              <span className="mt-2">
                <IoIosArrowRoundDown className="animate-bounce text-black/70 text-2xl sm:text-3xl" />
              </span>
            </div>
          </div>
        </section>

        {/* Tier Showcase - Alternating Layout */}
        {tiers.map((tier, index) => (
          <section
            key={index}
            className="min-h-screen mt-4 flex items-center bg-white"
          >
            <div
              className={`w-full grid grid-cols-1 lg:grid-cols-2 min-h-screen lg:gap-x-2 ${
                index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
              }`}
            >
              {/* IMAGE COLUMN */}
              <div
                className={`relative flex items-center justify-center overflow-hidden ${
                  index % 2 === 1 ? "lg:col-start-2" : ""
                }`}
              >
                <div
                  className="relative bg-cover bg-center transform hover:scale-105 w-full max-w-[80%] sm:max-w-[80%] lg:w-[65%] h-64 sm:h-80 lg:h-[60%] overflow-hidden transition-transform duration-[3000ms]"
                  style={{ backgroundImage: `url('${tier.image}')` }}
                />
                {/* Floating tier indicator */}
                <div className="absolute top-8 left-8 p-4">
                  <div className="text-black/70 mb-2">{tier.icon}</div>
                  <div className="text-sm font-light text-black">
                    {tier.name}
                  </div>
                </div>
              </div>

              {/* TEXT COLUMN */}
              <div
                className={`flex items-center justify-center p-8 sm:p-12 lg:p-12 ${
                  index % 2 === 1 ? "lg:col-start-1" : ""
                } bg-white`}
              >
                <div className="max-w-lg">
                  <div className="mb-8">
                    <div className="text-sm font-light tracking-[0.2em] text-gray-500 mb-4">
                      {tier.subtitle.toUpperCase()}
                    </div>
                    <h3 className="text-5xl md:text-6xl font-thin mb-6 leading-tight text-black">
                      {tier.name}
                    </h3>
                    <div className="flex items-center mb-8">
                      <div className="w-16 h-px bg-black mr-4"></div>
                      <span className="text-2xl font-light text-black">
                        {tier.threshold}
                      </span>
                    </div>
                  </div>
                  <p className="text-xl font-light mb-8 leading-relaxed text-gray-700">
                    {tier.description}
                  </p>
                  <div className="space-y-4 mb-4">
                    {(expandedTiers[index]
                      ? tier.benefits
                      : tier.benefits.slice(0, 4)
                    ).map((benefit, idx) => (
                      <div key={idx} className="inline-flex items-start mb-2">
                        <span className="inline-block w-2 h-2 bg-black rounded-full mr-4 mt-1 align-middle"></span>
                        <span className="text-black/70 font-light">
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>
                  {tier.benefits.length > 4 && (
                    <button
                      onClick={() => toggleExpand(index)}
                      className="text-sm font-medium underline text-black hover:text-amber-300 transition-colors"
                    >
                      {expandedTiers[index] ? "Show Less" : "Show More"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* Membership CTA - Left Image, Right Text */}
        <section className="w-full min-h-screen bg-[#EBEBEB] text-black flex items-center justify-center px-6">
          <div className="max-w-2xl text-center">
            {/* Small tag */}
            <div className="text-sm font-light tracking-[0.3em] uppercase  mb-6">
              Join the Elite
            </div>

            {/* Main heading */}
            <h1 className="text-2xl md:text-4xl font-light mb-8 leading-tight">
              Not a Member Yet?
              <br />
              <span>Let’s Change That.</span>
            </h1>

            {/* Divider */}
            <div className="md:w-20 w-14 h-px bg-black mx-auto mb-10"></div>

            {/* Paragraph */}
            <p className="text-sm md:text-xl font-light mb-12 text-black/70 leading-relaxed opacity-90">
              Review your past orders, calculate your lifetime spend, and see
              how close you are to unlocking The Vault. You’re just steps away
              from entering a world where fashion meets privilege.
            </p>

            {/* Buttons */}
            <div className="space-y-5">
              {/* <button className="w-full text-sm  text-black border border-black/70 rounded-md md:px-8 md:py-5 p-4 md:text-lg font-medium tracking-wide hover:bg-black hover:text-white transition-all duration-300 flex items-center justify-center group ">
              <User className="md:w-5 md:h-5 h-3 w-3 mr-3" />
              Sign In to Your Account
              <ArrowRight className="w-3 md:w-5 h-3 md:h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
            </button> */}
              <Link href="/products">
                <button
                  onClick={() => setIsTierModalOpen(true)}
                  className="w-full border border-black/70 text-sm rounded-md text-black md:px-8 md:py-5 p-4 md:text-lg font-light tracking-wide hover:bg-black hover:text-white  transition-all duration-500 flex items-center justify-center group"
                >
                  <Lock className="md:w-5 md:h-5 h-3 w-3 mr-3" />
                  Become a Member
                  <ArrowRight className="w-3 md:w-5 h-3 md:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Tier Modal */}
        <TierModal
          isOpen={isTierModalOpen}
          onClose={() => setIsTierModalOpen(false)}
          tiers={tiers}
        />
      </div>
    </>
  );
};

export default AVGalcheVault;
