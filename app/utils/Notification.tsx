import React, { useState, useEffect } from 'react'


type NotificationType = 'success' | 'error' | 'info'

interface NotificationProps {
  message: string
  type?: NotificationType
  duration?: number
  onClose?: () => void
}

const typeStyles = {
  success: 'bg-green-500',
  error: 'bg-red-500',
  info: 'bg-blue-500'
}

export const Notification: React.FC<NotificationProps> = ({
  message,
  type = 'info',
  duration = 3000,
  onClose
}) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        if (onClose) {
          onClose()
        }
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [duration, onClose])

  const handleClose = () => {
    setIsVisible(false)
    if (onClose) {
      onClose()
    }
  }

  if (!isVisible) return null

  return (
    <div className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg text-white ${typeStyles[type]} transition-opacity duration-300 ease-in-out`}>
      <div className="flex items-center justify-between">
        <p className="mr-8">{message}</p>
        <button
          onClick={handleClose}
          className="text-white hover:text-gray-200 transition-colors duration-200"
          aria-label="Close notification"
        >
          X
        </button>
      </div>
    </div>
  )
}

/// example
// <Notification
// const [notification, setNotification] = useState<{ show: boolean; type: 'success' | 'error' |"info"; message: string; } | null>(null);
// const chainName = chains.find(chain => chain.id === chainId)?.name || chainId;
// setNotification({
//   show: true,
//   type: 'info',
//   message: `Started connection to ${chainName}`
// });


// setNotification({
//   show: true,
//   type: 'success',
//   message: `Successfully connected to ${chainName}`
// });
// setNotification({
//   show: true,
//   type: 'error',
//   message: `Failed to connect to ${chains.find(chain => chain.id === chainId)?.name || chainId}`
// });

// {notification && notification.show && (
//   <Notification
//     message={notification.message}
//     type={notification.type}
//     duration={notification.type === 'info' ? 0 : 5000}
//     onClose={() => setNotification(null)}
//   />
// )}