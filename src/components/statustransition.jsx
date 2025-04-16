import { useState, useEffect } from "react"
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import "./status-indicator.css"

export default function TransactionStatusIndicator() {
  const [status, setStatus] = useState("analyzing")
  const [isTransitioning, setIsTransitioning] = useState(false)

  const statusInfo = {
    analyzing: {
      type: "analyzing",
      message: "Analyzing transaction",
      bgColor: "bg-blue-100",
      borderColor: "border border-blue-600",
      textColor: "text-blue-700",
      icon: <Loader2 className="h-4 w-4 text-blue-700 animate-spin" />,
    },
    success: {
      type: "success",
      message: "Transaction successful",
      bgColor: "bg-emerald-100",
      borderColor: "border border-emerald-600",
      textColor: "text-emerald-700",
      icon: <CheckCircle className="h-4 w-4 text-emerald-700" />,
    },
    failed: {
      type: "failed",
      message: "Transaction failed",
      bgColor: "bg-red-100",
      borderColor: "border border-red-600",
      textColor: "text-red-700",
      icon: <AlertCircle className="h-4 w-4 text-red-700" />,
    },
  }

  useEffect(() => {
    // Initial cycle
    const cycleStatus = () => {
      // Start with analyzing
      setStatus("analyzing")
      setIsTransitioning(false)

      // After 1 sec, change to success
      const successTimer = setTimeout(() => {
        setIsTransitioning(true)
        setTimeout(() => {
          setStatus("success")
          setIsTransitioning(false)

          // After 0.8 sec, change to analyzing again
          const backToAnalyzingTimer = setTimeout(() => {
            setIsTransitioning(true)
            setTimeout(() => {
              setStatus("analyzing")
              setIsTransitioning(false)

              // After 1 sec, change to failed
              const failedTimer = setTimeout(() => {
                setIsTransitioning(true)
                setTimeout(() => {
                  setStatus("failed")
                  setIsTransitioning(false)

                  // After 1 sec, restart the cycle
                  const restartTimer = setTimeout(() => {
                    setIsTransitioning(true)
                    setTimeout(() => {
                      cycleStatus()
                    }, 300) // Longer transition animation
                  }, 1000)

                  return () => clearTimeout(restartTimer)
                }, 300) // Longer transition animation
              }, 1000) // 1 sec to show failed

              return () => clearTimeout(failedTimer)
            }, 300) // Longer transition animation
          }, 800) // 0.8 sec to show analyzing again

          return () => clearTimeout(backToAnalyzingTimer)
        }, 300) // Longer transition animation
      }, 1000) // 1 sec to show success

      return () => clearTimeout(successTimer)
    }

    cycleStatus()
  }, [])

  const currentStatus = statusInfo[status]

  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div
        className={`status-indicator flex items-center gap-2 px-3 py-1.5 rounded-full shadow-sm ${
          currentStatus.bgColor
        } ${currentStatus.borderColor} ${
          currentStatus.textColor
        } ${isTransitioning ? "transitioning" : ""}`}
      >
        {currentStatus.icon}
        <span className="text-sm font-medium">{currentStatus.message}</span>
      </div>
    </div>
  )
}
