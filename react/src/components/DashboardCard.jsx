export default function DashboardCard({title, children, className = ''}) {
    return (
        <>
            <div className={'bg-white shadow-md p-3 text-center flex flex-col animate-fade-in-down' + className}>
                {title && <h3 className="text-2xl font-semibold">{title}</h3>}
                {children}
            </div>
        </>
    )
}
