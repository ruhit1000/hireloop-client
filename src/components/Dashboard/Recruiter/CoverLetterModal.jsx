"use client";

import React from "react";
import { Modal, Button } from "@heroui/react";
import { User } from "lucide-react";

export default function CoverLetterModal({ application }) {
  if (!application) return null;

  return (
    <Modal aria-label="Cover Letter Viewer">
      <Button className="px-3 py-1.5 bg-[#161719] border border-[#23262a] hover:border-neutral-700 text-neutral-300 hover:text-white text-xs font-medium rounded-lg transition-all cursor-pointer">Open Letter</Button>
      <Modal.Backdrop className="bg-black/60 backdrop-blur-sm">
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-115 bg-[#111214] border border-[#1f2125] rounded-2xl overflow-hidden shadow-2xl animate-fadeIn">
            <Modal.CloseTrigger
              className="text-neutral-400 hover:text-white cursor-pointer"
            />

            <Modal.Header className="flex items-center gap-3 bg-[#161719] border-b border-[#1f2125] p-5">
              <Modal.Icon className="bg-[#222326] text-neutral-400 border border-[#2d3035] rounded-lg p-2 flex items-center justify-center shrink-0">
                <User className="size-5" />
              </Modal.Icon>
              <div className="flex flex-col text-left">
                <Modal.Heading className="text-white text-base font-semibold leading-tight">
                  {application.applicantName}
                </Modal.Heading>
                <span className="text-[11px] text-neutral-500 font-light mt-0.5">
                  Cover Letter Submission
                </span>
              </div>
            </Modal.Header>

            <Modal.Body className="p-6 text-sm text-neutral-300 font-light leading-relaxed whitespace-pre-wrap max-h-[50vh] overflow-y-auto scrollbar-thin selection:bg-neutral-800">
              {application.coverLetter ||
                "No introductory background text was submitted with this application file."}
            </Modal.Body>

            <Modal.Footer className="p-4 bg-[#161719]/40 border-t border-[#1f2125] w-full">
              <Button
                className="w-full bg-white text-black hover:bg-neutral-200 text-xs font-semibold rounded-xl h-10 border-none transition-colors"
                slot="close"
              >
                Close View
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
