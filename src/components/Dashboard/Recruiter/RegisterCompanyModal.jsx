"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Upload, MapPin, ChevronDown, Loader2 } from "lucide-react";
import { toast, Toast, Modal, Button } from "@heroui/react";
import { createCompany } from "@/lib/actions/companies";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const RegisterCompanyModal = () => {
  const [logoFile, setLogoFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { data: session } = authClient.useSession();
  const userId = session?.user?.id;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file?.size > 5 * 1024 * 1024) {
      toast.danger("File size exceeds 5MB limit.");
      return;
    }
    if (file) {
      setLogoFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.target);
    let companyData = Object.fromEntries(formData.entries());
    companyData.userId = userId;
    companyData.companyStatus = "pending";

    try {
      if (logoFile) {
        const imgData = new FormData();
        imgData.append("image", logoFile);

        const imgResponse = await fetch(
          `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API}`,
          { method: "POST", body: imgData },
        );

        const imgJson = await imgResponse.json();
        if (imgJson.success) {
          companyData.logo = imgJson.data.display_url;
        }
      }

      const payload = await createCompany(companyData);
      if (payload.acknowledged) {
        toast.success("Company registered successfully!");
        router.push("/dashboard/recruiter/company");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.danger("Failed to register company.");
    } finally {
      setIsLoading(false);
    }
  };

  const labelClass = "block text-sm font-medium text-neutral-300 mb-1.5";
  const inputClass =
    "w-full bg-[#222222] border border-neutral-700 hover:border-neutral-500 focus:border-white focus:outline-none text-white px-3 py-2.5 rounded-lg text-sm transition-colors placeholder:text-neutral-500";

  return (
    <>
      <Toast.Provider />
      <Modal>
        <Button className="bg-white text-black hover:bg-neutral-200 px-6 py-2.5 rounded-lg text-sm font-medium transition-colors">
          Register your company
        </Button>
        <Modal.Backdrop>
          <Modal.Container placement="auto">
            <Modal.Dialog className="bg-[#161616] border border-neutral-800 text-white sm:max-w-3xl">
              <Modal.CloseTrigger className="text-neutral-500 hover:text-white transition-colors" />

              <Modal.Header className="border-b border-neutral-800 pb-4">
                <Modal.Heading className="text-xl font-semibold">
                  Register New Company
                </Modal.Heading>
                <p className="text-sm text-neutral-400 mt-1">
                  Enter your business details to start hiring on HireLoop.
                </p>
              </Modal.Header>

              <Modal.Body className="p-6">
                <form
                  id="register-company-form"
                  onSubmit={onSubmit}
                  className="flex flex-col gap-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                    <div>
                      <label className={labelClass}>Company Name</label>
                      <input
                        required
                        name="name"
                        type="text"
                        placeholder="e.g. Acme Corp"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Industry / Category</label>
                      <div className="relative">
                        <select
                          required
                          name="industry"
                          defaultValue=""
                          className={`${inputClass} appearance-none pr-10 cursor-pointer`}
                        >
                          <option value="" disabled>
                            Select industry
                          </option>
                          <option value="Technology">Technology</option>
                          <option value="Healthcare">Healthcare</option>
                          <option value="Finance">Finance</option>
                          <option value="Education">Education</option>
                        </select>
                        <ChevronDown
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
                          size={16}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={labelClass}>Website URL</label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-neutral-700 bg-[#1A1A1A] text-neutral-500 text-sm">
                          https://
                        </span>
                        <input
                          name="website"
                          type="text"
                          placeholder="www.company.com"
                          className={`${inputClass} rounded-l-none`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={labelClass}>Location</label>
                      <div className="relative">
                        <MapPin
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500"
                          size={16}
                        />
                        <input
                          required
                          name="location"
                          type="text"
                          placeholder="City, Country"
                          className={`${inputClass} pl-9`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={labelClass}>Employee Count Range</label>
                      <div className="relative">
                        <select
                          required
                          name="employeeCount"
                          defaultValue=""
                          className={`${inputClass} appearance-none pr-10 cursor-pointer`}
                        >
                          <option value="" disabled>
                            Select range
                          </option>
                          <option value="1-10">1-10 employees</option>
                          <option value="11-50">11-50 employees</option>
                          <option value="51-200">51-200 employees</option>
                          <option value="201+">201+ employees</option>
                        </select>
                        <ChevronDown
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
                          size={16}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className={labelClass}>Company Logo</label>
                      <div className="flex items-center gap-4">
                        <label className="relative flex items-center justify-center w-16 h-16 bg-[#222222] border border-neutral-700 border-dashed rounded-lg cursor-pointer hover:border-neutral-500 transition-colors overflow-hidden shrink-0">
                          <input
                            type="file"
                            name="logoFile"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                          />
                          {previewUrl ? (
                            <Image
                              src={previewUrl}
                              alt="Logo preview"
                              fill
                              unoptimized
                              className="object-cover"
                            />
                          ) : (
                            <Upload size={20} className="text-neutral-400" />
                          )}
                        </label>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-white">
                            Upload image
                          </span>
                          <span className="text-xs text-neutral-500">
                            PNG, JPG up to 5MB
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Brief Description</label>
                    <textarea
                      required
                      name="description"
                      rows="4"
                      placeholder="Tell us about your company's mission and culture..."
                      className={`${inputClass} resize-y`}
                    ></textarea>
                  </div>
                </form>
              </Modal.Body>

              <Modal.Footer className="border-t border-neutral-800 pt-4">
                <Button
                  slot="close"
                  variant="secondary"
                  className="px-5 py-2.5 rounded-lg border border-neutral-700 bg-transparent text-sm font-medium text-white hover:bg-[#222222] transition-colors"
                >
                  Cancel
                </Button>
                <button
                  type="submit"
                  form="register-company-form"
                  disabled={isLoading}
                  className="flex items-center justify-center min-w-35 px-5 py-2.5 rounded-lg bg-white text-black text-sm font-semibold hover:bg-neutral-200 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin text-black" size={18} />
                  ) : (
                    "Register Company"
                  )}
                </button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
};

export default RegisterCompanyModal;
