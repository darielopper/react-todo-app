import React from "react"
import propTypes from "prop-types"

class Modal extends React.Component {
    static defaultProps = {
        okText: 'Ok',
        cancelText: 'Cancel',
        okClass: 'btn btn-sm btn-success',
        cancelClass: 'btn btn-sm btn-danger',
        okHidden: false,
        cancelHidden: true,
        show: false,
    }

    static propTypes = {
        okText: propTypes.string,
        cancelText: propTypes.string,
        okClass: propTypes.string,
        cancelClass: propTypes.string,
        okHidden: propTypes.bool,
        cancelHidden: propTypes.bool,
        show: propTypes.bool
    }

    constructor(props) {
        super(props)
        this.state = {
            show: this.props.show
        }
    }

    render() {
        const { show } = this.state
        const {
            footerSection: footer,
            headerSection: header,
            okHidden,
            cancelHidden,
            okClass,
            cancelClass,
            okText,
            cancelText
            } = this.props
        const headerSection = !!header
            ? header
            : (<div className="modal-header">
                    <h5 className="modal-title">
                        {this.props.title}
                    </h5>
                    <button type="button" className="close" aria-label="Close">
                        <i className="fal fa-times">&nbsp;</i>
                    </button>
                </div>)
        const footerSection = !!footer
            ? footer
            : (<div className="modal-footer">
                    {!cancelHidden && <button id="cancelButton" type="button" className={cancelClass} rel="prev">
                        {cancelText}
                    </button>}
                    {!okHidden && <button id="okButton" type="button" className={okClass} rel="next">
                        {okText}
                    </button>}
                </div>)
        return (
            show && <div class="animated">
                <div className="modal show animated fadeIn" role="dialog" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document" ref="dialog">
                        <div className="modal-content">
                            {headerSection}
                            <div className="modal-body">
                                {this.props.children}
                            </div>
                            {footerSection}
                        </div>
                    </div>
                </div>
                <div className="modal-backdrop show"></div>
            </div>
        )
    }
}

export default Modal