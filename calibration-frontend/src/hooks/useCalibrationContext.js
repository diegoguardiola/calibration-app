import { CalibrationContext } from "../context/CalibrationContext"
import { useContext } from 'react'

export const useCalibrationContext = () => {
  const context = useContext(CalibrationContext)

  console.log(context); 

  if (!context) {
    throw Error('useCalibrationContext must be used inside an CalibrationContextProvider')
  }

  return context
}