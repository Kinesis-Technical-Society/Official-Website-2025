import React, { useEffect } from "react";
import projects from "../../data/projects";
import { motion } from "framer-motion";

const ProjectCard = ({ project }) => (
    <div className="group relative bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg p-6 w-full transition-all duration-500 ease-in-out hover:shadow-2xl hover:shadow-purple-500/25 hover:scale-105 hover:bg-white/20 hover:border-white/30 hover:-translate-y-2 cursor-pointer overflow-hidden">
        {/* Animated background gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 via-pink-400/10 to-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out rounded-xl"></div>

        {/* Floating particles */}
        <div className="absolute -top-1 -right-1 w-20 h-20 bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700 ease-in-out group-hover:animate-pulse"></div>
        <div className="absolute -bottom-1 -left-1 w-16 h-16 bg-gradient-to-tr from-blue-400/20 to-cyan-400/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-all duration-700 ease-in-out delay-100 group-hover:animate-pulse"></div>

        {/* Content */}
        <div className="relative z-10">
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-200 group-hover:via-blue-300 group-hover:to-purple-300 transition-all duration-300 ease-in-out transform group-hover:scale-105 group-hover:drop-shadow-lg">
                {project.title}
            </h3>

            <p className="text-gray-300 text-sm mb-4 leading-relaxed group-hover:text-white transition-colors duration-300 ease-in-out">
                {project.description}
            </p>

            <div className="text-xs mb-4 flex flex-wrap gap-2">
                {project.techStack.map((tech, i) => (
                    <span
                        key={i}
                        className="bg-white/20 backdrop-blur-sm text-white px-3 py-1.5 rounded-full border border-white/30 transition-all duration-300 ease-in-out hover:bg-white/30 hover:scale-110 hover:border-white/50 hover:shadow-lg cursor-pointer transform"
                    >
                        {tech}
                    </span>
                ))}
            </div>

            <div className="flex gap-4 mt-6">
                {project.liveLink && (
                    <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative overflow-hidden text-white bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 ease-in-out hover:from-purple-500 hover:to-blue-500 hover:scale-110 hover:shadow-xl hover:shadow-purple-500/60 transform group/btn border border-purple-400/30"
                    >
                        <span className="relative z-10 drop-shadow-sm">Live Demo</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                    </a>
                )}
                {project.githubLink && (
                    <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative overflow-hidden text-white border-2 border-cyan-300/90 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-cyan-500/40 hover:to-blue-500/40 hover:border-cyan-200 hover:scale-110 hover:shadow-xl hover:shadow-cyan-400/50 transform group/btn bg-cyan-500/20"
                    >
                        <span className="relative z-10 drop-shadow-sm">GitHub</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-300/30 to-blue-400/30 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                    </a>
                )}
            </div>
        </div>

        {/* Shine Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
        </div>

        {/* Border Glow */}
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-purple-500/50 via-pink-500/50 to-blue-500/50 blur-sm -z-10 transform scale-105"></div>
    </div>
);

const ProjectsPage = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    return (
        <section className="min-h-screen bg-gradient-to-b from-[#0b0434] via-[#4a4b8a] to-white pt-36 pb-20 px-5 md:px-10">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-400 to-yellow-300">
                        Projects
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <ProjectCard key={index} project={project} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProjectsPage;
