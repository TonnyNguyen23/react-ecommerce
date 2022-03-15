import { MyOrders } from '../component/MyOrders'
import { ProfileInfo } from '../component/ProfileInfo'

export const ProfilePage = () => {
  return (
    <>
      <div className='container'>
        <div className='row'>
          {/* Profile info */}
          <div className='col-md-3'>
            <ProfileInfo />
          </div>

          {/* Ordered items */}
          <div className='col-9'>
            <MyOrders />
          </div>
        </div>
      </div>
    </>
  )
}
