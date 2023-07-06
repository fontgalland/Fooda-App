import { Fragment } from 'react';
import classes from './Modal.module.css';
import ReactDOM from 'react-dom';

const Backdrop = (props) => {
    return (
        <div className={classes.backdrop} onClick={props.onCloseCart} />
    )
}

const ModalOverlay = (props) => {
    return(
        <div className={classes.modal}>
            <div className={classes.content}>{props.children}</div>
        </div>
    )
}

// ref for the portal
const portalElement = document.getElementById('overlays');

export const Modal = (props) => {
    return (
        <Fragment>
            {ReactDOM.createPortal(<Backdrop onCloseCart={props.onCloseCart}/>, portalElement)}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
        </Fragment>
    )
}