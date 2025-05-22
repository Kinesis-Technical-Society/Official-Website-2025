import React, { useEffect } from "react";
import projects from "../../data/projects";
import { motion } from "framer-motion";

const ProjectCard = ({ project }) => (
    <div className="bg-white rounded-xl shadow-md p-5 w-full max-w-sm transition hover:shadow-lg">
        <h3 className="text-xl font-bold text-[#171040] mb-2">{project.title}</h3>
        <p className="text-gray-700 text-sm mb-3">{project.description}</p>
        <div className="text-xs mb-3 flex flex-wrap gap-2">
            {project.techStack.map((tech, i) => (
                <span key={i} className="bg-gray-200 text-gray-800 px-2 py-0.5 rounded">
                    {tech}
                </span>
            ))}
        </div>
        <div className="flex gap-4 mt-4">
            {project.liveLink && (
                <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white bg-[#171040] px-3 py-1 rounded hover:bg-[#2a1f77] text-sm"
                >
                    Live
                </a>
            )}
            {project.githubLink && (
                <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#171040] border border-[#171040] px-3 py-1 rounded hover:bg-[#171040] hover:text-white text-sm"
                >
                    GitHub
                </a>
            )}
        </div>
    </div>
);

const ProjectsPage = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return (
        <section className="min-h-screen bg-gradient-to-b from-[#0b0434] via-[#4a4b8a] to-white py-5 px-5 md:px-20 pt-32">
            <motion.div
                className="text-center mb-5 z-10"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-center font-orbitron">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-400 to-yellow-300">
                        Projects
                    </span>
                </h2>
            </motion.div>

            {Object.entries(projects).map(([domain, domainProjects]) => (
                <div key={domain} className="mb-14">
                    <h2 className="text-3xl font-bold text-white mb-6">{domain} Projects</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {domainProjects.map((project, index) => (
                            <ProjectCard key={index} project={project} />
                        ))}
                    </div>
                </div>
            ))}
        </section>
    );
};

export default ProjectsPage;
