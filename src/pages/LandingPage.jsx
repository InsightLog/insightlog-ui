""// src/pages/LandingPage.jsx
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import dashboardImg from "@/assets/dashboard-preview.png";
import teamsImg from "@/assets/team-management.png";
import analyticsImg from "@/assets/analytics-preview.png";
import Lottie from "lottie-react";
import rocketAnimation from "@/assets/lottie/rocket.json";
import statsAnimation from "@/assets/lottie/stats.json";

export default function LandingPage() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
    const progressBar = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    const features = [
        {
            title: "Real-time Logging Dashboard",
            desc: "Track, edit, and explore logs with smart diffing, markdown support, and reactions.",
            image: dashboardImg,
        },
        {
            title: "Team Creation & Management",
            desc: "Admins can create, assign, and manage teams, roles, and access.",
            image: teamsImg,
        },
        {
            title: "Analytics, Leaderboards, and Trends",
            desc: "See log growth, user rankings, and tag trends with beautiful visualizations.",
            image: analyticsImg,
        },
    ];

    return (
        <div ref={ref} className="relative bg-[#0f0f1a] text-white overflow-x-hidden">
            {/* Spotlight Background Effect */}
            <motion.div
                className="absolute inset-0 bg-radial -z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
            />

            {/* Hero Section */}
            <motion.section
                className="min-h-screen flex flex-col justify-center items-center text-center px-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >

                <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent -mt-15">
                    InsightLog
                </h1>

                <Lottie animationData={rocketAnimation} className="w-48 h-48 mt-6" loop={true} />
                <p className="mt-4 text-lg text-gray-400 max-w-xl">
                    Capture your dev team's knowledge faster—track logs, team progress, and trends with ease.
                </p>
                <Link
                    to="/v1/login"
                    className="mt-8 px-6 py-3 rounded-full bg-purple-600 hover:bg-purple-700 transition font-semibold"
                >
                    Get Started
                </Link>
            </motion.section>

            {/* Timeline Section */}
            <section className="relative w-full py-20 bg-gradient-to-b from-[#141322] to-[#0f0f1a]">
                <div className="absolute left-1/2 top-0 h-full w-1 bg-purple-400/20 -translate-x-1/2" />
                <motion.div
                    className="absolute left-1/2 top-0 h-full w-1 bg-purple-400 -translate-x-1/2 origin-top"
                    style={{ scaleY: lineScale }}
                />

                <div className="relative z-10 flex flex-col gap-32 max-w-5xl mx-auto px-6">
                    {features.map((f, i) => (
                        <motion.div
                            key={i}
                            className={`flex flex-col md:flex-row items-center gap-10 ${i % 2 ? "md:flex-row-reverse" : ""}`}
                            initial={{ opacity: 0, y: 40, scale: 0.98 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.7, delay: i * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.12 }}
                        >
                            <motion.img
                                src={f.image}
                                alt={f.title}
                                className="w-full md:w-[45%] rounded-xl border border-white/10 shadow-lg hover:scale-[1.02] transition md:mx-5"
                            />
                            <div className="md:w-1/2 text-center md:text-left mt-4 md:mt-5">
                                <h3 className="text-2xl font-bold text-purple-400 mb-2">{f.title}</h3>
                                <p className="text-gray-300">{f.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Feature Stats Section */}
            {/* <section className="bg-[#0f0f1a] py-16 px-6 text-center">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-white mb-6">Trusted by productive dev teams</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <motion.div
                            className="bg-[#1e1e2f] p-6 rounded-xl border border-white/10"
                            initial={{ scale: 0.9, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <Lottie animationData={statsAnimation} className="w-24 h-24 mx-auto mb-2" />
                            <p className="text-xl font-bold text-purple-300">1000+</p>
                            <p className="text-sm text-gray-400">Logs captured</p>
                        </motion.div>
                        <motion.div
                            className="bg-[#1e1e2f] p-6 rounded-xl border border-white/10"
                            initial={{ scale: 0.9, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <Lottie animationData={statsAnimation} className="w-24 h-24 mx-auto mb-2" />
                            <p className="text-xl font-bold text-purple-300">99.9%</p>
                            <p className="text-sm text-gray-400">Uptime</p>
                        </motion.div>
                        <motion.div
                            className="bg-[#1e1e2f] p-6 rounded-xl border border-white/10"
                            initial={{ scale: 0.9, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            viewport={{ once: true }}
                        >
                            <Lottie animationData={statsAnimation} className="w-24 h-24 mx-auto mb-2" />
                            <p className="text-xl font-bold text-purple-300">4x</p>
                            <p className="text-sm text-gray-400">Faster onboarding</p>
                        </motion.div>
                    </div>
                </div>
            </section> */}

            {/* CTA Section */}
            <motion.section
                className="py-20 bg-[#141322] text-center px-6"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <h2 className="text-3xl font-bold mb-4">Ready to make better decisions?</h2>
                <p className="text-gray-400 max-w-xl mx-auto">
                    Capture, share, and learn from your team's logs with one sleek platform.
                </p>
                <Link
                    to="/v1/login"
                    className="mt-6 inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-full font-semibold transition"
                >
                    Start Logging Now →
                </Link>
            </motion.section>

            {/* Scroll Progress Bar */}
            <motion.div
                className="fixed bottom-2 left-0 right-0 h-1 bg-purple-400 origin-left z-50"
                style={{ scaleX: progressBar }}
            />



            {/* Styles */}
            <style jsx>{`
        .gradient-animation {
          background: linear-gradient(120deg, #141322, #0f0f1a, #1e1e2f);
          background-size: 300% 300%;
        }
        .bg-radial {
          background: radial-gradient(circle at 50% 50%, rgba(80,0,255,0.3), transparent 70%);
        }
      `}</style>
        </div>
    );
}