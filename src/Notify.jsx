const Notify = ({ errorMessage }) => {
  return (
    <div style={{ color: 'red', position: 'fixed', top: 0, width: '100%' }}>
      {errorMessage}
    </div>
  )
}

export default Notify