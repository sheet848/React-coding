import React from 'react'

const ProgressBar = ({
  progress = 0,
  size = "medium", // small, medium, large
  showLabel = true,
  indeterminate = false,
}) => {

  // Clamp progress between 0 and 100
  const safeProgress = Math.min(100, Math.max(0, progress));

    // Size styles
  //const heightMap = { small: "h-2", medium: "h-4", large: "h-6" };
  //const heightClass = heightMap[size] || heightMap.medium;

  return (
    <>
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {!indeterminate ? (
        <div
          style={{ width: `${safeProgress}%` }}
        />
      ) : (
        // Indeterminate animation
        <div>
          <div/>
          <style>{`
            @keyframes indeterminate {
              0% { left: -33%; }
              100% { left: 100%; }
            }
            .animate-indeterminate {
              animation: indeterminate 1.5s infinite;
            }
          `}</style>
        </div>
      )}

      {showLabel && !indeterminate && (
        <div>
          {safeProgress}%
        </div>
      )}
    </div>
    </>
  )
}

export default ProgressBar