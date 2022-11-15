import { connect } from 'react-redux'

const Notification = (prop) => {
    const notification = prop.notification

    const style = { border: 'solid', padding: 10, borderWidth: 1 }

    if (notification === '') return
    return (<div style={style}>{notification}</div>)
}

const mapStateToProps = (state) => {
    return {
        notification: state.notification
    }
}

export default connect(mapStateToProps, null)(Notification)