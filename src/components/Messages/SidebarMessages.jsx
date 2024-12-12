import React, { useEffect } from 'react';
import { useChatStore } from '../../store/useChatStore';
import SidebarSkeleton from './skeletons/SidebarSkeleton';
import { Users } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

const SidebarMessages = () => {
    const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
    const { onlineUsers } = useAuthStore();

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    if (isUsersLoading) return <SidebarSkeleton />;

    return (
        <aside className='tw-h-full tw-w-20 lg:tw-w-72 tw-border-r tw-border-base-300 tw-flex tw-flex-col tw-transition-all tw-duration-200'>
            <div className='tw-border-b tw-border-base-300 tw-w-full tw-p-5'>
                <div className="tw-flex tw-items-center tw-gap-2">
                    <Users className='tw-size-6' />
                    <span className='tw-font-medium tw-hidden lg:tw-block'>Customers</span>
                </div>
            </div>

            <div className="tw-overflow-y-auto tw-w-full tw-py-3">
                {users.map((user) => (
                    <button
                        key={user._id}
                        onClick={() => setSelectedUser(user)}
                        className={`tw-w-full tw-p-3 tw-flex tw-items-center tw-gap-3 hover:tw-bg-base-300 tw-transition-colors 
                  ${selectedUser && selectedUser._id === user._id ? "tw-bg-base-300 tw-ring-1 tw-ring-base-300" : ""}`}
                    >
                        {/* Profile Picture */}
                        <div className="tw-relative tw-mx-auto lg:tw-mx-0">
                            <img
                                src={user.profilePic || "/avatar.png"}
                                alt={user.name}
                                className="tw-size-12 tw-object-cover tw-rounded-full"
                            />
                            {(onlineUsers || []).includes(user._id) && (
                                <span
                                    className="tw-absolute tw-bottom-0 tw-right-0 tw-size-3 tw-bg-green-500 
                                    tw-rounded-full tw-ring-2 tw-ring-zinc-900"
                                />
                            )}
                        </div>

                        {/* User Info */}
                        <div className="tw-hidden lg:tw-block tw-text-left tw-min-w-0">
                            <div className="tw-font-medium tw-truncate">{user.fullName}</div>
                            <div className="tw-text-sm tw-text-zinc-400">
                                {(onlineUsers || []).includes(user._id) ? "Online" : "Offline"}
                            </div>
                        </div>
                    </button>
                ))}

                {/* No Users Fallback */}
                {users.length === 0 && (
                    <div className="tw-text-center tw-text-zinc-500 tw-py-4">No users available</div>
                )}
            </div>
        </aside>
    );
};

export default SidebarMessages;
