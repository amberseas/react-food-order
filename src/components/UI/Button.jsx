export default function Button ({children, text, className, ...props}) {
    const cssClasses = text ? ('text-button ' + className) : ('button ' + className);
    return <button className={cssClasses} {...props}>{children}</button>;
}