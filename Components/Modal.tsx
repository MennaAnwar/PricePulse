"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/Components/ui/dialog";
import { DialogHeader } from "./ui/dialog";
import { FormEvent, useState } from "react";
import Image from "next/image";
import { addUserEmailToProduct } from "@/lib/actions";

interface Props {
  productId: string;
}

const Modal = ({ productId }: Props) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    await addUserEmailToProduct(productId, email);

    setIsSubmitting(false);
    setEmail("");
  };

  return (
    <Dialog>
      <DialogTrigger className="btn">Track</DialogTrigger>
      <DialogContent className="flex w-full max-w-[550px] flex-col gap-6 border-none bg-white px-6 py-9 text-dark">
        <DialogHeader>
          <DialogTitle>
            <h4 className="dialog-head_text">
              Stay updated with product pricing alerts right in your inbox!
            </h4>
          </DialogTitle>
          <DialogDescription>
            <form className="flex flex-col mt-5" onSubmit={handleSubmit}>
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="dialog-input_container">
                <Image
                  src="/assets/icons/mail.svg"
                  alt="mail"
                  width={18}
                  height={18}
                />

                <input
                  required
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="dialog-input"
                />
              </div>

              <button type="submit" className="dialog-btn">
                {isSubmitting ? "Submitting..." : "Track"}
              </button>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
