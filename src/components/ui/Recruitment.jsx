import React, { useState } from "react";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";

const Recruitment = () => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    branch: "",
    roll_no: "",
    year: "",
    phone_number: "",
    kiet_email: "",
    domain_pref_1: "",
    domain_pref_2: "",
    personal_email: "",
    creative_domain: "",
    hosteller: "",
    refer: "",
    why_kts: "",
  });

  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const {
      name,
      gender,
      branch,
      roll_no,
      year,
      phone_number,
      kiet_email,
      domain_pref_1,
      domain_pref_2,
      personal_email,
      creative_domain,
      hosteller,
      why_kts,
    } = formData;

    if (!name.trim()) {
      Swal.fire("Error", "Name is required", "error");
      return false;
    }
    if (!gender.trim()) {
      Swal.fire("Error", "Gender is required", "error");
      return false;
    }
    if (!branch.trim()) {
      Swal.fire("Error", "Branch is required", "error");
      return false;
    }
    if (!roll_no.trim()) {
      Swal.fire("Error", "University Roll No./User Id is required", "error");
      return false;
    }
    if (!year.trim()) {
      Swal.fire("Error", "Year is required", "error");
      return false;
    }
    if (!/^[0-9]{10}$/.test(phone_number)) {
      Swal.fire("Error", "Enter a valid 10-digit phone number", "error");
      return false;
    }
    if (!/^[a-zA-Z0-9._%+-]+@kiet\.edu$/.test(kiet_email)) {
      Swal.fire("Error", "Enter a valid KIET email (example@kiet.edu)", "error");
      return false;
    }
    if (!domain_pref_1.trim()) {
      Swal.fire("Error", "Please select Domain Preference 1", "error");
      return false;
    }
    if (!domain_pref_2.trim()) {
      Swal.fire("Error", "Please select Domain Preference 2", "error");
      return false;
    }
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(personal_email)) {
      Swal.fire("Error", "Enter a valid Personal Email", "error");
      return false;
    }
    if (!creative_domain.trim()) {
      Swal.fire("Error", "Please select a Creative Domain option", "error");
      return false;
    }
    if (!hosteller.trim()) {
      Swal.fire("Error", "Please select Hosteller/Day Scholar", "error");
      return false;
    }
    if (!why_kts.trim()) {
      Swal.fire("Error", "Please tell us why you want to join", "error");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    // normalize emails
    const payload = {
      ...formData,
      kiet_email: (formData.kiet_email || "").toLowerCase().trim(),
      personal_email: (formData.personal_email || "").toLowerCase().trim(),
      phone_number: (formData.phone_number || "").toString().trim(),
    };

    try {
      const { data, error } = await supabase
        .from("registrations")
        .insert([payload]);

      if (error) {
        // Robust duplicate detection:
        const msg = (error.message || "").toLowerCase();
        const details = (error.details || "").toLowerCase();
        const isDuplicate =
          error.code === "23505" ||
          msg.includes("duplicate") ||
          details.includes("kiet_email") ||
          details.includes("already exists");

        if (isDuplicate) {
          Swal.fire("Error", "This KIET email is already registered!", "error");
        } else {
          console.error("Supabase insert error:", error);
          Swal.fire("Error", error.message || "Insert failed", "error");
        }
      } else {
        // success
        setSubmitted(true);
        Swal.fire("Success 🎉", "Form submitted successfully!", "success");
        // clear form
        setFormData({
          name: "",
          gender: "",
          branch: "",
          roll_no: "",
          year: "",
          phone_number: "",
          kiet_email: "",
          domain_pref_1: "",
          domain_pref_2: "",
          personal_email: "",
          creative_domain: "",
          hosteller: "",
          refer: "",
          why_kts: "",
        });

        // Navigate after 30s (user sees WhatsApp box)
        setTimeout(() => nav("/"), 30000);
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong. Try again!", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-b pt-36 from-[#0b0434] via-[#4a4b8a] to-white min-h-screen flex flex-col justify-center items-center p-6">
      <motion.h2
        className="text-4xl md:text-5xl font-bold tracking-tight text-center mb-8 font-orbitron relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-400 to-yellow-300">
          KTS Recruitment 2025-26
        </span>
      </motion.h2>

      {!submitted ? (
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-2xl rounded-2xl shadow-2xl p-8 backdrop-blur-lg bg-white/20 border border-white/30 group relative bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg p-6 w-full transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-purple-500/25 hover:bg-white/20 hover:border-white/30 overflow-hidden"
        >
          {/* Animated background gradient on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 via-pink-400/10 to-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out rounded-xl"></div>
          {/* Floating particles */}
          <div className="absolute -top-1 -right-1 w-20 h-20 bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700 ease-in-out group-hover:animate-pulse"></div> <div className="absolute -bottom-1 -left-1 w-16 h-16 bg-gradient-to-tr from-blue-400/20 to-cyan-400/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-all duration-700 ease-in-out delay-100 group-hover:animate-pulse"></div>
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            {/* Name */}
            <div>
              <label className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-200 group-hover:via-blue-300 group-hover:to-purple-300 transition-all duration-300 ease-in-out transform group-hover:drop-shadow-lg">Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full mt-2 px-4 py-3 rounded-xl border border-white/30 bg-white/20 text-white"
                placeholder="Your Name..."
                required
              />
            </div>

            {/* Gender */}
            <div>
              <label className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-200 group-hover:via-blue-300 group-hover:to-purple-300 transition-all duration-300 ease-in-out transform group-hover:scale-105 group-hover:drop-shadow-lg">Gender *</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full mt-2 px-4 py-3 rounded-xl border border-white/30 bg-white/20 text-white"
                required
              >
                <option value="" className="text-gray-500">Choose...</option>
                <option value="Male" className="text-black">
                  Male
                </option>
                <option value="Female" className="text-black">
                  Female
                </option>
                <option value="Other" className="text-black">
                  Other
                </option>
              </select>
            </div>

            {/* Branch */}
            <div>
              <label className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-200 group-hover:via-blue-300 group-hover:to-purple-300 transition-all duration-300 ease-in-out transform group-hover:scale-105 group-hover:drop-shadow-lg">Branch *</label>
              <input
                type="text"
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                className="w-full mt-2 px-4 py-3 rounded-xl border border-white/30 bg-white/20 text-white"
                placeholder="CSE / IT / ECE ..."
                required
              />
            </div>

            {/* Roll No */}
            <div>
              <label className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-200 group-hover:via-blue-300 group-hover:to-purple-300 transition-all duration-300 ease-in-out transform group-hover:scale-105 group-hover:drop-shadow-lg">
                University Roll Number / User Id *
              </label>
              <input
                type="text"
                name="roll_no"
                value={formData.roll_no}
                onChange={handleChange}
                className="w-full mt-2 px-4 py-3 rounded-xl border border-white/30 bg-white/20 text-white"
                placeholder="Your University Roll Number..."
                required
              />
            </div>

            {/* Year */}
            <div>
              <label className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-200 group-hover:via-blue-300 group-hover:to-purple-300 transition-all duration-300 ease-in-out transform group-hover:scale-105 group-hover:drop-shadow-lg">Year *</label>
              <select
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="w-full mt-2 px-4 py-3 rounded-xl border border-white/30 bg-white/20 text-white"
                required
              >
                <option value="" className="text-gray-500">Choose...</option>
                <option value="1st" className="text-black">
                  1st Year
                </option>
                <option value="2nd" className="text-black">
                  2nd Year
                </option>
              </select>
            </div>

            {/* Phone Number */}
            <div>
              <label className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-200 group-hover:via-blue-300 group-hover:to-purple-300 transition-all duration-300 ease-in-out transform group-hover:scale-105 group-hover:drop-shadow-lg">Phone Number *</label>
              <input
                type="tel"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                maxLength={10}
                pattern="[0-9]{10}"
                className="w-full mt-2 px-4 py-3 rounded-xl border border-white/30 bg-white/20 text-white"
                placeholder="Only 10 digits Phone Number..."
                required
              />
            </div>

            {/* KIET Email */}
            <div>
              <label className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-200 group-hover:via-blue-300 group-hover:to-purple-300 transition-all duration-300 ease-in-out transform group-hover:scale-105 group-hover:drop-shadow-lg">KIET Email Id *</label>
              <input
                type="email"
                name="kiet_email"
                value={formData.kiet_email}
                onChange={handleChange}
                className="w-full mt-2 px-4 py-3 rounded-xl border border-white/30 bg-white/20 text-white"
                placeholder="example@kiet.edu (No Gmail here)..."
                required
              />
            </div>

            {/* Domain Preference 1 */}
            <div>
              <label className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-200 group-hover:via-blue-300 group-hover:to-purple-300 transition-all duration-300 ease-in-out transform group-hover:scale-105 group-hover:drop-shadow-lg">Domain Preference 1 *</label>
              <select
                name="domain_pref_1"
                value={formData.domain_pref_1}
                onChange={handleChange}
                className="w-full mt-2 px-4 py-3 rounded-xl border border-white/30 bg-white/20 text-white"
                required
              >
                <option value="" className="text-gray-500">Choose...</option>
                <option value="Web Development" className="text-black">
                  Web Development
                </option>
                <option value="DSA/CP" className="text-black">
                  DSA/CP
                </option>
                <option value="Android Development" className="text-black">
                  Android Development
                </option>
                <option value="Machine Learning" className="text-black">
                  Machine Learning
                </option>
                <option value="UI/UX" className="text-black">
                  UI/UX
                </option>
              </select>
            </div>

            {/* Domain Preference 2 */}
            <div>
              <label className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-200 group-hover:via-blue-300 group-hover:to-purple-300 transition-all duration-300 ease-in-out transform group-hover:scale-105 group-hover:drop-shadow-lg">Domain Preference 2 *</label>
              <select
                name="domain_pref_2"
                value={formData.domain_pref_2}
                onChange={handleChange}
                className="w-full mt-2 px-4 py-3 rounded-xl border border-white/30 bg-white/20 text-white"
                required
              >
                <option value="" className="text-gray-500">Choose...</option>
                <option value="Web Development" className="text-black">
                  Web Development
                </option>
                <option value="DSA/CP" className="text-black">
                  DSA/CP
                </option>
                <option value="Android Development" className="text-black">
                  Android Development
                </option>
                <option value="Machine Learning" className="text-black">
                  Machine Learning
                </option>
                <option value="UI/UX" className="text-black">
                  UI/UX
                </option>
              </select>
            </div>

            {/* Personal Email */}
            <div>
              <label className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-200 group-hover:via-blue-300 group-hover:to-purple-300 transition-all duration-300 ease-in-out transform group-hover:scale-105 group-hover:drop-shadow-lg">Personal Email Id *</label>
              <input
                type="email"
                name="personal_email"
                value={formData.personal_email}
                onChange={handleChange}
                className="w-full mt-2 px-4 py-3 rounded-xl border border-white/30 bg-white/20 text-white"
                placeholder="Your backup email..."
                required
              />
            </div>

            {/* Creative Domain */}
            <div>
              <label className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-200 group-hover:via-blue-300 group-hover:to-purple-300 transition-all duration-300 ease-in-out transform group-hover:scale-105 group-hover:drop-shadow-lg">
                Are you Interested in any Creative Domain? *
              </label>
              <select
                name="creative_domain"
                value={formData.creative_domain}
                onChange={handleChange}
                className="w-full mt-2 px-4 py-3 rounded-xl border border-white/30 bg-white/20 text-white"
                required
              >
                <option value="" className="text-gray-500">Choose...</option>
                <option value="Video Editing" className="text-black">
                  Video Editing
                </option>
                <option value="Photography" className="text-black">
                  Photography
                </option>
                <option
                  value="PR (Social Media Content Planning)"
                  className="text-black"
                >
                  PR - Social Media Content Planning
                </option>
                <option value="Content Writing" className="text-black">
                  Content Writing
                </option>
                <option value="None" className="text-black">
                  None
                </option>
              </select>
            </div>

            {/* Hosteller / Day Scholar */}
            <div>
              <label className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-200 group-hover:via-blue-300 group-hover:to-purple-300 transition-all duration-300 ease-in-out transform group-hover:scale-105 group-hover:drop-shadow-lg">Are you ? *</label>
              <select
                name="hosteller"
                value={formData.hosteller}
                onChange={handleChange}
                className="w-full mt-2 px-4 py-3 rounded-xl border border-white/30 bg-white/20 text-white"
                required
              >
                <option value="" className="text-gray-500">Choose...</option>
                <option value="Hosteller" className="text-black">
                  Hosteller
                </option>
                <option value="Day Scholar" className="text-black">
                  Day Scholar
                </option>
              </select>
            </div>

            {/* Refer By */}
            <div>
              <label className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-200 group-hover:via-blue-300 group-hover:to-purple-300 transition-all duration-300 ease-in-out transform group-hover:scale-105 group-hover:drop-shadow-lg">Refer By</label>
              <input
                type="text"
                name="refer"
                value={formData.refer}
                onChange={handleChange}
                className="w-full mt-2 px-4 py-3 rounded-xl border border-white/30 bg-white/20 text-white"
                placeholder="Refer by (if any)..."
              />
            </div>

            {/* Why join us */}
            <div>
              <label className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-200 group-hover:via-blue-300 group-hover:to-purple-300 transition-all duration-300 ease-in-out transform group-hover:scale-105 group-hover:drop-shadow-lg">
                Why do you want to join us? *
              </label>
              <textarea
                name="why_kts"
                value={formData.why_kts}
                onChange={handleChange}
                className="w-full mt-2 px-4 py-3 rounded-xl border border-white/30 bg-white/20 text-white"
                placeholder="Why KTS? ..."
                rows="3"
                required
              ></textarea>
            </div>

            {/* Submit */}
            <motion.button
              whileHover={!loading ? { scale: 1.05 } : {}}
              whileTap={!loading ? { scale: 0.95 } : {}}
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-xl font-semibold text-white transition 
              ${loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-lg hover:shadow-purple-400/40"
                }`}
            >
              {loading ? "Submitting..." : "Submit"}
            </motion.button>
          </form>

          {/* Shine Effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"> <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div> </div>
          {/* Border Glow */}
          <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-purple-500/50 via-pink-500/50 to-blue-500/50 blur-sm -z-10 transform scale-105"></div>
        </motion.div>
      ) : (
        // ✅ Success box WhatsApp link
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-gradient-to-r from-purple-600/30 via-indigo-600/30 to-blue-600/30 backdrop-blur-xl 
             p-10 rounded-2xl shadow-2xl text-center text-white max-w-lg border border-white/20"
        >
          <h2 className="text-4xl font-extrabold mb-4 drop-shadow-lg">
            🎉 Welcome to <span className="text-yellow-300">KTS</span>!
          </h2>

          <p className="mb-4 text-lg font-medium">
            Congratulations recruit, you just unlocked <br />
            <span className="text-green-300 font-bold">LEVEL 1: Registration ✅</span>
          </p>

          <p className="mb-6 text-sm italic text-gray-200">
            Next mission awaits you in the <br />
            <span className="text-green-400">Secret WhatsApp Hideout 🔥</span>
          </p>

          <a
            href="https://chat.whatsapp.com/GUz0SHj9RrXERicSLQjvp0"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 
               rounded-xl shadow-md transition-transform transform hover:scale-105"
          >
            🚀 Join WhatsApp Squad
          </a>

          <div className="mt-6">
            <p className="text-sm text-gray-600 animate-pulse">
              Redirecting you to home page in <span className="font-bold text-white">30s</span>... ⏳
            </p>
            <p className="mt-2 text-xs text-gray-600">
              (Tip: Bring your brain + humor, you’ll need both 😜)
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Recruitment;