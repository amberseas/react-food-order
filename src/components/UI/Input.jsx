export default function Input ({id, name, type, label, ...props}) {
    return (
        <p className="control">
            <label htmlFor={id}>{label}</label>
            <input type={type ?? 'text'} name={name} id={id} {...props} />
        </p>
    );
}