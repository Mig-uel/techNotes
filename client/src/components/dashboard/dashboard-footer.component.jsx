import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'

import { useLocation, useNavigate } from 'react-router-dom'

const DashboardFooter = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const clickHandler = () => navigate('/dashboard')

  return (
    <footer className='dash-footer'>
      {pathname !== '/dashboard' && (
        <button
          className='dash-footer__button icon-button'
          title='Home'
          onClick={clickHandler}
        >
          <FontAwesomeIcon icon={faHouse} />
        </button>
      )}

      <p>Current User:</p>
      <p>Status:</p>
    </footer>
  )
}
export default DashboardFooter
