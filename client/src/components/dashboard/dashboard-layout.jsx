import { Outlet } from 'react-router-dom'
import DashboardHeader from './dashboard-header.component'
import DashboardFooter from './dashboard-footer.component'

const DashboardLayout = () => {
  return (
    <>
      <DashboardHeader />
      <div className='dash-container'>
        <Outlet />
      </div>
      <DashboardFooter />
    </>
  )
}
export default DashboardLayout
