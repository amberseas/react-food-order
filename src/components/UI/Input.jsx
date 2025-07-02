export default function Input ({id, name, type, label, ...props}) {
    return (
        <>
            <label htmlFor={id}>{label}</label>
            <input type={type ?? 'text'} name={name} id={id} {...props} />
        </>
    );
}