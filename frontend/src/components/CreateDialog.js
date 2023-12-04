import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import GPTForm from "./GPTForm";


const CreateDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpen = () => {
    // Add any logic you need before opening the dialog
    setIsDialogOpen(true);
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
        <button
          onClick={handleOpen}
          className="bg-violet-600 hover:bg-violet-800 text-white font-bold py-2 px-4 rounded-full"
        >
          Create New GPT
        </button>
        </DialogTrigger>
        <DialogContent>
          <GPTForm/>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateDialog;
