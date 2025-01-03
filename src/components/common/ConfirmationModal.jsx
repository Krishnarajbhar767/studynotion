import React from 'react'
import IconButton from './IconButton'

function ConfirmationModal({modalData}) {
  return (
    <div className='text-white'>
        <div>
                <p>{modalData.text1}</p>
                <p>{modalData.text2}</p>
                <div>
                <button onClick={modalData.btn1Handler}>
                  Log Out
                </button>
                        <button onClick={modalData.btn2Handler}>
        {modalData.btn2Text}
                        </button>
                </div>
        </div>
    </div>
  )
}

export default ConfirmationModal