import loadingIcon from '../img/loading-icon.svg'
import '../styles/Loading.css'

function Loading() {
  return (
    <div className="loading__container">
      <img className="loading__icon" alt="loading icon" src={loadingIcon} />
    </div>
  )
}

export default Loading
