import PropTypes from 'prop-types'

function ContentBox({ children, className = "" }) {
    return (
        <div
            className={`p-10 contentBox mx-auto max-w-[1000px] rounded-[15px] overflow-hidden
            bg-surface-raised border-2 border-accent  ${className}`}
        >
            {children}
        </div>
    )
}

ContentBox.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
}

export default ContentBox
