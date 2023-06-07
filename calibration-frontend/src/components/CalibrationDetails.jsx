import { useCalibrationContext } from '../hooks/useCalibrationContext'
import { useAuthContext } from '../hooks/useAuthContext'

// date fns

const CalibrationDetails = ({ calibration  }) => {
  const { dispatch } = useCalibrationContext()
  const { user } = useAuthContext()

  const handleClick = async () => {
    if (!user) {
      return
    }

    const response = await fetch('http://localhost:5000/c1_1/calibration' + calibration._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_CALIBRATION', payload: json})
    }
  }

  return (
    <div className="calibration-details">
      <h4>{calibration.title}</h4>
      <p><strong>Load (kg): </strong>{calibration .load}</p>
      <p><strong>Reps: </strong>{calibration .reps}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default CalibrationDetails