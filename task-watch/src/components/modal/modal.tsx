import React, { PropsWithChildren } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import './modal.css'

interface ModalProps {
    show: boolean
    onClose: () => void
    title: string
    height?: number
    width?: number
}

function Modal({ show, title, children, onClose }: PropsWithChildren<ModalProps>) {
    if (!show) return <></>

    return <div className="modal-container">
        <div className="modal">
            <div className="modal-header">
                <p>{title}</p>
                <button className="close-btn" onClick={() => onClose()}><FontAwesomeIcon icon={faXmark} size='lg'/></button>
            </div>
            <div className="modal-body">
                {children}
            </div>
        </div>
    </div>;
}

export default Modal;