const MessageSkeleton = () => {
  // Create an array of 6 items for skeleton messages
  const skeletonMessages = Array(6).fill(null);

  return (
    <div className="tw-flex-1 tw-overflow-y-auto tw-p-4 tw-space-y-4">
      {skeletonMessages.map((_, idx) => (
        <div key={idx} className={`tw-chat ${idx % 2 === 0 ? "tw-chat-start" : "tw-chat-end"}`}>
          <div className="tw-chat-image tw-avatar">
            <div className="tw-size-10 tw-rounded-full">
              <div className="tw-skeleton tw-w-full tw-h-full tw-rounded-full" />
            </div>
          </div>

          <div className="tw-chat-header tw-mb-1">
            <div className="tw-skeleton tw-h-4 tw-w-16" />
          </div>

          <div className="tw-chat-bubble tw-bg-transparent tw-p-0">
            <div className="tw-skeleton tw-h-16 tw-w-[200px]" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;
