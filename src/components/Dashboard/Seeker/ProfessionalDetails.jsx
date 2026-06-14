"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@heroui/react";

export default function ProfessionalDetails() {
  const [headline, setHeadline] = useState("Senior UX/UI Designer");
  const [bio, setBio] = useState(
    "Passionate designer with 5+ years of experience crafting user-centric digital experiences..."
  );
  const [skills, setSkills] = useState(["Figma", "UI Design", "Prototyping"]);
  const [newSkill, setNewSkill] = useState("");

  const handleAddSkill = (e) => {
    if (e.key === "Enter" && newSkill.trim()) {
      e.preventDefault();
      if (!skills.includes(newSkill.trim())) {
        setSkills([...skills, newSkill.trim()]);
      }
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  return (
    <div className="bg-[#161719] border border-[#1f2125] rounded-2xl p-6 space-y-6">
      <h2 className="text-lg font-bold text-white">Professional Details</h2>

      {/* Headline Input */}
      <div className="space-y-1.5 flex flex-col">
        <label className="text-xs font-medium text-neutral-400 mb-2">Professional Headline</label>
        <input
          type="text"
          value={headline}
          onChange={(e) => setHeadline(e.target.value)}
          className="w-full bg-[#0B0B0C] border border-neutral-800 hover:border-neutral-700 focus:border-neutral-600 outline-none rounded-xl h-10 px-3 text-white text-sm transition-all"
        />
      </div>

      {/* Bio Textarea */}
      <div className="space-y-1.5 flex flex-col">
        <label className="text-xs font-medium text-neutral-400 mb-2">Bio</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={4}
          className="w-full bg-[#0B0B0C] border border-neutral-800 hover:border-neutral-700 focus:border-neutral-600 outline-none rounded-xl p-3 text-white text-sm leading-relaxed transition-all resize-none"
        />
      </div>

      {/* Skills Tag Field */}
      <div className="space-y-1.5 flex flex-col">
        <label className="text-xs font-medium text-neutral-400 mb-2">Skills</label>
        <div className="bg-[#0B0B0C] border border-neutral-800 rounded-xl flex flex-wrap items-center gap-2 focus-within:border-neutral-600 transition-all min-h-11 p-3">
          {skills.map((skill) => (
            <div
              key={skill}
              className="inline-flex items-center gap-1.5 bg-[#23262a] text-neutral-300 text-xs font-medium px-2.5 py-1 rounded-lg border border-neutral-800"
            >
              <span>{skill}</span>
              <button
                type="button"
                onClick={() => handleRemoveSkill(skill)}
                className="text-neutral-500 hover:text-white transition-colors cursor-pointer"
              >
                <X size={12} />
              </button>
            </div>
          ))}
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={handleAddSkill}
            placeholder="Add a skill..."
            className="flex-1 bg-transparent text-white text-sm outline-none px-1 min-w-30 placeholder-neutral-600"
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="pt-2 border-t border-neutral-900">
        <Button
          size="md"
          className="bg-white text-black hover:bg-neutral-200 font-semibold text-xs rounded-xl px-6 h-10"
        >
          Save Details
        </Button>
      </div>
    </div>
  );
}