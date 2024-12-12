import { Users } from "lucide-react";

const SidebarSkeleton = () => {
  // Create 8 skeleton items
  const skeletonContacts = Array(8).fill(null);

  return (
    <aside
      className="tw-h-full tw-w-20 lg:tw-w-72 tw-border-r tw-border-base-300 
      tw-flex tw-flex-col tw-transition-all tw-duration-200"
    >
      {/* Header */}
      <div className="tw-border-b tw-border-base-300 tw-w-full tw-p-5">
        <div className="tw-flex tw-items-center tw-gap-2">
          <Users className="tw-w-6 tw-h-6" />
          <span className="tw-font-medium tw-hidden lg:tw-block">Contacts</span>
        </div>
      </div>

      {/* Skeleton Contacts */}
      <div className="tw-overflow-y-auto tw-w-full tw-py-3">
        {skeletonContacts.map((_, idx) => (
          <div key={idx} className="tw-w-full tw-p-3 tw-flex tw-items-center tw-gap-3">
            {/* Avatar skeleton */}
            <div className="tw-relative tw-mx-auto lg:tw-mx-0">
              <div className="tw-skeleton tw-size-12 tw-rounded-full" />
            </div>

            {/* User info skeleton - only visible on larger screens */}
            <div className="tw-hidden lg:tw-block tw-text-left tw-min-w-0 tw-flex-1">
              <div className="tw-skeleton tw-h-4 tw-w-32 tw-mb-2" />
              <div className="tw-skeleton tw-h-3 tw-w-16" />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeleton;
