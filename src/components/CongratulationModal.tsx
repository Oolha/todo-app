import { Fragment, useEffect } from "react";
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import confetti from "canvas-confetti";

interface CongratulationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const congratMessages: string[] = [
  "Great job! Keep up the good work!",
  "Another task completed! You're making progress!",
  "Well done! Your progress is inspiring!",
  "Keep it up! Small steps lead to great achievements!",
  "Wow! You're incredibly productive today!",
];

export default function CongratulationModal({
  isOpen,
  onClose,
}: CongratulationModalProps) {
  const randomMessage =
    congratMessages[Math.floor(Math.random() * congratMessages.length)];

  useEffect(() => {
    if (isOpen) {
      // Launch confetti when modal opens
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#f9a8d4", "#ec4899", "#86efac", "#60a5fa", "#ff7600"],
      });
    }
  }, [isOpen]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle
                  as="h3"
                  className="text-2xl font-bold text-center text-pink-500 mb-4"
                >
                  Congratulations!
                </DialogTitle>
                <div className="mt-2">
                  <p className="text-lg text-center text-gray-700 mb-6">
                    {randomMessage}
                  </p>
                </div>

                <div className="mt-4 flex justify-center">
                  <button
                    type="button"
                    className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-lg transition-colors"
                    onClick={onClose}
                  >
                    Continue
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
