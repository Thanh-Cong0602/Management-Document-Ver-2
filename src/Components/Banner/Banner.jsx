import { Image } from 'antd'
import Banner_Image from '../../assets/banner.jpg'
function Banner() {
  return (
    <div style={{position: 'relative'}}>
      <Image src={Banner_Image} alt='Banner' preview={false} style={{width: '100vw'}} />
    </div>
  )
}

export default Banner