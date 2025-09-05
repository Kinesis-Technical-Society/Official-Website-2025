import React, { useState } from "react";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Recruitment = () => {
  const scriptURL =
    "https://script.google.com/macros/s/AKfycbyi_v8CWAEcv3CHz3fW_ROAkw8XEOyPMp30J009n_ZX8tPQFEoSyCwym_pUt_dnYL8pjQ/exec";

  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    kiet_email: "",
    year: "",
    roll_no: "",
    branch: "",
    phone_number: "",
    preferred_domain: "",
    why_kts: "",
    extra_curricular: "",
  });

  const nav = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const { name, gender, kiet_email, year, roll_no, branch, phone_number, preferred_domain, why_kts, extra_curricular } = formData;

    if (!name.trim()) {
      Swal.fire("Error", "Name is required", "error");
      return false;
    }

    if (!gender) {
      Swal.fire("Error", "Gender is required", "error");
      return false;
    }

    if (!/^[a-zA-Z0-9._%+-]+@kiet\.edu$/.test(kiet_email)) {
      Swal.fire("Error", "Enter a valid KIET email (example@kiet.edu)", "error");
      return false;
    }

    if (!year.trim()) {
      Swal.fire("Error", "Year is required", "error");
      return false;
    }

    if (!roll_no.trim()) {
      Swal.fire("Error", "University Roll No. is required", "error");
      return false;
    }

    if (!branch.trim()) {
      Swal.fire("Error", "Branch is required", "error");
      return false;
    }

    if (!/^[0-9]{10}$/.test(phone_number)) {
      Swal.fire("Error", "Enter a valid 10-digit phone number", "error");
      return false;
    }

    if (!preferred_domain.trim()) {
      Swal.fire("Error", "Please select your preferred domain", "error");
      return false;
    }

    if (!why_kts.trim()) {
      Swal.fire("Error", "Please tell us why you want to join KTS", "error");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    const body = new FormData();
    Object.entries(formData).forEach(([key, value]) => body.append(key, value.toString()));

    try {
      const response = await fetch(scriptURL, { method: "POST", body });
      const result = await response.text();

      if (result.includes("success")) {
        Swal.fire("Success 🎉", "Form submitted successfully!", "success");
        setFormData({
          name: "",
          gender: "",
          kiet_email: "",
          year: "",
          roll_no: "",
          branch: "",
          phone_number: "",
          preferred_domain: "",
          why_kts: "",
          extra_curricular: "",
        });
        nav('/');
      } else if (result.includes("duplicate")) {
        Swal.fire("Error", "This KIET email is already registered!", "error");
      } else {
        Swal.fire("Oops!", result, "error");
      }
    } catch (error) {
      Swal.fire("Error", "Something went wrong. Try again!", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-b pt-36 from-[#0b0434] via-[#4a4b8a] to-white min-h-screen flex flex-col justify-center items-center p-6">
      {/* Title */}
      <motion.h2
        className="text-4xl md:text-5xl font-bold tracking-tight text-center mb-8 font-orbitron relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-400 to-yellow-300">
          Register Now
        </span>
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl rounded-2xl shadow-2xl p-8 backdrop-blur-lg bg-white/20 border border-white/30 group relative bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg p-6 w-full transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-purple-500/25 hover:scale-1.5 hover:bg-white/20 hover:border-white/30 overflow-hidden"
      >
        {/* Animated background gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 via-pink-400/10 to-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out rounded-xl"></div>

        {/* Floating particles */}
        <div className="absolute -top-1 -right-1 w-20 h-20 bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700 ease-in-out group-hover:animate-pulse"></div>
        <div className="absolute -bottom-1 -left-1 w-16 h-16 bg-gradient-to-tr from-blue-400/20 to-cyan-400/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-all duration-700 ease-in-out delay-100 group-hover:animate-pulse"></div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          {/* Name */}
          <div>
            <label className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-200 group-hover:via-blue-300 group-hover:to-purple-300 transition-all duration-300 ease-in-out transform group-hover:scale-105 group-hover:drop-shadow-lg">Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-2 px-4 py-3 rounded-xl border border-white/30 bg-white/20 text-white"
              placeholder="Enter your full name"
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
              <option value="">Choose...</option>
              <option value="Male" className="text-black">Male</option>
              <option value="Female" className="text-black">Female</option>
              <option value="Other" className="text-black">Other</option>
            </select>
          </div>

          {/* KIET Email */}
          <div>
            <label className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-200 group-hover:via-blue-300 group-hover:to-purple-300 transition-all duration-300 ease-in-out transform group-hover:scale-105 group-hover:drop-shadow-lg">KIET Email *</label>
            <input
              type="email"
              name="kiet_email"
              value={formData.kiet_email}
              onChange={handleChange}
              className="w-full mt-2 px-4 py-3 rounded-xl border border-white/30 bg-white/20 text-white"
              placeholder="example@kiet.edu"
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
              <option value="">Choose...</option>
              <option value="1st" className="text-black">1st Year</option>
              <option value="2nd" className="text-black">2nd Year</option>
            </select>
          </div>

          {/* Roll No */}
          <div>
            <label className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-200 group-hover:via-blue-300 group-hover:to-purple-300 transition-all duration-300 ease-in-out transform group-hover:scale-105 group-hover:drop-shadow-lg">University Roll No. *</label>
            <input
              type="text"
              name="roll_no"
              value={formData.roll_no}
              onChange={handleChange}
              className="w-full mt-2 px-4 py-3 rounded-xl border border-white/30 bg-white/20 text-white"
              placeholder="Enter university roll number"
              required
            />
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
              placeholder="CSE / IT / ECE / etc."
              required
            />
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
              placeholder="10-digit mobile number"
              required
            />
          </div>

          {/* Preferred Domain */}
          <div>
            <label className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-200 group-hover:via-blue-300 group-hover:to-purple-300 transition-all duration-300 ease-in-out transform group-hover:scale-105 group-hover:drop-shadow-lg">Preferred Domain *</label>
            <select
              name="preferred_domain"
              value={formData.preferred_domain}
              onChange={handleChange}
              className="w-full mt-2 px-4 py-3 rounded-xl border border-white/30 bg-white/20 text-white"
              required
            >
              <option value="">Choose...</option>
              <option value="Web Development" className="text-black">Web Development</option>
              <option value="Android" className="text-black">Android Development</option>
              <option value="ML" className="text-black">Machine Learning</option>
              <option value="DSA/CP" className="text-black">DSA / CP</option>
              <option value="UI/UX" className="text-black">UI / UX</option>
              <option value="Video Editing" className="text-black">Video Editing</option>
            </select>
          </div>

          {/* Why KTS */}
          <div>
            <label className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-200 group-hover:via-blue-300 group-hover:to-purple-300 transition-all duration-300 ease-in-out transform group-hover:scale-105 group-hover:drop-shadow-lg">Why KTS? *</label>
            <textarea
              name="why_kts"
              value={formData.why_kts}
              onChange={handleChange}
              className="w-full mt-2 px-4 py-3 rounded-xl border border-white/30 bg-white/20 text-white"
              placeholder="Tell us why you want to join KTS..."
              rows="3"
              required
            ></textarea>
          </div>

          {/* Extra Curricular */}
          <div>
            <label className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-200 group-hover:via-blue-300 group-hover:to-purple-300 transition-all duration-300 ease-in-out transform group-hover:scale-105 group-hover:drop-shadow-lg">Extra Curricular</label>
            <textarea
              name="extra_curricular"
              value={formData.extra_curricular}
              onChange={handleChange}
              className="w-full mt-2 px-4 py-3 rounded-xl border border-white/30 bg-white/20 text-white"
              placeholder="Mention your extra curricular activities..."
              rows="3"
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
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
        </div>

        {/* Border Glow */}
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-purple-500/50 via-pink-500/50 to-blue-500/50 blur-sm -z-10 transform scale-105"></div>
      </motion.div>
    </div>
  );
};

export default Recruitment;
