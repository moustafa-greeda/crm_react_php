import { X } from "lucide-react";
import { useChatStore } from "../../store/useChatStore";
import { useAuthStore } from "../../store/useAuthStore";


const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="tw-p-2.5 tw-border-b tw-border-base-300">
      <div className="tw-flex tw-items-center tw-justify-between">
        <div className="tw-flex tw-items-center tw-gap-3">
          {/* Avatar */}
          <div className="tw-avatar">
            <div className="tw-size-10 tw-rounded-full tw-relative">
              <img
                src={selectedUser?.profilePic || "/avatar.png"}
                alt={selectedUser?.fullName || "User"}
              />            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="tw-font-medium">{selectedUser?.fullName || "Unknown User"}</h3>
            <p className="tw-text-sm tw-text-base-content/70">
              {selectedUser && onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>

          </div>
        </div>

        {/* Close button */}
        <button onClick={() => setSelectedUser(null)}>
          <X />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
