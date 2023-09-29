import React from 'react'

type SpinnerProps = {
  color?: string
}

const Spinner: React.FC<SpinnerProps> = ({ color = 'border-blue-500' }) => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className={`h-10 w-10 animate-spin rounded-full border-4 ${color} border-t-transparent`}></div>
    </div>
  )
}

export default Spinner
