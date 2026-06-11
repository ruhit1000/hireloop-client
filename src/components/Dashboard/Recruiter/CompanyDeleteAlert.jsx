"use client";

import { deleteCompany } from "@/lib/actions/companies";
import { AlertDialog, Button, toast, Toast } from "@heroui/react";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export function CompanyDeleteAlert({ title, id }) {
  const router = useRouter();

  const handleDelete = async (id) => {
    const res = await deleteCompany(id);
    console.log("Delete Company Response:", res);
    if (res.success) {
      router.refresh();
    } else {
      alert("Failed to delete company. Please try again.");
    }
  }

  return (
    <AlertDialog>
      {/* The Trigger Button */}
      <Button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg text-sm font-medium transition-colors border border-red-500/20">
        <Trash2 size={16} />
        Delete
      </Button>

      {/* The Modal */}
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="bg-[#161616] border border-neutral-800 text-white sm:max-w-100">
            <AlertDialog.CloseTrigger className="text-neutral-500 hover:text-white transition-colors" />

            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading className="text-lg font-semibold text-white">
                Delete {title} permanently?
              </AlertDialog.Heading>
            </AlertDialog.Header>

            <AlertDialog.Body>
              <p className="text-sm text-neutral-400">
                This will permanently delete <strong>{title}</strong> company and all
                associated jobs and data. This action cannot be undone.
              </p>
            </AlertDialog.Body>

            <AlertDialog.Footer className="pt-4 border-t border-neutral-800">
              <Button
                slot="close"
                variant="secondary"
                className="px-4 py-2 rounded-lg border border-neutral-700 bg-transparent text-sm font-medium text-white hover:bg-[#222222] transition-colors"
              >
                Cancel
              </Button>
              <Button
                slot="close"
                variant="danger"
                className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-colors"
                onPress={() => handleDelete(id)}
              >
                Delete Company
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
