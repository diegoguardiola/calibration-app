import { createContext, useReducer } from 'react'

export const CalibrationContext = createContext()

export const calibrationsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CALIBRATIONS': 
      return {
        calibrations: action.payload
      }
    case 'CREATE_CALIBRATION':
      return {
        calibrations: [action.payload, ...(state.calibrations || [])]

      }
    case 'DELETE_CALIBRATION':
      return {
        calibrations: state.calibrations.filter((w) => w._id !== action.payload._id)
      }
    default:
      return state
  }
}

export const CalibrationContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(calibrationsReducer, {
    calibrations: null
  })

  return (
    <CalibrationContext.Provider value={{...state, dispatch}}>
      { children }
    </CalibrationContext.Provider>
  )
}