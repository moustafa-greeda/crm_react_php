import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="tw-w-full tw-flex tw-flex-1 tw-flex-col tw-items-center tw-justify-center tw-p-16 tw-bg-base-100/50">
      <div className="tw-max-w-md tw-text-center tw-space-y-6">
        {/* Icon Display */}
        <div className="tw-flex tw-justify-center tw-gap-4 tw-mb-4">
          <div className="tw-relative">
            <div
              className="tw-w-16 tw-h-16 tw-rounded-2xl tw-bg-primary/10 tw-flex tw-items-center
             tw-justify-center tw-animate-bounce"
            >
              <MessageSquare className="tw-w-8 tw-h-8 tw-text-primary " />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="tw-text-2xl tw-font-bold">Welcome to Messages!</h2>
        <p className="tw-text-base-content/60">
          Select a conversation from the sidebar to start chatting
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
