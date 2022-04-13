const Filter = ({ filterValue, onChange }) => (
    <form>
        filter shown with
        <input value={filterValue} onChange={onChange} />
    </form>
)

export default Filter