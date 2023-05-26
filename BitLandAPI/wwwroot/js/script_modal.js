class Modal extends React.Component {
    constructor () {
        super();
        this.state = {
            showModal: false
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleOpenModal () {
        this.setState({ showModal: true });
    }

    handleCloseModal () {
        this.setState({ showModal: false });
    }

    render () {
        return (
            <div>
                <button onClick={this.handleOpenModal}>Open</button>
                <ReactModal
                    className="custom-modal'"
                    isOpen={this.state.showModal}
                    contentLabel="Simple Modal"
                >
                    <button onClick={this.handleCloseModal}>Close</button>
                </ReactModal>
            </div>
        );
    }
}

const props = {};

ReactDOM.render(<Modal {...props} />, document.getElementById('test_modal'))