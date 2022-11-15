import { connect } from 'react-redux'

const Notification = (prop) => {
    const message = prop.notification.message

    const style = { border: 'solid', padding: 10, borderWidth: 1 }

    if (message === '') return
    return (<div style={style}>{message}</div>)
}

const mapStateToProps = (state) => {
    return {
        notification: state.notification
    }
}

export default connect(mapStateToProps, null)(Notification)