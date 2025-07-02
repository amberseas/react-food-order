export default function Button ({children, text, ...props}) {
    return <button className={text ? 'text-button' : 'button'} {...props}>{children}</button>;
}